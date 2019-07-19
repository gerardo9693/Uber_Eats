const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pedido = new Schema({
    cliente:{
		type:Schema.Types.ObjectId,
		ref: 'Clientes'
    },
    direccionEntrega:{
        type:Schema.Types.ObjectId,
        ref: 'Direcciones'
    },
    total: {
        type: Number,
        required: true
    }
}, {collection:"Pedidos",timestamps:true});

module.exports = mongoose.model('Pedidos', Pedido);