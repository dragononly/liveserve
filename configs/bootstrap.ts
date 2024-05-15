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