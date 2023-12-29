import database from '/infra/database.js'

async function status(request, response) {
  const updatedAt = new Date().toISOString()
  
  const databaseVersionResult = await database.query('SHOW server_version;')
  const databaseVersionValue = databaseVersionResult.rows[0].server_version
  
  const databaseName = process.env.POSTGRES_NAME
  const databaseOpenConnectionsResult = await database.query(
    {
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname=$1;",
      values: [databaseName]
    }
  )
  const databaseOpenConnectionsValue =
    databaseOpenConnectionsResult.rows[0].count
  const databaseMaxConnectionsResult = await database.query(
    'SHOW max_connections;',
  )
  const databaseMaxConnectionsValue = parseInt(
    databaseMaxConnectionsResult.rows[0].max_connections,
  )

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: databaseMaxConnectionsValue,
        open_connections: databaseOpenConnectionsValue,
      },
    },
  })
}

export default status
