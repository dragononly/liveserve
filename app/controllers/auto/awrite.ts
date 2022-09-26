import fs from 'fs-extra';
import {
    JsonController,
    Get,
    Param
} from 'routing-controllers'
import { Service } from 'typedi'
//Hello my friend，welcome.
//Master 
//1.How many cats?
//1.1Traverse the first level directory or file
let filenamelist: any = []
const dirback = fs.readdirSync('./configs/db/schema')
for (const i of dirback) {
    if (i.includes('.')) {
        filenamelist.push(i.split('.')[0])
    } else {
        const dirback2 = fs.readdirSync('./configs/db/schema/' + i)
        for (const i2 of dirback2) {
            filenamelist.push(i + '/' + i2.split('.')[0])
        }
    }
}



//2.write file
const awritefun = () => {
    fs.writeFileSync('./app/controllers/auto/auto.controller.ts', lastmodel)
}
@JsonController()
@Service()
export class AwriteController {
    @Get('awrite/:id')
    async awriteget(@Param('id') id: number) {
        if (id == 888888) {
            awritefun()
        }
        return '自动书写代码完成'
    }
}

//3.File content
const model0: string =
    `import {
    Post,
    JsonController,
    QueryParams,
    Get,
    Put,
    Param,
    Body,
    Delete
} from 'routing-controllers'
import { Service } from 'typedi'`

let model1: string = ""
const model2: string =
    `
     @JsonController()
     @Service()
     export class AutoController {`
let model3: string = ""

for (const i of filenamelist) {
    let mini = i.split('/')[1]
    model1 += `
import { ${mini} } from '../../../configs/db/schema/${i}'`
    model3 += `
        //Get content
        @Get('${mini}')
        async ${mini}get(@QueryParams() data: any) {
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
                        cab = await ${mini}.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    }
                } else {
                    obj2 = obj['back']
                    try {
                        cab = await ${mini}.find(obj, obj2, { limit: parseInt(obj['limit']) })
                    }catch (error){
                        return ""
                    } 
                }
            }
            else if (keyword.includes('limit')) {
                try {
                    cab = await ${mini}.find(obj, null, { limit: parseInt(obj['limit']) })
                }catch (error){
                    return ""
                }
            }
            else {
                try {
                    cab = await ${mini}.find(obj)
                }catch (error){
                    return ""
                }
            }
            return { data: cab };
        }
        //Post content
        @Post('${mini}')
        async ${mini}post(@Body() data: any) {
            let needsave = new ${mini}(data)
            try {
                let cab = await needsave.save()
                return { data: cab };
            }catch{
                return { data: false };
            }
            
            
        }
        //Put content
        @Put('${mini}/:id')
        async ${mini}put(@Param('id') id: string, @Body() data: any) {
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
                cab = await ${mini}.updateOne({ _id: id }, { '$inc': obj2 })
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
			            cab = await ${mini}.updateOne({ _id: id }, { '$pull': obj2 })
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
			            cab = await ${mini}.updateOne({ _id: id }, { '$push': obj2 })
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
			            cab = await ${mini}.updateOne({ _id: id }, { '$pop': obj2 })
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
			            cab = await ${mini}.updateOne({ _id: id }, { '$addToSet': obj2 })
			}
			else {
                cab = await ${mini}.updateOne({ _id: id }, data)
            }
            return { data: cab };
        }
        //Delete content
        @Delete('${mini}/:id')
        async ${mini}remove(@Param('id') id: string) {
            let cab = await ${mini}.deleteOne({ _id: id })
            return { data: cab };
        }`
}

let lastmodel: string = model0 + model1 + model2 + model3 + "\n}"








