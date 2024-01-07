"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApiUrl = void 0;
const loggerService_1 = __importDefault(require("../services/loggerService"));
const buildApiUrl = (base, params) => {
    let url = new URL(base);
    Object.keys(params).forEach(key => {
        if (params[key]) {
            url.searchParams.append(key, params[key]);
        }
    });
    const finalUrl = url.toString();
    loggerService_1.default.info(`Built URL: ${finalUrl}`);
    return finalUrl;
};
exports.buildApiUrl = buildApiUrl;
