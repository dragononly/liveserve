import { Service } from 'typedi'
import { zhibolist } from '../../../configs/db/schema/live/zhibolist'
import { message } from '../../../configs/db/schema/live/message'
import { skyuser } from '../../../configs/db/schema/live/skyuser'
import { livegroup } from '../../../configs/db/schema/live/livegroup'
import { zhibolist_longtime } from '../../../configs/db/schema/live/zhibolist_longtime'

import { PrismaClient } from '@prisma/client'
import { zhibolist_longtimeback } from 'configs/db/schema/live/zhibolist_longtimeback'
// \import mongoose from 'configs/db/mongo'
// import { Md5 } from 'ts-md5'
// import { markAsUntransferable } from 'worker_threads'
const prisma = new PrismaClient()


// let time: any
// const deliketime = async () => {
//   await zhibolist.updateMany({}, { '$pop': { 'like': -1 } })


// }
// clearInterval(time)
// time = setInterval(deliketime, 1000)



@Service()
export class LiveService {
  static onlinePeople //查询直播状态
    (arg0: string) {
      throw new Error('Method not implemented.')
  }

  async create(params: any) {

    livegroup.find({})

  }


  //添加直播视频
  async addvideourl(data): Promise<any> {
    const cab = zhibolist.updateOne({ _id: data.id }, { url: data.url });
    return cab;
  }


  //知学云的接口都在这
  //知学云添加直播到数据库
  async zhixueyun_addlive(data: { name: any; starttime: any; endtime: any }): Promise<any> {
    const newval = {
      name: data.name,
      starttime: [data.starttime, data.endtime],
    };

    const createdCat = new zhibolist(newval);
    const cab:any = await createdCat.save();
    if (cab) {
      const re = { status: "ok", zhiboid: cab._id,name:cab.name}
      return re;
    }
  }

  //查询直播状态
  async zhixueyun_getstatus(id: string): Promise<any> {
    const cab:any= await zhibolist.find({_id:id}, { status: 1 ,videolongtime:1,realStartTime:1,realEndTime:1});
    let machining={
      _id:cab[0]._id,
      status:cab[0].status,
      videolongtime:cab[0].realEndTime-cab[0].realStartTime,
      realStartTime:cab[0].realStartTime,
      realEndTime:cab[0].realEndTime

    }
    return machining;
  }

  //查询记录
  async zhixueyun_getlongtime(id: string): Promise<any> {
    const cab = await zhibolist_longtime.find({zhiboid:id});
    return cab;
  }
  //查询记录
  async zhixueyun_getlongtimeback(id: string): Promise<any> {
    const cab = await zhibolist_longtimeback.find({zhiboid:id});
    return cab;
  }
   //获取回看记录
   async zhixueyun_videoback(id: string): Promise<any> {
    const cab = await zhibolist.find({_id:id},{backurl:1});
    return cab;
  }

  //查询直播列表groupname
  async zhixueyun_zhibolist(): Promise<any> {
    const cab = await zhibolist.find({}, { name: 1,lookback:1 });
    return cab;
  }

  //修改直播
  async zhixueyun_changlive(id: string, data: any): Promise<any> {
    try {
      const cab = await zhibolist.updateOne({ _id: id }, { 'name': data.name, starttime: [data.starttime, data.endtime] })
    return cab
    } catch  {
      return false
      
    }
    
  }
  //删除直播
  async zhixueyun_dezhibo(id:string): Promise<any> {
    try {
      const cab = await zhibolist.deleteOne({ _id: id });
      return cab;
    } catch  {
      return false
    }
  }
  


  //获取直播视频地址
  async zhixueyun_getvideo(data): Promise<any> {

  }

//  //在线人数
//  async onlinePeople(id: string): Promise<any> {
//   const cab= await zhibolist.find({ _id: id})
//   return cab

// }


