"use strict";require(["rotas","jquery-ui"],function(o){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(o,s){$(this).css(o),$("<div>").addClass("arrow").addClass(s.vertical).addClass(s.horizontal).appendTo(this)}}}),jQuery(document).ready(function(s){s(".scroll").click(function(o){o.preventDefault(),s("html,body").animate({scrollTop:s(this.hash).offset().top},800)})});var s=new Rotas;s.getBaseUrlCMS();$.ajax({url:"js/controller.php",type:"GET",dataType:"json",data:{flag:"consulta",rota:s.ModuloBySlug("termos_uso")},error:function(o){console.log("ERRO no AJAX :"+o),$(".manutencao").css("display","block"),$(".loading").addClass("hide")},success:function(o){if(0<o.length){var s='<div class="row"><div class="col-md-12"><h1 class="text-primary">'+o[0].modulos.tx_titulo_modulo+"</h1><hr></div></div>";if(s+='<div class="row"><div class="col-md-12"><div class="text-justify txtBloco">'+o[0].modulos.tx_descricao_modulo+"</div>",s+='<a href="#header" name="header" class="scroll topo">Voltar para o topo</a></div></div>',0<o[0].itens.length)for(var t in o[0].itens)s+='<div class="row"><div class="col-md-12"><h3 class="subTitulo">'+o[0].itens[t].tx_titulo_itens+"</h3>",s+='<div class="text-justify txtBloco">'+o[0].itens[t].tx_descricao_itens+"</div>",s+='<a href="#header" name="header" class="scroll topo">Voltar para o topo</a></div></div>';$("#termos_uso").append(s)}else $(".manutencao").css("display","block");$(".loading").addClass("hide")}})});