"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var usuariosRoutes_1 = require("./routes/usuariosRoutes");
var contactosRoutes_1 = require("./routes/contactosRoutes");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.config();
        this.routes();
        this.start();
    }
    Server.prototype.config = function () {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default("dev"));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        //-- middlewares de la cabecera
        this.app.use(function (req, res, next) {
            // Dominio que tengan acceso (ej. 'http://example.com')
            res.setHeader('Access-Control-Allow-Origin', '*');
            // Metodos de solicitud que deseas permitir
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            // Encabecedados que permites (ej. 'X-Requested-With,content-type')
            res.setHeader('Access-Control-Allow-Headers', '*');
            next();
        });
    };
    Server.prototype.routes = function () {
        this.app.use('/', usuariosRoutes_1.usuariosR.router);
        this.app.use('/', contactosRoutes_1.contactosR.router);
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get('port'), function () {
            console.log("aplicacion corriendo en el puerto: " + _this.app.get('port'));
        });
    };
    return Server;
}());
new Server();
