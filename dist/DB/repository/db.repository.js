"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBRepository = void 0;
class DBRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return await this.model.create(data);
    }
    async findOne(filter, options) {
        return await this.model.findOne(filter, null, options);
    }
    async findById(id) {
        return await this.model.findById(id);
    }
    async findOneAndUpdate(filter, update) {
        return await this.model.findOneAndUpdate(filter, update, { returnDocument: "after" });
    }
    async findByIdAndUpdate(id, update) {
        return await this.model.findByIdAndUpdate(id, update, { returnDocument: "after" });
    }
    async softDelete(filter) {
        return await this.model.findOneAndUpdate(filter, { isDeleted: true, deletedAt: new Date() }, { returnDocument: "after" });
    }
    async forceDelete(filter) {
        return await this.model.findOneAndDelete(filter);
    }
}
exports.DBRepository = DBRepository;
