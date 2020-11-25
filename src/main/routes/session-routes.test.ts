import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { hash } from 'bcrypt'
import { Collection } from 'mongodb'

let accountCollection: Collection

describe('SignIn Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return 200 on login', async () => {
    const password = await hash('123', 12)
    await accountCollection.insertOne({
      name: 'Lucas',
      email: 'lucascruz@gmail.com',
      password
    })
    await request(app)
      .post('/api/login')
      .send({
        email: 'lucascruz@gmail.com',
        password: '123'
      })
      .expect(200)
  })
})
