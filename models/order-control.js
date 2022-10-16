const path = require('path');
const fs   = require('fs');

class Order {
    constructor( strategy, operation, operationType ) {
        this.strategy = strategy;
        this.operation = operation;
        this.operationType = operationType;
    }
}


class OrderControl {


    constructor() {
        this.orders  = [];
        this.newOrders  = [];

        this.init();
    }


    get toJson() {
        return {
            orders: this.orders,
            newOrders: this.newOrders,
        }
    }

    init() {
        if(fs.existsSync("../db/data.json")) {
            const { orders = [], newOrders = [] } = require('../db/data.json');
            this.orders   = orders;
            this.newOrders = newOrders;
        }
    }

    guardarDB() {

        const dbPath = path.join( __dirname, '../db/data.json' );
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) );

    }

    getNewOrders(  ) {

     if ( this.newOrders.length === 0 ) {
         return null;
     }

     let list = [];
     list.push(...this.newOrders);
     console.info("Get new orders to send MQL5");
     this.orders.push(...this.newOrders);
     console.info("Mark new orders as processed");
     this.newOrders = [];
     console.info("Clean new order list");

     this.guardarDB();

     return list;
 }

    addOrder( strategy, operation, operationType ) {

        this.newOrders.push(new Order(strategy, operation, operationType));
        this.guardarDB();
    }

    clearOrders( ) {
        this.newOrders = [];
        this.orders = [];
        this.guardarDB();
    }

}

module.exports = OrderControl;