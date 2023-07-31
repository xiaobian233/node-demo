const { Controller } = require('egg');

class CakeController extends Controller {
  async index() {
    const { ctx } = this;
    // const cakes = await ctx.service.cake.getAllCakes();
    // ctx.body = cakes;
    ctx.body = "9987"
  }
}

module.exports = CakeController;