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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosC = void 0;
var usuariosModels_1 = require("../models/usuariosModels");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var UsuariosController = /** @class */ (function () {
    function UsuariosController() {
    }
    UsuariosController.prototype.keySecrect = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    req.body.keySecrect = "secretkeyBruster123";
                    next();
                }
                catch (e) {
                    //console.log(e)
                    return [2 /*return*/, res.status(401).send('Unauhtorized Request')];
                }
                return [2 /*return*/];
            });
        });
    };
    UsuariosController.prototype.perfil = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.body.userId;
                        console.log(userId);
                        return [4 /*yield*/, usuariosModels_1.usuariosModels.select(userId, undefined)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        if (result.length > 0) {
                            result[0].contra = "";
                            res.status(200).json(result);
                        }
                        else {
                            res.status(401).json({ mensaje: "El usuario no existe" });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuariosController.prototype.signup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, keySecrect, contra, contraEncriptada, result, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log(req.body);
                        _a = req.body, keySecrect = _a.keySecrect, contra = _a.contra;
                        return [4 /*yield*/, bcrypt_1.default.hashSync(contra, 10)];
                    case 1:
                        contraEncriptada = _b.sent();
                        req.body.contra = contraEncriptada;
                        console.log(req.body.contra);
                        delete req.body.keySecrect;
                        return [4 /*yield*/, usuariosModels_1.usuariosModels.insert(req.body)];
                    case 2:
                        result = _b.sent();
                        if (!result) return [3 /*break*/, 4];
                        return [4 /*yield*/, jsonwebtoken_1.default.sign({ id: result }, keySecrect)];
                    case 3:
                        token = _b.sent();
                        res.status(200).json({ "mensaje": "usuario registrado", token: token });
                        return [3 /*break*/, 5];
                    case 4:
                        res.status(401).json({ "mensaje": "Error al registrar el usuario" });
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UsuariosController.prototype.signin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, correo, contra, keySecrect, verificada, result, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, correo = _a.correo, contra = _a.contra, keySecrect = _a.keySecrect;
                        verificada = false;
                        return [4 /*yield*/, usuariosModels_1.usuariosModels.select(undefined, correo)];
                    case 1:
                        result = _b.sent();
                        console.log(result);
                        if (result.length > 0) {
                            verificada = bcrypt_1.default.compareSync(contra, result[0].contra);
                            if (verificada) {
                                token = jsonwebtoken_1.default.sign({ id: result[0].id }, keySecrect);
                                res.status(200).json({ token: token });
                            }
                            else {
                                res.status(401).json({ mensaje: "Contraseña incorrecta" });
                            }
                        }
                        else {
                            res.status(401).json({ mensaje: "El correo no existe" });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuariosController.prototype.getUsuarios = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, usuariosModels_1.usuariosModels.select(undefined, undefined)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.status(500).json({ "mensaje": "Error no se puede consultar los usuarios" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsuariosController.prototype.getUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, usuariosModels_1.usuariosModels.select(id, undefined)];
                    case 2:
                        result = _a.sent();
                        console.log(result);
                        res.status(200).json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        res.status(500).json({ "mensaje": "Error no se puede consultar el usuario" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UsuariosController.prototype.postUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usuariosModels_1.usuariosModels.insert(req.body)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        if (result) {
                            res.status(201).json({ "mensaje": "El usuario se registro" });
                        }
                        else {
                            res.status(500).json({ "mensaje": "Error al registrar el usuario" });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuariosController.prototype.putUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, usuariosModels_1.usuariosModels.update(parseInt(id), req.body)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        if (result) {
                            res.status(201).json({ "mensaje": "El usuario se actualizo" });
                        }
                        else {
                            res.status(500).json({ "mensaje": "Error al actualizar el usuario" });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuariosController.prototype.deleteUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, usuariosModels_1.usuariosModels.delete(parseInt(id))];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        if (result) {
                            res.status(201).json({ "mensaje": "El usuario se elimino" });
                        }
                        else {
                            res.status(500).json({ "mensaje": "Error al eliminar el usuario" });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuariosController.prototype.verificarToken = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var keySecrect, token, payload, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        keySecrect = req.body.keySecrect;
                        if (!req.headers.authorization) {
                            return [2 /*return*/, res.status(401).send('Unauhtorized Request')];
                        }
                        token = req.headers.authorization.split(' ')[1];
                        if (token === 'null') {
                            return [2 /*return*/, res.status(401).send('Unauhtorized Request')];
                        }
                        return [4 /*yield*/, jsonwebtoken_1.default.verify(token, keySecrect)];
                    case 1:
                        payload = _a.sent();
                        if (!payload) {
                            return [2 /*return*/, res.status(401).send('Unauhtorized Request')];
                        }
                        console.log("token desifrado:");
                        console.log(payload);
                        req.body.userId = payload.id;
                        console.log("id del usuario: " + req.body.userId);
                        next();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        //console.log(e)
                        return [2 /*return*/, res.status(401).send('Unauhtorized Request')];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsuariosController.prototype.permisoAdmin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        userId = req.body.userId;
                        if (!userId) return [3 /*break*/, 2];
                        return [4 /*yield*/, usuariosModels_1.usuariosModels.select(userId, undefined)];
                    case 1:
                        result = _a.sent();
                        if (result.length > 0) {
                            if (parseInt(result[0].rol) === 1) {
                                next();
                            }
                            else {
                                return [2 /*return*/, res.status(401).send('Unauhtorized Request')];
                            }
                        }
                        else {
                            return [2 /*return*/, res.status(401).send('Unauhtorized Request')];
                        }
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, res.status(401).send('Unauhtorized Request')];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        e_2 = _a.sent();
                        //console.log(e)
                        return [2 /*return*/, res.status(401).send('Unauhtorized Request')];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UsuariosController.prototype.permisoPerfil = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId;
            return __generator(this, function (_a) {
                try {
                    userId = req.body.userId;
                    if (parseInt(userId) == parseInt(req.params.id)) {
                        next();
                    }
                    else {
                        return [2 /*return*/, res.status(401).send('Unauhtorized Request')];
                    }
                }
                catch (e) {
                    //console.log(e)
                    return [2 /*return*/, res.status(401).send('Unauhtorized Request')];
                }
                return [2 /*return*/];
            });
        });
    };
    return UsuariosController;
}());
exports.usuariosC = new UsuariosController();
