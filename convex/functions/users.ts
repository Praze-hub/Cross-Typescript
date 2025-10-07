// import { GenericQueryCtx } from "convex/server";
import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

export const getAllTheUsers = query({
    args: {},
    async handler(ctx) {
        return await ctx.db.query("users").collect();
    },
});

export const getUserWithDriver = query({
    args: { userId: v.optional(v.id("users"))},
    handler: async (ctx, args) => {
        if (!args.userId) {
        return { error: "No userId provided" };
        }
        const user = await ctx.db.get(args.userId);
        if (!user) return null;

        if (user.role === "driver"){
            const driver = await ctx.db
                .query("drivers")
                .withIndex("by_email", (q) => q.eq("email", user.email))
                .first();
            return {...user, driver };
        }
        return user;

    },
});

export const createUser = mutation({
    args: {
        name: v.string(),
        email: v.string(), 
        role: v.union(
            v.literal("admin"),
            v.literal("manager"),
            v.literal("driver")
        ),
    },
    async handler(ctx, args) {
        const userId = await ctx.db.insert("users", {
            name: args.name,
            email: args.email,
            role: args.role,
            createdAt: Date.now(),
        });

        const newUser = await ctx.db.get(userId);
        return {
            message: " User created successfully",
            user: newUser,
        };
    },
});

export const createUserAndDriver = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        licenseNumber: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const userId = await ctx.db.insert("users", {
            name: args.name,
            email: args.email,
            role: "driver",
            createdAt: Date.now(),
        });

        const driverId = await ctx.db.insert("drivers", {
            name: args.name,
            phone: args.phone,
            email: args.email,
            licenseNumber: args.licenseNumber,
            userId,
        });

        return { userId, driverId };
    }
})


export const updateUser = mutation({
  args: {
    id: v.id("users"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    role: v.optional(
      v.union(v.literal("admin"), v.literal("manager"), v.literal("driver"))
    ),
  },
  async handler(ctx, args) {
    const {id, name, email, role} = args;

    const updates: Partial<{
    name: string;
    email: string;
    role: "admin" | "manager" | "driver";
  }> = {};

    if (name) updates.name = name;
    if (email) updates.email = email;
    if (role) updates.role = role;

    await ctx.db.patch(id, updates);
    
    const updatedUser = await ctx.db.get(id);

    return updatedUser;
  },
});

export const deleteUser = mutation({
  args: { id: v.id("users") },
  async handler(ctx, { id }) {
    await ctx.db.delete(id);
    return id;
  },
});

