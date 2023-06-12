const https = require('https')

module.exports = {
    
    
    sendNotification(token, data){
        const notification = JSON.stringify({
            'to': token,
            'data': {
                'click_action': 'FLUTTER_NOTIFICATION_CLICK',
                'title': data.title,
                'body': data.body,
                'id_notificacion': data.id_notificacion
            },
            'notification': {
                'click_action': 'FLUTTER_NOTIFICATION_CLICK',
                'title': data.title,
                'body': data.body,
                'id_notificacion': data.id_notificacion
            },
            'priority': 'high',
            'ttl': '4500s'
        })

        const options = {
            hostname: 'fcm.googleapis.com',
            path: '/fcm/send',
            method: 'POST',
            port: 443,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAWsz-YVc:APA91bH1OHHWwqkfyJfNy1UhuOeI8DQNTlH0J9Q2AQr101aO03uyOYaW8zfDO2l24HmGs-9rVXPIAkjtroRAdntHAurqJe9uKmCYhnY_HQJmwUBO84YEb2HAo2lVB6DfeWj78ghUyH-s',
            }
        }

        const req = https.request(options, (res) => {
            console.log('STATUS CODE FIREBASE', res.statusCode)

            res.on('data', (d) => {
                process.stdout.write(d);
            })

        })

        req.on('error', (error) => {
            console.log('ERROR DE FIREBASE MESSAGING', error)
        })

        
        req.write(notification);
        req.end();

    },

    sendNotificationToMultipleDevices(tokens, data){

        const notification = JSON.stringify({
            'registration_ids': tokens,
            'data': {
                'click_action': 'FLUTTER_NOTIFICATION_CLICK',
                'title': data.title,
                'body': data.body,
                'id_notificacion': data.id_notificacion
            },
            'notification': {
                'click_action': 'FLUTTER_NOTIFICATION_CLICK',
                'title': data.title,
                'body': data.body,
                'id_notificacion': data.id_notificacion
            },
            'priority': 'high',
            'ttl': '4500s'
        })

        const options = {
            hostname: 'fcm.googleapis.com',
            path: '/fcm/send',
            method: 'POST',
            port: 443,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAWsz-YVc:APA91bH1OHHWwqkfyJfNy1UhuOeI8DQNTlH0J9Q2AQr101aO03uyOYaW8zfDO2l24HmGs-9rVXPIAkjtroRAdntHAurqJe9uKmCYhnY_HQJmwUBO84YEb2HAo2lVB6DfeWj78ghUyH-s',
            }
        }

        const req = https.request(options, (res) => {
            console.log('STATUS CODE FIREBASE', res.statusCode)

            res.on('data', (d) => {
                process.stdout.write(d);
            })

        })

        req.on('error', (error) => {
            console.log('ERROR DE FIREBASE MESSAGING', error)
        })

        
        req.write(notification);
        req.end();

    }

}