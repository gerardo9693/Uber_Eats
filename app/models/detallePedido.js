const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detallePedido = new Schema({
    Pedido:{
		type:Schema.Types.ObjectId,
		ref: 'Pedidos'
    },
    Comida:{
        type:Schema.Types.ObjectId,
        ref: 'Comidas'
    },
    Cantidad: {
        type: Number,
        required: true
    },
    Subtotal: {
        type: Number,
        required: true
    }
}, {collection:"Detalles",timestamps:true});

module.exports = mongoose.model('Detalles', detallePedido);