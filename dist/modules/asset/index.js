"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.assetController = void 0;
var asset_controller_1 = require("./asset.controller");
Object.defineProperty(exports, "assetController", { enumerable: true, get: function () { return __importDefault(asset_controller_1).default; } });
var asset_router_1 = require("./asset.router");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(asset_router_1).default; } });
