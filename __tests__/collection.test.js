const {
  beforeAll,
  afterAll,
  describe,
  test,
  expect
} = require('@jest/globals')

const {
  db,
  comments: commentsCollection,
  bounties: bountiesCollection
} = require('../src/models/index')

beforeAll(async () => {
  await db.sync()
})

afterAll(async () => {
  await db.drop()
})

describe('🧪 Testing collection operations 🧪', () => {
  test('Creates a record', () => {
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

    const newBounty = bountiesCollection.create(bounty)
    const newComment = commentsCollection.create(comment)

    expect(newBounty).toBeDefined()
    expect(newComment).toBeDefined()
  })

  test('Updates a record', async () => {
    const bounty = {
      header: 'tizz',
      content: 'biz',
      poster: 'John Doe',
      karma: 101
    }

    const updatedBounty = await bountiesCollection.update(1, bounty)
    expect(updatedBounty.dataValues.header).not.toEqual('foo')
  })

  test('Read returns all records', async () => {
    const bounty = {
      header: 'pho',
      content: 'phiz',
      poster: 'Patty Sue',
      karma: 100
    }

    await bountiesCollection.create(bounty)
    const bountiesList = await bountiesCollection.read()

    expect(bountiesList[0]).toBeDefined()
  })

  test('Creates association', async () => {
    bountiesCollection.createAssociation('hasMany', commentsCollection.model, {
      foreignKey: 'bountyId',
      sourceKey: 'id'
    })

    commentsCollection.createAssociation('belongsTo', bountiesCollection.model, {
      foreignKey: 'bountyId',
      targetKey: 'id'
    })

    const bounty = await bountiesCollection.read(1, {
      include: commentsCollection.model
    })

    expect(bounty.dataValues.Comments).toBeDefined()
  })

  test('Reads joined data', async () => {
    const options = {
      include: commentsCollection.model
    }

    const bounty = await bountiesCollection.read(1, options)

    expect(bounty.dataValues.Comments).toBeDefined()
  })

  test('Deletes a record', async () => {
    await commentsCollection.delete(1)
    const comments = await commentsCollection.read()

    expect(comments).toEqual([])
  })
})
