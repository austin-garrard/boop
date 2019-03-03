#!/usr/bin/env node

// Usage:
//    $ ./manageDb.js [clean]
// - invoking with no arguments creates the role and database 
//   specified by the config for the current environment
// - invoking with a single argument "clean" undoes everything
// - both operations are idempotent

require = require("esm")(module)
const config = require('../config').default
const { Client } = require('pg')
const client = new Client(config.adminDb)

async function createRole() {
  const userExists = await client.query(
    `SELECT 'exists' as exists FROM pg_roles WHERE rolname=$1`,
    [config.db.user]
  )

  if (userExists.rows[0] === undefined) {
    console.log(`Creating user ${config.db.user}...`)

    // TODO can/need this be sanitized?
    await client.query(
      `CREATE ROLE ${config.db.user} WITH PASSWORD '${config.db.password}'`,
    )

    console.log('done.')
  }
}

async function dropRole() {
  await client.query(
    `DROP ROLE IF EXISTS ${config.db.user}`,
  )
}

async function createDatabase() {
  const dbExists = await client.query(
    `SELECT 'exists' FROM pg_database WHERE datname=$1`,
    [config.db.database]
  )

  if (dbExists.rows[0] === undefined) {
    console.log(`Creating database ${config.db.database}...`)
    
    // TODO can/need this be sanitized?
    await client.query(
      `CREATE DATABASE ${config.db.database}`,
    )

    console.log('done.')
  }
}

async function dropDatabase() {
  await client.query(
    `DROP DATABASE IF EXISTS ${config.db.database}`
  )
}

async function initAppDb() {
  await createRole()
  await createDatabase()
}

async function cleanAppDb() {
  await dropRole()
  await dropDatabase()
}

const args = process.argv.slice(2);
const operation = args[0] === 'clean' ? cleanAppDb : initAppDb

client.connect()
  .then(operation)
  .catch(console.log)
  .finally(() => client.end())

