import config from 'src/config.json';
import activity from 'src/structures/activity';
import _ from "lodash";
import tracking from 'src/structures/tracking';

export interface IFilter {
  field: string;
  comparison: '=' | '<' | '>' | '<=' | '>=';
  value: string | number;
  numeric: boolean;
}

let db = window.sqlitePlugin.openDatabase(config.db);

export interface ISqliteTable {
  name: string; 
  type: string; 
  prim: boolean; 
  id: boolean;
}

const tableStructure = {
  activity: activity,
  tracking: tracking,
}

function _openDatabase(): void {
  // open local database
  try {
    console.log('DB', JSON.stringify(db));

    if (!db) db = window.sqlitePlugin.openDatabase(config.db);
    if (localStorage.getItem('dbCreated') === null) {
      _initStruct();
      localStorage.setItem('dbCreated', 'true');
    }
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

// Create
function _genCreate(table: keyof typeof tableStructure, record: any) {
  let fieldList = _.reduce(tableStructure[table], (valArray, field) => {
    console.log(field.name);
    if (record[field.name] !== undefined) valArray.push(field.name);
    return valArray;
  }, Array());
  let values = Array();
  _.forEach(fieldList, (fieldName) => {
    values.push(`"${record[fieldName]}"`);
  });
  const command = `INSERT INTO ${table} ( ${fieldList.join(", ")} ) VALUES ( ${values.join(", ")} )`;

  return command; 
}

function _genSelect(table: keyof typeof tableStructure, filter?: IFilter[]) {
  let command = `SELECT * FROM ${table}`;

  if (filter && filter.length > 0) {
    for (const [idx, item] of filter.entries()) {
      command += idx === 0 ? ' WHERE ' : ' AND ';
      command += `${item.field} ${item.comparison} ${!item.numeric ? '"': ''}${item.value}${!item.numeric ? '"': ''}`;
    }
  }

  return command;
}

function _sqlExecCommand(command: any): any {
  return new Promise((resolve, reject) => {
    console.log("execCommand", command);
    db.executeSql(
      command,
      [],
      (rs: any) => {
        resolve(rs);
      },
      (err: any) => {
        console.log("Error execCommand", command, JSON.stringify(err));
        reject(err);
      }
    );
  });
}

async function _initStruct() {
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
}

export default {
  async insert(table: keyof typeof tableStructure, data: any) {
    // open database
    _openDatabase();
    let command = _genCreate(table, data); // get sql command for insert
    console.log("CMD-INSERT", command);
    
    return new Promise((resolve, reject) => {
      // do transaction for both commands
      db.transaction(
        (tx: any) => {
          tx.executeSql(command);
        },
        (err: any) => {
          console.log("ERROR insert transaction:", err);
          reject(err);
        },
        () => {
          console.log("transaction finished");
          resolve();
        }
      );
    });
  },

  async loadData(table: keyof typeof tableStructure, filter?: IFilter[]) {
    // open database
    _openDatabase();

    let result = [];
    // get select command
    let command = _genSelect(table, filter);

    // execute command and get data
    let data = await _sqlExecCommand(command);

    // get values
    for (let i = 0; i < data.rows.length; ++i) {
      result.push(data.rows.item(i));
    }
    return result;
  },

  async initDatabase(): Promise<void> {
    _initStruct();
  }
}