const {Crud} = require('../models')
const Views = require('../views')

class Controller {

    static login = (username, password) => {
        Crud.pool('employee', (error, data) => {
            if (error) {
                Views.showErrors('unknown');
                return;
            } else {
                Crud.inSession(username, (error, data) => {
                    if (error) {
                        Views.showErrors('in_session');
                        return;
                    } else {
                        Crud.login(data, username, password, (error, data) => {
                            if (error) {
                                Views.showErrors('password');
                                return
                            } else {
                                Views.showMessage('login_success', data.name);
                                Views.showMessage('motd');
                                // update session login
                                Crud.session(username);
                            }
                        })
                    }
                })
            }
        })
    }

}

module.exports = Controller