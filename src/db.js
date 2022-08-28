import { Client, Entity, Schema } from 'redis-om'

export const client = new Client()

export const createClient = async () => {
  if (!client.isOpen()) {
    await client.open('redis://localhost:6379')
  }
}

class Post extends Entity {}

export const postSchema = new Schema(Post, {
  title: { type: 'string' },
  content: { type: 'string' },
  isPublished: { type: 'boolean' }
})
