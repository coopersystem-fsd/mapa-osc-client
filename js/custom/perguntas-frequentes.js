"use strict";require(["rotas","jquery-ui"],function(o){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(o,n){$(this).css(o),$("<div>").addClass("arrow").addClass(n.vertical).addClass(n.horizontal).appendTo(this)}}}),jQuery(document).ready(function(o){o(".scroll").click(function(n){n.preventDefault(),o("html,body").animate({scrollTop:o(this.hash).offset().top},800)})});var n=new Rotas;n.getBaseUrlCMS();$.ajax({url:"js/controller.php",type:"GET",dataType:"json",data:{flag:"consulta",rota:n.ModuloBySlug("perguntas_frequentes")},error:function(o){console.log("ERRO no AJAX :"+o)},success:function(o){if(o.length>0){var n='<div id="accordion">';for(var t in o[0].itens)n+="<h3>"+(parseInt(t)+1)+"- "+o[0].itens[t].tx_titulo_itens+"</h3>",n+="<div>"+o[0].itens[t].tx_descricao_itens+"</div>";n+="</div>",$("#perguntas_frequentes").append(n);var i={header:"ui-icon-circle-arrow-e",activeHeader:"ui-icon-circle-arrow-s"};$("#accordion").accordion({collapsible:!0,heightStyle:"content",icons:i}),$("#toggle").button().on("click",function(){$("#accordion").accordion("option","icons")?$("#accordion").accordion("option","icons",null):$("#accordion").accordion("option","icons",i)}),$(".loading").addClass("hide")}}})});