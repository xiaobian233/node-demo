import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UserMsgData } from '../entity/userMsgData.entity';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  @InjectEntityModel(UserMsgData)
  userMsgData: Repository<UserMsgData>;

  async login(body) {
    let user = new User();
    user.name = 'user.name';
    user.description = 'user.description';
    user.filename = 'user.filename';
    user.views = 1;
    user.isPublished = true;

    let userMsgData = new UserMsgData();
    userMsgData.height = 640;
    userMsgData.width = 480;
    userMsgData.compressed = true;
    userMsgData.comment = 'cybershoot';
    userMsgData.orientation = 'portrait';

    user.metadata = userMsgData;

    const photoResult = await this.save(user);
    return {
      photoResult,
    };
  }

  async select() {
    return await this.userModel
      .createQueryBuilder('photo')
      .innerJoinAndSelect('photo.metadata', 'metadata')
      .getMany();
  }

  // 保存数据
  async save(body) {
    return await this.userModel.save(body);
  }
  // 查询全部
  async findAll() {
    return await this.userModel.find({});
  }
  // 查询单个
  async find(body) {
    return await this.userModel.findOne({
      where: body,
    });
  }
  // 删除数据
  async delete(id) {
    return await this.userModel.delete(id);
  }
  // 删除数据
  async remove(body) {
    return await this.userModel.remove(body);
  }
  // 软删除数据
  async softDelete(id) {
    return await this.userModel.softDelete(id);
  }
  // 恢复软数据
  async restore(id) {
    return await this.userModel.restore(1);
  }
}
