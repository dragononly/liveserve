import {
    BadRequestError,
    Post,
    JsonController,
    Get,
    QueryParams,
    Param,
    Body,
    Res,
    Put,
    Delete,
    HeaderParam
} from 'routing-controllers'
import got from 'got';
import { LiveService } from '../../services'
import { decService } from '../../services/tools/dec.service'
import { Service } from 'typedi'
import { Md5 } from 'ts-md5/dist/md5';
import * as jwt from 'jsonwebtoken';

const ve=(async (token:string)=>{
    try {
        const  decoded=   jwt.verify(token, process.env.KEY, {
              complete: true
            }); 
           return decoded
      } catch  {
          return false
      }
})

@JsonController()
@Service()
export class ZhixueyunLiveController {
    constructor(private catsService: LiveService, private decService: decService) { }
    //知学云的接口都在这
    //天健直播

    //创建直播
    @Post('zxylive/addlive')
    async zhixueyun_addlive(@Body() data: any ,@HeaderParam("authorization") token: string) {
        if(await ve(token)){
            const cab = await this.catsService.zhixueyun_addlive(data);
            return { data: cab };
        }else{
            return false
        }  
    }

    @Post('zxylive/tokenlogin')
    async zhixueyun_tokenlogin(@HeaderParam("authorization") token: string) {
      
        const cab:any=await ve(token)
    
        
        if(cab){
            let [eid,zhiboid]=[cab?.payload?.eid,cab?.payload?.zhiboid]
            return { data:{eid:eid,zhiboid:zhiboid} };
        }else{
            return false
        }  
  
    }

    @Get("zxylive/watch")
    async zhixueyun_watch(@Res() response: any, @QueryParams() data: any,) {
        let [eid,zhiboid,times,sign]=[data.eid,data.zhiboid,data.times,data.sign]
        let val=eid+zhiboid+times
        let mysign=Md5.hashStr(val)
        mysign=Md5.hashStr(mysign)
     
        
        if(mysign==sign){
            const secret = process.env.KEY;
            const payload = {zhiboid:data.zhiboid, eid:data.eid};
            const token = jwt.sign(payload, secret, { expiresIn:  '24h' });
          //   console.log(token);
            
            //return `http://127.0.0.1:3000/#/center?accesstoken=${token}`
            return `http://cdn.pccpa.cn/#/center?accesstoken=${token}`
            // response.redirect(`/public/zhibo/index.html#/center?urlid=${zhiboid}&id=${eid}`);
           // response.redirect(`http://127.0.0.1:3000/#/center?zhiboid=${zhiboid}&eid=${eid}`)
        }else{
            return false
        }
    }

    @Get("zxylive/backwatch")
    async zhixueyun_backwatch(@Res() response: any, @QueryParams() data: any,) {
        let [eid,zhiboid,times,sign]=[data.eid,data.zhiboid,data.times,data.sign]
        let val=eid+zhiboid+times
        let mysign=Md5.hashStr(val)
        mysign=Md5.hashStr(mysign)
        // console.log(val);
        // console.log(mysign);
        
        if(mysign==sign){
            const secret = process.env.KEY;
            const payload = {zhiboid:data.zhiboid, eid:data.eid};
            const token = jwt.sign(payload, secret, { expiresIn:  '24h' });
            // console.log(token);
            
            //return `http://127.0.0.1:3000/#/center?accesstoken=${token}`
            return `https://cdn.pccpa.cn/#/backlook?accesstoken=${token}`
            // response.redirect(`/public/zhibo/index.html#/center?urlid=${zhiboid}&id=${eid}`);
           // response.redirect(`http://127.0.0.1:3000/#/center?zhiboid=${zhiboid}&eid=${eid}`)
        }else{
            return false
        }
    }

    @Put('zxylive/changlive/:id')
    async zhixueyun_changlive(@Param('id') id: string, @Body() data: any,@HeaderParam("authorization") token: string) {
        if(await ve(token)){
            const cab = await this.catsService.zhixueyun_changlive(id, data);
            return { data: cab };
        }else{
            return false
        }
    }
    
    //change zhixueyun live type
    @Get('zxylive/changePlayType')
    async changePlayType(@QueryParams() data2: any,@HeaderParam("authorization") token: string) {
     
        let url = `https://zxy1.pccpa.cn/api/v1/tj-adapter/front/callback`
        let reqData={"id":data2.id,"operateType":data2.operateType}


        try {
            const data = await got.post(url, {
                form: reqData
            }).json();
       //     console.log(data)
            return data
            
            
        } catch (error) {
            console.log(error);
            return false;
            
        }
    
    }

    @Get('zxylive/zhibolist')
    async zhixueyun_zhibolist(@HeaderParam("authorization") token: string) {
        if(await ve(token)){
            const cab = await this.catsService.zhixueyun_zhibolist();
            return { data: cab };
        }else {
            return false
        }
    }
    //获取直播状态
    @Get('zxylive/getstatus/:id')
    async zhixueyun_getstatus(@Param('id') id: string,@HeaderParam("authorization") token: string) {

        if(await ve(token)){
            const cab = await this.catsService.zhixueyun_getstatus(id);
           
            return { data: cab };
        }else {
            return false
        }
    }
    //获取直播记录
    @Get('zxylive/getlongtime')
    async zhixueyun_getlongtime(@QueryParams() data: any,@HeaderParam("authorization") token: string) {
        if(await ve(token)){
            const cab = await this.catsService.zhixueyun_getlongtime(data?.zhiboid);
            return { data: cab };
        }else {
            return false
        }
    }

     //获取回看记录
     @Get('zxylive/lookback')
     async zhixueyun_lookback(@QueryParams() data: any,@HeaderParam("authorization") token: string) {
         if(await ve(token)){
             const cab = await this.catsService.zhixueyun_getlongtimeback(data?.zhiboid);
             return { data: cab };
         }else {
             return false
         }
     }

    //获取直播回看地址
    @Get('zxylive/videoback/:id')
    async zhixueyun_videoback(@Param('id') id: string,@HeaderParam("authorization") token: string) {
        if(await ve(token)){
            const cab = await this.catsService.zhixueyun_videoback(id);
            return { data: cab };
        }else {
            return false
        }
    }

    

    @Delete('zxylive/dezhibo/:id')
    async zhixueyun_dezhibo(@Param('id') id: string,@HeaderParam("authorization") token: string) {
        if(await ve(token)){
        const cab = await this.catsService.zhixueyun_dezhibo(id);
        return { data: cab };}else{
            return false
        }
    }

    

}


