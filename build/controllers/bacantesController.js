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
exports.bacantesC = void 0;
const bacantesModels_1 = require("../models/bacantesModels");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class BacantesController {
    constructor() {
    }
    keySecrect(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.keySecrect = "secretkeyBruster123";
                next();
            }
            catch (e) {
                //console.log(e)
                return res.status(401).send('Unauhtorized Request');
            }
        });
    }
    getBacantes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield bacantesModels_1.bacantesModels.select();
                console.log(result);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ "mensaje": "Error no se puede consultar las bacantes" });
            }
        });
    }
    postBacantes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const result = yield bacantesModels_1.bacantesModels.insert(req.body);
            console.log(result);
            if (result) {
                res.status(201).json({ "mensaje": "Los datos se registro" });
            }
            else {
                res.status(500).json({ "mensaje": "Error al registrar el usuario" });
            }
        });
    }
    verificarToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { keySecrect } = req.body;
                if (!req.headers.authorization) {
                    return res.status(401).send('Unauhtorized Request');
                }
                let token = req.headers.authorization.split(' ')[1];
                if (token === 'null') {
                    return res.status(401).send('Unauhtorized Request');
                }
                const payload = yield jsonwebtoken_1.default.verify(token, keySecrect);
                if (!payload) {
                    return res.status(401).send('Unauhtorized Request');
                }
                console.log("token desifrado:");
                console.log(payload);
                req.body.userId = payload.id;
                console.log("id del usuario: " + req.body.userId);
                next();
            }
            catch (e) {
                //console.log(e)
                return res.status(401).send('Unauhtorized Request');
            }
        });
    }
}
exports.bacantesC = new BacantesController();
