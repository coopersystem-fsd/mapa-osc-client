"use strict";require(["jquery-ui"],function(a){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(a,i){$(this).css(a),$("<div>").addClass("arrow").addClass(i.vertical).addClass(i.horizontal).appendTo(this)}}}),jQuery(document).ready(function(i){i(".scroll").click(function(a){a.preventDefault(),i("html,body").animate({scrollTop:i(this.hash).offset().top},800)})})}),require(["rotas","jquery-ui","datatables-responsive"],function(a){var i=new Rotas,c=i.getBaseUrlCMS();function o(a,i){$(a).DataTable({responsive:!0,processing:!0,deferLoading:1e3,deferRender:!0,searching:!1,data:i,dom:"Bfrtip",bSort:!0,aaSorting:[[0,"desc"]],columns:[{title:"",width:"80px"},{title:""}]})}$.ajax({url:"js/controller.php",type:"GET",dataType:"json",data:{flag:"consulta",rota:i.Publicacoes()},error:function(a){console.log("ERRO no AJAX :"+a),o("#publicacao_formato_dados",""),$(".loading").addClass("hide")},success:function(a){void 0!==a&&0!=a.length?o("#publicacao_formato_dados",function(a){for(var i=a.length,o=new Array(i),t="",e=0;e<i;e++)o[e]=new Array(2),o[e][0]='<div><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span> '+a[e].dt_publicacao+"<div>",t=null!=a[e].tx_link_img_publicacao&&""!=a[e].tx_link_img_publicacao?c+"/imagens/publications/xs-"+a[e].tx_link_img_publicacao:"img/noticia_icon.png",o[e][1]='<ul class="media-list"><li class="media"><a class="pull-left" href="./publicacao.html#/'+a[e].cd_publicacao+'" target="_self"><img class="media-object img-rounded" src="'+t+'" height="80" width="120" onerror="this.src=\'img/noticia_icon.png\';"></a><div class="media-body"><h4 class="media-heading"><a class="btn-link" href="./publicacao.html#/'+a[e].cd_publicacao+'" target="_self">'+a[e].tx_titulo_publicacao+"</a></h4><p>"+a[e].tx_resumo_publicacao+"</p></div></li></ul>";return o}(a)):o("#publicacao_formato_dados",""),$(".loading").addClass("hide"),$("#publicacao_formato_dados").on("draw.dt",function(){verificarContraste()}),$('a[data-toggle="tab"]').on("shown.bs.tab",function(a){$.fn.dataTable.tables({visible:!0,api:!0}).columns.adjust()})}})});