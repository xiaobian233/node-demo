import { ContentType, Controller, Get, Redirect } from '@midwayjs/core';

@Controller('/demo')
export class DemoController {
  @Get('/login_check')
  async check() {
    return 'login_check';
  }

  @Get('/login')
  @Redirect('/login_check')
  async login() {
    return 'login';
  }

  @Get('/login_another')
  @Redirect('/login_check', 302)
  async loginAnother() {
    return 'login_another';
  }

  
  @Get('/html')
  @ContentType('html')
  async login2() {
    return '<body>hello world</body>';
  }
}
