/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as functions_drivers from "../functions/drivers.js";
import type * as functions_maintenance from "../functions/maintenance.js";
import type * as functions_notifications from "../functions/notifications.js";
import type * as functions_tasks from "../functions/tasks.js";
import type * as functions_trucks from "../functions/trucks.js";
import type * as functions_users from "../functions/users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "functions/drivers": typeof functions_drivers;
  "functions/maintenance": typeof functions_maintenance;
  "functions/notifications": typeof functions_notifications;
  "functions/tasks": typeof functions_tasks;
  "functions/trucks": typeof functions_trucks;
  "functions/users": typeof functions_users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
