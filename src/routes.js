import Router from '@koa/router'

import { client, postSchema } from './db.js'

const router = new Router()

router.get('/post', async (ctx) => {
  const postRepository = client.fetchRepository(postSchema)
  await postRepository.createIndex()
  const allPosts = await postRepository.search().returnAll()
  ctx.body = allPosts
})

router.get('/post/:id', async (ctx) => {
  const postRepository = client.fetchRepository(postSchema)
  const post = await postRepository.fetch(ctx.params.id)
  ctx.body = post
})

router.post('/post', async (ctx) => {
  const postRepository = client.fetchRepository(postSchema)
  const post = await postRepository.createAndSave({
    ...ctx.request.body
  })
  ctx.body = post
})

router.put('/post/:id', async (ctx) => {
  const postRepository = client.fetchRepository(postSchema)
  const post = await postRepository.fetch(ctx.params.id)

  Object.entries(ctx.request.body).forEach(([key, val]) => {
    post[key] = val
  })

  const postId = await postRepository.save(post)
  ctx.body = { postId, post }
})

router.delete('/post/:id', async (ctx) => {
  const postId = ctx.params.id
  const postRepository = client.fetchRepository(postSchema)
  await postRepository.remove(postId)
  ctx.body = { postId }
})

export { router }
