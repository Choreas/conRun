import config from 'src/config.json';
import activity from 'src/structures/activity';
import _ from "lodash";

let db = window.sqlitePlugin.openDatabase(config.db);

export interface ISqliteTable {
  name: string; 
  type: string; 
  prim: boolean; 
  id: boolean;
}

const tableStructure = {
  activity: activity,
}

function _openDatabase(): void {
  // open local database
  try {
    console.log('DB', JSON.stringify(db));

    if (!db) db = window.sqlitePlugin.openDatabase(config.db);
  } catch (err) {
    console.log('ERROR: openDatabase', err);
    throw err;
  }
}

// drop table
function _dropTable(table: keyof typeof tableStructure) {
  let command = `DROP TABLE IF EXISTS ${table}`;
  return command;
}

// create table
function _createTable(table: keyof typeof tableStructure) {
  // get definition of fieldlist
  let fieldList = _.map(tableStructure[table], (item: ISqliteTable) => {
    return (
      `${item.name} ${item.type}` + (item.prim ? " PRIMARY KEY NOT NULL" : "")
    );
  }).join(", ");

  let command = `CREATE TABLE ${table} ( ${fieldList} )`;
  return command;
}

// Execute the SQL statement
function _sqlExecBatch(command: any) {
  return new Promise((resolve, reject) => {
    db.sqlBatch(
      command,
      () => {
        resolve();
      },
      (err: any) => {
        console.log(
          "Error execBatch",
          JSON.stringify(command),
          JSON.stringify(err)
        );
        reject(err);
      }
    );
  });
}

export default {
  openTest(): void {
    _openDatabase();
  },

  async initStruct() {
    console.log("restDB: initstruct begin");

    // open database
    _openDatabase();
    console.log("restDB: initStruct DB is open");
    let cmd = [];

    // run for each table in list
    for (let tableName in tableStructure) {
      cmd.push(_dropTable(tableName as keyof typeof tableStructure));
      cmd.push(_createTable(tableName as keyof typeof tableStructure));
    }

    console.log("restDB: initStruct cmd");
    await _sqlExecBatch(cmd);

    console.log("restDB: initstruct done");
  },
}