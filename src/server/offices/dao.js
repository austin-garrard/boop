
export default OfficesDao

const tableName = 'offices'
const createTable = `CREATE TABLE IF NOT EXISTS ${tableName}(
                      id SERIAL PRIMARY KEY,
                      data jsonb
                    )`

async function OfficesDao (db) {
  await db.query(createTable)

  return {
    create: function (data) {
      const q = {
        text: `INSERT INTO ${tableName}(data)
               VALUES($1)
               RETURNING id`,
        values: [data]
      }

      return db.query(q)
        .then(result => Object.assign(data, result.rows[0]))
    },

    update: function (id, data) {
      const q = {
        text: `UPDATE ${tableName}
               SET data = $1
               WHERE id = $2`,
        values: [data, id]
      }

      return db.query(q)
        .then(() => data)
    },
    
    clear: function () {
      return db.query(`TRUNCATE ${tableName} RESTART IDENTITY`)
    }
  }
}


