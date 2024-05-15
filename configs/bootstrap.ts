import { join } from 'path'
import { print } from './utils'
import dotenv from 'dotenv'
import schedule from 'node-schedule';
import axios from 'axios';
import redis from './db/redis';
import { zhibolist_longtime } from './db/schema/live/zhibolist_longtime';
import moment from 'moment';
const isAllowWorkerSchedule = !process.env.NODE_APP_INSTANCE || process.env.NODE_APP_INSTANCE === '0';
// import { Service } from 'typedi';
// "before" will trigger before the app lift.



export const before = (): object => {
  // solve ncc path link.
  const result = dotenv.config({ path: join(__dirname, '../.env') })
  if (result.error) {
    print.danger('Environment variable not loaded: not found ".env".')
    return {}
  }
  print.log('.env loaded.')
  return result.parsed
}

//定时自动备份redis db0 库 规则longtime* 的key 到 mongbo zhibolist_longtime 表
// export const after2 = (): any => {
//   if (!isAllowWorkerSchedule) {
//     console.log('不允许开启定时器');
//     return;
//   }
// // // 定义规则
// // let rule = new schedule.RecurrenceRule();
// // //10分钟扫描一次
// // rule.minute = new schedule.Range(0, 59, 10);
// // let rule = new schedule.RecurrenceRule();
// // rule.second = [0, 10, 20, 30, 40, 50]; // 每隔 10 秒执行一次 可使用 0/10 * * * * *
//   //rule 支持设置的值有 second、minute、hour、date、dayOfWeek、month、year 等
//   // 启动任务
//   // let rule = new schedule.RecurrenceRule();
//   // //每小时的30分钟扫描一次
//   // rule.minute = 30;
//   let job = schedule.scheduleJob('0 0 */1 * * *', () => {
//     console.log('job schedule',moment().format('MMMM Do YYYY, h:mm:ss a'));
//     scan()
//   });

//   //Scan all keys
//   const scan=()=>{
//     let arr=[]
//       //Stream scanning
//       const stream = redis.scanStream({
//         // only returns keys following the pattern of `user:*`
//         match: "longtime*",
//         type: "hash",
//         // returns approximately 100 elements per call
//         count: 10,
//     });
//     //Pause after scanning a section
//     stream.on("data", (resultKeys) => {
//       // Pause the stream from scanning more keys until we've migrated the current keys.
//       stream.pause();
//         //return new arr1
//         let arr1=resultKeys.map((item: any)=>{
//             return new Promise(async (resolve, reject) => {
//                const cab:any=  await redis.hgetall(item) 
//                 //find mongo db exist
//                if(!cab.zhiboid || !cab.eid){return}
//                arr.push(cab)

             
//                resolve('res')
//              })})
      
//         Promise.all(arr1).then(() => {
//             // Resume the stream here.
//             stream.resume();
//         });
//     });
//       stream.on("end", async() => {
//         console.log("all keys have been visited");
//         //把数据存入mongodb
//         for await (const i of arr) {
//              const cabLongtime=  await zhibolist_longtime.findOne({zhiboid:i.zhiboid,eid:i.eid})
//                 if(!cabLongtime){
//                   const save = new zhibolist_longtime(i);
//                   await save.save()
//                 }else{
//                   await zhibolist_longtime.findOneAndUpdate({zhiboid:i.zhiboid,eid:i.eid},{durationTime:i.durationTime,updateTime:i.updateTime})
//                 }
//                 await wait(100)
//         }
//         console.log("redis同步到数据库完毕");
        
//         function wait(ms) {
//           return new Promise(r => setTimeout(r, ms));
//         }
//       });
//   }

 


// }




// "after" will trigger after the "container" lift.
export const after = (): any => {
  if (!isAllowWorkerSchedule) {
    console.log('不允许开启定时器');
    return;
  }
// 定义规则
let rule = new schedule.RecurrenceRule();
  rule.hour =0;
  rule.minute =0;
  rule.second =0
  //rule 支持设置的值有 second、minute、hour、date、dayOfWeek、month、year 等
  // 启动任务
  let job = schedule.scheduleJob(rule, () => {
    console.log('Every morning start');
  
    //const url=`https://cdn.pccpa.cn:9000/live/treedata`
    const url=process.env.treeUrl
    axios.post(url)
    .then(function(response) {
    console.log('同步数据库成功');
    console.log(response.data);
    });
  });


}


// import mongoose from 'mongoose';

// main().catch(err => console.log(err));
// async function main() {
//     try {
//         await mongoose.connect(process.env.MONGODB);
//         console.log('数据库连接成功');
        
//     } catch (error) {
//         console.log("数据库连接失败");
        
//     }
   

// }
// export default mongoose