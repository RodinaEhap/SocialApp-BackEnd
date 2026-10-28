import { Model } from "mongoose";
export class DBRepository<T> {
  constructor(protected model: Model<T>) {}
  async create(data: any) {
    return await this.model.create(data);
  }
  async findOne(filter: any) {
    return await this.model.findOne(filter);
  }
  async findById(id: string) {
    return await this.model.findById(id);
  }
  async findOneAndUpdate(filter: any, update: any) {
    return await this.model.findOneAndUpdate(filter, update, { new: true });
  }

  async findByIdAndUpdate(id: string, update: any) {
    return await this.model.findByIdAndUpdate(id, update, { new: true });
  }

  async findOneAndDelete(filter: any) {
    return await this.model.findOneAndDelete(filter);
  }
}
