import { join } from 'path'
import { print } from './utils'
import dotenv from 'dotenv'
import schedule from 'node-schedule';
import axios from 'axios';

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
// 定义规则
let rule = new schedule.RecurrenceRule();
  rule.hour =0;
  rule.minute =0;
  rule.second =0
  //rule 支持设置的值有 second、minute、hour、date、dayOfWeek、month、year 等
  // 启动任务
  let job = schedule.scheduleJob(rule, () => {
      console.log('Every morning start');
    
      const url=`http://${process.env.domain}:${process.env.PORT}/live/treedata`
      axios.post(url)
      .then(function(response) {
      console.log(response.data);
      });
    });

}
