import {
    Post,
    JsonController,
    Body,
    QueryParams,
    Get,
    Res,
} from 'routing-controllers'

import { LiveService } from '../../services'
import { decService } from '../../services/tools/dec.service'
import { Service } from 'typedi'
import { Md5 } from 'ts-md5/dist/md5';
import { get } from 'http'
import redis from 'configs/db/redis'
var moment = require('moment');
import { zhibolist_longtime } from '../../../configs/db/schema/live/zhibolist_longtime';
@JsonController()
@Service()
export class LiveController {
    constructor(private catsService: LiveService, private decService: decService) { }

    




    //实时添加时间
    @Post('live/addtime')
    async liveaddtime(@Body() data: any) {
        let eid=data.eid
        let zhiboid=data.zhiboid
        //0 获取当前时间毫秒
        let nowTime: any = moment().format('x');
        //1先查询是否有
        const lock = await redis.exists(`lock${eid}`);
        if(lock==0){
                //2.1设置一个锁，并锁10秒钟后解开,可以不需要这个锁，加这个锁只是为了并发攻击
                //锁的时间，和下面60时间，以及前端时间关系是。60代表更大的宽容度，前端请求时间遇见锁，重新进入一次双倍检查时间，应该低于宽容度的时间
                await redis.set(`lock${eid}`,"ok",'EX',20);
                //2.2先查询是否存在
                const exist = await redis.hexists("longtime"+eid+zhiboid,'zhiboid');
                if(exist==1){
                    //2.3 if exist,find updateTime
                    const updateTime:any = await redis.hget("longtime"+eid+zhiboid,"updateTime");
                    const durationTime = await redis.hget("longtime"+eid+zhiboid,"durationTime");
                    //2.4if leave time space be less than 60000 毫秒，Can operate successfully
                    if(Math.abs(nowTime-updateTime)<60000){
                        //2.4.1 update updateTime
                        await redis.hmset("longtime"+eid+zhiboid, 'updateTime',nowTime); 
                        //2.4.2 update durationTime
                        // console.log( Number(nowTime));
                        // console.log( Number(updateTime));
                        // console.log(Math.floor((Number(nowTime) - updateTime) / 1000))
                        // console.log(parseInt(durationTime))
                        
                        
                        
                        await redis.hmset("longtime"+eid+zhiboid, 'durationTime',parseInt(durationTime) + Math.floor((Number(nowTime) - updateTime) / 1000)); 
                        return { data: parseInt(durationTime) + Math.floor((Number(nowTime) - updateTime) / 1000) };
                    }else{
                      //2.5 Just update updateTime
                      await redis.hmset("longtime"+eid+zhiboid, 'updateTime',nowTime); 
                      return { data: Number(durationTime) };
                    }
                    
                }else{
                    let zhibolist_longtime={
                        "zhiboid":data.zhiboid,
                        "eid": data.eid,
                        "fullName": data.fullName,
                        "name": data.name,
                        "userType": "0",
                        "organizationId": data.organizationId,
                        "departmentId":data.departmentId ,
                        "entryTime": nowTime,
                        "levelTime": nowTime,
                        "durationTime": "0",
                        "terminalType":data.terminalType,
                        "updateTime": nowTime,
                    }
                    await redis.hmset("longtime"+eid+zhiboid, zhibolist_longtime);
                    await redis.expire("longtime"+eid+zhiboid, 60*60*24*1); // 1 day
                    return { data: "第一次添加时间" };
                }

              
         }else{
            return { data: "锁" };
         }
    }

    //获取自己的停留时长
    @Get('get/durationtime')
    async durationtime(@QueryParams() data: any) {
        let eid=data.eid
        let zhiboid=data.zhiboid
      
        
        const durationTime:any = await redis.hget("longtime"+eid+zhiboid,"durationTime");
        // console.log(durationTime);
        return { data: durationTime };
    }


    //天健用户登陆
    @Post('live/login')
    async login(@Body() data: any) {
        //1这一步是去加密前端传过来的密码
        const cabpwd = await this.decService.encode(data.pwd);
        //2去查询账户密码是否存在于数据库中
        const login = await this.catsService.login(data.user, cabpwd);



        return { data: login };
    }



    //添加直播视频
    @Post('live/addvideourl')
    async addvideourl(@Body() data: any) {
        const cab = await this.catsService.addvideourl(data);
        return { data: cab };
    }

