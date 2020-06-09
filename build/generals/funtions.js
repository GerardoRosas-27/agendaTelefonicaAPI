"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.general = void 0;
const uuid_1 = __importDefault(require("uuid"));
class Generals {
    generaraID() {
        return uuid_1.default.v4();
    }
}
exports.general = new Generals();
