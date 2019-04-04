import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../class/usuario-lista';
import { Usuario } from '../class/usuario';


export const usuarioConectados = new UsuariosLista();

// Mapas
export const marcadorNuevo = ( cliente: Socket, io: SocketIO.Server) => {
   // Definimos lo que vamos a estar escuchando
   cliente.on('marcador-nuevo', (marcador) => {
      console.log(marcador);
      
   });
}


export const conectarCliente = ( cliente: Socket, io: SocketIO.Server) => {
   const usuario = new Usuario(cliente.id);
   usuarioConectados.agregar(usuario);
}

export const desconectar = (cliente: Socket, io: SocketIO.Server) => {
     cliente.on('disconnect', () => {
        usuarioConectados.borrarUsuario(cliente.id);
        // Emitimos
        io.emit('usuarios-activos', usuarioConectados.getLista())
        console.log('Cliente Desconectado');
        
     });
}
///////////////////////////////
/// Escucha de mensajes
///////////////////////////////
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
   cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
      console.log('Mensaje Recibido', payload);
      // Emito a los clientes conectados el mensaje recibido
      io.emit('mensaje-nuevo', payload);
   });
}

///////////////////////////////
/// Configurar Usuario
///////////////////////////////
export const usuario = (cliente: Socket, io: socketIO.Server) => {
   cliente.on('configurar-usuario', (payload: { nombre: string }, callBack: Function) => {
      console.log('Usuario Recibido', payload.nombre);
      usuarioConectados.actualizarNombre(cliente.id, payload.nombre);
      io.emit('usuarios-activos', usuarioConectados.getLista())
      // Devolvemos una respuesta al cliente mediante el callback
      callBack({
         ok: true,
         mensaje: `Usuario ${payload.nombre}, configurado`
      })
   });
}

// Obtener usuario
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
   cliente.on('obtener-usuario', () => {
      io.to(cliente.id).emit('usuarios-activos', usuarioConectados.getLista())
   });

}