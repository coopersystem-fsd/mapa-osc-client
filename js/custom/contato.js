"use strict";function validaEmail(o){var s=o.substring(0,o.indexOf("@")),a=o.substring(o.indexOf("@")+1,o.length);return s.length>=1&&a.length>=3&&-1==s.search("@")&&-1==a.search("@")&&-1==s.search(" ")&&-1==a.search(" ")&&-1!=a.search(".")&&a.indexOf(".")>=1&&a.lastIndexOf(".")<a.length-1}require(["react"],function(o){require(["jquery-ui","rotas"],function(o){$(".captcha input").checkboxradio(),$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(o,s){$(this).css(o),$("<div>").addClass("arrow").addClass(s.vertical).addClass(s.horizontal).appendTo(this)}}});var s=new Rotas;$.ajax({url:"js/controller.php",type:"GET",dataType:"json",data:{flag:"consulta",rota:s.ModuloBySlug("contato")},error:function(o){console.log("ERRO no AJAX :"+o)},success:function(o){var s="";if(o.length>0&&(s='<div class="row"><div class="col-md-12"><h1 class="text-primary">'+o[0].modulos.tx_titulo_modulo+"</h1><hr></div></div>",s+='<div class="row"><div class="col-md-12">'+o[0].modulos.tx_descricao_modulo+"</div></div>",o[0].itens.length>0))for(var a in o[0].itens)s+='<div class="row"><div class="col-md-12"><h3 class="subTitulo">'+o[0].itens[a].tx_titulo_itens+"</h3>",s+='<div class="text-justify txtBloco">'+o[0].itens[a].tx_descricao_itens+"</div>",s+='<a href="#header" name="header" class="scroll topo">Voltar para o topo</a></div></div>';$("#contato").prepend(s)}}),$("#email.form-control").blur(function(o,s){if(validaEmail(this.value)){a="#"+$("#email.form-control").attr("id")+"1";$("#email.form-control").closest(".form-group").removeClass("has-error").addClass("has-success"),$(a).removeClass("glyphicon-remove").addClass("glyphicon-ok")}else{var a="#"+$("#email.form-control").attr("id")+"1";$("#email.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(a).removeClass("glyphicon-ok").addClass("glyphicon-remove")}});$(".form-group").find(".btn.btn-success").on("click",function(){if(0==grecaptcha.getResponse().length)return jQuery("#labelCaptcha").text("Resolver o Captcha."),!1;jQuery("#labelCaptcha").text("");var o=$("#assunto :selected").text(),s=$("#nome").val(),a=$("#email").val(),e=$("#mensagem").val(),t=$("#modalMensagem");if(!validaEmail(a))return $("#email.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),!1;$("#email.form-control").closest(".form-group").removeClass("has-error").addClass("has-success");var r={assunto:o,nome:s,email:a,mensagem:e},l=new Rotas;$("#loading").show(),$.ajax({type:"POST",url:"js/controller.php",data:{flag:"consultaPost",rota:l.Contato(),parametros:r},dataType:"json",success:function(o){console.log(o.responseText),t.modal("show")},error:function(o){return console.log(o),500==o.status&&(jQuery("#modalTitle").text("Problema na solicitação!"),jQuery("#modalConteudo").text("Sistema indisponível no momento. Por favor, tente mais tarde.")),t.modal("show"),!1},complete:function(){$("#loading").hide()}})})})});