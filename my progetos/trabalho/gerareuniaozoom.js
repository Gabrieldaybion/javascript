const importToken = require('./geratoken'); /*puxo o arquivo e salvo dentro da variavel */
const ztoken =importToken.zoomtoken()/* Pego o objeto, que tem o valor da função que puxa o token e ponho dentro da função para guardar o token e utilizar na função principal */

/* Função principal para criar a sala */
return new Promise(resolve => {
    app.sendTextMessage(app.renderMessage('wait', {}, "")).then(() => {
        let topic = app.context.steps.topic;// o topico da reunião
        let email = app.context.steps.email; /* email */
        let date = app.context.steps.date;// a data
        let duration = app.context.steps.duration;// duração
        let time = app.context.steps.start_time;// a hora
        const [day, month, year] = date.split('/');
        const [hour, minute] = time.split(':');
        const starttime = new Date(year, month - 1, day, hour, minute);
        let start_time = date + "T" + time;
        // app.log(start_time);
        let timezone = app.testZoomUser.timezone;
        let host = app.context.steps.host;

        app.executeApi('createMeeting', { id: host, duration: duration, topic: topic, start_time: starttime.toISOString(), timezone: timezone }).then(async response => {
            let body = JSON.parse(response.body);
            app.log(body, 'response body | scheduleMeetingAction');
            if (response.statusCode == 201) {
                let start_url = body.start_url;
                let join_url = body.join_url;
                let bstStartDate = new Date(new Date(body.starttime).getTime() + (app.BSTOffset + app.currentOffset) * 60000);

                try {
                    let tinyStart = await app.executeApi('tiny_url', { url: start_url });
                    let tinyJoin = await app.executeApi('tiny_url', { url: join_url });
                    start_url = tinyStart.body;
                    join_url = tinyJoin.body
                }
                catch (error) {
                    app.log(error, 'scheduleMeetingAction');
                }

                app.log(body, 'response | scheduleMeetingAction');
                let options = {
                    id: body.id,
                    start_url: start_url,
                    join_url: join_url,
                    password: body.password,
                    start_date: starttime.toDateString(),
                    start_time: starttime.toUTCString().substr(-12).substr(0, 5),
                    duration: body.duration
                };
                let record = {
                    email: email,
                    meeting_id: body.id.toString(),
                    host_email: body.host_email,
                    topic: body.topic,
                    start_url: start_url,
                    join_url: join_url,
                    duration: body.duration.toString(),
                    password: body.password,
                    start_time: starttime.getTime().toString(),
                    end_time: (starttime.getTime() + (body.duration * 60000)).toString(),
                    delete: 'NO'
                };
                // app.sendEmail(app.context.steps.email, 'Zoom | Meeting Scheduled', '', {}, '', app.renderMessage('email_meeting', options, ""), 'wilson@websia.com.br', 'abhilash@yellowmessenger.com',  false, '');
                await app.dataStore.insert({
                    table: 'meeting',
                    record: record
                }).catch(error=>{
                    app.log(error);
                });
                if (app.source == "botframework") {
                    app.sendAdaptiveCard({
                        "contentType": "application/vnd.microsoft.card.adaptive",
                        "content": {
                            "type": "AdaptiveCard",
                            "body": [
                                {
                                    "type": "TextBlock",
                                    "size": "Medium",
                                    "weight": "Bolder",
                                    "text": app.renderMessage('meeting_success_header', {}, "")
                                },
                                {
                                    "type": "FactSet",
                                    "facts": [
                                        {
                                            "title": app.renderMessage('meeting_details_id', {}, ""),
                                            "value": body.id
                                        },
                                        {
                                            "title": app.renderMessage('meeting_details_start', {}, ""),
                                            "value": `[${start_url}](${start_url})`
                                        },
                                        {
                                            "title": app.renderMessage('meeting_details_join', {}, ""),
                                            "value": `[${join_url}](${join_url})`
                                        },
                                        {
                                            "title": app.renderMessage('meeting_details_password', {}, ""),
                                            "value": body.password
                                        },
                                        {
                                            "title": app.renderMessage('meeting_details_date', {}, ""),
                                            "value": starttime.toDateString()
                                        },
                                        {
                                            "title": app.renderMessage('meeting_details_time', {}, ""),
                                            "value": starttime.toUTCString().substr(-12).substr(0, 5)
                                        },
                                        {
                                            "title": app.renderMessage('meeting_details_duration', {}, ""),
                                            "value": `${body.duration} mins`
                                        }
                                    ],
                                    "separator": true
                                }
                            ],
                            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                            "version": "1.2"
                        }
                    }).then(() => {
                        return resolve();
                    })
                }
                else {
                    app.sendCards([
                        {
                            title: app.renderMessage('meeting_success_header', {}, ""),
                            text: app.renderMessage('meeting_success_body', options, "")
                        }
                    ]).then(()=>{
                        app.sendQuickReplies({
                            title:'',
                            options : [
                                {
                                    title: app.renderMessage('schedule_meeting', {}, ''),
                                    text: 'schedule meeting'
                                }
                                , {
                                    title: app.renderMessage('view_meetings', {}, ''),
                                    text: 'view meeting',
                                }, {
                                    title: app.renderMessage('delete_meeting', {}, ''),
                                    text: 'delete meeting',
                                }
                            ]
                        });
                        return resolve();
                    });
                    
                }
            }
            else {
                app.log('coming in else')
                app.sendtextMessage(`${body.message}`);
                return resolve();
            }
        }).catch(error => {
            app.log(error, 'error | scheduleMeetingAction');
            app.sendTextMessage(app.renderMessage('upgrade', {}, ""));
            return resolve();
        });
    });
    
});