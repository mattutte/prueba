let autos = require('./autos');

let persona = [
    {nombre: "Guido", capacidadDePagoEnCuotas: 100, capacidadDePagoTotal: 100000000},
    {nombre: "Lean", capacidadDePagoEnCuotas: 30000, capacidadDePagoTotal: 100000000}
]

let concesionaria = {
    autos: [...autos],
    buscarAuto: function(pat){

        let indice = 0;
        let encontrado = false;
        for (let i=0; i<autos.length;i++){
            if (autos[i].patente === pat){
                encontrado = true;
                return autos[i];
            }
        }
        if (encontrado === false){
            return null;
        }
    },
    venderAuto: function(pat){
        this.buscarAuto(pat).vendido = true;
    },
    autosParaLaVenta: function(){
        return this.autos.filter(function(auto){
            return auto.vendido == false;
        })
    },
    autosNuevos: function(){
        return this.autosParaLaVenta().filter(function(auto){
            return auto.km < 100;
        })
    },
    listaDeVentas: function(){
        return this.autos.filter(function(auto){
            return auto.vendido == true;
        }).map(function(num){
            return num.precio;
        });
    },
    totalDeVentas: function(){
        if (this.listaDeVentas().length > 0){
            return this.listaDeVentas().reduce(function(acum, num){
            return acum + num;
        })
        }else{
            return 0;
        }
    },
    puedeComprar: function(patente, persona){
        let auto = this.buscarAuto(patente);
        let validacion = false;
        if((auto.precio <= persona.capacidadDePagoTotal) && (auto.precio/auto.cuotas <= persona.capacidadDePagoEnCuotas)){
               validacion = true;
        }
        return validacion;
    },
    autosQuePuedeComprar: function(persona){
            return this.autos.filter(function(auto){
               return (auto.precio <= persona.capacidadDePagoTotal) && (auto.precio/auto.cuotas <= persona.capacidadDePagoEnCuotas) && (auto.vendido == false);
        })
    }
}

console.log(concesionaria.puedeComprar('APL123',persona[0]));
console.log(concesionaria.puedeComprar('APL123',persona[1]));
 