/***************************************************************/
/****************** TRABALHO SISTEMAS WEB **********************/
/***************************************************************/
/***************** Author: Gabriel Oliveira ********************/
/***************************************************************/

/***************************************************************/
/***************************************************************/
// Home
/***************************************************************/
/***************************************************************/
app.controller('HomeCtrl', function($rootScope, $scope, $location)
{
	$rootScope.activetab = $location.path();
	$scope.titulo = "Locadora XPTZ";
});

/***************************************************************/
/***************************************************************/
// Marca
/***************************************************************/
/***************************************************************/
app.controller('ListarClienteCtrl', function($rootScope, $scope, $location, Request)
{
	$rootScope.activetab = $location.path();
	$scope.titulo = "Clientes";

	$scope.init = function() {
		Request.call(null, 'GET', 'Clientes').then(function(response) {
			$scope.lista = response.data;
		});
	};

	$scope.excluir = function(id) {
		var confirmarExclusao = confirm("Deseja excluir esse item?");

		if (confirmarExclusao) {
			Request.call(id, 'DELETE', 'Clientes').then(function(response) {
				$scope.init();
			});
		}		
	};

	$scope.init();
});
app.controller('CadastrarClienteCtrl', function($rootScope, $scope, $location, Request)
{
	$rootScope.activetab = $location.path();
	$scope.titulo = "Cadastrar Cliente";
	$scope.acao = "Cadastrar";
	$scope.mensagem = "Preencha este campo no formato exemplificado.";
	$scope.detalhar = false;
	$scope.model = {};

	$scope.cadastrarAlterar = function () {
		Request.call($scope.model, 'POST', 'Clientes').then(function() {
			$location.path('/listarCliente');
		});
	}
});
app.controller('AlterarClienteCtrl', function($rootScope, $scope, $location, $routeParams, $filter, Request)
{
	$rootScope.activetab = $location.path();
	$scope.titulo = "Alterar Cliente";
	$scope.acao = "Alterar";
	$scope.mensagem = "Preencha este campo no formato exemplificado.";
	$scope.detalhar = false;
	$scope.model = {};

	Request.call($routeParams.id, 'GETBYID', 'Clientes').then(function(response) {
		$scope.model = response.data;
		$scope.model.DataNascimento = $filter('date')($scope.model.DataNascimento, "dd/MM/yyyy");
	});

	$scope.cadastrarAlterar = function () {
		var modelPut = { Id : $scope.model.Id, data : $scope.model };
		Request.call(modelPut, 'PUT', 'Clientes').then(function() {
			$location.path('/listarCliente');
		});
	}
});
app.controller('DetalharClienteCtrl', function($rootScope, $scope, $location, $routeParams, $filter, Request)
{
	$rootScope.activetab = $location.path();
	$scope.titulo = "Detalhar Cliente";
	$scope.detalhar = true;
	$scope.model = {};

	Request.call($routeParams.id, 'GETBYID', 'Clientes').then(function(response) {
		$scope.model = response.data;
		$scope.model.DataNascimento = $filter('date')($scope.model.DataNascimento, "dd/MM/yyyy");
	});
});

/***************************************************************/
/***************************************************************/
// Veiculo
/***************************************************************/
/***************************************************************/
app.controller('ListarVeiculoCtrl', function($rootScope, $scope, $location, Request)
{
	$rootScope.activetab = $location.path();
	$scope.titulo = "Veículos";

	$scope.init = function() {
		Request.call(null, 'GET', 'Veiculos').then(function(response) {
			$scope.lista = response.data;
		});
	};

	$scope.excluir = function(id) {
		var confirmarExclusao = confirm("Deseja excluir esse item?");

		if (confirmarExclusao) {
			Request.call(id, 'DELETE', 'Veiculos').then(function(response) {
				$scope.init();
			});
		}		
	};

	$scope.init();
});
app.controller('CadastrarVeiculoCtrl', function($rootScope, $scope, $location, Request)
{
	$rootScope.activetab = $location.path();
	$scope.titulo = "Cadastrar Veículo";
	$scope.acao = "Cadastrar";
	$scope.detalhar = false;
	$scope.model = {};

	Request.call($scope.model, 'GET', 'Marcas').then(function(response) {
		$scope.listaMarca = response.data;
	});

	$scope.cadastrarAlterar = function () {
		Request.call($scope.model, 'POST', 'Veiculos').then(function() {
			$location.path('/listarVeiculo');
		});
	}
});
app.controller('AlterarVeiculoCtrl', function($rootScope, $scope, $location, $routeParams, Request)
{
	$rootScope.activetab = $location.path();
	$scope.titulo = "Alterar Veículo";
	$scope.acao = "Alterar";
	$scope.detalhar = false;
	$scope.model = {};

	Request.call($scope.model, 'GET', 'Marcas').then(function(response) {
		$scope.listaMarca = response.data;
	});

	Request.call($routeParams.id, 'GETBYID', 'Veiculos').then(function(response) {
		$scope.model = response.data;
	})

	$scope.cadastrarAlterar = function () {
		$scope.model.Marca = null;
		var modelPut = { Id : $scope.model.Id, data : $scope.model };
		Request.call(modelPut, 'PUT', 'Veiculos').then(function() {
			$location.path('/listarVeiculo');
		});
	}
});
app.controller('DetalharVeiculoCtrl', function($rootScope, $scope, $location, $routeParams, Request)
{
	$rootScope.activetab = $location.path();
	$scope.titulo = "Detalhar Veículo";
	$scope.detalhar = true;
	$scope.model = {};

	Request.call($scope.model, 'GET', 'Marcas').then(function(response) {
		$scope.listaMarca = response.data;
	});

	Request.call($routeParams.id, 'GETBYID', 'Veiculos').then(function(response) {
		$scope.model = response.data;
	})
});