    //For each group infomation.
    @Post('live/livegroup')
    async livegroup(@Body() data: any) {
        const cab = await this.catsService.livegroup(data);

        return { data: cab };
    }

    //知学云的接口都在这
    //天健直播
    //创建直播
    // @Post('zhixueyun/addlive')
    // async zhixueyun_addlive(@Body() data: any) {
    //     const cab = await this.catsService.zhixueyun_addlive(data);
    //     return { data: cab };
    // }

    // @Put('zhixueyun/changlive/:id')
    // async zhixueyun_changlive(@Param('id') id: string, @Body() data: any) {
    //     const cab = await this.catsService.zhixueyun_changlive(id, data);
    //     return { data: cab };
    // }
    // @Get('zhixueyun/zhibolist')
    // async zhixueyun_zhibolist() {
    //     const cab = await this.catsService.zhixueyun_zhibolist();
    //     return { data: cab };
    // }
    // @Delete('zhixueyun/dezhibo/:id')
    // async zhixueyun_dezhibo(@Param('id') id: string) {
    //     const cab = await this.catsService.zhixueyun_dezhibo(id);
    //     return { data: cab };
    // }

    // @Get("zhixueyun/watch")
    // async zhixueyun_watch(@Res() response: any, @QueryParams() data: any) {
    //     let [eid,zhiboid,sign,times] = [data.eid,data.zhiboid,data.sign,data.times]
    //     const serversign= Md5.hashStr(Md5.hashStr(data.eid+data.zhiboid+data.eid.times))
    //     console.log(sign,serversign);

    //     if(sign==serversign){
    //         return `http://127.0.0.1:3000/#/center?zhiboid=${zhiboid}&eid=${eid}`
    //         // response.redirect(`/public/zhibo/index.html#/center?urlid=${zhiboid}&id=${eid}`);
    //         response.redirect(`http://127.0.0.1:3000/#/center?zhiboid=${zhiboid}&eid=${eid}`)
    //     }else{
    //         return false
    //     }
    // }


    //直播list只返回groupname arr
    @Post('live/findzhibo_groupname')
    async findzhibo_groupname(@Body() data: any) {
        const cab = await this.catsService.findzhibo_groupname();
        return { data: cab };
    }

    //获取直播视频
    @Post('live/gainvideourl')
    async gainvideourl(@Body() data: any) {
        const cab = await this.catsService.gainvideourl(data);
        return { data: cab };
    }

    // //修改直播地址
    // @Post('changliveurl')
    // async changliveurl(@Body() data: any) {
    //   const cab = await this.catsService.changliveurl(data);
    //   return {data:cab};
    // }
    // //获取直播地址
    // @Post('getliveurl')
    // async getliveurl(@Body() data: any) {
    //   const cab = await this.catsService.getliveurl(data);
    //   return {data:cab};
    // }

    //提交消息到数据库
    @Post('live/message')
    async message(@Body() data: any) {
        const cab = await this.catsService.message(data);
        return { data: cab };
    }

    //拉取聊天消息 被robot代替
    // @Post('live/getmessage')
    // async getmessage(@Body() data: any) {
    //     const cab = await this.catsService.getmessage(data);
    //     return { data: cab };
    // }

    // //清除数据库的离职和作废
    // @Post('live/cleanleave')
    // async cleanleave(@Body() data: any) {
    //     const cab = await this.catsService.cleanleave();
    //     return { data: cab };
    // }
    //导出当前直播的签到记录
    @Post('live/findallsignusertime')
    async findallsignusertime(@Body() data: any) {
        const cab = await this.catsService.findallsignusertime(data);
        return { data: cab };
    }

    //保存签到时间
    @Post('live/savesign')
    async savesign(@Body() data: any) {
        const cab = await this.catsService.savesign(data);
        return { data: cab };
    }

    //增加签到时间
    @Post('live/addsigntime')
    async addsigntime(@Body() data: any) {
        const cab = await this.catsService.addsigntime(data);
        return { data: cab };
    }

    //通过id删除直播名
    @Post('live/degzhibo')
    async degzhibo(@Body() data: any) {
        const cab = await this.catsService.degzhibo(data);
        return { data: cab };
    }

    //通过id去查询自己的直播名
    @Post('live/searchidzhibo')
    async searchidzhibo(@Body() data: any) {
        const cab = await this.catsService.searchidzhibo(data);
        return { data: cab };
    }

