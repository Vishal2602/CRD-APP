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
let sample_create = {
    "1": {
        name: 'A'
    },
    "2": {
        name: ',B'
    },
    "3": {
        name: 'C'
    },
    "4": {
        name: 'D'
    },
}

//Sample Read Keys
let sample_read = ['1', '2', '3', '4', '5']

//Sample Delete keys
let sample_delete = ['1', '2', '5']

//After starting DB Doing CRD Operations
Promisenew.then(async (res) => {

    //Create operation
    for (let each in sample_create) {
        db.create(each, sample_create[each]).then((res) => {}).catch((error) => {})
    }
    //Reading after inserting
    for (let each in sample_read) {
        db.read(sample_read[each]).then((res) => {}).catch((error) => {})
    }
    //Deleting Some values
    for (let each in sample_delete) {
        db.delete(sample_delete[each]).then((res) => {}).catch((error) => {})
    }
    //Reading after deleting some Value
    for (let each in sample_read) {
        db.read(sample_read[each]).then((res) => {}).catch((error) => {})
    }

})
.catch((error)=>{})
