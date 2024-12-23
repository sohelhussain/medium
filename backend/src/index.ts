import { Hono } from 'hono'
import {PrismaClient} from '@prisma/client/edge'
import {withAccelerate} from '@prisma/extension-accelerate'
import { sign, decode, verify } from 'hono/jwt'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string
  }
}>()

//!middleware

app.use('/api/v1/blog/*', async (c, next) => {

  const header = c.req.header("Authorization") || "";
  // if user send header -> Bearer alsdfkjkjdfldkajflsdajfkdaf
const token = header.split(" ")[1]    //! we expect user send a token just like that
//Bearer token => ['Bearer', 'token'];  


  // const response = await verify(header, c.env.JWT_SECRET);
  const response = await verify(token, c.env.JWT_SECRET);
  if(response.id){
    next()
  }else{
    c.status(403);
    return c.json({error: 'unauthorize'})
  }

})

//! signup
app.post('/api/v1/signup/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const body = await c.req.json();

const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password
    }
  })

  const token = await sign({id: user.id}, c.env.JWT_SECRET);
  


  return c.json({jwt: token});
});

//! signin
app.post('/api/v1/signin/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.findUnique({
    where:{
      email: body.email
    }
  })

  if(!user){
    c.status(403);
    return c.json({error: 'user not found'})
  }

  const token = await sign({id: user.id}, c.env.JWT_SECRET);

  return c.json({jwt: token})
})





app.post('/api/v1/blog', (c) => {
  return c.text('asdf')
})
app.post('/api/v1/blog', (c) => {
  return c.text('asdf')
  
})
app.post('/api/v1/blog/:id', (c) => {
  return c.text('asdf')
  
})





export default app
