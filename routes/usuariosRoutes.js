"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosR = void 0;
var express_1 = require("express");
var usuariosController_1 = require("../controllers/usuariosController");
var UsuariosRoutes = /** @class */ (function () {
    function UsuariosRoutes() {
        this.router = express_1.Router();
        this.configRoutes();
    }
    UsuariosRoutes.prototype.configRoutes = function () {
        this.router.get('/api/perfil', usuariosController_1.usuariosC.keySecrect, usuariosController_1.usuariosC.verificarToken, usuariosController_1.usuariosC.perfil);
        this.router.post('/signup', usuariosController_1.usuariosC.keySecrect, usuariosController_1.usuariosC.signup);
        this.router.post('/signin', usuariosController_1.usuariosC.keySecrect, usuariosController_1.usuariosC.signin);
        this.router.get('/api/usuario', usuariosController_1.usuariosC.keySecrect, usuariosController_1.usuariosC.getUsuarios);
        this.router.get('/api/usuario/:id', usuariosController_1.usuariosC.keySecrect, usuariosController_1.usuariosC.verificarToken, usuariosController_1.usuariosC.getUsuario);
        this.router.post('/api/usuario', usuariosController_1.usuariosC.keySecrect, usuariosController_1.usuariosC.verificarToken, usuariosController_1.usuariosC.postUsuario);
        this.router.put('/api/usuario/:id', usuariosController_1.usuariosC.keySecrect, usuariosController_1.usuariosC.verificarToken, usuariosController_1.usuariosC.permisoAdmin, usuariosController_1.usuariosC.putUsuario);
        this.router.delete('/api/usuario/:id', usuariosController_1.usuariosC.keySecrect, usuariosController_1.usuariosC.verificarToken, usuariosController_1.usuariosC.permisoAdmin, usuariosController_1.usuariosC.deleteUsuario);
    };
    return UsuariosRoutes;
}());
exports.usuariosR = new UsuariosRoutes();
