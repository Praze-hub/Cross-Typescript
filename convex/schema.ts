import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    //===================
    // Users table
    //===================
    users: defineTable({
        name: v.string(),
        email: v.string(),
        role: v.optional(v.union(
            v.literal("admin"),
            v.literal("manager"),
            v.literal("driver")
        )),
        createdAt: v.optional(v.number()) //store Date.now

    }).index("by_email", ["email"]),


    //======================
    //Drivers table
    //======================
    drivers: defineTable({
        name: v.string(),
        phone: v.string(),
        email: v.optional(v.string()),
        licenseNumber: v.optional(v.string()),
        userId: v.id("users"),
    }).index("by_phone", ["phone"])
      .index("by_email", ["email"]),

    //==================
    //Trucks table
    //===================
    trucks: defineTable({
        plateNumber: v.string(),
        model: v.optional(v.string()),
        mileage:v.optional(v.number()),
        lastMaintenanceAt: v.optional(v.number())
    }).index("by_plate", ["plateNumber"]),

    //===================
    //Tasks (delivery task assignments)
    //===================
    tasks: defineTable({
        title: v.string(),
        description: v.optional(v.string()),
        assignedTo: v.optional(v.id("drivers")),
        truck: v.optional(v.id("trucks")),
        status: v.union(
            v.literal("pending"),
            v.literal("in_progress"),
            v.literal("done")
        ),
        dueAt: v.optional(v.number()),
        createdAt: v.number()
    }).index("by_assignedTo", ["assignedTo"])
      .index("by_truck", ["truck"]),


    //===================
    //Maintenance table
    //====================
    maintenance: defineTable({
        truck: v.id("trucks"),
        scheduledAt: v.number(),
        createdAt: v.number(),
        done: v.boolean(),
        notes: v.optional(v.string())
    }).index("by_truck", ["truck"]),



    //================
    // Notifications table
    //================
    notifications: defineTable({
        toDriver: v.id("drivers"),
        type: v.string(),
        payload: v.any(),
        sentAt: v.optional(v.number()),
        status: v.union(
            v.literal("pending"),
            v.literal("sent"),
            v.literal("failed")
        )
    }).index("by_driver", ["toDriver"])
})

   


    