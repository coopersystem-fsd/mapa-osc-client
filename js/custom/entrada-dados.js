"use strict";function abrirModalAjuda(o){acionarModalAjuda("Ajuda - "+o,jsonModalAjuda[o],"<button type='button' class='btn btn-danger' data-dismiss='modal'>Fechar</button>")}function acionarModalAjuda(o,e,a){$("#modalTitulo").html(""),$("#modalTitulo").html(o),$("#corpoModal").html(""),$("#corpoModal").html(e),$("#btnFooter").html(""),$("#btnFooter").html(a),$("#modalAjuda").modal("show"),verificarContraste()}require(["jquery-ui"],function(o){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(o,e){$(this).css(o),$("<div>").addClass("arrow").addClass(e.vertical).addClass(e.horizontal).appendTo(this)}}}),jQuery(document).ready(function(o){o(".scroll").click(function(e){e.preventDefault(),o("html,body").animate({scrollTop:o(this.hash).offset().top},800)})}),$(".captcha iframe").attr("title","")}),require(["react","jsx!components/Util"],function(o){require(["componenteDropdown"],function(e){var a,t;a=t=["JSON","CSV"];e=o.createFactory(e),ReactDOM.render(e({list:a}),document.getElementById("arquivo_retornado_dropdown")),ReactDOM.render(e({list:["Dia(s)","Semana(s)","Mês(es)"]}),document.getElementById("periodicidade_dropdown")),ReactDOM.render(e({list:t}),document.getElementById("tipo_arquivo_dropdown"))}),require(["jquery-ui","rotas"],function(o){var e={User:window.localStorage.getItem("User"),Authorization:window.localStorage.getItem("Authorization")},a={};a.headers=e;var t=new Rotas;$("input:radio").change(function(){"web_service"===$(this).val()?($("#web_service").show(),$("#arquivo").hide()):($("#arquivo").show(),$("#web_service").hide())});var i;$("#fileUpload").change(function(o){(i=new FormData).append("fileUpload",o.target.files[0]),$("#labelFile").text("")});$(".form-group").find(".btn.btn-success").on("click",function(){return 0==grecaptcha.getResponse().length?($("#labelCaptcha").text("Resolver o Captcha."),!1):($("#labelCaptcha").text(""),""==$("#fileUpload").val()?($("#labelFile").text("Nenhum arquivo selecionado."),!1):($("#labelFile").text(""),a.arquivo=i.getAll("fileUpload")[0],a.tipo_arquivo=$("#tipo_arquivo_dropdown select").val(),void $.ajax({dataType:"json",type:"POST",url:t.EnviarArquivoEstadoMunicipio(),cache:!1,processData:!1,contentType:!1,data:a,error:function(o){$("#modalTitle").text("Entrada de Dados"),$("#modalConteudo").text("Não foi possível enviar o arquivo!"),$("#modalMensagem").modal("show")},success:function(o){$("#modalTitle").text("Entrada de Dados"),$("#modalConteudo").text("Arquivo enviado com sucesso!"),$("#modalMensagem").modal("show")}})))})})});var jsonModalAjuda={"Selecione o arquivo a ser enviado":"Os arquivos enviados para o Mapa das OSCs devem ser enviados em dois formatos <b>CSV</b> ou <b>JSON</b>."};