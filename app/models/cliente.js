const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cliente = new Schema({
    cNombre : {
        type: String,
        required: true
    },
    cApellidoP : {
        type: String,
        required: true
    },
    cApellidoM : {
        type: String,
        required: true
    },
    cTelefono : {
        type: String,
        required: true,
        unique: true
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
    cGenero : {
        type: String,
        enum: ['H', 'M']
    },
    cCorreo : {
        type: String,
        required: true,
        unique: true
    },
    cContrasenia : {
        type: String, 
        required: true
    },
    lEstatus : {
        type: Boolean,
        default: true
    }
}, {collection: 'Clientes', timestamps:true});

module.exports = mongoose.model('Clientes', Cliente);