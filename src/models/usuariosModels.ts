import pool from "../database";
import { Usuarios } from "./interfaces";

export class UsuariosModels {
    tabla: string = "usuarios";
    //metodo para seleccionar varios o un solo registro en la tabla usuario de la la base de datos
    async select(id: string | undefined, correo: string | undefined) {
        if (id) {
            const result = await pool.query('SELECT * FROM ' + this.tabla + ' WHERE id = ' + id);
            console.log(result);
            return result;
        } else {
            if (correo) {
                const result = await pool.query('SELECT * FROM ' + this.tabla + ' WHERE correo = "' + correo +'"');
                console.log(result);
                return result;
            } else {
                const result = await pool.query('SELECT * FROM ' + this.tabla);
                console.log(result);
                return result;
            }
        }
    }
    //metodo para insertar registro en la tabla usuario de la base de datos
    async insert(usuario: Usuarios) {
        try {
            const resultExiste = await pool.query('SELECT * FROM ' + this.tabla + ' WHERE correo = "' + usuario.correo+'"');
            if (resultExiste.length === 0) {
                const result = await pool.query('INSERT INTO ' + this.tabla + ' set ?', [usuario]);
                console.log(result.insertId);
                if (result.warningCount === 0) {
                    return result.insertId
                } else {
                    return false;
                }
            } else return false
        } catch (error) {
            console.log(error);
            return false
        }
    }
    //metodo para actualizar un registro en la tabla usuario de la base de datos
    async update(id: number, usuario: Usuarios) {
        try {
            const result = await pool.query('UPDATE ' + this.tabla + ' SET ? WHERE id = ?', [usuario, id]);
            console.log(result)
            if (result.affectedRows === 1) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false
        }
    }
    //metodo para eliminar un registro en la tabla usuario de la base de datos
    async delete(id: number) {
        try {
            const result = await pool.query('DELETE FROM ' + this.tabla + ' WHERE id =?', [id]);
            console.log(result);
            if (result.affectedRows === 1) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false
        }
    }

}

export const usuariosModels = new UsuariosModels(); 