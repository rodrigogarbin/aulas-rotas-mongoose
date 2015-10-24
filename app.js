var http = require('http');

var Model = require('./model');

var Controller = {
	create: function (req, res){
		var dados = {name: 'Skol'
				, description: 'Mijo de rato'
				,	alcohol: 4.5
				,	price: 3.0
				,	category: 'pilsen'
			}

			var model = Model(dados);
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

			Model.find (query, function(err, data) {
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

  		Model.update(query, mod, optional, function(err, data) {
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

			Model.remove(query, function(err, data) {
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