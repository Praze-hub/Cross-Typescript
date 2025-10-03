// import { GenericQueryCtx } from "convex/server";
import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

export const getAll = query({
    args: {},
    async handler(ctx) {
        return await ctx.db.query("users").collect();
    },
});

export const getUserWithDriver = query({
    args: { userId: v.id("users")},
    handler: async (ctx, args) => {
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
        name: v.string(), email: v.string(), role: v.union(
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
        return userId;
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

