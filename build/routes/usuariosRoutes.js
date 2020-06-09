"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosR = void 0;
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
class UsuariosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.configRoutes();
    }
    configRoutes() {
        this.router.get('/api/perfil', usuariosController_1.usuariosC.keySecrect, usuariosController_1.usuariosC.verificarToken, usuariosController_1.usuariosC.perfil);
        this.router.post('/signup', usuariosController_1.usuariosC.keySecrect, usuariosController_1.usuariosC.signup);
        this.router.post('/signin', usuariosController_1.usuariosC.keySecrect, usuariosController_1.usuariosC.signin);
        this.router.get('/api/usuario', usuariosController_1.usuariosC.keySecrect, usuariosController_1.usuariosC.getUsuarios);
        this.router.get('/api/usuario/:id', usuariosController_1.usuariosC.keySecrect, usuariosController_1.usuariosC.verificarToken, usuariosController_1.usuariosC.getUsuario);
        this.router.post('/api/usuario', usuariosController_1.usuariosC.keySecrect, usuariosController_1.usuariosC.verificarToken, usuariosController_1.usuariosC.postUsuario);
        this.router.put('/api/usuario/:id', usuariosController_1.usuariosC.keySecrect, usuariosController_1.usuariosC.verificarToken, usuariosController_1.usuariosC.permisoAdmin, usuariosController_1.usuariosC.putUsuario);
        this.router.delete('/api/usuario/:id', usuariosController_1.usuariosC.keySecrect, usuariosController_1.usuariosC.verificarToken, usuariosController_1.usuariosC.permisoAdmin, usuariosController_1.usuariosC.deleteUsuario);
    }
}
exports.usuariosR = new UsuariosRoutes();
