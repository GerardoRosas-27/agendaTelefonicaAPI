import { Request, Response, NextFunction } from "express";
import { contactosModels } from "../models/contactosModels"
import jwt from "jsonwebtoken";

class ContactosController {
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
    
    public async getContactos(req: Request, res: Response) {
        const { userId } = req.body;
        try {
            const result = await contactosModels.select(undefined , parseInt(userId));
            console.log(result);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ "mensaje": "Error no se pueden consultar los contactos" });
        }
    }

    public async getContacto(req: Request, res: Response) {
        
        try {
            const { id } = req.params;
            const result = await contactosModels.select(id);
            console.log(result);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ "mensaje": "Error no se puede consultar el contacto" });
        }
    }

    public async postContactos(req: Request, res: Response) {
        console.log(req.body);
         delete req.body.name;
         delete req.body.keySecrect;
         req.body.usuario = parseInt(req.body.userId);
         delete req.body.userId;
        const result = await contactosModels.insert(req.body);
        console.log(result);
        if (result) {
            res.status(201).json({ "mensaje": "Los datos se registro" });
        } else {
            res.status(500).json({ "mensaje": "Error al registrar el contacto" });
        }
    }

    public async deleteContactos(req: Request, res: Response) {
        const { id } = req.params;
        const result = await contactosModels.delete(parseInt(id));
        console.log(result);
        if (result) {
            res.status(201).json({ "mensaje": "El contacto se elimino" });
        } else {
            res.status(500).json({ "mensaje": "Error al eliminar el contacto" });
        }
    }

    public async putContactos(req: Request, res: Response) {
        console.log(req.body)
        const { id } = req.params;
        const result = await contactosModels.update(parseInt(id), req.body);
        console.log(result);
        if (result) {
            res.status(201).json({ "mensaje": "El contacto se actualizo" });
        } else {
            res.status(500).json({ "mensaje": "Error al actualizar el contacto" });
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

  
}
export const contactosC = new ContactosController();