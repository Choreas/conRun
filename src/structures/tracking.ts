export default [
  { name: "id",             type: "TEXT", id: true,  prim: true  },
  { name: "startTimestamp", type: "INTEGER", id: false,  prim: false  }, // unix timestamp, seconds since 1970
  { name: "endTimestamp",   type: "INTEGER", id: false, prim: false }, // unix timestamp, seconds since 1970
  { name: "activity",       type: "TEXT", id: false, prim: false }, // 'walk' | 'run' | 'cycle'
  { name: "distance",       type: "REAL", id: false,  prim: false  }, // metres
]