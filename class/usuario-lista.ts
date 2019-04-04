import { Usuario } from './usuario';
import { usuario } from '../socket/sockets';
export class UsuariosLista {
    public lista: Usuario[] = [];

    constructor() {}

    ///////////////////////////////
    /// Agregar un usuario
    ///////////////////////////////
    public agregar(usuario: Usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
        
    }

    public actualizarNombre(id: string, nombre: string) {
        for(let usuario of this.lista) {
            if(usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log("Actualizando Usuario");
        console.log(this.lista);
        
    }
    ///////////////////////////////
    /// Obtiene una lista de usuarios
    ///////////////////////////////
    public getLista() {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }
    ///////////////////////////////
    /// Obtiene un usuario en particular
    ///////////////////////////////
    public getUsuario(id: string) {
        return this.lista.find(usuario => {
            return usuario.id === id;
        });
    }
    ///////////////////////////////
    /// Obtiene los usuarios de una sala en particular
    ///////////////////////////////
    public getUsuarioSala(sala: string) {
        return this.lista.find( usaurio => usaurio.sala === sala);
    }

    ///////////////////////////////
    /// Elimina usaurio
    ///////////////////////////////
    public borrarUsuario(id: string) {
        const tempUsaurio = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        return tempUsaurio;
    }
}