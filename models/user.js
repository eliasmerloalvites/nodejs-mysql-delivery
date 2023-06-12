const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

User.findByEmail = (email, result) => {
    const sql = `
    SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone,
        U.password,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(R.id, char),
                'name', R.name,
                'image', R.image,
                'route', R.route
            )
        ) AS roles
    FROM
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON
        UHR.id_rol = R.id
    WHERE
        email = ?
    GROUP BY
        U.id
    `;

    db.query(
        sql,
        [email],
        (err, user) => {
            if(err){
                console.log('Error: ', err)
                result(err, null);
            }else{
                console.log('Usuario obtenido: ', user[0])
                result(null, user[0]);
            }
        }
    )
}

User.findById = (id, result) => {
    const sql = `
    SELECT
        CONVERT(u.id, char) as id,
        u.email,
        u.name,
        u.lastname,
        u.phone,
        u.image,
        u.password,
        u.notification_token,
		json_arrayagg(
			json_object(
				'id', CONVERT(r.id, char),
				'name', r.name,
				'image', r.image,
				'route', r.route
            )
        ) as roles
    FROM
        users as u
	INNER JOIN
		user_has_roles as uhr
	ON
		uhr.id_user = u.id
	INNER JOIN
		roles as r
	ON
		uhr.id_rol = r.id
    WHERE
        u.id = ?
	GROUP BY
		u.id

    `;

    db.query(
        sql,
        [id],
        (err, user) => {
            if(err){
                console.log('Error: ', err)
                result(err, null);
            }else{
                console.log('Usuario obtenido: ', user[0])
                result(null, user[0]);
            }
        }
    )
}


User.findDeliveryMen = (result) => {
    const sql = `
    SELECT
        CONVERT(U.id, char) AS id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone
    FROM
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id 
    INNER JOIN
        roles AS R
    ON
        R.id = UHR.id_rol
    WHERE
        R.id = 2;
    `;

    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, data);
            }
        }
    );
}

User.findAdmins = (result) => {
    const sql = `
    SELECT
        CONVERT(U.id, char) AS id,
        U.name,
        U.notification_token
    FROM
        users AS U
    INNER JOIN user_has_roles AS UHR ON UHR.id_user = U.id
    INNER JOIN roles AS R ON R.id = UHR.id_rol
    WHERE R.id = 1;
    `;

    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, data);
            }
        }
    );
}

User.create = async (user, result) => {

    const hash = await bcrypt.hash(user.password, 10);

    const sql = `
        INSERT INTO
            users(
                email,
                name,
                lastname,
                phone,
                image,
                password,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query
    (
        sql,
        [
            user.email,
            user.name,
            user.lastname,
            user.phone,
            user.image,
            hash,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if(err){
                console.log('Error: ', err)
                result(err, null);
            }else{
                console.log('Id del nuevo usuario: ', res.insertId)
                result(null, res.insertId);
            }
        }
    )
}

User.update = (user, result) => {
    const sql = `
        UPDATE
            users
        SET
            name = ?,
            lastname = ?,
            phone = ?,
            image = ?,
            updated_at = ?
        WHERE
            id = ?
    `;

    db.query
    (
        sql,
        [
            user.name,
            user.lastname,
            user.phone,
            user.image,
            new Date(),
            user.id
        ],
        (err, res) => {
            if(err){
                console.log('Error: ', err)
                result(err, null);
            }else{
                console.log('usuario actualizado: ', user.id)
                result(null, user.id);
            }
        }
    )

}

User.updateWithoutImage = (user, result) => {
    const sql = `
        UPDATE
            users
        SET
            name = ?,
            lastname = ?,
            phone = ?,
            updated_at = ?
        WHERE
            id = ?
    `;

    db.query
    (
        sql,
        [
            user.name,
            user.lastname,
            user.phone,
            new Date(),
            user.id
        ],
        (err, res) => {
            if(err){
                console.log('Error: ', err)
                result(err, null);
            }else{
                console.log('usuario actualizado: ', user.id)
                result(null, user.id);
            }
        }
    )

}

User.updateNotificationToken = (id, token, result) => {
    const sql = `
        UPDATE
            users
        SET
            notification_token = ?,
            updated_at = ?
        WHERE
            id = ?
    `;

    db.query
    (
        sql,
        [
            token,
            new Date(),
            id
        ],
        (err, res) => {
            if(err){
                console.log('Error: ', err)
                result(err, null);
            }else{
                console.log('usuario actualizado: ', id)
                result(null, id);
            }
        }
    )

}

module.exports = User;