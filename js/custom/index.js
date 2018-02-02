"use strict";require(["jquery-ui"],function(a){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(a,e){$(this).css(a),$("<div>").addClass("arrow").addClass(e.vertical).addClass(e.horizontal).appendTo(this)}}}),jQuery(document).ready(function(a){a(".scroll").click(function(e){e.preventDefault(),a("html,body").animate({scrollTop:a(this.hash).offset().top},800)})})}),require(["nv.d3.lib","graficoParaTabela"],function(a){var e=[{config:[",f",1,""],leg_X:"Região",leg_Y:"Quantidade de OSC",tituloColuna:["Natureza Jurídica","Região","Quantidade de OSCs"],legenda:"Fonte: Elaboração do Ipea com base em dados da Secretaria da Receita Federal (2016).",titulo:"Número de OSCs por natureza jurídica e região, Brasil - 2016",series:[{key:"Associação Privada",values:[{label:"SUDESTE",value:268864},{label:"SUL",value:142398},{label:"NORDESTE",value:184477},{label:"CENTRO-OESTE",value:53663},{label:"NORTE",value:56079},{label:"Não informado",value:3065}]},{key:"Organização Religiosa",values:[{label:"SUDESTE",value:51e3},{label:"SUL",value:13428},{label:"NORDESTE",value:17550},{label:"CENTRO-OESTE",value:9311},{label:"NORTE",value:6539},{label:"Não informado",value:813}]},{key:"Fundacao Privada",values:[{label:"SUDESTE",value:5293},{label:"SUL",value:2001},{label:"NORDESTE",value:3128},{label:"CENTRO-OESTE",value:1167},{label:"NORTE",value:772},{label:"Não informado",value:36}]},{key:"Organização Social",values:[{label:"SUDESTE",value:219},{label:"SUL",value:71},{label:"NORDESTE",value:145},{label:"CENTRO-OESTE",value:101},{label:"NORTE",value:62},{label:"Não informado",value:4}]}]}],t=[{config:[",f",1,""],leg_X:"Tipo de título ou certificação",leg_Y:"Quantidade de OSC",tituloColuna:["Títulos e Certificados","Número de OSC"],legenda:"Fonte: Ministério da Justiça (2017), Ministério da Educação (2017), Ministério da Saúde (2017), Ministério do Desenvolvimento Social (2017).",titulo:"Número de organizações civis com títulos e certificações, Brasil - 2017",key:"GraficoMain 4",values:[{label:"OSCIP/MJ",value:7114},{label:"CEBAS/MDS",value:5487},{label:"CEBAS/MS",value:1363},{label:"CEBAS/MEC",value:944}]}],o=[{config:[",.1%",1,"",",f"],leg_X:"Ano",leg_Y:"Quantidade de OSC",tituloColuna:["","Ano","Valores"],legenda:"Fonte: Elaboração do Ipea, com base em dados da Secretaria da Receita Federal (2016) e RAIS/MTE (2015).<br> * NOTA: em 2016 calculou-se o total de OSCs ativas do país a partir da base de dados da ficha cadastral de CNPJ da Secretaria da Receita Federal – SRF. Esses microdados não estavam disponíveis para análise de 2010 a 2015, quando se utilizou somente a base de dados da RAIS para calcular o total de OSCs. Observou-se na base da SRF milhares de OSCs ativas, mas ausentes da base RAIS/MTE. A alteração na fonte dos dados para calcular o total das OSCs e explica o crescimento observado entre o ano de 2015 e 2016.<br>Consulte a <a href='metodologia.html' target='_self'>seção metodológica</a> para mais detalhes.",titulo:"Total de OSC, por ano (2010-2016)*",series:[{key:"Número de OSCs",bar:!0,color:"#ccf",values:[{label:2010,value:514027},{label:2011,value:534728},{label:2012,value:539792},{label:2013,value:546453},{label:2014,value:509608},{label:2015,value:525591},{label:2016,value:820186}]},{key:"Taxa de Crescimento Acumulado",color:"#ff7f0e",values:[{label:2010,value:0},{label:2011,value:.04},{label:2012,value:.01},{label:2013,value:.012},{label:2014,value:-.067},{label:2015,value:.031},{label:2016,value:.56}]}]}];createMultiBarChart("#graficoMain-1",e),createBarChart("#graficoMain-4",t),createLinePlusBarChart("#graficoMain-5",o),$("#tabelaMain-1").click(function(){createTabela_MultBar_Line(e,!1)}),$("#tabelaMain-4").click(function(){createTabela_Bar_Donut(t)}),$("#tabelaMain-5").click(function(){createTabela_MultBar_Line(o,!1)})}),require(["bootstrap","jquery-ui","rotas"],function(a){function e(a){return a=a.replace(/[ÀÁÂÃÄÅ]/g,"A"),a=a.replace(/[àáâãäå]/g,"a"),a=a.replace(/[ÉÈÊË]/g,"E"),a=a.replace(/[éèêë]/g,"e"),a=a.replace(/[ÍÌÎÏ]/g,"I"),a=a.replace(/[íìîï]/g,"i"),a=a.replace(/[ÓÒÔÕ]/g,"O"),a=a.replace(/[óòôõ]/g,"o"),a=a.replace(/[ÚÙÛÜ]/g,"U"),a=a.replace(/[úùûü]/g,"u"),a=a.replace(/[Ç]/g,"C"),a=a.replace(/[ç]/g,"c")}var t=new Rotas,o="js/controller.php",l="",r=$(".tab-content");r.find(".btn.btn-primary").on("click",function(){var a=r.find(".tab-pane.fade.active.in"),t=a.attr("id"),o=a.find(".form-control").val();o=e(o.trim()).replace(/ /g,"_").replace(/\./g,",").replace(/\+{2,}/g,"_");var l;"organizacao"==t&&""!==o?(l="./resultado-consulta.html?"+t+"="+o+"&tipoBusca=0",location.href=l):""!==(o=$(".response").val())?(l="./resultado-consulta.html?"+t+"="+o,location.href=l):$("#errorLabel").removeClass("hide")}),$("#organizacao .form-control").autocomplete({minLength:3,source:function(a,r){l=e(a.term.trim()).replace(/ /g,"_").replace(/\./g,","),$.ajax({url:o,type:"GET",dataType:"json",data:{flag:"autocomplete",rota:t.AutocompleteOSCByName(l,10,2)},success:function(a){r($.map(a,function(a){return{label:a.tx_nome_osc,value:a.tx_nome_osc,id:a.id_osc}}))},error:function(a){r([])}})},select:function(a,t){var o="./resultado-consulta.html?organizacao="+e(t.item.value.trim()).replace(/[ ]/g,"_").replace(/\./g,",").replace(/\+{2,}/g,"_")+"&tipoBusca=1";location.href=o}}),$("#municipio .form-control").autocomplete({minLength:3,source:function(a,l){$.ajax({url:o,type:"GET",dataType:"json",data:{flag:"autocomplete",rota:t.AutocompleteOSCByCounty(e(a.term).replace(/ /g,"_").replace(/\./g,","),25)},success:function(a){l($.map(a,function(a){return{label:a.edmu_nm_municipio+" - "+a.eduf_sg_uf,value:a.edmu_nm_municipio+" - "+a.eduf_sg_uf,id:a.edmu_cd_municipio}}))},error:function(a){l([])}})},select:function(a,e){$(".response").val(e.item.id);var t="./resultado-consulta.html?municipio="+e.item.id;location.href=t}}),$("#estado .form-control").autocomplete({minLength:3,source:function(a,l){$.ajax({url:o,type:"GET",dataType:"json",data:{flag:"autocomplete",rota:t.AutocompleteOSCByState(e(a.term).replace(/ /g,"_").replace(/\./g,","),10)},success:function(a){l($.map(a,function(a){return{label:a.eduf_nm_uf,value:a.eduf_nm_uf,id:a.eduf_cd_uf}}))},error:function(){l([])}})},select:function(a,e){$(".response").val(e.item.id);var t="./resultado-consulta.html?estado="+e.item.id;location.href=t}}),$("#regiao .form-control").autocomplete({minLength:3,source:function(a,l){$.ajax({url:o,type:"GET",dataType:"json",data:{flag:"autocomplete",rota:t.AutocompleteOSCByRegion(e(a.term).replace(/ /g,"_").replace(/\./g,","),10)},success:function(a){l($.map(a,function(a){return{label:a.edre_nm_regiao,value:a.edre_nm_regiao,id:a.edre_cd_regiao}}))},error:function(){l([])}})},select:function(a,e){$(".response").val(e.item.id);var t="./resultado-consulta.html?regiao="+e.item.id;location.href=t}}),$(document).ready(function(){function a(){var a=window.localStorage.getItem("cd_localidade");""!=a&&null!=a&&void 0!=a||$("#modalLocalidade").modal("show"),i()}function e(){var a=0,e=0,t="",o=$(".MultiCarousel").width(),l=$("body").width();$(".MultiCarousel-inner").each(function(){e+=1;var r=$(this).find(".item").length,i=$(this).parent().attr("data-items");t=i.split(","),$(this).parent().attr("id","MultiCarousel"+e),l>=1200?(a=t[3],n=30+o/a):l>=992?(a=t[2],n=o/a):l>=768?(a=t[2],n=o/a):l>=400?(a=t[1],n=o/a):(a=t[0],n=o/a),$(this).css({transform:"translateX(0px)",width:n*r}),$(this).find(".item").each(function(){$(this).outerWidth(n)}),$(".leftLst").addClass("over"),$(".rightLst").removeClass("over")})}function l(a,e){var t="#"+$(e).parent().attr("id");!function(a,e,t){var o=".MultiCarousel-inner",l="",r=$(e+" "+o).css("transform").match(/-?[\d\.]+/g),i=Math.abs(r[4]);if(0==a)l=parseInt(i)-parseInt(n*t),$(e+" .rightLst").removeClass("over"),l<=n/2&&(l=0,$(e+" .leftLst").addClass("over"));else if(1==a){var c=$(e).find(o).width()-$(e).width();l=parseInt(i)+parseInt(n*t),$(e+" .leftLst").removeClass("over"),l>=c-n/2&&(l=c,$(e+" .rightLst").addClass("over"))}$(e+" "+o).css("transform","translateX("+-l+"px)")}(a,t,$(t).attr("data-slide"))}function r(a,e){$.ajax({url:o,type:"GET",async:!1,dataType:"json",data:{flag:"consulta",rota:function(a){var e=window.localStorage.getItem("cd_localidade"),o=window.localStorage.getItem("cd_latitude"),l=window.localStorage.getItem("cd_longitude");return void 0!=o&&null!=o&&""!=o&&void 0!=l&&null!=l&&""!=l?t.RecuperarOscPorGeolocalizacaoAreaAtuacao(a,o,l):void 0!=e&&null!=e&&""!=e?t.RecuperarOscPorLocalidadeAreaAtuacao(a,e):t.RecuperarOscPorAreaAtuacao(a)}(a)},error:function(a){console.log("Erro no ajax: "),console.log(a)},success:function(a){$("#loading_top_5").hide();var t='<center><h5 style="padding-top: 0px;"><b>'+e+"</b></h5></center>";t+='<div class="table-responsive">',t+='<table class="table table-hover">';var o="<tbody>";if(null!=a&&0!==a.length){for(var l=0;l<a.length&&l<5;l++){o+="<tr>",o+='<th scope="row">'+(l+1)+"</th>",o+='  <td><a class="btn-item" onclick="location.href=\'visualizar-osc.html#'+a[l].id_osc+"';\" >"+a[l].tx_nome_osc+"</a></td>",o+='  <th scope="row"><a class="btn-item" onclick="location.href=\'visualizar-osc.html#'+a[l].id_osc+'\';"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a></th>',o+="</tr>"}o+="</tbody>"}else o+="<tr>",o+='<th scope="row"><center>Nenhuma OSC encontrada.</center></th>',o+="</tr>";t+=o+"</table></div>",$("#top_5_area_atuacao").html(t)}})}function i(){$.ajax({url:o,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:t.AreaAtuacao()},error:function(a){console.log("Erro no ajax: "),console.log(a)},success:function(a){var t="";if(null!=a&&void 0!==a.length){for(var o,i="",n=0;n<a.length;n++)1!=a[n].cd_area_atuacao&&10!=a[n].cd_area_atuacao&&(2==a[n].cd_area_atuacao?(i+='<div class="item active">',o=a[n].cd_area_atuacao,t=a[n].tx_nome_area_atuacao):i+='<div class="item">',i+='<div class="col-xs-12"><a class="btn-item" data-btn='+a[n].cd_area_atuacao+" <center>",i+='<img class="imgAreaAtuacao" src="img/area_atuacao_'+a[n].cd_area_atuacao+'.png" >',i+="<h5><b>"+a[n].tx_nome_area_atuacao+"</b></h5></center></a></div></div>");$(".MultiCarousel-inner").append(i),$(".leftLst, .rightLst").click(function(){$(this).hasClass("leftLst")?l(0,this):l(1,this)}),e(),$(window).resize(function(){e()}),$(".MultiCarousel .item a").on("click",function(){o=$(this).attr("data-btn"),t=$(this).text(),r(o,t)}),r(o,t)}}})}var n="";navigator.geolocation?navigator.geolocation.getCurrentPosition(function(e){var l=e.coords.latitude,r=e.coords.longitude;void 0!=l&&null!=l&&""!=l&&void 0!=r&&null!=r&&""!=r?(window.localStorage.setItem("cd_latitude",l.toLocaleString("PT")),window.localStorage.setItem("cd_longitude",r.toLocaleString("PT")),$.ajax({url:o,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:t.RecuperarMunicipio(l,r)},error:function(e){a()},success:function(a){null!=a&&0!==a.length&&(window.localStorage.setItem("cd_localidade",a[0].cd_localidade),window.localStorage.setItem("nome_localidade",a[0].tx_nome_localidade),$("#btn-localidade").text(a[0].tx_nome_localidade)),i()}})):a()},function(e){a()}):a(),$(".ui-autocomplete-input").keypress(function(a){if(13==a.which)return $(".btn-primary").click(),$(".ui-menu-item").hide(),!1}),$.ajax({url:o,type:"GET",async:!1,dataType:"json",data:{flag:"consulta",rota:t.RecuperarOscAtualizacao()},error:function(a){console.log("Erro no ajax: "),console.log(a)},success:function(a){if($("#loading_top_10").hide(),null!=a&&void 0!==a.length){var e='<div class="table-responsive">';e+='<table class="table table-hover">';for(var t="<tbody>",o=0;o<a.length&&o<10;o++){t+="<tr>",t+='<th scope="row">'+(o+1)+"</th>",t+='  <td><a class="btn-item" onclick="location.href=\'visualizar-osc.html#'+a[o].id_osc+"';\" >"+a[o].tx_nome_osc+"</a></td>",t+='  <th scope="row"><a class="btn-item" onclick="location.href=\'visualizar-osc.html#'+a[o].id_osc+'\';"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a></th>',t+="</tr>"}e+=(t+="</tbody>")+"</table></div>",$("#top_10_atualizacao").html(e)}}})})});
