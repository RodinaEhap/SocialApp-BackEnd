import { Model } from "mongoose";
export class DBRepository<T> {
  constructor(protected model: Model<T>) {}
  async create(data: any) {
    return await this.model.create(data);
  }
  async findOne(filter: any, options?: any) {
    return await this.model.findOne(filter, null, options);
  }
  async findById(id: string) {
    return await this.model.findById(id);
  }
  async findOneAndUpdate(filter: any, update: any) {
    return await this.model.findOneAndUpdate(filter, update, { returnDocument: "after" });
  }
  async findByIdAndUpdate(id: string, update: any) {
    return await this.model.findByIdAndUpdate(id, update, { returnDocument: "after" });
  }
  async softDelete(filter: any) {
    return await this.model.findOneAndUpdate(
      filter,
      { isDeleted: true, deletedAt: new Date() },
      { returnDocument: "after" },
    );
  }
  async forceDelete(filter: any) {
    return await this.model.findOneAndDelete(filter);
  }
}
