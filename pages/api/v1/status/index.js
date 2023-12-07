import database from '/infra/database.js'

async function status(request, response) {
  const updatedAt = new Date().toISOString()

  const databaseVersionResult = await database.query('SHOW server_version;')
  const databaseVersionValue = databaseVersionResult.rows[0].server_version

  const databaseOpenConnectionsResult = await database.query(
    'SELECT count(*) FROM pg_stat_activity;',
  )
  const databaseOpenConnectionsValue =
    databaseOpenConnectionsResult.rows[0].count

  const databaseAvailableConnectionsResult = await database.query(
    'SHOW max_connections;',
  )
  const databaseAvailableConnectionsValue =
    databaseAvailableConnectionsResult.rows[0].max_connections

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        available_connections: databaseAvailableConnectionsValue,
        open_connections: databaseOpenConnectionsValue,
      },
    },
  })
}

export default status
