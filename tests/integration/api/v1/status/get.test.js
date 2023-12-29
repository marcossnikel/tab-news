test('GET to /api/v1/status should return 200', async () => {
  const response = await fetch('http://localhost:3000/api/v1/status')
  expect(response.status).toBe(200)

  const responseBody = await response.json()

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString()
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt)

  expect(responseBody.dependencies.database.version).toEqual('16.0')
  expect(responseBody.dependencies.database.max_connections).toEqual(100)
  expect(responseBody.dependencies.database.open_connections).toEqual(1)
})

// test.only('TEST SQL INJECTION', async () => {
//   // await fetch('http://localhost:3000/api/v1/status?databaseName=postgres;')
//   // await fetch('http://localhost:3000/api/v1/status?databaseName=;"')
//   // await fetch('http://localhost:3000/api/v1/status?databaseName=;" SELECT pg_sleep(4);')
//   await fetch("http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4); --")
// })
