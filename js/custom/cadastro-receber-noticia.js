"use strict";function validaEmail(o){var a=o.substring(0,o.indexOf("@")),e=o.substring(o.indexOf("@")+1,o.length);return 1<=a.length&&3<=e.length&&-1==a.search("@")&&-1==e.search("@")&&-1==a.search(" ")&&-1==e.search(" ")&&-1!=e.search(".")&&1<=e.indexOf(".")&&e.lastIndexOf(".")<e.length-1}require(["jquery-ui","rotas"],function(o){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(o,a){$(this).css(o),$("<div>").addClass("arrow").addClass(a.vertical).addClass(a.horizontal).appendTo(this)}}}),$("#email.form-control").blur(function(o,a){if(validaEmail(this.value)){var e="#"+$("#email.form-control").attr("id")+"1";$("#email.form-control").closest(".form-group").removeClass("has-error").addClass("has-success"),$(e).removeClass("glyphicon-remove").addClass("glyphicon-ok")}else{e="#"+$("#email.form-control").attr("id")+"1";$("#email.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(e).removeClass("glyphicon-ok").addClass("glyphicon-remove")}}),$(".form-group").find(".btn.btn-success").on("click",function(){if(0==grecaptcha.getResponse().length)return jQuery("#labelCaptcha").text("Resolver o Captcha."),!1;jQuery("#labelCaptcha").text("");var o=$("#nome").val(),a=$("#email").val(),e=$("#modalMensagem");if(!validaEmail(a))return $("#email.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),!1;$("#email.form-control").closest(".form-group").removeClass("has-error").addClass("has-success");var s={tx_nome_usuario:o,tx_email_usuario:a},r=new Rotas;$("#loading").show(),$.ajax({url:"js/controller.php",type:"POST",dataType:"json",data:{flag:"consultaPost",rota:r.ReceberNoticia(),parametros:s},error:function(o){if(200!=o.status)return jQuery("#modalTitle").text("Problema na solicitação!"),jQuery("#modalConteudo").text(JSON.parse(o.responseText).msg),e.modal("show"),!1;jQuery("#modalTitle").text("Notícias do Portal"),jQuery("#modalConteudo").text("Cadastro realizado com sucesso."),e.modal("show")},success:function(o){jQuery("#modalTitle").text("Notícias do Portal"),jQuery("#modalConteudo").text("Cadastro realizado com sucesso."),e.modal("show")}})})});