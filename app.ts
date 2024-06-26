import { Server } from 'http'
import { print } from 'configs/utils'
import Environment from 'configs/environments'
import createServer from 'configs/application'
import * as bootstrap from 'configs/bootstrap'
import serve from "koa-static2";
const { createAdapter } = require("@socket.io/cluster-adapter");
const { setupWorker } = require("@socket.io/sticky");
import mongoose from 'mongoose';
 

// import koaJwt from 'koa-jwt'
module.exports = (async (): Promise<Server> => {
  try {
 

   
 
        try {
            await mongoose.connect(process.env.MONGODB);
            console.log('数据库连接成功');
            
        } catch (error) {
            console.log("数据库连接失败");
            
        }
       
    
    
  
    const app = await createServer()
  //路由权限控制 除了path里的路径不需要验证token 其他都要

    app.use(serve("public", __dirname + "/public"));
    // let _server = app.listen(3000);  // start
       
    // _server.close()
   
    let server = app.listen(process.env.PORT, () => {
      print.log(
        `server listening on ${process.env.PORT}, in ${Environment.identity} mode.`,
      )
    
    })

    bootstrap.after()
    // bootstrap.after2()
    const io = require('socket.io')(server,{cors:true},{
      allowRequest: (req: { headers: { origin: any } }, callback: (arg0: any, arg1: boolean) => void) => {
        const noOriginHeader = req.headers.origin === undefined;
        callback(null, noOriginHeader);
      }
    })
    //下面这两句是pm2 集群
    if(process.env.pm2Many=="true"){
      io.adapter(createAdapter());
      setupWorker(io);
    }
    
    //在线人数反馈
    let onlinePeople = 0;

    //允许多少人
    let initialQueue = 200

    
    io.on('connection',async (socket: any) => {
   
  //  const cab:any= await zhibolist.findOne({ _id:'61efa71ef99af2783a9c298c'},{onlinePeople:1})
  //  let people=cab.onlinePeople+1
   
  //  const cab2:any=await zhibolist.findByIdAndUpdate({ _id:'61efa71ef99af2783a9c298c'},{onlinePeople:people})
  onlinePeople++
  initialQueue--
  // io.emit('chat message', {msg:'people',people:cab2.onlinePeople});
   io.emit('chat message', {msg:'people',people:onlinePeople});
      socket.on('chat message', (msg:any) => {
        // console.log(msg);
        // console.log(io.eio.clientsCount);
        io.emit('chat message', {msg:msg,people:onlinePeople});
      });
      // console.log("initial transport", socket.conn.transport.name); // prints "polling"

      socket.on("disconnect", async (msg:any) => {
       // const cab:any= await zhibolist.findOne({ _id:'61efa71ef99af2783a9c298c'},{onlinePeople:1})
        // if(cab.onlinePeople>=1){
        //   let people=cab.onlinePeople-1
        //   const cab2:any=await zhibolist.findByIdAndUpdate({ _id:'61efa71ef99af2783a9c298c'},{onlinePeople:people})
        // }
        onlinePeople--
        initialQueue++
        io.emit('chat message', {msg:msg,people:onlinePeople});
          
      });

      
  })


    return
  } catch (e) {
    console.log(e)
  }
})()
