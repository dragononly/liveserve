import {
  BadRequestError,
  Post,
  JsonController,
  BodyParam,
  Get,
  Ctx,
  Body,
  Res
} from 'routing-controllers'
import { SessionsService } from '../services'
import { Service } from 'typedi'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

@JsonController()
@Service()
export class SessionsController {
  constructor(private sessionsService: SessionsService) { }
  @Get('')
  async query(@Res() response: any) {
    response.redirect('/public/zhibo/index.html');
    // response.redirect('http://www.baidu.com');


    // let cab = await user.findOne({})
    // console.log(cab);

    // await prisma.user.create({
    //   data: {
    //     name: 'Alice',
    //     email: 'alice@prisma.io',
    //     posts: {
    //       create: { title: 'Hello World' },
    //     },
    //     profile: {
    //       create: { bio: 'I like turtles' },
    //     },
    //   },
    // })

    const allUsers = await prisma.fs_emp_login.findFirst({
    })
    // console.dir(allUsers, { depth: null })

    return "22"
  }


  @Post('sessions')
  async sessions(@Body() data: any) {
  //  console.log(11111);

  }


}

//   @Post('/sessions')
//   async create(
//     @BodyParam('username') name: string,
//   ): Promise<Prisma.SessionGetPayload<any>> {
//     if (!name) {
//       throw new BadRequestError('username is required')
//     }
//     return await this.sessionsService.create({ name })
//   }
// }