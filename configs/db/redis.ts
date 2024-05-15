import Redis from "ioredis";
import { zhibolist_longtime } from "./schema/live/zhibolist_longtime";
// const redis = new Redis({url:'redis://default:pp888888@61.153.186.29:6379'});
const redis=new Redis({
    port: 6379, // Redis port
    host: "172.18.0.128", // Redis host
    username: "default", // needs Redis >= 6
    password: "pp888888",
    db: 0, // Defaults to 0
  });


export default redis
