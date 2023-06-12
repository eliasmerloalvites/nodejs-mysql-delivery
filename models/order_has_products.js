const db = require('../config/config');

const OrderHasProducts = {};

OrderHasProducts.create = (id_order, id_product, quantity, price, result) =>{
    const sql = `
        INSERT INTO
            orders_has_products(
                id_order,
                id_product,
                quantity,
                price,
                created_at,
                updated_at
            )
        VALUES(?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            id_order,
            id_product,
            quantity,  //1. PAGADO  2. DESPACHADO  3. EN CAMINO   4. ENTREGADO
            price,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if(err){
                console.log('Error: ', err)
                result(err, null);
            }else{
                console.log('Id de la nueva order_has_product: ', res.insertId)
                result(null, res.insertId);
            }
        }
    )
}

module.exports = OrderHasProducts;