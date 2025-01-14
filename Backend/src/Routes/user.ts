import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { SignupInput , SigninInput} from "@suryanshvaish45/zod-commons";

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	}
}>();

userRouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const body = await c.req.json();
	const {success} = SignupInput.safeParse(body);
	if(!success){
		c.status(411)
		return c.json({
			message : "Input error"
		})
	}
	try {
		 const user = await prisma.user.create({
			data: {
				username: body.username,
				password: body.password,
                name : body.name
			}
		});
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.text(jwt)
	} 

  catch(e) {
    console.log(e);
    return c.status(411)
	}
})

userRouter.post("/signin",async (c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const body = await c.req.json();
	const {success} = SigninInput.safeParse(body);
	if(!success){
		c.status(411)
		return c.json({
			message : "Input error"
		})	}
	try {
		 const user = await prisma.user.findFirst({
			where: {
				username: body.username,
				password: body.password,
			}
		});
    if(!user){
      c.status(403)
      return c.text("user invalid")
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.text(jwt)
	} 

  catch(e) {
    console.log(e);
    return c.status(411)
	}
})