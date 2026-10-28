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
    async findOne(filter) {
        return await this.model.findOne(filter);
    }
    async findById(id) {
        return await this.model.findById(id);
    }
    async findOneAndUpdate(filter, update) {
        return await this.model.findOneAndUpdate(filter, update, { new: true });
    }
    async findByIdAndUpdate(id, update) {
        return await this.model.findByIdAndUpdate(id, update, { new: true });
    }
    async findOneAndDelete(filter) {
        return await this.model.findOneAndDelete(filter);
    }
}
exports.DBRepository = DBRepository;
