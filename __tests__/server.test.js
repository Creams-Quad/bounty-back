const { describe, test, expect } = require('@jest/globals')
const supertest = require('supertest')
const { app } = require('../src/server')

const request = supertest(app)

describe('🧪 Testing server routes 🧪', () => {
  test('Should return status code 404 on unhandled route', async () => {
    const response = await request.get('/wrong')

    expect(response.status).toEqual(404)
  })
})
