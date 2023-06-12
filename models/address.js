const db = require('../config/config');

const Address = {};

Address.findByUser = (id_user, result) => {
    const sql = `
    SELECT 
        CONVERT(id,char) as id,
        address,
        barrio,
        lat,
        lng,
        CONVERT(id_user,char) as id_user
    FROM
        address
    WHERE
        id_user = ? 
    `;

    db.query(
        sql,
        id_user,
        (err, data) => {
            if(err){
                console.log('Error: ', err)
                result(err, null);
            }else{
                result(null, data);
            }
        }
    )
}

Address.create = (address, result) =>{
    const sql = `
        INSERT INTO
            address(
                address,
                barrio,
                lat,
                lng,
                id_user,
                created_at,
                updated_at
            )
        VALUES(?,?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            address.address,
            address.barrio,
            address.lat,
            address.lng,
            address.id_user,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if(err){
                console.log('Error: ', err)
                result(err, null);
            }else{
                console.log('Id de la nueva dirección: ', res.insertId)
                result(null, res.insertId);
            }
        }
    )
}

module.exports = Address;