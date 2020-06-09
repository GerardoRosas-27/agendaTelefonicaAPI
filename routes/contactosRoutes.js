"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactosR = void 0;
var express_1 = require("express");
var contactosController_1 = require("../controllers/contactosController");
var ContactosRoutes = /** @class */ (function () {
    function ContactosRoutes() {
        this.router = express_1.Router();
        this.configRoutes();
    }
    ContactosRoutes.prototype.configRoutes = function () {
        this.router.get('/api/contactos', contactosController_1.contactosC.keySecrect, contactosController_1.contactosC.verificarToken, contactosController_1.contactosC.getContactos);
        this.router.get('/api/contactos/:id', contactosController_1.contactosC.keySecrect, contactosController_1.contactosC.verificarToken, contactosController_1.contactosC.getContacto);
        this.router.post('/api/contactos', contactosController_1.contactosC.keySecrect, contactosController_1.contactosC.verificarToken, contactosController_1.contactosC.postContactos);
        this.router.delete('/api/contactos/:id', contactosController_1.contactosC.keySecrect, contactosController_1.contactosC.verificarToken, contactosController_1.contactosC.deleteContactos);
        this.router.put('/api/contactos/:id', contactosController_1.contactosC.keySecrect, contactosController_1.contactosC.verificarToken, contactosController_1.contactosC.putContactos);
    };
    return ContactosRoutes;
}());
exports.contactosR = new ContactosRoutes();