/***************************************************************/
/***************************************************************/
// Marca
/***************************************************************/
/***************************************************************/
app.controller('ListarMarcaCtrl', function($rootScope, $scope, $location, Request)
{
	$rootScope.activetab = $location.path();
	$scope.titulo = "Marcas";

	$scope.init = function() {
		Request.call(null, 'GET', 'Marcas').then(function(response) {
			$scope.lista = response.data;
		});
	};

	$scope.excluir = function(id) {
		var confirmarExclusao = confirm("Deseja excluir esse item?");

		if (confirmarExclusao) {
			Request.call(id, 'DELETE', 'Marcas').then(function(response) {
				$scope.init();
			});
		}		
	};

	$scope.init();
});
app.controller('CadastrarMarcaCtrl', function($rootScope, $scope, $location, Request)
{
	$rootScope.activetab = $location.path();
	$scope.titulo = "Cadastrar Marcas";
	$scope.acao = "Cadastrar";
	$scope.model = {};

	$scope.cadastrarAlterar = function () {
		Request.call($scope.model, 'POST', 'Marcas').then(function() {
			$location.path('/listarMarca');
		});
	}
});
app.controller('AlterarMarcaCtrl', function($rootScope, $scope, $location, $routeParams, Request)
{
	$rootScope.activetab = $location.path();
	$scope.titulo = "Alterar Marcas";
	$scope.acao = "Alterar";
	$scope.model = {};

	Request.call($routeParams.id, 'GETBYID', 'Marcas').then(function(response) {
		$scope.model = response.data;
	})

	$scope.cadastrarAlterar = function () {
		var modelPut = { Id : $scope.model.Id, data : $scope.model };
		Request.call(modelPut, 'PUT', 'Marcas').then(function() {
			$location.path('/listarMarca');
		});
	}
});

/***************************************************************/
/***************************************************************/
// Opcional
/***************************************************************/
/***************************************************************/
app.controller('ListarOpcionalCtrl', function($rootScope, $scope, $location, Request)
{
	$rootScope.activetab = $location.path();
	$scope.titulo = "Opcionais";

	$scope.init = function() {
		Request.call(null, 'GET', 'Opcionais').then(function(response) {
			$scope.lista = response.data;
		});
	};

	$scope.excluir = function(id) {
		var confirmarExclusao = confirm("Deseja excluir esse item?");

		if (confirmarExclusao) {
			Request.call(id, 'DELETE', 'Opcionais').then(function(response) {
				$scope.init();
			});
		}		
	};

	$scope.init();
});
app.controller('CadastrarOpcionalCtrl', function($rootScope, $scope, $location, Request)
{
	$rootScope.activetab = $location.path();
	$scope.titulo = "Cadastrar Opcional";
	$scope.acao = "Cadastrar";
	$scope.model = {};

	$scope.cadastrarAlterar = function () {
		Request.call($scope.model, 'POST', 'Opcionais').then(function() {
			$location.path('/listarOpcional');
		});
	}
});
app.controller('AlterarOpcionalCtrl', function($rootScope, $scope, $location, $routeParams, Request)
{
	$rootScope.activetab = $location.path();
	$scope.titulo = "Alterar Opcionais";
	$scope.acao = "Alterar";
	$scope.model = {};

	Request.call($routeParams.id, 'GETBYID', 'Opcionais').then(function(response) {
		$scope.model = response.data;
	})

	$scope.cadastrarAlterar = function () {
		var modelPut = { Id : $scope.model.Id, data : $scope.model };
		Request.call(modelPut, 'PUT', 'Opcionais').then(function() {
			$location.path('/listarOpcional');
		});
	}
});

