"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.general = void 0;
const crypto_1 = __importDefault(require("crypto"));
const crud_1 = require("../models/crud");
class Generals {
    generaraID(tabla, id) {
        return __awaiter(this, void 0, void 0, function* () {
            crud_1.crud.init(tabla, id);
            let nueva = false;
            let newID;
            do {
                newID = crypto_1.default.randomBytes(15).toString('hex');
                let result = yield crud_1.crud.select(newID);
                if (result.lenght == 0) {
                    nueva = true;
                }
            } while (nueva);
            return newID;
        });
    }
}
exports.general = new Generals();