  //添加用户点赞
  async addlike(data): Promise<any> {
    let thedata = {
      name: data.name,
    }
    const cab = await zhibolist.findByIdAndUpdate({ _id: data.id }, { $push: { like: thedata } });


    return cab;
  }
  //添加用户点赞消费
  async delike(data): Promise<any> {
    //1先去查询第一个
    const cab:any = await zhibolist.findById({ _id: data.id }, { like: 1 })
    return cab.like[0];
    //2.删除数组中的第一个,每2秒删除数组中的第一个元素
  }


  //获取直播视频
  async gainvideourl(data): Promise<any> {
    const cab = zhibolist.findById({ _id: data.id });
    return cab;
  }

  //遍历组信息
  async livegroup(data): Promise<any> {
    const cab = livegroup.findOne({ groupname: data.groupname });
    return cab;
  }

  //获取直播地址
  // async getliveurl(data): Promise<any> {
  //   const cab = this.tuiliuurlModel.findById({
  //     _id: '610912603341b60fe7a1054f',
  //   });
  //   return cab;
  // }

  // //修改直播地址
  // async changliveurl(data): Promise<any> {
  //   const cab = this.tuiliuurlModel.updateOne(
  //     { _id: '610912603341b60fe7a1054f' },
  //     { url: data.url },
  //   );
  //   return cab;
  // }

  //提交消息到数据库
  async message(data): Promise<any> {
    const createdCat = new message(data);
    const cab = await createdCat.save();
    return cab;
  }
  //拉取聊天消息倍robot代替
  // async getmessage(data): Promise<any> {
  //   //这是管理员拉取消息，应当返回所有
  //   let cab: any;
  //   if (data.type) {
  //     cab = await message.find({ zhiboid: data.zhiboid });
  //   } else {
  //     //只返回type=1的用户消息
  //     cab = await message.find({ type: '1', zhiboid: data.zhiboid });
  //   }

  //   return cab;
  // }

  // //清除数据库的离职和作废
  // async cleanleave(): Promise<any> {
  //   const cab1 = await skyuser.deleteMany({ name: /(离)/i });
  //   const cab2 = await skyuser.deleteMany({ department: /[作废]/i });
  //   const cab3 = await skyuser.deleteMany({ departmentchild: /[作废]/i });
  //   const ca = { cab1: cab1, cab2: cab2, cab3: cab3 };
  //   return ca;
  // }
  //导出当前直播的签到记录
  async findallsignusertime(data): Promise<any> {
    const cab = await zhibolist.findById({ _id: data.zhiboid });
    return cab;
  }

  //保存签到时间
  async savesign(data): Promise<any> {
    const cab = await zhibolist.findByIdAndUpdate(
      { _id: data.zhiboid },
      { $push: { usersign: data.sign } },
    );
    return cab;
  }

  //增加签到时间
  async addsigntime(data): Promise<any> {
    const cab = await zhibolist.findByIdAndUpdate(
      { _id: data._id },
      { $addToSet: { signtime: data.time } },
    );
    return cab;
  }

  //通过id删除直播名
  async degzhibo(data): Promise<any> {
    const cab = await zhibolist.findByIdAndRemove({ _id: data._id });
    return cab;
  }

  //通过groupname去查询自己的直播名
  async searchidzhibo(data): Promise<any> {



    const cab = await zhibolist.findById({ _id: data._id });



    return cab;
  }

  //通过groupname去查询自己的直播名
  async ongroupmyzhibo(data): Promise<any> {
    const cab = await zhibolist.find({
      group: { $elemMatch: { $eq: data.groupname } },
    });

    return cab;
  }

  //通过eid去查询自己的group弃用
  // async mygroup(data): Promise<any> {
  //   const cab = await usergroup.findOne({ eid: data.eid });
  //   return cab;
  // }

  //通过eid去查询信息
  async eid(data: any): Promise<any> {
    const cab = await skyuser.findOne({ eid: data.eid });
    return cab;
  }

