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
exports.usuariosModels = exports.UsuariosModels = void 0;
var database_1 = __importDefault(require("../database"));
var UsuariosModels = /** @class */ (function () {
    function UsuariosModels() {
        this.tabla = "usuarios";
    }
    //metodo para seleccionar varios o un solo registro en la tabla usuario de la la base de datos
    UsuariosModels.prototype.select = function (id, correo) {
        return __awaiter(this, void 0, void 0, function () {
            var result, result, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id) return [3 /*break*/, 2];
                        return [4 /*yield*/, database_1.default.query('SELECT * FROM ' + this.tabla + ' WHERE id = ' + id)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/, result];
                    case 2:
                        if (!correo) return [3 /*break*/, 4];
                        return [4 /*yield*/, database_1.default.query('SELECT * FROM ' + this.tabla + ' WHERE correo = "' + correo + '"')];
                    case 3:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/, result];
                    case 4: return [4 /*yield*/, database_1.default.query('SELECT * FROM ' + this.tabla)];
                    case 5:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    //metodo para insertar registro en la tabla usuario de la base de datos
    UsuariosModels.prototype.insert = function (usuario) {
        return __awaiter(this, void 0, void 0, function () {
            var resultExiste, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, database_1.default.query('SELECT * FROM ' + this.tabla + ' WHERE correo = "' + usuario.correo + '"')];
                    case 1:
                        resultExiste = _a.sent();
                        if (!(resultExiste.length === 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, database_1.default.query('INSERT INTO ' + this.tabla + ' set ?', [usuario])];
                    case 2:
                        result = _a.sent();
                        console.log(result.insertId);
                        if (result.warningCount === 0) {
                            return [2 /*return*/, result.insertId];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, false];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //metodo para actualizar un registro en la tabla usuario de la base de datos
    UsuariosModels.prototype.update = function (id, usuario) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, database_1.default.query('UPDATE ' + this.tabla + ' SET ? WHERE id = ?', [usuario, id])];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        if (result.affectedRows === 1) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //metodo para eliminar un registro en la tabla usuario de la base de datos
    UsuariosModels.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, database_1.default.query('DELETE FROM ' + this.tabla + ' WHERE id =?', [id])];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        if (result.affectedRows === 1) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UsuariosModels;
}());
exports.UsuariosModels = UsuariosModels;
exports.usuariosModels = new UsuariosModels();
