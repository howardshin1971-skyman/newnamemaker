// 내 컴퓨터에서 미리 보기:  node dev-server.js  →  http://localhost:3000
const http=require('http'),fs=require('fs'),path=require('path');
const T={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.txt':'text/plain; charset=utf-8'};
http.createServer(async(req,res)=>{
  const p=decodeURIComponent(new URL(req.url,'http://x').pathname);
  if(p.startsWith('/api/')){const name=p.slice(5).replace(/[^a-z]/g,'');const f=path.join(__dirname,'api',name+'.js');
    if(!name||!fs.existsSync(f)){res.statusCode=404;return res.end('not found')}
    try{await require(f)(req,res)}catch(e){console.error(e);res.statusCode=500;res.end('error')}return}
  let f=path.join(__dirname,'public',p==='/'?'index.html':p);
  if(!path.extname(f)&&fs.existsSync(f+'.html'))f+='.html';
  if(!f.startsWith(path.join(__dirname,'public'))||!fs.existsSync(f)){res.statusCode=404;return res.end('not found')}
  res.setHeader('Content-Type',T[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(res);
}).listen(process.env.PORT||3000,()=>console.log('http://localhost:'+(process.env.PORT||3000)));