  //更新直播的组权限
  async updatezhibogroup(data): Promise<any> {
    const cab = await zhibolist.findByIdAndUpdate(
      { _id: data._id },
      { power: data.power },
    );
    return cab;
  }

  //更新游客的权限
  async updatezhiboguest(data): Promise<any> {
    const cab = await zhibolist.findByIdAndUpdate(
      { _id: data.id },
      { power: data.power },
    );
    return cab;
  }

  //查询直播列表
  async findzhibo(data): Promise<any> {
    const cab = await zhibolist.find();
    return cab;
  }
  //查询直播列表groupname
  async findzhibo_groupname(): Promise<any> {
    const cab = await zhibolist.find({}, { group: 1 });
    

    return cab;
  }

  //添加直播到数据库
  async addzhibo(data): Promise<any> {
    const newval = {
      name: data.name,
      starttime: data.starttime,
      group: data.group,
      power: data.power,
      signtime: data.signtime,
      url: data.url,
    };
    const createdCat = new zhibolist(newval);
    const cab = await createdCat.save();
    return cab;
  }

  //删除自定义用户组弃用
  // async degroup(data): Promise<any> {
  //   const cab = await usergroup.deleteMany({
  //     groupname: data.groupname,
  //   });
  //   return cab;
  // }
  //删除自定义用户组
  async degroup2(data): Promise<any> {
    const cab = await livegroup.deleteMany({
      _id: data._id,
    });
    return cab;
  }

  // //查询自定义用户组弃用
  // async searchgroup(): Promise<any> {
  //   const cab = await usergroup.find().distinct('groupname');
  //   return cab;
  // }

  //查询自定义用户组
  async searchgroup2(): Promise<any> {
    const cab = await livegroup.find();
    return cab;
  }

  //查询分所
  async branch(): Promise<any> {
    const cab = await skyuser.find().distinct('branch');
    return cab;
  }

  //查询部门
  async department(data): Promise<any> {
    const cab = await skyuser
      .find({ branch: data.branch })
      .distinct('department');
    return cab;
  }

  //查询子部门
  async departmentchild(data): Promise<any> {
    const cab = await skyuser
      .find({ department: data.department })
      .distinct('departmentchild');
    return cab;
  }
  //查询子部门员工
  async departmentchildname(data): Promise<any> {
    const cab = await skyuser.find({
      departmentchild: data.departmentchild,
    });
    return cab;
  }
  //查询部门员工
  async branchanddepartmentname(data): Promise<any> {
    const cab = await skyuser.find({
      branch: data.branch,
      department: data.department,
    });
    return cab;
  }

  //查询分所员工
  async branchforname(data): Promise<any> {
    const cab = await skyuser.find({ branch: data.branch });
    return cab;
  }

  //是否分组重名
  // async isgroupname(data): Promise<any> {
  //   //0组名不能重复
  //   const cab = await usergroup.find({ groupname: data.groupname });
  //   if (cab.length > 0) {
  //     return '组名重复';
  //   }
  // }

  //保存用户分组
  async savegroup2(data): Promise<any> {
    const newval = {
      groupname: data.groupname,
      branch: data.branch,
      department: data.department,
      departmentchild: data.departmentchild,
      name: data.name,

    };
    const createdCat = new livegroup(newval);
    return await createdCat.save();

  }

  // //用户组的员工保存到数据库弃用
  // async savegroup(data): Promise<any> {
  //   // {
  //   //   arrbranch: ["杭州总所","云南分所"],
  //   //   arrdepartment: [{branch: "杭州总所", department: "凯通咨询总部"}],
  //   //   arrdepartmentchild: [{branch: "杭州总所", department: "凯通咨询总部", departmentchild: "凯通咨询部"}],
  //   //   arrpeoplename: ["张三","张一","张二"]
  //   // }

