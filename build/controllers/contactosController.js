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
exports.contactosC = void 0;
const contactosModels_1 = require("../models/contactosModels");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class ContactosController {
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
    getContactos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            try {
                const result = yield contactosModels_1.contactosModels.select(undefined, parseInt(userId));
                console.log(result);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ "mensaje": "Error no se pueden consultar los contactos" });
            }
        });
    }
    getContacto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield contactosModels_1.contactosModels.select(id);
                console.log(result);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ "mensaje": "Error no se puede consultar el contacto" });
            }
        });
    }
    postContactos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            delete req.body.name;
            delete req.body.keySecrect;
            req.body.usuario = parseInt(req.body.userId);
            delete req.body.userId;
            const result = yield contactosModels_1.contactosModels.insert(req.body);
            console.log(result);
            if (result) {
                res.status(201).json({ "mensaje": "Los datos se registro" });
            }
            else {
                res.status(500).json({ "mensaje": "Error al registrar el contacto" });
            }
        });
    }
    deleteContactos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield contactosModels_1.contactosModels.delete(parseInt(id));
            console.log(result);
            if (result) {
                res.status(201).json({ "mensaje": "El contacto se elimino" });
            }
            else {
                res.status(500).json({ "mensaje": "Error al eliminar el contacto" });
            }
        });
    }
    putContactos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            const result = yield contactosModels_1.contactosModels.update(parseInt(id), req.body);
            console.log(result);
            if (result) {
                res.status(201).json({ "mensaje": "El contacto se actualizo" });
            }
            else {
                res.status(500).json({ "mensaje": "Error al actualizar el contacto" });
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
exports.contactosC = new ContactosController();
