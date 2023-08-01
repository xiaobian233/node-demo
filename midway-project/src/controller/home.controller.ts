import {
  Controller,
  Get,
  Post,
  Query,
  Inject,
  Headers,
  Files,
  Fields,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
const fs = require('fs');
@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }

  @Post('/update')
  async page(): Promise<any> {
    return 'this is post update';
  }

  @Get('/delete')
  async delete(
    @Query() body,
    @Headers('cache-control') cacheSetting2
  ): Promise<String> {
    this.ctx.cookies.set('foo', 'bar', { encrypt: true });
    this.ctx.session.userId = 999888777;
    const cacheSetting = this.ctx.get('cache-control');
    console.error(JSON.stringify(body), body.id, cacheSetting, cacheSetting2);
    return 'this is get Delete';
  }

  @Post('/api/upload')
  async addFile(@Files() Files, @Fields() Fields) {
    console.error(Files, Fields, this.ctx.files);
    let [item] = Files;
    return {
      Files,
      Fields,
      data: fs.createReadStream(item.data),
      // ctxfiles: this.ctx.files,
    };
  }
}