  //   //1.查询分所，然后保存
  //   // for (let m = 0; m < data.arrbranch.length; m++) {
  //   //   const cab = await skyuser.find({ branch: data.arrbranch[m] });
  //   //   for (let i = 0; i < cab.length; i++) {
  //   //     const newval = {
  //   //       groupname: data.groupname,
  //   //       name: cab[i].name,
  //   //       eid: cab[i].eid,
  //   //     };
  //   //     const createdCat = new usergroup(newval);
  //   //     await createdCat.save();
  //   //   }
  //   // }
  //   //1.1通过部门和分所名查询员工，然后保存
  //   // for (let m = 0; m < data.arrdepartment.length; m++) {
  //   //   const cab = await skyuser.find({
  //   //     branch: data.arrdepartment[m].branch,
  //   //     department: data.arrdepartment[m].department,
  //   //   });
  //   //   for (let i = 0; i < cab.length; i++) {
  //   //     const newval = {
  //   //       groupname: data.groupname,
  //   //       name: cab[i].name,
  //   //       eid: cab[i].eid,
  //   //     };
  //   //     const createdCat = new usergroup(newval);
  //   //     await createdCat.save();
  //   //   }
  //   // }

  //   //1.2通过分所名,部门名,子部门名查询员工，然后保存
  //   // for (let m = 0; m < data.arrdepartmentchild.length; m++) {
  //   //   const cab = await skyuser.find({
  //   //     branch: data.arrdepartmentchild[m].branch,
  //   //     department: data.arrdepartmentchild[m].department,
  //   //     departmentchild: data.arrdepartmentchild[m].departmentchild,
  //   //   });
  //   //   for (let i = 0; i < cab.length; i++) {
  //   //     const newval = {
  //   //       groupname: data.groupname,
  //   //       name: cab[i].name,
  //   //       eid: cab[i].eid,
  //   //     };
  //   //     const createdCat = new usergroup(newval);
  //   //     await createdCat.save();
  //   //   }
  //   // }
  //   //1.3通过直接遍历名，然后保存
  //   for (let m = 0; m < data.arrpeoplename.length; m++) {
  //     const cab = await skyuser.find({
  //       branch: data.arrpeoplename[m].branch,
  //       department: data.arrpeoplename[m].department,
  //       arrdepartmentchild: data.arrpeoplename[m].arrdepartmentchild,
  //       name: data.arrpeoplename[m].name,
  //     });
  //     for (let i = 0; i < cab.length; i++) {
  //       const newval = {
  //         groupname: data.groupname,
  //         name: cab[i].name,
  //         eid: cab[i].eid,
  //       };
  //       const createdCat = new usergroup(newval);
  //       await createdCat.save();
  //     }
  //   }
  // }

  //天健用户登陆
  async login(user: string, pwd: string): Promise<any> {
    const cab = await prisma.fs_emp_login.findFirst({
      where: {
        login_id: user,
        login_password: pwd,
      },
    })

    return cab;
  }

  //游客登陆
  // async guestlogin(user: string, pwd: string): Promise<any> {
  //   const cab = await this.otheruserok.findOne({ name: user, password: pwd });
  //   return cab;
  // }

  //游客注册
  // async guestreg(data): Promise<any> {
  //   //1.先去查询数据库中有没有这个用户
  //   const isuser = await this.otheruserok.findOne({ name: data.user });
  //   if (isuser) {
  //     return false;
  //   }
  //   // const lenght=await this.otheruserok.count()
  //   const otheruserc = new otheruser();
  //   // otheruserc.eid = lenght;
  //   otheruserc.name = data.user;
  //   otheruserc.password = md5(data.pwd);
  //   const cab = await this.otheruserok.save(otheruserc);
  //   return cab;
  // }

