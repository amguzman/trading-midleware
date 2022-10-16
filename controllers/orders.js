const { response, request } = require('express');
const OrderControl = require('../models/order-control');

const orderControl = new OrderControl();

const newOrdersGet = (req = request, res = response) => {

    //const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    const newOrders = orderControl.getNewOrders();
    if(newOrders === null) {
        res.status(404).json({
            status: "ERROR",
            msg: "Not orders found"
        });
    }
    res.json({
        status: "OK",
        msg: "Orders processed",
        data: {
            newOrders
        }
    });
}

const ordersGet = (req = request, res = response) => {

    res.json({
        status: "OK",
        msg: "All orders",
        data: orderControl.toJson
    });
}

const ordersPost = (req, res = response) => {

    const { strategy, operation, operationType } = req.body;
    orderControl.addOrder(strategy, operation, operationType);
    res.json( {
        status: "OK",
        msg: "Order added",
        data: orderControl.toJson
    });
}

const ordersDelete = (req, res = response) => {

    orderControl.clearOrders( );
    res.json( {
        status: "OK",
        msg: "All orders deleted",
        data: orderControl.toJson
    });
}



//
// const usuariosPut = (req, res = response) => {
//
//     const { id } = req.params;
//
//     res.json({
//         msg: 'put API - usuariosPut',
//         id
//     });
// }
//
// const usuariosPatch = (req, res = response) => {
//     res.json({
//         msg: 'patch API - usuariosPatch'
//     });
// }
//
// const usuariosDelete = (req, res = response) => {
//     res.json({
//         msg: 'delete API - usuariosDelete'
//     });
// }




module.exports = {
    ordersGet,
    newOrdersGet,
    ordersPost,
    ordersDelete,
    //usuariosPut,
    //usuariosPatch,
    //usuariosDelete,
}