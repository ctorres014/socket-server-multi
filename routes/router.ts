import { Router, Request, Response} from 'express';
import Server from '../class/server';
import { Socket } from 'socket.io';
import { GraficaData } from '../class/grafica';
// import { Mapa } from  '../class/mapa';
const router = Router();

export const mapa = new Mapa();
const grafica = new GraficaData();

router.get('/grafica', (req: Request, res: Response) => {
    res.json(grafica.getDataGrafica());
});

router.get('/encuesta', (req: Request, res: Response) => {
    res.json(grafica.getDataEncuesta());
});

router.post('/encuesta', (req: Request, res: Response) => {
    const posicion = req.body.posicion;
    const data = Number(req.body.unidad);
    
    grafica.imcrementarValorEncuesta(posicion, data)
    // Aqui devemos comunicar nuestro servicio REST con nuestro servidor de socket
     const server = Server.instance;
    // Enviamos un mensaje a todos los
    // usuarios de la sala
    server.io.emit('cambio-grafica-encuesta', grafica.getDataEncuesta());

    res.json(grafica.getDataEncuesta());
});

router.post('/grafica', (req: Request, res: Response) => {
    const mes = req.body.mes;
    const data = Number(req.body.valor);
    
    grafica.incrementarValor(mes, data)
    // Aqui devemos comunicar nuestro servicio REST con nuestro servidor de socket
     const server = Server.instance;
    // Enviamos un mensaje a todos los
    // usuarios de la sala
    server.io.emit('cambio-grafica', grafica.getDataGrafica());

    res.json(grafica.getDataGrafica());
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    
    const payload = {
        de,
        cuerpo
    }
    // Aqui devemos comunicar nuestro servicio REST con nuestro servidor de socket
    const server = Server.instance;
    // Enviamos un mensaje a un usuario en particular
    // que esta en la misma sala
    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

// Servicio para obtener todos los id's de usuario
router.get('/usuarios', (req: Request, res: Response) => {
    // Necesitamos la instancia del server
    const server = Server.instance;
    // Esta funcion barre con todos los clientes
    server.io.clients((err: any, clientes: Socket) => {
        if(err) {
            return res.json({
                ok: false,
                err
            })
        }
        
        res.json({
            ok: true,
            clientes
        })

    })
});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req: Request, res: Response) => {
    // Necesitamos la instancia del server
    const server = Server.instance;
    // Esta funcion barre con todos los clientes
    server.io.clients((err: any, clientes: Socket) => {
        if(err) {
            return res.json({
                ok: false,
                err
            })
        }
        
        res.json({
            ok: true,
            clientes
        })

    })
});


export default router;