  //构建用户treedata
  async treedata(): Promise<any> {

    //0clearn table
   await skyuser.deleteMany()
   

    //1.遍历出所有人的名字
    let cabuser = await prisma.fs_employee.findMany({ where: { emp_style: 1 }});
    
    //2.遍历fs_department
    let cabdepartment=await prisma.fs_department.findMany()
    let departmentMap= new Map()
    let departmentMapdepart_order_no= new Map()
    //Take depart_id as the index and program map
    for (const i2 of cabdepartment) {
      departmentMap.set(i2.depart_id,i2)
      departmentMapdepart_order_no.set(i2.depart_order_no,i2)
    }

    //3.遍历fs_area 
    let cabarea=await prisma.fs_area.findMany()
    let areaMap=new Map()
    //Take area_id as the index and program map
    for (const i of cabarea) {
      areaMap.set(i.area_id,i)
    }


    //4.遍历fs_emp_login
    let cablogin=await prisma.fs_emp_login.findMany()
    let loginMap=new Map()
    //Take area_id as the index and program map
    for (const i of cablogin) {
      loginMap.set(i.eid,i)
    }

    for (const iterator of cabuser) {
      //1.1然后得到了eid，姓名，rank_id,depart_id
      //这里先申明一个对象来存储信息,这个最终存储到mongodb
      const user = {
        branch: '',
        department: '',
        departmentchild: '',
        name: '',
        login_id:'',
        login_password:'',
        eid: '0',
        rank_id: '0',
      };

      // {
      //   "id": 10,
      //   "eid": 100028,
      //   "user_name": "黄元喜",
      //   "depart_id": 13020395,
      //   "rank_id": 12000104
      // }
      user.eid = iterator.eid.toString();//gain eid
      user.name = iterator.user_name;//gain name
      user.rank_id = iterator.rank_id.toString();//gain rank_id
      //oa'bug remake
      if (iterator.depart_id.toString().length < 8) {
        continue;
      }
      user.departmentchild = departmentMap.get(iterator.depart_id).depart_name
      // departmentMap about like this
      // {
      //   "id": 187,
      //   "depart_id": 13020395,
      //   "depart_name": "一总部领导",
      //   "depart_order_no": "130100010301",
      //   "area_id": 13010001
      // }

      //2.1如果depart_order_no长度大于12，说明它是一个子部门
      let newdepart_order_no = departmentMap.get(iterator.depart_id).depart_order_no;
      if (newdepart_order_no.length == 12) {
        newdepart_order_no = newdepart_order_no.substr(0, 10);
      }
      const onlydepart_name=departmentMapdepart_order_no.get(newdepart_order_no)
      user.department = onlydepart_name.depart_name;
      // departmentMapdepart_order_no about like this
       //   {
      //     "id": 186,
      //     "depart_id": 13020394,
      //     "depart_name": "第一审计总部",
      //     "depart_order_no": "1301000103",
      //     "area_id": 13010001
      // }

  
      //2.2去用area_id获取area_name     
      user.branch=areaMap.get(onlydepart_name.area_id).area_name
      // areaMap like this
      //   {
      //     "id": 2,
      //     "area_id": 13010001,
      //     "area_name": "杭州总所"
      // }

      //use eid exchange login and password
      //employee table have eid,but emp_k=login do not have eid
      try {
        user.login_id=loginMap.get(iterator.eid).login_id
      } catch (error) {
        console.log('They do not have login_id'+iterator.eid);
        continue
      }
     
      user.login_password=loginMap.get(iterator.eid).login_password



      
      const createdCat = new skyuser(user);
      createdCat.save();
    }
    return 'ok';
  }


  /**
   * Type 'Prisma.SessionCreateInput' is automatically generated.
   * Whenever you modify file 'prisma/schema.prisma' and then run command:
   *   prisma generate
   *   prisma migrate dev
   * The types is automatically updated.
   *
   * About CRUD: https://www.prisma.io/docs/concepts/components/prisma-client/crud
   */
  // async create(session: Prisma.SessionCreateInput) {
  //   return prisma.session.create({
  //     data: session,
  //   })
  // }
}
