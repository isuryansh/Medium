import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { BlogInput, UpdateBlogInput } from "@suryanshvaish45/zod-commons";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId : any
    }
}>();

blogRouter.use('/*',async (c, next) => {
    const jwt = c.req.header('Authorization') || ""
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const payload = await verify(jwt, c.env.JWT_SECRET);
	if(payload){
        c.set("userId", payload.id)
        await next();
    }
    else{
        c.status(403)
        return c.json({
            message : "Something went wrong"
        })
    }
});

blogRouter.post('/new', async (c) => {
	 const body = await c.req.json();
	 const {success} = BlogInput.safeParse(body);
	 if(!success){
		c.status(411)
		return c.json({
			message : "Input error"
		})
	 }
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	try {
		const post = await prisma.post.create({
			data: {
				title: body.title,
				content: body.content,
				authorId: userId
			}
		});
		return c.json({
			id: post.id
		});
	} catch (error) {
		c.json({
			"message" : "Server Error"
		})
	}
})

blogRouter.put('/update', async (c) => {
	const body = await c.req.json();
	const {success} = UpdateBlogInput.safeParse(body);
	if(!success){
		c.status(411)
		return c.json({
			message : "Input error"
		})
	}
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	try {
		const updatedPost = await prisma.post.update({
			where: {
				id: body.id,
				authorId: userId
			},
			data: {
				title: body.title,
				content: body.content
			}
		});
	
		return c.json({
			id : body.id
		});

	} catch (error) {
		c.json({error})
	}
});

blogRouter.get('/bulk', async(c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());
	const blog = await prisma.post.findMany({
		select : {
			content : true,
			title : true,
			id : true,
			author : {
				select : {
					name : true,
				}
			}
		}
	})

	return c.json({
		blog
	})
})

blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const blog = await prisma.post.findFirst({
		where: {
			id: String(id)
		},
		select : {
			content : true,
			title : true,
			id : true,
			author : {
				select : {
					name : true,
				}
			}
		}
	});

	return c.json({
		blog
	});
})