import crypto from "crypto";
import { crud } from "../models/crud";

class Generals{

    async generaraID(tabla: string, id: string){
        crud.init(tabla, id);
        let nueva: boolean = false;
        let newID: string;
        do {
            newID = crypto.randomBytes(15).toString('hex');
            let result = await crud.select(newID);
            if(result.lenght == 0){
                nueva = true;
            }
        } while (nueva);
        return newID;
    }
}

export const general = new Generals();
