const app = require('./app.js');
const { connection } = require('./db.js');

try {
    connection.sync({ force: false }).then(() => {
        app.listen(app.get('port'), () => {
            console.log('Server listening on port ->', app.get('port'));
        });
    });
} catch (error) {
    console.log(error)
}