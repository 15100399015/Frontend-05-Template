const http = require('http')
http.createServer((request, response) => {
    let body = []
    console.log(123)
    request.on('error', (err) => {
        console.error(err)
    }).on('data', (chunk) => {
        //body.push(chunk.toString())
        body.push(Buffer.from(chunk));
    }).on('end', () => {
        body = Buffer.concat(body).toString()
        console.log('body:', body)
        response.writeHead(200, {'Content-type': 'text/html'})
        response.end(`<html mm="as"><head><style>p{font-size: 14px}</style></head><body><h1>toy</h1><p>browser</p><img /></body></html>`)
    })
}).listen(8088)

console.log('server started')