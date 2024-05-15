import {
    Post,
    JsonController,
    QueryParams,
    Get,
    Put,
    Param,
    Body,
    Delete
} from 'routing-controllers'
import { Service } from 'typedi'
import { auto } from '../../../configs/db/schema/auto/auto'
import { test } from '../../../configs/db/schema/auto/test'
import { livegroup } from '../../../configs/db/schema/live/livegroup'
import { message } from '../../../configs/db/schema/live/message'
import { skyuser } from '../../../configs/db/schema/live/skyuser'
import { skyyear } from '../../../configs/db/schema/live/skyyear'
import { zhibolist } from '../../../configs/db/schema/live/zhibolist'
import { zhibolist_longtime } from '../../../configs/db/schema/live/zhibolist_longtime'
import { zhibolist_longtimeback } from '../../../configs/db/schema/live/zhibolist_longtimeback'
import { user } from '../../../configs/db/schema/user/user'
     @JsonController()
     @Service()
     export class AutoController {
        //Get content
        @Get('auto')
        async autoget(@QueryParams() data: any) {
            let obj: any = {}
            let keyword = []
            for (var prop in data) {
                obj[prop] = data[prop]
                keyword.push(prop)
            }
            let cab: any
            if (keyword.includes('back')) {
                let obj2: any = {}
                if (obj['back'].includes(',')) {
                    let arr = obj['back'].split(',')
                    for (const i of arr) {
                        obj2[i] = 1
                    }
                    try {
                        cab = await auto.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    }
                } else {
                    obj2 = obj['back']
                    try {
                        cab = await auto.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    } 
                }
            }
            else if (keyword.includes('limit')) {
                try {
                    cab = await auto.find(obj, null, { limit: parseInt(obj['limit']) })
                }catch (error){
                    return ""
                }
            }
            else {
                try {
                    cab = await auto.find(obj)
                }catch (error){
                    return ""
                }
            }
            return { data: cab };
        }
        //Post content
        @Post('auto')
        async autopost(@Body() data: any) {
            let needsave = new auto(data)
            try {
                let cab = await needsave.save()
                return { data: cab };
            }catch{
                return { data: false };
            }
            
            
        }
        //Put content
        @Put('auto/:id')
        async autoput(@Param('id') id: string, @Body() data: any) {
            let obj: any = {}
            let keyword = []
            for (var prop in data) {
                obj[prop] = data[prop]
                keyword.push(prop)
            }
            let cab: any
            if (keyword.includes('inc')) {
                let obj2: any = {}
                if (obj['inc'].includes(',')) {
                    let arr = obj['inc'].split(',')
                    for (const i of arr) {
                        const mi=i.split('$')
                        obj2[mi[0]] = mi[1]
                    }
                } else {
                    const mi=obj['inc'].split('$')
                    obj2[mi[0]] = mi[1]
                }
                cab = await auto.updateOne({ _id: id }, { '$inc': obj2 })
            } 
			else if (keyword.includes('pull')) {
			            let obj2: any = {}
			            if (obj['pull'].includes(',')) {
			                let arr = obj['pull'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['pull'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await auto.updateOne({ _id: id }, { '$pull': obj2 })
			} else if (keyword.includes('push')) {
			            let obj2: any = {}
			            if (obj['push'].includes(',')) {
			                let arr = obj['push'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['push'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await auto.updateOne({ _id: id }, { '$push': obj2 })
			}
			else if (keyword.includes('pop')) {
			            let obj2: any = {}
			            if (obj['pop'].includes(',')) {
			                let arr = obj['pop'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['pop'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await auto.updateOne({ _id: id }, { '$pop': obj2 })
			}
			else if (keyword.includes('addToSet')) {
			            let obj2: any = {}
			            if (obj['addToSet'].includes(',')) {
			                let arr = obj['addToSet'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['addToSet'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await auto.updateOne({ _id: id }, { '$addToSet': obj2 })
			}
			else {
                cab = await auto.updateOne({ _id: id }, data)
            }
            return { data: cab };
        }
        //Delete content
        @Delete('auto/:id')
        async autoremove(@Param('id') id: string) {
            let cab = await auto.deleteOne({ _id: id })
            return { data: cab };
        }
        //Get content
        @Get('test')
        async testget(@QueryParams() data: any) {
            let obj: any = {}
            let keyword = []
            for (var prop in data) {
                obj[prop] = data[prop]
                keyword.push(prop)
            }
            let cab: any
            if (keyword.includes('back')) {
                let obj2: any = {}
                if (obj['back'].includes(',')) {
                    let arr = obj['back'].split(',')
                    for (const i of arr) {
                        obj2[i] = 1
                    }
                    try {
                        cab = await test.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    }
                } else {
                    obj2 = obj['back']
                    try {
                        cab = await test.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    } 
                }
            }
            else if (keyword.includes('limit')) {
                try {
                    cab = await test.find(obj, null, { limit: parseInt(obj['limit']) })
                }catch (error){
                    return ""
                }
            }
            else {
                try {
                    cab = await test.find(obj)
                }catch (error){
                    return ""
                }
            }
            return { data: cab };
        }
        //Post content
        @Post('test')
        async testpost(@Body() data: any) {
            let needsave = new test(data)
            try {
                let cab = await needsave.save()
                return { data: cab };
            }catch{
                return { data: false };
            }
            
            
        }
        //Put content
        @Put('test/:id')
        async testput(@Param('id') id: string, @Body() data: any) {
            let obj: any = {}
            let keyword = []
            for (var prop in data) {
                obj[prop] = data[prop]
                keyword.push(prop)
            }
            let cab: any
            if (keyword.includes('inc')) {
                let obj2: any = {}
                if (obj['inc'].includes(',')) {
                    let arr = obj['inc'].split(',')
                    for (const i of arr) {
                        const mi=i.split('$')
                        obj2[mi[0]] = mi[1]
                    }
                } else {
                    const mi=obj['inc'].split('$')
                    obj2[mi[0]] = mi[1]
                }
                cab = await test.updateOne({ _id: id }, { '$inc': obj2 })
            } 
			else if (keyword.includes('pull')) {
			            let obj2: any = {}
			            if (obj['pull'].includes(',')) {
			                let arr = obj['pull'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['pull'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await test.updateOne({ _id: id }, { '$pull': obj2 })
			} else if (keyword.includes('push')) {
			            let obj2: any = {}
			            if (obj['push'].includes(',')) {
			                let arr = obj['push'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['push'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await test.updateOne({ _id: id }, { '$push': obj2 })
			}
			else if (keyword.includes('pop')) {
			            let obj2: any = {}
			            if (obj['pop'].includes(',')) {
			                let arr = obj['pop'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['pop'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await test.updateOne({ _id: id }, { '$pop': obj2 })
			}
			else if (keyword.includes('addToSet')) {
			            let obj2: any = {}
			            if (obj['addToSet'].includes(',')) {
			                let arr = obj['addToSet'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['addToSet'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await test.updateOne({ _id: id }, { '$addToSet': obj2 })
			}
			else {
                cab = await test.updateOne({ _id: id }, data)
            }
            return { data: cab };
        }
        //Delete content
        @Delete('test/:id')
        async testremove(@Param('id') id: string) {
            let cab = await test.deleteOne({ _id: id })
            return { data: cab };
        }
        //Get content
        @Get('livegroup')
        async livegroupget(@QueryParams() data: any) {
            let obj: any = {}
            let keyword = []
            for (var prop in data) {
                obj[prop] = data[prop]
                keyword.push(prop)
            }
            let cab: any
            if (keyword.includes('back')) {
                let obj2: any = {}
                if (obj['back'].includes(',')) {
                    let arr = obj['back'].split(',')
                    for (const i of arr) {
                        obj2[i] = 1
                    }
                    try {
                        cab = await livegroup.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    }
                } else {
                    obj2 = obj['back']
                    try {
                        cab = await livegroup.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    } 
                }
            }
            else if (keyword.includes('limit')) {
                try {
                    cab = await livegroup.find(obj, null, { limit: parseInt(obj['limit']) })
                }catch (error){
                    return ""
                }
            }
            else {
                try {
                    cab = await livegroup.find(obj)
                }catch (error){
                    return ""
                }
            }
            return { data: cab };
        }
        //Post content
        @Post('livegroup')
        async livegrouppost(@Body() data: any) {
            let needsave = new livegroup(data)
            try {
                let cab = await needsave.save()
                return { data: cab };
            }catch{
                return { data: false };
            }
            
            
        }
        //Put content
        @Put('livegroup/:id')
        async livegroupput(@Param('id') id: string, @Body() data: any) {
            let obj: any = {}
            let keyword = []
            for (var prop in data) {
                obj[prop] = data[prop]
                keyword.push(prop)
            }
            let cab: any
            if (keyword.includes('inc')) {
                let obj2: any = {}
                if (obj['inc'].includes(',')) {
                    let arr = obj['inc'].split(',')
                    for (const i of arr) {
                        const mi=i.split('$')
                        obj2[mi[0]] = mi[1]
                    }
                } else {
                    const mi=obj['inc'].split('$')
                    obj2[mi[0]] = mi[1]
                }
                cab = await livegroup.updateOne({ _id: id }, { '$inc': obj2 })
            } 
			else if (keyword.includes('pull')) {
			            let obj2: any = {}
			            if (obj['pull'].includes(',')) {
			                let arr = obj['pull'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['pull'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await livegroup.updateOne({ _id: id }, { '$pull': obj2 })
			} else if (keyword.includes('push')) {
			            let obj2: any = {}
			            if (obj['push'].includes(',')) {
			                let arr = obj['push'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['push'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await livegroup.updateOne({ _id: id }, { '$push': obj2 })
			}
			else if (keyword.includes('pop')) {
			            let obj2: any = {}
			            if (obj['pop'].includes(',')) {
			                let arr = obj['pop'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['pop'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await livegroup.updateOne({ _id: id }, { '$pop': obj2 })
			}
			else if (keyword.includes('addToSet')) {
			            let obj2: any = {}
			            if (obj['addToSet'].includes(',')) {
			                let arr = obj['addToSet'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['addToSet'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await livegroup.updateOne({ _id: id }, { '$addToSet': obj2 })
			}
			else {
                cab = await livegroup.updateOne({ _id: id }, data)
            }
            return { data: cab };
        }
        //Delete content
        @Delete('livegroup/:id')
        async livegroupremove(@Param('id') id: string) {
            let cab = await livegroup.deleteOne({ _id: id })
            return { data: cab };
        }
        //Get content
        @Get('message')
        async messageget(@QueryParams() data: any) {
            let obj: any = {}
            let keyword = []
            for (var prop in data) {
                obj[prop] = data[prop]
                keyword.push(prop)
            }
            let cab: any
            if (keyword.includes('back')) {
                let obj2: any = {}
                if (obj['back'].includes(',')) {
                    let arr = obj['back'].split(',')
                    for (const i of arr) {
                        obj2[i] = 1
                    }
                    try {
                        cab = await message.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    }
                } else {
                    obj2 = obj['back']
                    try {
                        cab = await message.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    } 
                }
            }
            else if (keyword.includes('limit')) {
                try {
                    cab = await message.find(obj, null, { limit: parseInt(obj['limit']) })
                }catch (error){
                    return ""
                }
            }
            else {
                try {
                    cab = await message.find(obj)
                }catch (error){
                    return ""
                }
            }
            return { data: cab };
        }
        //Post content
        @Post('message')
        async messagepost(@Body() data: any) {
            let needsave = new message(data)
            try {
                let cab = await needsave.save()
                return { data: cab };
            }catch{
                return { data: false };
            }
            
            
        }
        //Put content
        @Put('message/:id')
        async messageput(@Param('id') id: string, @Body() data: any) {
            let obj: any = {}
            let keyword = []
            for (var prop in data) {
                obj[prop] = data[prop]
                keyword.push(prop)
            }
            let cab: any
            if (keyword.includes('inc')) {
                let obj2: any = {}
                if (obj['inc'].includes(',')) {
                    let arr = obj['inc'].split(',')
                    for (const i of arr) {
                        const mi=i.split('$')
                        obj2[mi[0]] = mi[1]
                    }
                } else {
                    const mi=obj['inc'].split('$')
                    obj2[mi[0]] = mi[1]
                }
                cab = await message.updateOne({ _id: id }, { '$inc': obj2 })
            } 
			else if (keyword.includes('pull')) {
			            let obj2: any = {}
			            if (obj['pull'].includes(',')) {
			                let arr = obj['pull'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['pull'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await message.updateOne({ _id: id }, { '$pull': obj2 })
			} else if (keyword.includes('push')) {
			            let obj2: any = {}
			            if (obj['push'].includes(',')) {
			                let arr = obj['push'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['push'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await message.updateOne({ _id: id }, { '$push': obj2 })
			}
			else if (keyword.includes('pop')) {
			            let obj2: any = {}
			            if (obj['pop'].includes(',')) {
			                let arr = obj['pop'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['pop'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await message.updateOne({ _id: id }, { '$pop': obj2 })
			}
			else if (keyword.includes('addToSet')) {
			            let obj2: any = {}
			            if (obj['addToSet'].includes(',')) {
			                let arr = obj['addToSet'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['addToSet'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await message.updateOne({ _id: id }, { '$addToSet': obj2 })
			}
			else {
                cab = await message.updateOne({ _id: id }, data)
            }
            return { data: cab };
        }
        //Delete content
        @Delete('message/:id')
        async messageremove(@Param('id') id: string) {
            let cab = await message.deleteOne({ _id: id })
            return { data: cab };
        }
        //Get content
        @Get('skyuser')
        async skyuserget(@QueryParams() data: any) {
            let obj: any = {}
            let keyword = []
            for (var prop in data) {
                obj[prop] = data[prop]
                keyword.push(prop)
            }
            let cab: any
            if (keyword.includes('back')) {
                let obj2: any = {}
                if (obj['back'].includes(',')) {
                    let arr = obj['back'].split(',')
                    for (const i of arr) {
                        obj2[i] = 1
                    }
                    try {
                        cab = await skyuser.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    }
                } else {
                    obj2 = obj['back']
                    try {
                        cab = await skyuser.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    } 
                }
            }
            else if (keyword.includes('limit')) {
                try {
                    cab = await skyuser.find(obj, null, { limit: parseInt(obj['limit']) })
                }catch (error){
                    return ""
                }
            }
            else {
                try {
                    cab = await skyuser.find(obj)
                }catch (error){
                    return ""
                }
            }
            return { data: cab };
        }
        //Post content
        @Post('skyuser')
        async skyuserpost(@Body() data: any) {
            let needsave = new skyuser(data)
            try {
                let cab = await needsave.save()
                return { data: cab };
            }catch{
                return { data: false };
            }
            
            
        }
        //Put content
        @Put('skyuser/:id')
        async skyuserput(@Param('id') id: string, @Body() data: any) {
            let obj: any = {}
            let keyword = []
            for (var prop in data) {
                obj[prop] = data[prop]
                keyword.push(prop)
            }
            let cab: any
            if (keyword.includes('inc')) {
                let obj2: any = {}
                if (obj['inc'].includes(',')) {
                    let arr = obj['inc'].split(',')
                    for (const i of arr) {
                        const mi=i.split('$')
                        obj2[mi[0]] = mi[1]
                    }
                } else {
                    const mi=obj['inc'].split('$')
                    obj2[mi[0]] = mi[1]
                }
                cab = await skyuser.updateOne({ _id: id }, { '$inc': obj2 })
            } 
			else if (keyword.includes('pull')) {
			            let obj2: any = {}
			            if (obj['pull'].includes(',')) {
			                let arr = obj['pull'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['pull'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await skyuser.updateOne({ _id: id }, { '$pull': obj2 })
			} else if (keyword.includes('push')) {
			            let obj2: any = {}
			            if (obj['push'].includes(',')) {
			                let arr = obj['push'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['push'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await skyuser.updateOne({ _id: id }, { '$push': obj2 })
			}
			else if (keyword.includes('pop')) {
			            let obj2: any = {}
			            if (obj['pop'].includes(',')) {
			                let arr = obj['pop'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['pop'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await skyuser.updateOne({ _id: id }, { '$pop': obj2 })
			}
			else if (keyword.includes('addToSet')) {
			            let obj2: any = {}
			            if (obj['addToSet'].includes(',')) {
			                let arr = obj['addToSet'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['addToSet'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await skyuser.updateOne({ _id: id }, { '$addToSet': obj2 })
			}
			else {
                cab = await skyuser.updateOne({ _id: id }, data)
            }
            return { data: cab };
        }
        //Delete content
        @Delete('skyuser/:id')
        async skyuserremove(@Param('id') id: string) {
            let cab = await skyuser.deleteOne({ _id: id })
            return { data: cab };
        }
        //Get content
        @Get('skyyear')
        async skyyearget(@QueryParams() data: any) {
            let obj: any = {}
            let keyword = []
            for (var prop in data) {
                obj[prop] = data[prop]
                keyword.push(prop)
            }
            let cab: any
            if (keyword.includes('back')) {
                let obj2: any = {}
                if (obj['back'].includes(',')) {
                    let arr = obj['back'].split(',')
                    for (const i of arr) {
                        obj2[i] = 1
                    }
                    try {
                        cab = await skyyear.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    }
                } else {
                    obj2 = obj['back']
                    try {
                        cab = await skyyear.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    } 
                }
            }
            else if (keyword.includes('limit')) {
                try {
                    cab = await skyyear.find(obj, null, { limit: parseInt(obj['limit']) })
                }catch (error){
                    return ""
                }
            }
            else {
                try {
                    cab = await skyyear.find(obj)
                }catch (error){
                    return ""
                }
            }
            return { data: cab };
        }
        //Post content
        @Post('skyyear')
        async skyyearpost(@Body() data: any) {
            let needsave = new skyyear(data)
            try {
                let cab = await needsave.save()
                return { data: cab };
            }catch{
                return { data: false };
            }
            
            
        }
        //Put content
        @Put('skyyear/:id')
        async skyyearput(@Param('id') id: string, @Body() data: any) {
            let obj: any = {}
            let keyword = []
            for (var prop in data) {
                obj[prop] = data[prop]
                keyword.push(prop)
            }
            let cab: any
            if (keyword.includes('inc')) {
                let obj2: any = {}
                if (obj['inc'].includes(',')) {
                    let arr = obj['inc'].split(',')
                    for (const i of arr) {
                        const mi=i.split('$')
                        obj2[mi[0]] = mi[1]
                    }
                } else {
                    const mi=obj['inc'].split('$')
                    obj2[mi[0]] = mi[1]
                }
                cab = await skyyear.updateOne({ _id: id }, { '$inc': obj2 })
            } 
			else if (keyword.includes('pull')) {
			            let obj2: any = {}
			            if (obj['pull'].includes(',')) {
			                let arr = obj['pull'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['pull'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await skyyear.updateOne({ _id: id }, { '$pull': obj2 })
			} else if (keyword.includes('push')) {
			            let obj2: any = {}
			            if (obj['push'].includes(',')) {
			                let arr = obj['push'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['push'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await skyyear.updateOne({ _id: id }, { '$push': obj2 })
			}
			else if (keyword.includes('pop')) {
			            let obj2: any = {}
			            if (obj['pop'].includes(',')) {
			                let arr = obj['pop'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['pop'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await skyyear.updateOne({ _id: id }, { '$pop': obj2 })
			}
			else if (keyword.includes('addToSet')) {
			            let obj2: any = {}
			            if (obj['addToSet'].includes(',')) {
			                let arr = obj['addToSet'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['addToSet'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await skyyear.updateOne({ _id: id }, { '$addToSet': obj2 })
			}
			else {
                cab = await skyyear.updateOne({ _id: id }, data)
            }
            return { data: cab };
        }
        //Delete content
        @Delete('skyyear/:id')
        async skyyearremove(@Param('id') id: string) {
            let cab = await skyyear.deleteOne({ _id: id })
            return { data: cab };
        }
        //Get content
        @Get('zhibolist')
        async zhibolistget(@QueryParams() data: any) {
            let obj: any = {}
            let keyword = []
            for (var prop in data) {
                obj[prop] = data[prop]
                keyword.push(prop)
            }
            let cab: any
            if (keyword.includes('back')) {
                let obj2: any = {}
                if (obj['back'].includes(',')) {
                    let arr = obj['back'].split(',')
                    for (const i of arr) {
                        obj2[i] = 1
                    }
                    try {
                        cab = await zhibolist.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    }
                } else {
                    obj2 = obj['back']
                    try {
                        cab = await zhibolist.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    } 
                }
            }
            else if (keyword.includes('limit')) {
                try {
                    cab = await zhibolist.find(obj, null, { limit: parseInt(obj['limit']) })
                }catch (error){
                    return ""
                }
            }
            else {
                try {
                    cab = await zhibolist.find(obj)
                }catch (error){
                    return ""
                }
            }
            return { data: cab };
        }
        //Post content
        @Post('zhibolist')
        async zhibolistpost(@Body() data: any) {
            let needsave = new zhibolist(data)
            try {
                let cab = await needsave.save()
                return { data: cab };
            }catch{
                return { data: false };
            }
            
            
        }
        //Put content
        @Put('zhibolist/:id')
        async zhibolistput(@Param('id') id: string, @Body() data: any) {
            let obj: any = {}
            let keyword = []
            for (var prop in data) {
                obj[prop] = data[prop]
                keyword.push(prop)
            }
            let cab: any
            if (keyword.includes('inc')) {
                let obj2: any = {}
                if (obj['inc'].includes(',')) {
                    let arr = obj['inc'].split(',')
                    for (const i of arr) {
                        const mi=i.split('$')
                        obj2[mi[0]] = mi[1]
                    }
                } else {
                    const mi=obj['inc'].split('$')
                    obj2[mi[0]] = mi[1]
                }
                cab = await zhibolist.updateOne({ _id: id }, { '$inc': obj2 })
            } 
			else if (keyword.includes('pull')) {
			            let obj2: any = {}
			            if (obj['pull'].includes(',')) {
			                let arr = obj['pull'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['pull'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await zhibolist.updateOne({ _id: id }, { '$pull': obj2 })
			} else if (keyword.includes('push')) {
			            let obj2: any = {}
			            if (obj['push'].includes(',')) {
			                let arr = obj['push'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['push'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await zhibolist.updateOne({ _id: id }, { '$push': obj2 })
			}
			else if (keyword.includes('pop')) {
			            let obj2: any = {}
			            if (obj['pop'].includes(',')) {
			                let arr = obj['pop'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['pop'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await zhibolist.updateOne({ _id: id }, { '$pop': obj2 })
			}
			else if (keyword.includes('addToSet')) {
			            let obj2: any = {}
			            if (obj['addToSet'].includes(',')) {
			                let arr = obj['addToSet'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['addToSet'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await zhibolist.updateOne({ _id: id }, { '$addToSet': obj2 })
			}
			else {
                cab = await zhibolist.updateOne({ _id: id }, data)
            }
            return { data: cab };
        }
        //Delete content
        @Delete('zhibolist/:id')
        async zhibolistremove(@Param('id') id: string) {
            let cab = await zhibolist.deleteOne({ _id: id })
            return { data: cab };
        }
        //Get content
        @Get('zhibolist_longtime')
        async zhibolist_longtimeget(@QueryParams() data: any) {
            let obj: any = {}
            let keyword = []
            for (var prop in data) {
                obj[prop] = data[prop]
                keyword.push(prop)
            }
            let cab: any
            if (keyword.includes('back')) {
                let obj2: any = {}
                if (obj['back'].includes(',')) {
                    let arr = obj['back'].split(',')
                    for (const i of arr) {
                        obj2[i] = 1
                    }
                    try {
                        cab = await zhibolist_longtime.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    }
                } else {
                    obj2 = obj['back']
                    try {
                        cab = await zhibolist_longtime.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    } 
                }
            }
            else if (keyword.includes('limit')) {
                try {
                    cab = await zhibolist_longtime.find(obj, null, { limit: parseInt(obj['limit']) })
                }catch (error){
                    return ""
                }
            }
            else {
                try {
                    cab = await zhibolist_longtime.find(obj)
                }catch (error){
                    return ""
                }
            }
            return { data: cab };
        }
        //Post content
        @Post('zhibolist_longtime')
        async zhibolist_longtimepost(@Body() data: any) {
            let needsave = new zhibolist_longtime(data)
            try {
                let cab = await needsave.save()
                return { data: cab };
            }catch{
                return { data: false };
            }
            
            
        }
        //Put content
        @Put('zhibolist_longtime/:id')
        async zhibolist_longtimeput(@Param('id') id: string, @Body() data: any) {
            let obj: any = {}
            let keyword = []
            for (var prop in data) {
                obj[prop] = data[prop]
                keyword.push(prop)
            }
            let cab: any
            if (keyword.includes('inc')) {
                let obj2: any = {}
                if (obj['inc'].includes(',')) {
                    let arr = obj['inc'].split(',')
                    for (const i of arr) {
                        const mi=i.split('$')
                        obj2[mi[0]] = mi[1]
                    }
                } else {
                    const mi=obj['inc'].split('$')
                    obj2[mi[0]] = mi[1]
                }
                cab = await zhibolist_longtime.updateOne({ _id: id }, { '$inc': obj2 })
            } 
			else if (keyword.includes('pull')) {
			            let obj2: any = {}
			            if (obj['pull'].includes(',')) {
			                let arr = obj['pull'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['pull'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await zhibolist_longtime.updateOne({ _id: id }, { '$pull': obj2 })
			} else if (keyword.includes('push')) {
			            let obj2: any = {}
			            if (obj['push'].includes(',')) {
			                let arr = obj['push'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['push'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await zhibolist_longtime.updateOne({ _id: id }, { '$push': obj2 })
			}
			else if (keyword.includes('pop')) {
			            let obj2: any = {}
			            if (obj['pop'].includes(',')) {
			                let arr = obj['pop'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['pop'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await zhibolist_longtime.updateOne({ _id: id }, { '$pop': obj2 })
			}
			else if (keyword.includes('addToSet')) {
			            let obj2: any = {}
			            if (obj['addToSet'].includes(',')) {
			                let arr = obj['addToSet'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['addToSet'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await zhibolist_longtime.updateOne({ _id: id }, { '$addToSet': obj2 })
			}
			else {
                cab = await zhibolist_longtime.updateOne({ _id: id }, data)
            }
            return { data: cab };
        }
        //Delete content
        @Delete('zhibolist_longtime/:id')
        async zhibolist_longtimeremove(@Param('id') id: string) {
            let cab = await zhibolist_longtime.deleteOne({ _id: id })
            return { data: cab };
        }
        //Get content
        @Get('zhibolist_longtimeback')
        async zhibolist_longtimebackget(@QueryParams() data: any) {
            let obj: any = {}
            let keyword = []
            for (var prop in data) {
                obj[prop] = data[prop]
                keyword.push(prop)
            }
            let cab: any
            if (keyword.includes('back')) {
                let obj2: any = {}
                if (obj['back'].includes(',')) {
                    let arr = obj['back'].split(',')
                    for (const i of arr) {
                        obj2[i] = 1
                    }
                    try {
                        cab = await zhibolist_longtimeback.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    }
                } else {
                    obj2 = obj['back']
                    try {
                        cab = await zhibolist_longtimeback.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    } 
                }
            }
            else if (keyword.includes('limit')) {
                try {
                    cab = await zhibolist_longtimeback.find(obj, null, { limit: parseInt(obj['limit']) })
                }catch (error){
                    return ""
                }
            }
            else {
                try {
                    cab = await zhibolist_longtimeback.find(obj)
                }catch (error){
                    return ""
                }
            }
            return { data: cab };
        }
        //Post content
        @Post('zhibolist_longtimeback')
        async zhibolist_longtimebackpost(@Body() data: any) {
            let needsave = new zhibolist_longtimeback(data)
            try {
                let cab = await needsave.save()
                return { data: cab };
            }catch{
                return { data: false };
            }
            
            
        }
        //Put content
        @Put('zhibolist_longtimeback/:id')
        async zhibolist_longtimebackput(@Param('id') id: string, @Body() data: any) {
            let obj: any = {}
            let keyword = []
            for (var prop in data) {
                obj[prop] = data[prop]
                keyword.push(prop)
            }
            let cab: any
            if (keyword.includes('inc')) {
                let obj2: any = {}
                if (obj['inc'].includes(',')) {
                    let arr = obj['inc'].split(',')
                    for (const i of arr) {
                        const mi=i.split('$')
                        obj2[mi[0]] = mi[1]
                    }
                } else {
                    const mi=obj['inc'].split('$')
                    obj2[mi[0]] = mi[1]
                }
                cab = await zhibolist_longtimeback.updateOne({ _id: id }, { '$inc': obj2 })
            } 
			else if (keyword.includes('pull')) {
			            let obj2: any = {}
			            if (obj['pull'].includes(',')) {
			                let arr = obj['pull'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['pull'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await zhibolist_longtimeback.updateOne({ _id: id }, { '$pull': obj2 })
			} else if (keyword.includes('push')) {
			            let obj2: any = {}
			            if (obj['push'].includes(',')) {
			                let arr = obj['push'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['push'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await zhibolist_longtimeback.updateOne({ _id: id }, { '$push': obj2 })
			}
			else if (keyword.includes('pop')) {
			            let obj2: any = {}
			            if (obj['pop'].includes(',')) {
			                let arr = obj['pop'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['pop'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await zhibolist_longtimeback.updateOne({ _id: id }, { '$pop': obj2 })
			}
			else if (keyword.includes('addToSet')) {
			            let obj2: any = {}
			            if (obj['addToSet'].includes(',')) {
			                let arr = obj['addToSet'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['addToSet'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await zhibolist_longtimeback.updateOne({ _id: id }, { '$addToSet': obj2 })
			}
			else {
                cab = await zhibolist_longtimeback.updateOne({ _id: id }, data)
            }
            return { data: cab };
        }
        //Delete content
        @Delete('zhibolist_longtimeback/:id')
        async zhibolist_longtimebackremove(@Param('id') id: string) {
            let cab = await zhibolist_longtimeback.deleteOne({ _id: id })
            return { data: cab };
        }
        //Get content
        @Get('user')
        async userget(@QueryParams() data: any) {
            let obj: any = {}
            let keyword = []
            for (var prop in data) {
                obj[prop] = data[prop]
                keyword.push(prop)
            }
            let cab: any
            if (keyword.includes('back')) {
                let obj2: any = {}
                if (obj['back'].includes(',')) {
                    let arr = obj['back'].split(',')
                    for (const i of arr) {
                        obj2[i] = 1
                    }
                    try {
                        cab = await user.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    }
                } else {
                    obj2 = obj['back']
                    try {
                        cab = await user.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    } 
                }
            }
            else if (keyword.includes('limit')) {
                try {
                    cab = await user.find(obj, null, { limit: parseInt(obj['limit']) })
                }catch (error){
                    return ""
                }
            }
            else {
                try {
                    cab = await user.find(obj)
                }catch (error){
                    return ""
                }
            }
            return { data: cab };
        }
        //Post content
        @Post('user')
        async userpost(@Body() data: any) {
            let needsave = new user(data)
            try {
                let cab = await needsave.save()
                return { data: cab };
            }catch{
                return { data: false };
            }
            
            
        }
        //Put content
        @Put('user/:id')
        async userput(@Param('id') id: string, @Body() data: any) {
            let obj: any = {}
            let keyword = []
            for (var prop in data) {
                obj[prop] = data[prop]
                keyword.push(prop)
            }
            let cab: any
            if (keyword.includes('inc')) {
                let obj2: any = {}
                if (obj['inc'].includes(',')) {
                    let arr = obj['inc'].split(',')
                    for (const i of arr) {
                        const mi=i.split('$')
                        obj2[mi[0]] = mi[1]
                    }
                } else {
                    const mi=obj['inc'].split('$')
                    obj2[mi[0]] = mi[1]
                }
                cab = await user.updateOne({ _id: id }, { '$inc': obj2 })
            } 
			else if (keyword.includes('pull')) {
			            let obj2: any = {}
			            if (obj['pull'].includes(',')) {
			                let arr = obj['pull'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['pull'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await user.updateOne({ _id: id }, { '$pull': obj2 })
			} else if (keyword.includes('push')) {
			            let obj2: any = {}
			            if (obj['push'].includes(',')) {
			                let arr = obj['push'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['push'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await user.updateOne({ _id: id }, { '$push': obj2 })
			}
			else if (keyword.includes('pop')) {
			            let obj2: any = {}
			            if (obj['pop'].includes(',')) {
			                let arr = obj['pop'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['pop'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await user.updateOne({ _id: id }, { '$pop': obj2 })
			}
			else if (keyword.includes('addToSet')) {
			            let obj2: any = {}
			            if (obj['addToSet'].includes(',')) {
			                let arr = obj['addToSet'].split(',')
			                for (const i of arr) {
			                    const mi = i.split('$')
			                    obj2[mi[0]] = mi[1]
			                }
			            } else {
			                const mi = obj['addToSet'].split('$')
			                obj2[mi[0]] = mi[1]
			            }
			            cab = await user.updateOne({ _id: id }, { '$addToSet': obj2 })
			}
			else {
                cab = await user.updateOne({ _id: id }, data)
            }
            return { data: cab };
        }
        //Delete content
        @Delete('user/:id')
        async userremove(@Param('id') id: string) {
            let cab = await user.deleteOne({ _id: id })
            return { data: cab };
        }
}