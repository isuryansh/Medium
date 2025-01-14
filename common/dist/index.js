"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBlogInput = exports.BlogInput = exports.SigninInput = exports.SignupInput = void 0;
const zod_1 = require("zod");
//Signup
exports.SignupInput = zod_1.z.object({
    username: zod_1.z.string().email(),
    name: zod_1.z.string(),
    password: zod_1.z.any()
});
//Signin
exports.SigninInput = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.any()
});
//Blog
exports.BlogInput = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string()
});
//Updating Blog
exports.UpdateBlogInput = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    id: zod_1.z.string()
});
