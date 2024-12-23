import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";



export const bookRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

bookRouter.use(async (c, next) => {
    const header = c.req.header('Authorization');

    if(!header){
        c.status(401);
        return c.json({error: 'unauthorize'})
    }

    const token = header.split(' ')[1];
    const payload = await verify(token, c.env.JWT_SECRET);

    if(!payload){
        c.status(401);
        return c.json({error: 'unauthorize'})
    }

    //@ts-ignore
    c.set('userId', payload.id);
    next();
});



bookRouter.post('/', async (c) => {
    const userId = c.get('userId');
    const prisma = await PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());


    const body = await c.req.json();
    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
      })
    return c.json({id: post.id}); 
})


bookRouter.put('/', async (c) => {
    const userId = c.get('userId');

    const prisma = await PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());


    const body = await c.req.json();
    await prisma.post.update({
        where: {
            id: body.id,
            authorId: userId
        },
        data: {
            title: body.title,
            content: body.content
        }
    })
    return c.text('update post');
});

bookRouter.get('/:id', async (c) => {
    const id = c.req.param('id');

    const prisma = await PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());


    const post = await prisma.post.findUnique({
        where: {
            id
        }
    })

    return c.json(post);
})
