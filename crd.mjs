import * as fs from 'fs'
export class dbs {
    constructor() {
        this.data = {}
        this.dbPath = ''
    }

  
    async dbinit(path) {
        return new Promise(async (resolved, rejected) => {
            if (path) {
                console.log('\n\n starting...\n\n')
            } else {
                console.log('\n\n start in default \n\n')
                path = process.cwd()
            }

            try {
                if (!fs.existsSync(path)) {
                    throw ('path does not exist \n\n')

                }

                try {
                    if (!fs.existsSync(path + '/dbs.json')) {
                        await fs.writeFile(path + '/dbs.json', JSON.stringify(this.data), function (err) {
                            if (err) {
                                console.log(err)
                                rejected(err)
                            } else {
                                console.log(`creating DB ${path+'dbs.json'}---\n\n`)
                                resolved(true)
                            }
                        })
                        this.dbPath = path + '/dbs.json'

                    } else {
                        await fs.readFile(path + '/dbs.json', 'utf8', (error, fileData) => {
                            if (error) {
                                rejected(error);
                            } else {
                                this.data = JSON.parse(fileData)
                                this.dbPath = path + 'dbs.json'
                                console.log(`DB present in ${path+'dbs.json'}\n\n`)
                                resolved(true);
                            }
                        })
                    }
                } catch (error) {
                    console.log(error)
                }

            } catch (error) {
                console.log(error)
                rejected(false)
            }
        });


    }

 
    async create(key, value) {
        return new Promise(async (resolved, rejected) => {
            const rejRea = []
            console.log(`pushing ${key} - ${JSON.stringify(value)}`)
            if (Buffer.byteLength(JSON.stringify(this.data)) / 1024 > 1024) {
                rejRea.push(`file bigger than 1GB.`)
                rejected(rejRea)
                return
            }
           
        
            if (typeof key != 'string') {
                rejRea.push('should be string')
            }
            if (key.length <= 0 || 32 < key.length) {
                rejRea.push('should have maximum of 32 chars and minimum of 1 char.')
            }
            if (Buffer.byteLength(JSON.stringify(value)) / 1024 > 16) {
                rejRea.push(`should not be greater than 16KB`);
            }
            if (key == null) {
                rejRea.push('key should not be null')
            } 
            if (Object.keys(this.data).includes(key)) {
                rejRea.push('key already exists')
            }
            if (typeof value != 'object') {
                rejRea.push('should be object')
            } else if (value == null || Object.keys(value).length === 0) {
                rejRea.push('should not be null or Empty')
            }

            if (rejRea.length) {
                console.log(rejRea)
               
                rejected(false)
                return
            } else {
                this.data[key] = value;
            
                fs.writeFileSync(this.dbPath, JSON.stringify(this.data), function (err) {
                    if (err) {
                        console.log(err)
                        rejected(err)
                    } else {
                        resolved('DONE')
                    }
                });
                
            }
            console.log('PUSHED \n\n')

        });
    }
 

    async read(key) {
        return new Promise((resolved, rejected) => {
            console.log('reading')
            console.log('key-', key)
            if (!Object.keys(this.data).includes(key)) {
                console.log('key does not exists\n')
                rejected(false)
            } else {
                console.log(this.data[key],'\n')
                resolved(this.data[key])
            }
        });
    }
  


    async delete(key) {
        console.log('deleting')
        console.log('key-', key)
        return new Promise(async (resolved, rejected) => {
            if (!Object.keys(this.data).includes(key)) {
                console.log('key does not exists \n')
                rejected(false)
            } else {
                delete this.data[key]
                const deletePromise = new Promise(async (resolve, reject) => {
                    await fs.writeFileSync(this.dbPath, JSON.stringify(this.data), function (err) {
                        if (err) {
                            console.log(err)
                            reject(err)
                            return
                        } else {
                            resolve(true)
                        }
                    })
                });
                deletePromise.then((res) => {
                        resolved(true)
                    })
                    .catch((error) => {
                        rejected(error)
                    })
                console.log('POPPED\n')
            }
        });
    }
}
