const db = require('../config/config');

const Rol = {};

/* Rol.findByEmail = (email, result) => {
    const sql = `
    SELECT
        id,
        name,
        image,
        route,
        image
    FROM
        Rols
    WHERE
        email = ?

    `;

    db.query(
        sql,
        [email],
        (err, Rol) => {
            if(err){
                console.log('Error: ', err)
                result(err, null);
            }else{
                console.log('Usuario obtenido: ', Rol[0])
                result(null, Rol[0]);
            }
        }
    )
}

Rol.findById = (id, result) => {
    const sql = `
    SELECT
        id,
        name,
        image,
        route,
        image
    FROM
        Rols
    WHERE
        id = ?

    `;

    db.query(
        sql,
        [id],
        (err, Rol) => {
            if(err){
                console.log('Error: ', err)
                result(err, null);
            }else{
                console.log('Usuario obtenido: ', Rol[0])
                result(null, Rol[0]);
            }
        }
    )
} */

Rol.create = async (id_user, id_rol,result) => {

    const sql = `
        INSERT INTO
            user_has_roles(
                id_user,
                id_rol,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?)
    `;

    db.query
    (
        sql,
        [
            id_user,
            id_rol,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if(err){
                result(err, null);
            }else{
                console.log('Usuario Obtenido: ', res.insertId)
                result(null, res.insertId);
            }
        }
    )
}
module.exports = Rol;