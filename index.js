'use strict';
const http = require('http');
const pug = require('pug');


const server = http.createServer((req,res) => {
    const now = new Date();
    console.info(`[${now}]Requested by ${req.connection.remoteAddress}`);
    res.writeHead(200,{
        'Content-Type': 'text/html; charset=utf-8'
    });

    switch(req.method){
        case 'GET':
            if(req.url === '/enquetes/yaki-shabu'){
                res.write(pug.renderFile('./form.pug',{
                    path:req.rel,
                    firstItem:'焼肉',
                    secondItem:'しゃぶしゃぶ'
                }));   
            }else if(req.url === '/enquetes/rice-bread'){
                res.write(pug.renderFile('./form.pug',{
                    path:req.url,
                    firstItem:'ご飯',
                    secondItem:'パン'
                }))
            }
            res.end();
            break;
        case 'POST':
            let body = '';
            req.on('data',(chunk) => {
                body = body+chunk;
            }).on('end',() =>{
                const decoded =decodeURIComponent(body);
                console.info(`[${now}] 投稿： ${decoded}`);
                res.write('<!DOCTYPE html><html lang="ja"><body><h1>' +
                decoded + 'が投稿されました</h1></body></html>');
                res.end();
            });
            break;
        default:
            break;
    }



    
}).on('error',(e) => {
    console.error(`[${new Date()}] Server Error`,e);
}).on('clientError',(e) => {
    console.error(`[${new Date()}] Client Error`,e);
});

const port = process.env.PORT || 8000;
server.listen(port , ()=>{
    console.info(`[${new Date()}] ポート${port}番でサーバーを起動しました`);
})