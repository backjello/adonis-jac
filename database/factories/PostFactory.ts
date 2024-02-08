import Factory from '@ioc:Adonis/Lucid/Factory';
import post from './../../app/Models/Post';

export default Factory.define(post, ({ faker }) => {
  return {
    title: faker.word.noun(), // assegno un nome casuale ad un post
    body: faker.lorem.paragraph(3),
    userId: 14
  }
}).build()
