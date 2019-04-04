import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../socket/sockets';

export default class Server {
    private static _instance: Server;

    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        // Utilizamos el http como proxy entre express y socket
        this.httpServer = new http.Server(this.app);
        // Necesitamos inicializar el socket
        this.io = socketIO(this.httpServer);
        this.escucharSockets();
    }
    
    public static get instance() {
        return this._instance || (this._instance = new this()); 
    }

    private escucharSockets() {
        console.log('Escuchando conexiones Socket');
        this.io.on('connection', cliente => {
            console.log('Nuevo cliente conectado');
            // Mapas
            socket.marcadorNuevo(cliente, this.io);
            // Conectar Cliente
            socket.conectarCliente(cliente, this.io);
            // Configurar Usuario
            socket.usuario(cliente, this.io);
            // Obtener usuarios activos
            socket.obtenerUsuarios(cliente, this.io);
            // Mensajes (Que este pendiente de los mensajes)
            socket.mensaje(cliente, this.io);
            //Desconectar
            socket.desconectar(cliente, this.io);
                
        });
    }

    ///////////////////////////////
    ///  Wake up server
    ///////////////////////////////
    start(callback: Function) {
        this.httpServer.listen(this.port, callback);
    }
}