    //通过groupname去查询自己的直播名
    @Post('live/ongroupmyzhibo')
    async ongroupmyzhibo(@Body() data: any) {
        const cab = await this.catsService.ongroupmyzhibo(data);
        return { data: cab };
    }
    //通过eid去查询自己的group弃用
    // @Post('live/mygroup')
    // async mygroup(@Body() data: any) {
    //     const cab = await this.catsService.mygroup(data);
    //     return { data: cab };
    // }

    //通过eid去查询信息
    @Post('live/eid')
    async eid(@Body() data: any) {
        const cab = await this.catsService.eid(data);
        return { data: cab }
    }
    //更新直播的组权限
    @Post('live/updatezhibogroup')
    async updatezhibogroup(@Body() data: any) {
        const cab = await this.catsService.updatezhibogroup(data);
        return { data: cab };
    }

    //更新游客的权限
    @Post('live/updatezhiboguest')
    async updatezhiboguest(@Body() data: any) {
        const cab = await this.catsService.updatezhiboguest(data);
        return { data: cab };
    }

    //查询直播列表
    @Post('live/findzhibo')
    async findzhibo(@Body() data: any) {
        const cab = await this.catsService.findzhibo(data);


        return { data: cab };
    }

    //添加直播到数据库
    @Post('live/addzhibo')
    async addzhibo(@Body() data: any) {
        const cab = await this.catsService.addzhibo(data);
        return { data: cab };
    }

    //查询自定义用户组弃用
    // @Post('live/searchgroup')
    // async searchgroup(@Body() data: any) {
    //     const login = await this.catsService.searchgroup();
    //     return { data: login };
    // }
    //查询自定义用户组
    @Post('live/searchgroup2')
    async searchgroup2(@Body() data: any) {
        const login = await this.catsService.searchgroup2();
        return { data: login };
    }


    //删除分组弃用
    // @Post('live/degroup')
    // async degroup(@Body() data: any) {
    //     const login = await this.catsService.degroup(data);
    //     return { data: login };
    // }
    //删除分组
    @Post('live/degroup2')
    async degroup2(@Body() data: any) {
        const login = await this.catsService.degroup2(data);
        return { data: login };
    }

    //消息队列保存分组用户弃用
    // @Post('live/transcode')
    // async transcode(@Body() data: any) {

    //     await this.catsService.savegroup(data);
    //     const cab = await this.catsService.isgroupname(data);
    //     if (cab == '组名重复') {
    //         return { data: "组名重复" };
    //     } else {
    //         return { data: "保存成功" };
    //     }
    // }

    //保存用户分组
    @Post('live/savegroup2')
    async savegroup2(@Body() data: any) {
        let cab = await this.catsService.savegroup2(data);
        return { data: cab }
    }



    // 游客登陆
    // @Post('guestlogin')
    // async guestlogin(@Body() data: any) {
    //     //1去查询账户密码是否存在于数据库中

    //     const login = await this.catsService.guestlogin(data.user, md5(data.pwd));
    //     return login;
    // }

    // 游客用户注册
    // @Post('guestreg')
    // async guestreg(@Body() data: any) {
    //     const guestreg = await this.catsService.guestreg(data);
    //     return guestreg;
    // }

    //重构数据库和部门关系映射
    @Post('live/treedata')
    async treedata(@Body() data: any) {
        const cab = await this.catsService.treedata();
        return { data: cab };
    }

    //查询分所
    @Post('live/branch')
    async branch(@Body() data: any) {
        const guestreg = await this.catsService.branch();

        return { data: guestreg };
    }

    //查询部门
    @Post('live/department')
    async department(@Body() data: any) {
        const guestreg = await this.catsService.department(data);
        return { data: guestreg };
    }

    //查询子部门
    @Post('live/departmentchild')
    async departmentchild(@Body() data: any) {
        const guestreg = await this.catsService.departmentchild(data);
        return { data: guestreg };
    }

    //查询子部门的所有员工
    @Post('live/departmentchildname')
    async departmentchildname(@Body() data: any) {
        const guestreg = await this.catsService.departmentchildname(data);
        return { data: guestreg };
    }

    //查询部门的所有员工
    @Post('live/branchforname')
    async branchforname(@Body() data: any) {
        const guestreg = await this.catsService.branchforname(data);
        return { data: guestreg };
    }
    //查询分所的所有员工
    @Post('live/branchanddepartmentname')
    async branchanddepartmentname(@Body() data: any) {
        const guestreg = await this.catsService.branchanddepartmentname(data);
        return { data: guestreg };
    }


}


