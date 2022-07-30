const app = require('./app.js');
const { connectDB } = require('./db');

try {
    app.listen(app.get('port'), () => {
        console.log('Server listening on port ->', app.get('port'));
        connectDB();
    })
} catch (error) {
    console.log(error)
}