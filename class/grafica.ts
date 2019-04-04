export class GraficaData {
    private meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril'];
    private valores: number[] = [1, 2, 3, 4];
    private unidades: number[] = [1, 2, 3, 4];
    
    constructor() {}

    getDataGrafica() {
        return [
            { data: this.valores, label: 'Ventas' }
        ]
    }

    getDataEncuesta() {
        return [
            { data: this.unidades, label: 'Preguntas' }
        ]
    }

    incrementarValor(mes: string, valor: number) {
        mes: mes.toLowerCase().trim();

       for (const i in this.meses) {
           if(mes === this.meses[i].toLowerCase()) {
               this.valores[i] += valor;
           }
       }

       return this.getDataGrafica();
    }

    imcrementarValorEncuesta(posicion: number, valor: number) {
       this.unidades[posicion] += valor;       
       return this.getDataEncuesta();
    }


}