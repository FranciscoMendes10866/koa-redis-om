import Koa from 'koa'
import koaBody from 'koa-body'

import { router } from './routes.js'
import { createClient, client } from './db.js'

const startServer = async () => {
  const app = new Koa()
  await createClient()

  app.use(koaBody())
  app.use(router.routes())

  return app
}

startServer()
  .then(async (app) => {
    await new Promise(resolve => app.listen({ port: 3333 }, resolve))
  })
  .catch(async (err) => {
    console.error(err)
    await client.close()
    process.exit(1)
  })
