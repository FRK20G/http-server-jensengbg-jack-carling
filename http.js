const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer();

const mime = {
    html:   'text/html',
    css:    'text/css',
    svg:    'image/svg+xml',
    js:     'text/javascript',
    mp3:    'audio/mpeg'
};

server.on('request', (request, response) => {

    if (request.url === '/') {
        response.writeHead(301, { 'Location': '/index.html' });
        response.end();
    } else {
        const baseUrl = __dirname + request.url;
        const src = fs.createReadStream(baseUrl);

        const type = mime[path.extname(baseUrl).slice(1)] || 'text/plain';

        src.on('open', () => {
            response.setHeader('Content-Type', type);
            
            if (type === 'audio/mpeg') {
                const stats = fs.statSync(baseUrl);
                const fileSize = stats['size'];
                response.setHeader('Accept-Ranges', 'bytes');
                response.setHeader('Content-Length', fileSize);
            }

            src.pipe(response);
        });

        src.on('error', () => {
            response.end('Sidan kunde inte hittas');
        });
    }

});

server.listen(8000);