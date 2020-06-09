"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactosR = void 0;
const express_1 = require("express");
const contactosController_1 = require("../controllers/contactosController");
class ContactosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.configRoutes();
    }
    configRoutes() {
        this.router.get('/api/contactos', contactosController_1.contactosC.keySecrect, contactosController_1.contactosC.verificarToken, contactosController_1.contactosC.getContactos);
        this.router.get('/api/contactos/:id', contactosController_1.contactosC.keySecrect, contactosController_1.contactosC.verificarToken, contactosController_1.contactosC.getContacto);
        this.router.post('/api/contactos', contactosController_1.contactosC.keySecrect, contactosController_1.contactosC.verificarToken, contactosController_1.contactosC.postContactos);
        this.router.delete('/api/contactos/:id', contactosController_1.contactosC.keySecrect, contactosController_1.contactosC.verificarToken, contactosController_1.contactosC.deleteContactos);
        this.router.put('/api/contactos/:id', contactosController_1.contactosC.keySecrect, contactosController_1.contactosC.verificarToken, contactosController_1.contactosC.putContactos);
    }
}
exports.contactosR = new ContactosRoutes();
