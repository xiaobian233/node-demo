import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { UserService } from '../service/user.service';

@Controller('/home')
export class Home {
  @Inject()
  ctx;
  @Inject()
  userService: UserService;

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }

  @Post('/login')
  async login(@Body() body) {
    return body
    // const r = await this.userService.login(body);
    // console.error(body, 'rrrrrr');
  }

  @Get('/get')
  async get(){
    return await this.userService.select()
  }
}
