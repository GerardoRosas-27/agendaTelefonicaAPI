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
exports.contactosC = void 0;
var contactosModels_1 = require("../models/contactosModels");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var ContactosController = /** @class */ (function () {
    function ContactosController() {
    }
    ContactosController.prototype.keySecrect = function (req, res, next) {
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
    ContactosController.prototype.getContactos = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.body.userId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, contactosModels_1.contactosModels.select(undefined, parseInt(userId))];
                    case 2:
                        result = _a.sent();
                        console.log(result);
                        res.status(200).json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        res.status(500).json({ "mensaje": "Error no se pueden consultar los contactos" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ContactosController.prototype.getContacto = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, contactosModels_1.contactosModels.select(id)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(500).json({ "mensaje": "Error no se puede consultar el contacto" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContactosController.prototype.postContactos = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req.body);
                        delete req.body.name;
                        delete req.body.keySecrect;
                        req.body.usuario = parseInt(req.body.userId);
                        delete req.body.userId;
                        return [4 /*yield*/, contactosModels_1.contactosModels.insert(req.body)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        if (result) {
                            res.status(201).json({ "mensaje": "Los datos se registro" });
                        }
                        else {
                            res.status(500).json({ "mensaje": "Error al registrar el contacto" });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ContactosController.prototype.deleteContactos = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, contactosModels_1.contactosModels.delete(parseInt(id))];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        if (result) {
                            res.status(201).json({ "mensaje": "El contacto se elimino" });
                        }
                        else {
                            res.status(500).json({ "mensaje": "Error al eliminar el contacto" });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ContactosController.prototype.putContactos = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req.body);
                        id = req.params.id;
                        return [4 /*yield*/, contactosModels_1.contactosModels.update(parseInt(id), req.body)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        if (result) {
                            res.status(201).json({ "mensaje": "El contacto se actualizo" });
                        }
                        else {
                            res.status(500).json({ "mensaje": "Error al actualizar el contacto" });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ContactosController.prototype.verificarToken = function (req, res, next) {
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
    return ContactosController;
}());
exports.contactosC = new ContactosController();
