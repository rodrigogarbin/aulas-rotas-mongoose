var http = require('http');

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
	, description: {type: String, default: ''}
	,	alcohol: { type: Number,  min: 0}
	,	price: { type: Number, min: 0}
	,	category: { type: String, default: ''}
	,	created_at: { type: Date, default: Date.now}
}

var BeerSchema = new Schema(json_schema);

var Beer = mongoose.model('Beer', BeerSchema);

var Controller = {
	create: function (req, res){
		var dados = {name: 'Skol'
				, description: 'Mijo de rato'
				,	alcohol: 4.5
				,	price: 3.0
				,	category: 'pilsen'
			}

			var model = Beer(dados);
			var msg = '';

			model.save(function(err, data){
				if (err) {
					console.log('Erro: ', err);
					msg = 'Erro: ' + err;
				} else {
					console.log('Cerveja Inserida: ', data);
					msg = 'Cerveja Inserida: ' + data;
				}
				res.end(msg);
			}); }
	,	retrieve: function (req, res){
			var query = {};

			Beer.find (query, function(err, data) {
				if (err) {
					console.log('Erro: ', err);
					msg = 'Erro: ' + err;
				} else {
					console.log('Listagem: ', data);
					msg = 'Listagem: ' + data;
				}
				res.end(msg);
			})}
	, update: function (req, res){
			var query = {name: /skol/i};

			var mod = {
				name: 'Brahma',
				alcohol: 4,
				price: 6,
				category: 'pilsen'
			};

			var optional = {
				upsert: false,
				multi: false
			};

  		Beer.update(query, mod, optional, function(err, data) {
				if (err) {
					console.log('Erro: ', err);
					msg = 'Erro: ' + err;
				} else {
					console.log('Cervejas atualizadas: ', data);
					msg = 'Cervejas atualizadas: ' + data;
				}
				res.end(msg);
			})}
	, delete: function (req, res){
			var query = {name: /brahma/i};

			Beer.remove(query, function(err, data) {
				if (err) {
					console.log('Erro: ', err);
					msg = 'Erro: ' + err;
				} else {
					console.log('Cervejas deletada com sucessa, quantidade: ', data.result);
					msg = 'Cervejas deletada com sucessa, quantidade: ' + data.result;
				}
				res.end(msg);
			})}
}

http.createServer(function (req, res) {

	console.log('URL: ', req.url);
	var url = req.url;

  res.writeHead(200, {'Content-Type': 'text/plane'});

  var msg = '';
  switch (url) {
  	case '/api/beers/create':
  		Controller.create(req, res);

  	case '/api/beers/retrieve':
			Controller.retrieve(req, res);		

  	case '/api/beers/update':
  		Controller.update(req, res);
  		

  	case '/api/beers/delete':
  		Controller.delete(req, res);

  	default:
  		'Rota não encontradas';
  		break;
  }

}).listen(3000);

console.log('Server running at http://localhost:3000/');