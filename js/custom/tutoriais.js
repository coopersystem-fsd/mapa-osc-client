"use strict";require(["rotas","jquery-ui"],function(s){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(s,i){$(this).css(s),$("<div>").addClass("arrow").addClass(i.vertical).addClass(i.horizontal).appendTo(this)}}}),jQuery(document).ready(function(s){s(".scroll").click(function(i){i.preventDefault(),s("html,body").animate({scrollTop:s(this.hash).offset().top},800)})});var i=new Rotas;i.getBaseUrlCMS();$.ajax({url:"js/controller.php",type:"GET",dataType:"json",data:{flag:"consulta",rota:i.ModuloBySlug("tutorial")},error:function(s){console.log("ERRO no AJAX :"+s)},success:function(s){var i="";if(s.length>0&&(i='<div class="row"><div class="col-md-12"><h1 class="text-primary">'+s[0].modulos.tx_titulo_modulo+"</h1><hr></div></div>",i+='<div class="row"><div class="col-md-12">'+s[0].modulos.tx_descricao_modulo+"</div></div>",s[0].itens.length>0)){i+='<div class="row"><div class="col-md-12"><ul class="media-list">';for(var t in s[0].itens)i+='<li class="media tutorial"><div class="media-left"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></div><div class="media-body">',i+='<h4 class="media-heading">'+s[0].itens[t].tx_titulo_itens+"</h4>",i+='<div class="text-justify txtBloco">'+s[0].itens[t].tx_descricao_itens+"</div></div></li>";i+="</div></div></ul>"}$("#tutorial").prepend(i),$(".loading").addClass("hide")}})});