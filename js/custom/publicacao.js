"use strict";require(["rotas","jquery","jquery-ui"],function(a){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(a,o){$(this).css(a),$("<div>").addClass("arrow").addClass(o.vertical).addClass(o.horizontal).appendTo(this)}}}),jQuery(document).ready(function(a){a(".scroll").click(function(o){o.preventDefault(),a("html,body").animate({scrollTop:a(this.hash).offset().top},800)})}),$("#voltaPagAnterior").on("click",function(){history.go(-1)});var o,t=new Rotas,i=void 0!==window.location.href.split("#")[1]?window.location.href.split("#/")[1].split("="):null,l="";null!==i&&(l=i[0],o=l,$("#voltaPublicacao").attr("href","publicacao.html#/"+o)),$.ajax({url:"js/controller.php",type:"GET",dataType:"json",data:{flag:"consulta",rota:t.PublicacaoByID(l)},error:function(a){console.log("ERRO no AJAX :"+a),$(".manutencao").css("display","block"),$(".loading").addClass("hide")},success:function(a){var o='<div class="row"><div class="col-md-12"><h2 class="text-primary">'+a.tx_titulo_publicacao+"</h2><hr></div></div>";o+='<span class="glyphicon glyphicon-calendar txtData" aria-hidden="true"> '+a.dt_publicacao+"</span>",o+='<div class="text-justify txtBloco">'+a.tx_descricao_publicacao+"</div>",$("#publicacao").append(o),$(".loading").addClass("hide")}})});