import { Contactos } from "./interfaces";
import { crud } from "./crud";

class ContactosModels {

    constructor() {

        crud.init("contactos", "id");
    }
    //metodo para seleccionar varios o un solo registro en la tabla usuario de la la base de datos
    async select(id?: string, nombre?: string | number) {
        let result: any;
        if (id) {
            result = await crud.select(id);
            console.log(result);
            return result;
        } else {
            if (nombre) {
                result = await crud.selectNombre("usuario", nombre);
                console.log(result);
                return result;
            }else{
                result = await crud.select();
                console.log(result);
                return result;
            }
        }
    }
    //metodo para insertar registro en la tabla usuario de la base de datos
    async insert(contactos: Contactos) {
        try {
            
            const result = await crud.insert(contactos);
            console.log(result);
            if (result.affectedRows === 1) {
                return true
            } else {
                return false;
            }

        } catch (error) {
            console.log(error);
            return false
        }
    }
    //metodo para actualizar un registro en la tabla usuario de la base de datos
    async update(id: number, contactos: Contactos) {
        try {
            const result = await crud.update(contactos, id);
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
            const result = await crud.delete(id);
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
export const contactosModels = new ContactosModels();