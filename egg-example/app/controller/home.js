'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = {
      title:'hellow egg',
      body:'CNMD'
    }
  }
}

module.exports = HomeController;
