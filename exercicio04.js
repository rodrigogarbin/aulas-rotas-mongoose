var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pos-unoesc');

var db = mongoose.connection;

db.on('error', function (err) {
	console.log('Erro de conexao.', err);
});

db.on('open', function () {
 	console.log('Conexão aberta.');
});

db.on('connected', function(err) {
	console.log('Conectado');
})

var Schema = mongoose.Schema;

var json_schema = {
		name: {type: String, default: ''}
	,   description: {type: String, default: ''}
	,	alcohol: { type: Number,  min: 0}
	,	price: { type: Number, min: 0}
	,	category: { type: String, default: ''}
	,	created_at: { type: Date, default: Date.now}
}

var BeerSchema = new Schema(json_schema);

var Beer = mongoose.model('Beer', BeerSchema);
var query = {};

Beer.find (query, function(err, data) {
	if (err) {
		console.log('Erro: ', err);
	} else {
		console.log('listagem: ', data);
	}
	//para finalizar o processo do Node.js
	process.exit(0);
})

