import Factory from '@ioc:Adonis/Lucid/Factory'
import user from 'App/Models/User'

export default Factory.define(user, ({ faker }) => {
  return {
    age: faker.number.int({ min: 0, max: 99 }),
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    email: faker.internet.email(),
    password: 'test'
  }
}).build()
