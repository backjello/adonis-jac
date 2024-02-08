import Factory from '@ioc:Adonis/Lucid/Factory';
import comment from 'App/Models/Comment';
import Post from 'App/Models/Post';
import User from 'App/Models/User';

export default Factory.define(comment, async ({ faker }) => {
  // primo post e utente nel DB
  const post = await Post.query().first()
  const user = await User.query().first()
  return {
    text: faker.lorem.paragraph(5),
    postId: post?.id,
    userId: user?.id
  }
}).build()
