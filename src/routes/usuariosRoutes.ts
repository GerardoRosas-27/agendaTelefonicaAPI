import { Router } from "express";
import { usuariosC } from "../controllers/usuariosController";

class UsuariosRoutes {
  public router: Router = Router();

  constructor() {
    this.configRoutes();
  }
  configRoutes(): void {
    this.router.get('/api/perfil', usuariosC.keySecrect, usuariosC.verificarToken, usuariosC.perfil,);
    this.router.post('/signup', usuariosC.keySecrect, usuariosC.signup);
    this.router.post('/signin', usuariosC.keySecrect, usuariosC.signin);
    this.router.get('/api/usuario', usuariosC.keySecrect, usuariosC.getUsuarios);
    this.router.get('/api/usuario/:id', usuariosC.keySecrect, usuariosC.verificarToken, usuariosC.getUsuario);
    this.router.post('/api/usuario', usuariosC.keySecrect, usuariosC.verificarToken, usuariosC.postUsuario);
    this.router.put('/api/usuario/:id', usuariosC.keySecrect, usuariosC.verificarToken, usuariosC.permisoAdmin, usuariosC.putUsuario);
    this.router.delete('/api/usuario/:id', usuariosC.keySecrect, usuariosC.verificarToken, usuariosC.permisoAdmin, usuariosC.deleteUsuario);
  }
}
export const usuariosR = new UsuariosRoutes();
