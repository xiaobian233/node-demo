// app/service/cake.js
const { Service } = require('egg')

class CakeService extends Service {
	async getAllCakes() {
		// 假设这里是从数据库获取蛋糕数据的逻辑
		const cakes = await this.app.mysql.select('cakes')
		return cakes
	}
}

module.exports = CakeService
