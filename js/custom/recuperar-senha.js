"use strict";function validaEmail(e){var a=e.substring(0,e.indexOf("@")),o=e.substring(e.indexOf("@")+1,e.length);return a.length>=1&&o.length>=3&&-1==a.search("@")&&-1==o.search("@")&&-1==a.search(" ")&&-1==o.search(" ")&&-1!=o.search(".")&&o.indexOf(".")>=1&&o.lastIndexOf(".")<o.length-1}require(["react"],function(e){require(["jquery-ui"],function(e){$(".captcha input").checkboxradio()})}),require(["jquery-ui","rotas"],function(e){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(e,a){$(this).css(e),$("<div>").addClass("arrow").addClass(a.vertical).addClass(a.horizontal).appendTo(this)}}}),$("#email.form-control").blur(function(e,a){if(validaEmail(this.value)){o="#"+$("#email.form-control").attr("id")+"1";$("#email.form-control").closest(".form-group").removeClass("has-error").addClass("has-success"),$(o).removeClass("glyphicon-remove").addClass("glyphicon-ok")}else{var o="#"+$("#email.form-control").attr("id")+"1";$("#email.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(o).removeClass("glyphicon-ok").addClass("glyphicon-remove")}});$(".form-group").find(".btn.btn-success").on("click",function(){if(0==grecaptcha.getResponse().length)return jQuery("#labelCaptcha").text("Resolver o Captcha."),!1;jQuery("#labelCaptcha").text("");var e=$("#email").val(),a=$("#modalMensagem"),o=new Rotas;if(!validaEmail(e))return $("#email.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),!1;$("#email.form-control").closest(".form-group").removeClass("has-error").addClass("has-success");var r={tx_email_usuario:e};$.ajax({url:o.RecuperSenha(),type:"POST",dataType:"json",data:r,error:function(e){return jQuery("#modalTitle").text("Problema na solicitação!"),jQuery("#modalConteudo").text("Não foi possível recuperar a senha."),a.modal("show"),!1},success:function(e){jQuery("#modalTitle").text(""),jQuery("#modalConteudo").text(e.responseText),a.modal("show")}})})});