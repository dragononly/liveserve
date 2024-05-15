import {
    BadRequestError,
    Post,
    JsonController,
    BodyParam,
    Get,
    Ctx,
    Req,
    QueryParams,
    Param,
    Body,
    Redirect,
    Res,
    Put,
    Delete,
    HeaderParam
} from 'routing-controllers'
import Request from "koa"
import { LiveService } from '../../services'
import { decService } from '../../services/tools/dec.service'
import { Service } from 'typedi'
import { Md5 } from 'ts-md5/dist/md5';
import * as jwt from 'jsonwebtoken';


@JsonController()
@Service()
export class OpenapiController {
    constructor(private catsService: LiveService, private decService: decService) { }
   
    @Post('openapi/accesstoken')
    async zxy_accesstoken(@Body() data: any ) {
        const secret = process.env.KEY;
        if(data.appid=="tj73325e554f56eb05" && data.appkey=="f778ae2021e0f8e98e5ac76fe00e28b0"){
            const payload = {zhiboid:data.zhiboid, eid:data.eid};
            const token = jwt.sign(payload, secret, { expiresIn:  '12h' });
            return { data: token };
        }else{
            return 'appid或者key错误'
        }
    }

    @Get('openapi/test')
    async test( ) {


       const AWS = require('aws-sdk');
       const sts = new AWS.STS({
            accessKeyId: '111111111',
            secretAccessKey: '111111111',
            endpoint: 'https://wx.moono.vip:8999',
            s3ForcePathStyle: true,
            signatureVersion: 'v4',
            region: 'us-east-1',
        });

        let str1 = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "s3:*"
                ],
                "Resource": [
                    "arn:aws:s3:::*"
                ]
            }
        ]
        }

      
        

        function getFederationToken(){
           
        return new Promise((resolve, reject) => {
            var params = {
            Policy:JSON.stringify(str1), //"{\"Version\":\"2012-10-17\",\"Statement\":[{\"Sid\":\"Stmt1\",\"Effect\":\"Allow\",\"Action\":\"s3:ListAllMyBuckets\",\"Resource\":\"*\"}]}",
            Name: "test"  //假定角色会话的标识符。 userid
            };
            sts.getFederationToken(params, function (err, data) {
            if (err){
                console.log(err, err.stack); // an error occurred
                return reject(err);
            } 
            else{
              
                return resolve(data.Credentials);
            }
            });
        })
        }

       
        const credentials:any = await getFederationToken();
        // let s3 = new AWS.S3({ accessKeyId: credentials.AccessKeyId, secretAccessKey: credentials.SecretAccessKey, sessionToken: credentials.SessionToken, region:'cn-northwest-1'});
        // console.log(credentials);
        // let getParams = {
        //     Bucket: "mynumber1", 
        //     Key: 'kedaya1.jfif'
        // };
        // s3.getObject(getParams, function(err, data) {
        //     if (err){
        //         console.error("get object error");
        //         console.error(err);
        //     }
        //     console.info('-------GET object------');
        //     console.info(data);
        // });
        

      
       
    }


    

  

}

