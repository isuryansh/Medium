import { z } from 'zod';

//Signup
export const SignupInput = z.object({
    username: z.string().email(),
    name: z.string(),
    password: z.any()
});
export type SignupInput = z.infer<typeof SignupInput>


//Signin
export const SigninInput = z.object({
    username: z.string().email(),
    password: z.any()
})
export type SigninInput = z.infer<typeof SigninInput>


//Blog
export const BlogInput = z.object({
    title : z.string(),
    content : z.string()
})
 export type BlogInput = z.infer<typeof BlogInput>


//Updating Blog
export const UpdateBlogInput = z.object({
    title : z.string(),
    content : z.string(),
    id : z.string()
})
export type UpdateBlogInput = z.infer<typeof UpdateBlogInput>