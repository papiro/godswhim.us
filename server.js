'use strict'

const 
  path = require('path'), fs = require('fs')
,
  root = path.join(__dirname, 'public')
,
  middlewarePath = './node_modules/awning/middleware'
,
  AwningStore = require('awning').Store
  //store = new AwningStore({ file: path.join(root, 'godswhim.db.json'), frequency: 30000 })
,
  build = require('awning').build,
  colors = require('./config/colors')
,
  dev = require('awning').dev
,
  poemsDir = path.join(root, 'poems'),
  poemsIn = path.join(poemsDir, 'raw'),
  poemsOut = path.join(poemsDir, 'web')
;

global.app = {
  root: path.resolve('public')
}

dev({
  vars: colors,
  axe: [path.resolve('public/css'), path.resolve('public/css/poems')]
})

build.axe({
  vars: colors,
  dirs: [path.resolve('public/css'), path.resolve('public/css/poems')]
})

const poemsJSON = build.text(new build.TextParser({
  dir_in: poemsIn,
  dir_out: poemsOut
})).reduce( (obj, json) => {
  obj[json.title] = json.data  
  return obj
}, {})

const server = require('awning').server({
  name: 'Godswhim.us',
  root,
  port: 6001,
  socketTimeout: 3000,
  onError (...args) {
    console.trace('Error thrown: ', ...args)
  },
  onRequest (req) {
    console.log(req.method, ' ', req.url)
  },
  bnsConfig: {
    poem: {
      data (pname) {
        return Promise.resolve(poemsJSON[pname])  
      }
    },
    poems: {
//      data () {
//        return new Promise( (resolve, reject) => {
//          fs.readdir(poemsOut, (err, files) => {
//            const filesPromiseArray = files.map( file => {
//              return new Promise( (inner_resolve, inner_reject) => {
//                fs.readFile(path.join(poemsOut, file), {encoding: 'utf8'}, (err, data) => {
//                  if (err) return inner_reject(err)
//                  inner_resolve(JSON.parse(data))
//                })
//              })
//            })
//
//            Promise.all(filesPromiseArray)
//              .then( res => {
//                resolve([].concat(res))
//              })
//              .catch( err => {
//                console.error(err)
//              })
//          })
//        })
//      }
    }
  },
  rewrite: [
    {
      regex: /\/\./,
      status: 301,
      headers: {
        location: 'https://airbnb.com',
        f: 'u'
      }
    }, 
    {
      regex: /\/\w*$/,
      to: '/index.bns'
    }
  ],
  middleware: [
    'logger',
//    'REST',
    'rewrite',
    'beans'
  ].map( middleware => require(`${middlewarePath}/${middleware}`))
})

/** Every hour: 
 * 1. log the number of current connections
 * 2. log the freemem/totalmem
 * 3. log the system activity via the load average calculation
 * 4. log the system uptime
 * 5. log the process uptime
 * 6. log the cpu usage
 * 7. log the memory usage
**/
// setInterval(() => {
//   server.getConnections( (err, count) => {
//     if (err) syslog.error(err)
//     syslog.log(`${count} connections open`)
//     syslog.info(`${os.freemem()}/${os.totalmem()} memory available`)
//     syslog.info(`${os.loadavg()}:::<< load average "should be less than number of logical CPUs in the system" (${os.cpus().length})`)
//     syslog.info(`${os.uptime()}:::<< system uptime`)
//     syslog.info(`${process.uptime()}:::<< process uptime`)
//     const cpuUsage = process.cpuUsage()
//     syslog.info(`${cpuUsage.user}:::<< user cpu usage`)
//     syslog.info(`${cpuUsage.system}:::<< system cpu usage`)
//     syslog.info(`${process.memoryUsage()}:::<< process memory usage`)
//   }) 
// }, 3600000)