/***************************************************************/
/***************************************************************/
// Locação
/***************************************************************/
/***************************************************************/
/***************************************************************/
/***************************************************************/
// Marca
/***************************************************************/
/***************************************************************/
app.controller('ListarLocacaoCtrl', function($rootScope, $scope, $location, Request)
{
	$rootScope.activetab = $location.path();
	$scope.titulo = "Locação";

	$scope.init = function() {
		Request.call(null, 'GET', 'Locacoes').then(function(response) {
			$scope.lista = response.data;
		});
	};

	$scope.excluir = function(id) {
		var confirmarExclusao = confirm("Deseja excluir esse item?");

		if (confirmarExclusao) {
			Request.call(id, 'DELETE', 'Locacoes').then(function(response) {
				$scope.init();
			});
		}		
	};

	$scope.init();
});
app.controller('CadastrarLocacaoCtrl', function($rootScope, $scope, $location, Request)
{
	$rootScope.activetab = $location.path();
	$scope.titulo = "Cadastrar Locação";
	$scope.acao = "Cadastrar";
	$scope.mensagem = "Preencha este campo no formato exemplificado.";
	$scope.detalhar = false;
	$scope.model = {};

	Request.call(null, 'GET', 'Marcas').then(function(response) {
		$scope.listaMarca = response.data;
	});

	Request.call(null, 'GET', 'Clientes').then(function(response) {
		$scope.listaCliente = response.data;
	});

	$scope.selecionarMarca = function(id) {
		if (id) {
			Request.call(id, 'GETBYMARCA', 'Veiculos').then(function(response) {
				if (response.data && response.data.length > 0) {
					$scope.listaVeiculo = response.data;	
				} else {
					$scope.listaVeiculo = null;
					$scope.model.VeiculoId = null;
				}
			});
		} else {
			$scope.listaVeiculo = null;
			$scope.model.VeiculoId = null;
		}
	};

	$scope.cadastrarAlterar = function () {
		$scope.model.Alugado = true;
		Request.call($scope.model, 'POST', 'Locacoes').then(function() {
			$location.path('/listarLocacao');
		});
	};
});
app.controller('AlterarLocacaoCtrl', function($rootScope, $scope, $location, $routeParams, $filter, Request)
{
	$rootScope.activetab = $location.path();
	$scope.titulo = "Devolver Veículo";
	$scope.acao = "Devolver Veículo";
	$scope.mensagem = "Preencha este campo no formato exemplificado.";
	$scope.devolver = true;
	$scope.detalhar = true;
	$scope.model = {};

	Request.call(null, 'GET', 'Marcas').then(function(response) {
		$scope.listaMarca = response.data;
	});

	Request.call(null, 'GET', 'Veiculos').then(function(response) {
		$scope.listaVeiculo = response.data;
	});

	Request.call(null, 'GET', 'Clientes').then(function(response) {
		$scope.listaCliente = response.data;
	});

	Request.call($routeParams.id, 'GETBYID', 'Locacoes').then(function(response) {
		$scope.model = response.data;
		$scope.model.PeriodoInicial = $filter('date')($scope.model.PeriodoInicial, "dd/MM/yyyy");
		$scope.model.PeriodoFinal = $filter('date')($scope.model.PeriodoFinal, "dd/MM/yyyy");
		$scope.model.Valor = $filter('currency')($scope.model.Valor, 'R$ ').replace('.',',');
	});

	$scope.cadastrarAlterar = function () {
		$scope.model.Valor = $scope.model.Valor.replace('R$ ', '').replace(',00','');
		Request.call($scope.model, 'POSTDEVOLVERLOCACAO', 'Locacoes').then(function() {
			$location.path('/listarLocacao');
		});
	}
});
app.controller('DetalharLocacaoCtrl', function($rootScope, $scope, $location, $routeParams, $filter, Request)
{
	$rootScope.activetab = $location.path();
	$scope.titulo = "Detalhar Locação";
	$scope.detalhar = true;
	$scope.model = {};

	Request.call(null, 'GET', 'Marcas').then(function(response) {
		$scope.listaMarca = response.data;
	});

	Request.call(null, 'GET', 'Veiculos').then(function(response) {
		$scope.listaVeiculo = response.data;
	});

	Request.call(null, 'GET', 'Clientes').then(function(response) {
		$scope.listaCliente = response.data;
	});

	Request.call($routeParams.id, 'GETBYID', 'Locacoes').then(function(response) {
		$scope.model = response.data;
		$scope.model.PeriodoInicial = $filter('date')($scope.model.PeriodoInicial, "dd/MM/yyyy");
		$scope.model.PeriodoFinal = $filter('date')($scope.model.PeriodoFinal, "dd/MM/yyyy");
		$scope.model.Valor = $filter('currency')($scope.model.Valor, 'R$ ').replace('.',',');
	});
});

/***************************************************************/
/***************************************************************/
// Sobre
/***************************************************************/
/***************************************************************/
app.controller('SobreCtrl', function($rootScope, $scope, $location)
{
	$rootScope.activetab = $location.path();
	$scope.titulo = "Sobre";
});