"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bacantesR = void 0;
const express_1 = require("express");
const bacantesController_1 = require("../controllers/bacantesController");
class BacantesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.configRoutes();
    }
    configRoutes() {
        this.router.get('/api/bacantes', bacantesController_1.bacantesC.getBacantes);
        this.router.post('/api/bacantes', bacantesController_1.bacantesC.postBacantes);
    }
}
exports.bacantesR = new BacantesRoutes();
