"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.configRoutes();
    }
    configRoutes() {
        this.router.get('/api/usuarios', usuariosController_1.usuariosController.getUsuarios);
        this.router.get('/api/usuarios/:id', usuariosController_1.usuariosController.getUsuario);
        this.router.post('api/usuarios', usuariosController_1.usuariosController.postUsuario);
    }
}
const indexRouter = new IndexRoutes();
exports.default = indexRouter.router;
