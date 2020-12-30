import {
    dbs
} from './crd.mjs';


//Creating DB instance
let db = new dbs()
// Starting Db
const Promisenew = new Promise(async (resolve, reject) => {
    await db.dbinit(process.argv[2])
        .then((resp) => {
            resolve(true)
        })
        .catch((error) => {
            reject(false)
        })
});

//Sample Create files
let dbcreate = {
    "A": {
        name: 'VISHAL'
    },
    "B": {
        name: 'DAN BROWN'
    },
    "C": {
        name: 'Dhoni'
    }
}
let dbread = ['A', 'B', 'G']
let dbdelete = ['B']


Promisenew.then(async (res) => {


    for (let each in dbcreate) {
        db.create(each, dbcreate[each]).then((res) => {}).catch((error) => {})
    }
    for (let each in dbread) {
        db.read(dbread[each]).then((res) => {}).catch((error) => {})
    }
    for (let each in dbdelete) {
        db.delete(dbdelete[each]).then((res) => {}).catch((error) => {})
    }
  
})
.catch((error)=>{})
