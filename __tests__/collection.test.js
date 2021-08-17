const {
  beforeAll,
  afterAll,
  describe,
  test,
  expect
} = require('@jest/globals')

const {
  db,
  commentsCollection,
  bountiesCollection
} = require('../src/models/index')

beforeAll(async () => {
  await db.sync()
})

afterAll(async () => {
  await db.drop()
})

describe('🧪 Testing collection operations 🧪', () => {
  test('creates a record', async () => {
    const expected = {
      id: 1,
      header: 'fizz',
      content: 'buzz',
      poster: 'John Doe',
      karma: 100
    }

    const comment = {
      bountyId: 1,
      header: 'foo',
      content: 'bar',
      poster: 'Holly Doe'
    }

    const bounty = {
      header: 'fizz',
      content: 'buzz',
      poster: 'John Doe',
      karma: 100
    }

    const newBounty = await bountiesCollection.create(bounty)
    const newComment = await commentsCollection.create(comment)

    expect(newBounty).toEqual(expected)
    expect(newComment).toEqual({
      id: 1,
      bountyId: 1,
      header: 'foo',
      content: 'bar',
      poster: 'Holly Doe'
    })
  })

  test('read returns all records', async () => {
    const bountiesList = await bountiesCollection.read()
    console.log(bountiesList)
    const expected = [
      {
        id: 1,
        header: 'fizz',
        content: 'buzz',
        poster: 'John Doe',
        karma: 100
      }
    ]

    expect(bountiesList).toEqual(expected)
  })

  test('reads joined data', async () => {
    const expected = {
      id: 1,
      header: 'fizz',
      content: 'buzz',
      poster: 'John Doe',
      karma: 100,
      comments: []
    }

    const options = {
      where: {
        id: 1
      },
      include: 'Comments'
    }

    const bounty = await bountiesCollection.read(options)

    expect(bounty).toEqual(expected)
  })

  test('Creates association', async () => {
    const expected = {
      id: 1,
      header: 'fizz',
      content: 'buzz',
      poster: 'John Doe',
      karma: 100,
      comments: []
    }

    await bountiesCollection.createAssociation('hasMany', commentsCollection.model, {
      foreignKey: 'bountyId',
      sourceKey: 'id'
    })

    await commentsCollection.createAssociation('belongsTo', bountiesCollection.model, {
      foreignKey: 'bountyId',
      targetKey: 'id'
    })

    const bounty = await bountiesCollection.read({
      where: {
        id: 1
      },
      include: 'Comments'
    })

    expect(bounty).toEqual(expected)
  })

  test('Deletes a record', async () => {
    const options = {
      where: { id: 1 }
    }

    await commentsCollection.delete(options)
    const comments = await commentsCollection.read()

    expect(comments).toEqual([])
  })
})
