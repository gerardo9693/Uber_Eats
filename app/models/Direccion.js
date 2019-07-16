const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Direccion = new Schema({
    Cliente:{
        type: Schema.Types.ObjectId,
        ref: 'Clientes'
    },
    cCalle : {
        type: String,
        required: true
    },
    cCruzamientoA : {
        type: String,
        required: true
    },
    cCruzamientoB : {
        type: String,
    },
    longitud : {
        type: String,
        required: true
    },
    latitud : {
        type: String,
        required: true
    }
}, {collection:"Direcciones",timestamps:true});

module.exports = mongoose.model('Direcciones', Direccion);