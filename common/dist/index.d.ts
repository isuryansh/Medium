import { z } from 'zod';
export declare const SignupInput: z.ZodObject<{
    username: z.ZodString;
    name: z.ZodString;
    password: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    username: string;
    name: string;
    password?: any;
}, {
    username: string;
    name: string;
    password?: any;
}>;
export type SignupInput = z.infer<typeof SignupInput>;
export declare const SigninInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    username: string;
    password?: any;
}, {
    username: string;
    password?: any;
}>;
export type SigninInput = z.infer<typeof SigninInput>;
export declare const BlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export type BlogInput = z.infer<typeof BlogInput>;
export declare const UpdateBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
}, {
    title: string;
    content: string;
    id: string;
}>;
export type UpdateBlogInput = z.infer<typeof UpdateBlogInput>;
