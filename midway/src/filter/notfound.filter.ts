import { Catch, httpError, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Catch(httpError.NotFoundError)
export class NotFoundFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    console.error(err, '服务异常报错');
    // 404 错误会到这里
    // ctx.redirect('/404.html');
    ctx.status = 500;
    ctx.body = {
      code: 10100,
      mesasage: err + '服务异常报错',
    };
  }
}
