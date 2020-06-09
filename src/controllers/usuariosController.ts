import { Request, Response, NextFunction } from "express";
import { usuariosModels } from "../models/usuariosModels"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class UsuariosController {
    constructor(){

    }
    public async keySecrect(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.keySecrect = "secretkeyBruster123";
            next();
            
        } catch (e) {
            //console.log(e)
            return res.status(401).send('Unauhtorized Request');
        }
    }

    public async perfil(req: Request, res: Response) {
        const { userId } = req.body;
        console.log(userId);
        const result = await usuariosModels.select(userId, undefined);
        console.log(result);
        if (result.length > 0) {
            result[0].contra = "";
            res.status(200).json(result);
        } else {
            res.status(401).json({ mensaje: "El usuario no existe" });
        }
    }
    
    public async signup(req: Request, res: Response) {
        console.log(req.body);
        const { keySecrect, contra } = req.body;
       const contraEncriptada = await bcrypt.hashSync(contra, 10);
       req.body.contra = contraEncriptada;
       console.log(req.body.contra);
       delete req.body.keySecrect;
        const result = await usuariosModels.insert(req.body);
        if (result) {
            const token = await jwt.sign({ id: result }, keySecrect);
            
            res.status(200).json({"mensaje": "usuario registrado", token });
        } else {
            res.status(401).json({ "mensaje": "Error al registrar el usuario" });
        }
    }

    public async signin(req: Request, res: Response) {
       
        const { correo, contra, keySecrect } = req.body;
        let verificada: Boolean = false;
        const result = await usuariosModels.select(undefined, correo);
        console.log(result);
        if (result.length > 0) {
            
            verificada = bcrypt.compareSync(contra, result[0].contra);
            if (verificada) {

                const token = jwt.sign({ id: result[0].id }, keySecrect);

                res.status(200).json({ token });
            } else {
                res.status(401).json({ mensaje: "Contraseña incorrecta" });
            }
        } else {
            res.status(401).json({ mensaje: "El correo no existe" });
        }
    }

    public async getUsuarios(req: Request, res: Response) {
        try {
            const result = await usuariosModels.select(undefined, undefined);
            console.log(result);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ "mensaje": "Error no se puede consultar los usuarios" });
        }
    }

    public async getUsuario(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await usuariosModels.select(id, undefined);
            console.log(result);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ "mensaje": "Error no se puede consultar el usuario" });
        }
    }

    public async postUsuario(req: Request, res: Response) {
        const result = await usuariosModels.insert(req.body);
        console.log(result);
        if (result) {
            res.status(201).json({ "mensaje": "El usuario se registro" });
        } else {
            res.status(500).json({ "mensaje": "Error al registrar el usuario" });
        }
    }

    public async putUsuario(req: Request, res: Response) {
        const { id } = req.params;
        const result = await usuariosModels.update(parseInt(id), req.body);
        console.log(result);
        if (result) {
            res.status(201).json({ "mensaje": "El usuario se actualizo" });
        } else {
            res.status(500).json({ "mensaje": "Error al actualizar el usuario" });
        }
    }

    public async deleteUsuario(req: Request, res: Response) {
        const { id } = req.params;
        const result = await usuariosModels.delete(parseInt(id));
        console.log(result);
        if (result) {
            res.status(201).json({ "mensaje": "El usuario se elimino" });
        } else {
            res.status(500).json({ "mensaje": "Error al eliminar el usuario" });
        }
    }

    public async verificarToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { keySecrect } = req.body;
            if (!req.headers.authorization) {
                return res.status(401).send('Unauhtorized Request');
            }
            let token = req.headers.authorization.split(' ')[1];
            if (token === 'null') {
                return res.status(401).send('Unauhtorized Request');
            }

            const payload: any = await jwt.verify(token, keySecrect);
            if (!payload) {
                return res.status(401).send('Unauhtorized Request');
            }
            console.log("token desifrado:");
            console.log(payload);
            req.body.userId = payload.id;
            console.log("id del usuario: " + req.body.userId);
            next();
        } catch (e) {
            //console.log(e)
            return res.status(401).send('Unauhtorized Request');
        }
    }


    public async permisoAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.body;
            if (userId) {

                const result = await usuariosModels.select(userId, undefined);
                if (result.length > 0) {
                    if (parseInt(result[0].rol) === 1) {
                        next();
                    } else {
                        return res.status(401).send('Unauhtorized Request');
                    }
                } else {
                    return res.status(401).send('Unauhtorized Request');
                }
            } else {
                return res.status(401).send('Unauhtorized Request');
            }
        } catch (e) {
            //console.log(e)
            return res.status(401).send('Unauhtorized Request');
        }
    }
    public async permisoPerfil(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.body;
            if (parseInt(userId) == parseInt(req.params.id)) {
                next(); 
            } else {
                return res.status(401).send('Unauhtorized Request');
            }
        } catch (e) {
            //console.log(e)
            return res.status(401).send('Unauhtorized Request');
        }
    }
}
export const usuariosC = new UsuariosController();