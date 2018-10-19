"use strict";function abrirProjeto(e){var a=$(e).attr("data");$(a).toggle("slow"),$(e).find(".glyphicon").toggleClass("glyphicon-minus"),verificarContraste()}function abrirModalAjuda(e){acionarModalAjuda("Ajuda - "+e,jsonModalAjuda[e],"<button type='button' class='btn btn-danger' data-dismiss='modal'>Fechar</button>")}function abrirModalRelatorio(e){var a="<fieldset id='escolhaImpressao'><legend>Escolha quais seções para imprimir</legend>";if(a+="<label><input type='checkbox' name='escolha' value='tudo' checked> Todas Seções</label><br><br>",a+="<label><input type='checkbox' name='secao' value='dados_gerais' checked> Dados Gerais</label><br>",a+="<label><input type='checkbox' name='secao' value='areas_de_atuacao' checked> Áreas e Subáreas de Atuação da OSC</label><br>",a+="<label><input type='checkbox' name='secao' value='descricao' checked> Descrição da OSC</label><br>",a+="<label><input type='checkbox' name='secao' value='titulacao' checked> Titulações e Certificações</label><br>",a+="<label><input type='checkbox' name='secao' value='relacao_trabalho' checked> Relações de Trabalho e Governança</label><br>",a+="<label><input type='checkbox' name='secao' value='participacao_social' checked> Espaços de Participação Social</label><br>",a+="<label><input type='checkbox' name='secao' value='projetos' checked> Projetos, atividades e/ou programas</label><br>",a+="<div class='subCheckbox'><label><input type='checkbox' name='secaoProjeto' value='todos_projetos'> Todas as Informações do Projeto</label></div>",a+="<label><input type='checkbox' name='secao' value='recursos_vis' checked> Fontes de recursos anuais da OSC</label><br>",recursos_relatorio.length>0){a+="<div class='subCheckbox'>";for(var o=0;o<recursos_relatorio.length;o++)a+="<label><input type='checkbox' name='secaoRecurso' value='"+recursos_relatorio[o].dt_ano_recursos_osc+"'> "+recursos_relatorio[o].dt_ano_recursos_osc+"</label>";a+="</div>"}var r="<button type='button' class='btn btn-success' data-dismiss='modal' onclick='imprimir()'><span class='glyphicon glyphicon-print' aria-hidden='true'></span> Imprimir</button>";acionarModalAjuda("Gerar "+e,a+="</fieldset>",r+="<button type='button' class='btn btn-danger' data-dismiss='modal'>Fechar</button>"),$("#escolhaImpressao input:checkbox[name=escolha]").click(function(){$(this).is(":checked")?$("#escolhaImpressao input:checkbox[name=secao]").each(function(){$(this).prop("checked",!0)}):$("#escolhaImpressao input:checkbox[name=secao]").each(function(){$(this).prop("checked",!1)})})}function acionarModalAjuda(e,a,o){$("#modalTitulo").html(""),$("#modalTitulo").html(e),$("#corpoModal").html(""),$("#corpoModal").html(a),$("#btnFooter").html(""),$("#btnFooter").html(o),$("#modalAjuda").modal("show"),verificarContraste()}function imprimir(){$("#grafico-progress").parent().hide(),$("#escolhaImpressao input:checkbox[name=secao]:not(:checked)").each(function(){var e=$(this).val();$("#"+e).hide()}),$("#escolhaImpressao input:checkbox[name=secaoProjeto]").is(":checked")&&$("#projetos").find(".panel-collapse").each(function(){$(this).show(),$(this).parent().find(".glyphicon").toggleClass("glyphicon-minus")}),$("#escolhaImpressao input:checkbox[name=secaoRecurso]:checked").each(function(){var e=$(this).val();$("#recursos_vis").find(".panel-title").each(function(){$(this).text().split(" ")[1]==e&&($(this).parent().parent().parent().find(".panel-collapse").show(),$(this).parent().parent().find(".glyphicon").toggleClass("glyphicon-minus"))})}),$("#modalAjuda").hide(),window.print&&window.print(),$("#escolhaImpressao input:checkbox[name=secaoProjeto]").is(":checked")&&$("#projetos").find(".panel-collapse").each(function(){$(this).hide(),$(this).parent().find(".glyphicon").toggleClass("glyphicon-minus")}),$("#escolhaImpressao input:checkbox[name=secaoRecurso]:checked").each(function(){var e=$(this).val();$("#recursos_vis").find(".panel-title").each(function(){$(this).text().split(" ")[1]==e&&($(this).parent().parent().parent().find(".panel-collapse").hide(),$(this).parent().parent().find(".glyphicon").toggleClass("glyphicon-minus"))})}),$("#grafico-progress").parent().show(),$("#escolhaImpressao input:checkbox[name=secao]:not(:checked)").each(function(){var e=$(this).val();$("#"+e).show()})}function verificarBotaoEditar(e){util.verificarPermissao(e)&&($(".btnEditar").append('<a id="btnEditar" type="button" title="Clique para Editar"  class="btn btn-info btn-sm"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span> Editar OSC</a>'),$("#btnEditar").attr("href","editar-osc.html#/"+e))}function addLinkVoltar(e){$("#voltaVisualizar").attr("href","visualizar-osc.html#/"+e);var a=document.referrer;-1==a.indexOf("minhas-oscs")?-1==a.indexOf("editar-osc")?$("#voltaPagAnterior").text("Mapa"):$("#voltaPagAnterior").text("Editar"):$("#voltaPagAnterior").text("Lista de OSCs")}var idOsc,absUrl,rotas,recursos_relatorio,controller=angular.module("oscApp",[]),util=new Util;controller.controller("OscCtrl",["$http","$location","$scope","$filter",function(e,a,o,r){absUrl=a.$$absUrl;var s=this;idOsc=window.location.href.substr(window.location.href.lastIndexOf("/")+1),void 0==o.currentPage&&(o.currentPage=0),o.pageSize=10,o.projs=[],o.q="",rotas=new Rotas,s.carregarDadosGerais=function(){e({url:rotas.OSCByID(idOsc),method:"GET"}).then(function(e){if(void 0==e.data.msg){s.osc=e.data;var a=e.data.projeto.projeto;o.projs=void 0!=a?a:"",s.msg="",void 0!=e.data.recursos&&(recursos_relatorio=e.data.recursos.recursos)}else s.msg=e.data.msg})},o.getData=function(){return r("filter")(o.projs,o.q)},o.numberOfPages=function(){return Math.ceil(o.getData().length/o.pageSize)},o.range=function(){for(var e=[],a=1;a<=o.numberOfPages();a++)e.push(a);return e},o.novaPagina=function(e){o.currentPage=e-1},o.paginaCorrente=function(e){var a=e-1;return o.currentPage==a}}]),controller.filter("startFrom",function(){return function(e,a){return a=+a,e.slice(a)}}),controller.filter("unique",function(){return function(e,a){var o=[],r=[];return angular.forEach(e,function(e){var s=e[a];-1===r.indexOf(s)&&(r.push(s),o.push(e))}),o}}),controller.filter("tel",function(){return function(e){if(null!==e&&void 0!==e&&""!==e){var a=e+"";return 11===(a=a.replace(/\D/g,"")).length?a=0===a[0]?a.replace(/^(\d{4})(\d{3})(\d{4})/,"$1-$2-$3"):a.replace(/^(\d{2})(\d{5})(\d{4})/,"($1) $2-$3"):10===a.length?a=a.replace(/^(\d{2})(\d{4})(\d{4})/,"($1) $2-$3"):9===a.length?a=a.replace(/^(\d{0})(\d{5})(\d{4})/,"($1) $2-$3"):8===a.length&&(a=a.replace(/^(\d{0})(\d{4})(\d{4})/,"($1) $2-$3")),a}return"Não informado"}}),controller.filter("icone",function(){return function(e){if(null!==e&&void 0!==e&&""!==e){return"Representante de OSC"==e||"Representante"==e?"img/dado_representante.png":"img/base_dados.png"}return""}}),controller.filter("icon_title",function(){return function(e){if(null!==e&&void 0!==e&&""!==e){return"Representante de OSC"==e||"Representante"==e?"Informação preenchida pela Organização":"Informação oficial. Fonte "+e}return""}}),controller.filter("icon_class",function(){return function(e){if(null!==e&&void 0!==e&&""!==e){return"Representante de OSC"==e||"Representante"==e?"imgDadoEditavel":"imgDadoOficial"}return""}}),controller.filter("verificarLink",function(){return function(e){if(null!==e&&void 0!==e&&""!==e){var a=e;return e.startsWith("http")||(a="http://"+e),a}return""}}),require(["jquery-ui","rotas"],function(e){function a(e){var a="sem_medalha.png";e>=50&&e<70?a="bronze.png":e>=70&&e<90?a="prata.png":e>=90&&e<99?a="ouro.png":100==e&&(a="diamante.png");var o='<a href="metodologia.html" title="Conquista referente ao Índice de Preenchimento."><img src="img/'+a+'" class="medalha"></a>';$(".divImg").append(o)}var o=new Rotas;$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(e,a){$(this).css(e),$("<div>").addClass("arrow").addClass(a.vertical).addClass(a.horizontal).appendTo(this)}}}),jQuery(document).ready(function(e){idOsc=window.location.href.substr(window.location.href.lastIndexOf("/")+1),e("#loading").hide(),e(".conteudo_loading .section").css("visibility","visible"),e(".fb-share-button").attr("data-href",window.location.href),verificarBotaoEditar(idOsc),addLinkVoltar(idOsc),e(".scroll").click(function(a){a.preventDefault(),e("html,body").animate({scrollTop:e(this.hash).offset().top},800)}),e("#voltaPagAnterior").on("click",function(){history.go(-1)}),setTimeout(function(){verificarContraste()},3e3),window.onload=function(){verificarContraste(),e(".social iframe").each(function(){e(this).attr("title","")})},e.ajax({url:o.BarraTransparencia(idOsc),type:"GET",async:!0,dataType:"json",error:function(a){console.log("Erro no ajax: "),console.log(a),e("#grafico-progress").parent().hide()},success:function(e){if(null!=e){var o={values:[{id:"DG",order:1,score:e.transparencia_dados_gerais,weight:e.peso_dados_gerais,color:"#9E0041",label:"Dados Gerais"},{id:"ASAO",order:1,score:e.transparencia_area_atuacao,weight:e.peso_area_atuacao,color:"#E1514B",label:"Áreas e Subáreas de Atuação da OSC"},{id:"DO",order:1,score:e.transparencia_descricao,weight:e.peso_descricao,color:"#F47245",label:"Descrição da OSC"},{id:"TC",order:1,score:e.transparencia_titulos_certificacoes,weight:e.peso_titulos_certificacoes,color:"#FB9F59",label:"Titulações e Certificações"},{id:"RTG",order:1,score:e.transparencia_relacoes_trabalho_governanca,weight:e.peso_relacoes_trabalho_governanca,color:"#6CC4A4",label:"Relações de Trabalho e Governança"},{id:"EPS",order:1,score:e.transparencia_espacos_participacao_social,weight:e.peso_espacos_participacao_social,color:"#4D9DB4",label:"Espaços de Participação Social"},{id:"PAP",order:1,score:e.transparencia_projetos_atividades_programas,weight:e.peso_projetos_atividades_programas,color:"#4776B4",label:"Projetos, atividades e/ou programas"},{id:"FRAO",order:1,score:e.transparencia_fontes_recursos,weight:e.peso_fontes_recursos,color:"#5E4EA1",label:"Fontes de recursos anuais da OSC"}]};perfil(o.values),a(parseInt(e.transparencia_osc))}}})})});var jsonModalAjuda={"Dados Gerais":"Os campos abaixo trazem informações mais gerais sobre a OSC. Essas informações podem ser preenchidas ou editadas pelo(a) representante da OSC cadastrado(a) no Mapa, com a exceção do endereço, que é informação oficial proveniente da RAIS (Relação Anual de Informações Sociais) do Ministério do Trabalho.","Áreas e Subáreas de Atuação da OSC":"A seção informa, em primeiro lugar, a atividade econômica da OSC proveniente da declaração da RAIS (Relação Anual de Informações Sociais) do Ministério do Trabalho. Informações adicionais acerca de outras áreas e subáreas de atuação da organização podem ser adicionadas pelo representante da OSC.","Descrição da OSC":"Aqui a OSC pode contar um pouco de sua história, identificar a sua missão e visão (quando houver) e finalidades (previstas no seu estatuto). Os campos podem ser preenchidos pelo(a) representante da OSC cadastrado(a) no Mapa.","Titulações e Certificações":"Essa seção indica os títulos (Utilidade pública estadual ou municipal), qualificações (OSCIP) e certificações (CEBAS) concedidos pelo Poder Público à OSC.<br><br>Para saber mais sobre cada um dos títulos ou certificações, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>.","Relações de Trabalho e Governança":"Aqui o(a) representante da OSC pode indicar nominalmente quem compõe o quadro de dirigentes e de conselheiros da sua organização, além de preencher o número de trabalhadores voluntários da entidade. Isso garante transparência para quem busca informações sobre a OSC. Os campos relativos ao número de empregados formais provêm das informações lançadas na RAIS/MTE.","Espaços de Participação Social":"Nesse espaço, o(a) representante da OSC pode indicar a participação em espaços colegiados com o Poder Público (conselhos de políticas públicas), as oportunidades que teve de integrar espaços que traçaram diretrizes de políticas (conferências de políticas públicas), bem como outros espaços de participação compartilhados com o Poder Público ou autoorganizados pela própria sociedade civil (fóruns, redes etc.).<br><br>Para saber mais sobre cada um dos espaços de participação social, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>.","Projetos, atividades e/ou programas":"Nesse espaço, o(a) representante da OSC pode trazer com riqueza de informações os trabalhos que a organização desenvolve (em projetos, atividades ou programas), especificando suas fontes de recursos, público envolvido, dentre outras informações. Aqui constarão também as informações oficiais de parcerias celebradas com o Poder Público, em respeito à Lei de Acesso à Informação.<br><br>Para saber mais sobre os termos referentes a parcerias e fontes de recursos das OSCs, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>.","Fontes de recursos anuais da OSC":"Essa seção informa o somatório de todos os recursos por fonte autodeclarados pela OSC ano a ano."};