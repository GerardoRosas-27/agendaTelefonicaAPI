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
exports.usuariosC = void 0;
const usuariosModels_1 = require("../models/usuariosModels");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UsuariosController {
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
    perfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            console.log(userId);
            const result = yield usuariosModels_1.usuariosModels.select(userId, undefined);
            console.log(result);
            if (result.length > 0) {
                result[0].contra = "";
                res.status(200).json(result);
            }
            else {
                res.status(401).json({ mensaje: "El usuario no existe" });
            }
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { keySecrect, contra } = req.body;
            const contraEncriptada = yield bcrypt_1.default.hashSync(contra, 10);
            req.body.contra = contraEncriptada;
            console.log(req.body.contra);
            delete req.body.keySecrect;
            const result = yield usuariosModels_1.usuariosModels.insert(req.body);
            if (result) {
                const token = yield jsonwebtoken_1.default.sign({ id: result }, keySecrect);
                res.status(200).json({ "mensaje": "usuario registrado", token });
            }
            else {
                res.status(401).json({ "mensaje": "Error al registrar el usuario" });
            }
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, contra, keySecrect } = req.body;
            let verificada = false;
            const result = yield usuariosModels_1.usuariosModels.select(undefined, correo);
            console.log(result);
            if (result.length > 0) {
                verificada = bcrypt_1.default.compareSync(contra, result[0].contra);
                if (verificada) {
                    const token = jsonwebtoken_1.default.sign({ id: result[0].id }, keySecrect);
                    res.status(200).json({ token });
                }
                else {
                    res.status(401).json({ mensaje: "Contraseña incorrecta" });
                }
            }
            else {
                res.status(401).json({ mensaje: "El correo no existe" });
            }
        });
    }
    getUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield usuariosModels_1.usuariosModels.select(undefined, undefined);
                console.log(result);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ "mensaje": "Error no se puede consultar los usuarios" });
            }
        });
    }
    getUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const result = yield usuariosModels_1.usuariosModels.select(id, undefined);
                console.log(result);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ "mensaje": "Error no se puede consultar el usuario" });
            }
        });
    }
    postUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield usuariosModels_1.usuariosModels.insert(req.body);
            console.log(result);
            if (result) {
                res.status(201).json({ "mensaje": "El usuario se registro" });
            }
            else {
                res.status(500).json({ "mensaje": "Error al registrar el usuario" });
            }
        });
    }
    putUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield usuariosModels_1.usuariosModels.update(parseInt(id), req.body);
            console.log(result);
            if (result) {
                res.status(201).json({ "mensaje": "El usuario se actualizo" });
            }
            else {
                res.status(500).json({ "mensaje": "Error al actualizar el usuario" });
            }
        });
    }
    deleteUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield usuariosModels_1.usuariosModels.delete(parseInt(id));
            console.log(result);
            if (result) {
                res.status(201).json({ "mensaje": "El usuario se elimino" });
            }
            else {
                res.status(500).json({ "mensaje": "Error al eliminar el usuario" });
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
    permisoAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                if (userId) {
                    const result = yield usuariosModels_1.usuariosModels.select(userId, undefined);
                    if (result.length > 0) {
                        if (parseInt(result[0].rol) === 1) {
                            next();
                        }
                        else {
                            return res.status(401).send('Unauhtorized Request');
                        }
                    }
                    else {
                        return res.status(401).send('Unauhtorized Request');
                    }
                }
                else {
                    return res.status(401).send('Unauhtorized Request');
                }
            }
            catch (e) {
                //console.log(e)
                return res.status(401).send('Unauhtorized Request');
            }
        });
    }
    permisoPerfil(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                if (parseInt(userId) == parseInt(req.params.id)) {
                    next();
                }
                else {
                    return res.status(401).send('Unauhtorized Request');
                }
            }
            catch (e) {
                //console.log(e)
                return res.status(401).send('Unauhtorized Request');
            }
        });
    }
}
exports.usuariosC = new UsuariosController();
