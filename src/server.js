require ('dotenv').config({path: './src/configs/.env'});
var cors = require('cors')
const {
    PORT
} = process.env

const app = require('./app');

app.use(cors())

app.set('port', PORT || 3000);
const server = app.listen(app.get('port'), ()=> {
    console.log('Servidor rodando na porta: ' + server.address().port);
});



