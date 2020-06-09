export interface Usuarios {
    id?: number;
    nombre: string;
    correo: string;
    contra: string;
}

export interface Contactos {
    id?: number;
    nombre: string;
    telefono: string;
    correo: string;
    fecha: string;
    usuario: number;
}