"use strict";var controller=angular.module("oscApp",[]);controller.controller("OscCtrl",["$http","$location",function(a,r){var o=this;o.carregarDadosGerais=function(){var t=r.path().split("/")[1];a({url:"js/controller.php",method:"GET",params:{flag:"consulta",rota:rotas.OSCByID(t)}}).then(function(t){null==t.data.msg?(o.osc=t.data,o.msg=""):o.msg=t.data.msg})}}]);