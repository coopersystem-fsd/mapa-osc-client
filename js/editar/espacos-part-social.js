"use strict";function _classCallCheck(o,e){if(!(o instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function o(o,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(o,a.key,a)}}return function(e,n,a){return n&&o(e.prototype,n),a&&o(e,a),e}}(),EspacosPartSocial=function(){function o(){_classCallCheck(this,o)}return _createClass(o,[{key:"ativarEspacosPart",value:function(o,e,n,a,t,l,c,r){i=o[0];t=n.createFactory(l),a.render(t({header:null,dados:i}),document.getElementById("conselhos")),e.addItem("conselhos"),e.addOutro("conselho"),$(".date").datepicker({dateFormat:"dd-mm-yy"});i=o[1];t=n.createFactory(c),a.render(t({header:null,dados:i}),document.getElementById("conferencias")),e.addItem("conferencias"),e.addOutro("conferencia");var i=o[2];r=n.createFactory(r),a.render(r({header:null,dados:i}),document.getElementById("outros_part")),e.addItem("outros_part")}},{key:"iniciarEspacosPartSoc",value:function(o,e,n,a,t,l,c,r,i,s,u){var _=n.partSocial(),d=_.items;return a=t.createFactory(a),l.render(a({dados:d}),document.getElementById(d[0].target)),this.montarEspacosParticipacaoSocial(o,e,_,c,r,i,s,u)}},{key:"montarEspacosParticipacaoSocial",value:function(o,e,n,a,t,l,c,r){var i="js/controller.php";$.ajax({url:i,type:"GET",async:!1,dataType:"json",data:{flag:"consulta",rota:a},error:function(o){console.log("Erro no ajax: "),console.log(o)},success:function(o){a=o}});for(var s=[],u=0;u<a.length;u++)s[u]=a[u].tx_nome_conselho;$.ajax({url:i,type:"GET",async:!1,dataType:"json",data:{flag:"consulta",rota:l},error:function(o){console.log("Erro no ajax: "),console.log(o)},success:function(o){l=o}});for(var _=[],u=0;u<l.length;u++)_[u]=l[u].tx_nome_periodicidade_reuniao_conselho;$.ajax({url:i,type:"GET",async:!1,dataType:"json",data:{flag:"consulta",rota:t},error:function(o){console.log("Erro no ajax: "),console.log(o)},success:function(o){t=o}});for(var d=[],u=0;u<t.length;u++)d[u]=t[u].tx_nome_conferencia;$.ajax({url:i,type:"GET",async:!1,dataType:"json",data:{flag:"consulta",rota:c},error:function(o){console.log("Erro no ajax: "),console.log(o)},success:function(o){c=o}});for(var p=[],u=0;u<c.length;u++)p[u]=c[u].tx_nome_tipo_participacao;var h=[],m=null,f=null,x=null,I=null,g=null,y=null,v=null,F=null,C=null;o.participacao_social&&(m="tx_nome_conselho-0",f="tx_nome_tipo_participacao-0",x="tx_nome_representante_conselho-0",I="tx_nome_periodicidade_reuniao_conselho-0",g="dt_data_inicio_conselho-0",y="dt_data_fim_conselho-0",v="tx_nome_conferencia-0",F="tx_nome_forma_participacao_conferencia-0",C="dt_ano_realizacao-0");var j=e.validateObject(o.participacao_social,""),E=e.validateObject(j.conselho,"0"),O=e.validateObject(j.conferencia,"0"),S=e.validateObject(j.outra,"0"),q=[];if(E){n.items;for(k=0;k<E.length;k++)for(var T in E[k])E[k].hasOwnProperty(T)&&"conselho"==T&&(q.push(e.FormItens("tx_nome_conselho-"+E[k].conselho.id_conselho,"Nome do Conselho",E[k].conselho.tx_nome_conselho,E[k].conselho.ft_conselho,null,"select",s)),E[k].conselho.tx_nome_conselho_outro?q.push(e.FormItens("outro-conselho-"+E[k].conselho.id_conselho,"Identificação do Conselho",E[k].conselho.tx_nome_conselho_outro?E[k].conselho.tx_nome_conselho_outro:"",E[k].conselho.ft_conselho,null,"text")):q.push(e.FormItens("outro-conselho-empty-"+E[k].conselho.id_conselho,"Identificação do Conselho",E[k].conselho.tx_nome_conselho_outro?E[k].conselho.tx_nome_conselho_outro:"",E[k].conselho.ft_conselho,null,"text",null,null,null,!0)),q.push(e.FormItens("tx_nome_tipo_participacao-"+E[k].conselho.id_conselho,"Titularidade",E[k].conselho.tx_nome_tipo_participacao,E[k].conselho.ft_tipo_participacao,null,"select",p)),q.push(e.FormItens("tx_nome_representante_conselho-"+E[k].conselho.id_conselho,"Nome de representante",E[k].representante?E[k].representante[0].tx_nome_representante_conselho:"",E[k].conselho.ft_nome_representante_conselho,null,"text")),q.push(e.FormItens("tx_nome_periodicidade_reuniao_conselho-"+E[k].conselho.id_conselho,"Periodicidade da Reunião",E[k].conselho.tx_nome_periodicidade_reuniao_conselho,E[k].conselho.ft_periodicidade_reuniao,null,"select",_)),q.push(e.FormItens("dt_data_inicio_conselho-"+E[k].conselho.id_conselho,"Data de início de vigência",E[k].conselho.dt_data_inicio_conselho,E[k].conselho.ft_data_inicio_conselho,null,"text",null,null,"date")),q.push(e.FormItens("dt_data_fim_conselho-"+E[k].conselho.id_conselho,"Data de fim de vigência",E[k].conselho.dt_data_fim_conselho,E[k].conselho.ft_data_fim_conselho,null,"text",null,null,"date")));q.push(e.FormItens(m,"Nome do Conselho",null,null,"","select",s,"Insira o nome do conselho de política pública")),q.push(e.FormItens(f,"Titularidade",null,null,"","select",p,"Diga se a OSCs ocupa vaga de titular ou suplente")),q.push(e.FormItens(x,"Nome de representante",null,null,"Insira o nome do representante da OSC no Conselho","text")),q.push(e.FormItens(I,"Periodicidade da Reunião",null,null,"","select",_,"Indique de quanto em quanto tempo as reuniões do Conselho ocorrem")),q.push(e.FormItens(g,"Data de início de vigência",null,null,"Insira a data em que se iniciou a atividade de representante da OSC no Conselho","text",null,null,"date")),q.push(e.FormItens(y,"Data de fim de vigência",null,null,"Insira a data em que se encerrou a atividade de representante da OSC no Conselho","text",null,null,"date")),h.push(q)}$.ajax({url:i,type:"GET",async:!1,dataType:"json",data:{flag:"consulta",rota:r},error:function(o){console.log("Erro no ajax: "),console.log(o)},success:function(o){r=o}});for(var b=[],u=0;u<r.length;u++)b[u]=r[u].tx_nome_forma_participacao_conferencia;q=[];if(O.length){n.items;for(k=0;k<O.length;k++)for(var T in O[k])if(O[k].hasOwnProperty(T)&&("tx_nome_conferencia"==T&&q.push(e.FormItens(T+"-"+O[k].id_conferencia,"Nome da Conferência",O[k].tx_nome_conferencia,O[k].ft_conferencia,null,"select",d)),"tx_nome_conferencia_outro"==T&&(O[k].tx_nome_conferencia_outro?q.push(e.FormItens("outro-conferencia-"+O[k].id_conferencia,"Identificação da Confêrencia",O[k].tx_nome_conferencia_outro?O[k].tx_nome_conferencia_outro:"",O[k].ft_conferencia,null,"text")):q.push(e.FormItens("outro-conferencia-empty-"+O[k].id_conferencia,"Identificação da Confêrencia",O[k].tx_nome_conferencia_outro?O[k].tx_nome_conferencia_outro:"",O[k].ft_conferencia,null,"text",null,null,null,!0))),"tx_nome_forma_participacao_conferencia"==T&&q.push(e.FormItens(T+"-"+O[k].id_conferencia,"Forma de participação na conferência",O[k].tx_nome_forma_participacao_conferencia,O[k].ft_forma_participacao_conferencia,null,"select",b)),"dt_ano_realizacao"==T)){var P=O[k].dt_ano_realizacao;P=P?P.substring(6):P,q.push(e.FormItens(T+"-"+O[k].id_conferencia,"Ano de realização da conferência",P,O[k].ft_ano_realizacao,null,"text",null,null,"ano"))}q.push(e.FormItens(v,"Nome da Conferência",null,null,"","select",d,"Caso a OSC tenha participado, indique aqui o nome da conferência de política pública")),q.push(e.FormItens(C,"Ano de realização da conferência",null,null,"Indique o ano em que se realizou a Conferência","text",null,null,"ano")),q.push(e.FormItens(F,"Forma de participação na conferência",null,null,"","select",b,"Indique qual foi a forma de atuação da OSC nesta Conferência")),h.push(q)}q=[];if(S.length){n.items;for(var k=0;k<S.length;k++)for(var T in S[k])S[k].hasOwnProperty(T)&&"tx_nome_participacao_social_outra"==T&&q.push(e.FormItens(T+"-"+S[k].id_participacao_social_outra,"Atuação em Fóruns, Articulações, Coletivos e Redes de OSCs",S[k].tx_nome_participacao_social_outra,S[k].ft_participacao_social_outra,null,"text"));q.push(e.FormItens("tx_nome_participacao_social_outra-0","Atuação em Fóruns, Articulações, Coletivos e Redes de OSCs",null,null,"Indique em quais outros espaços de participação a OSC atualmente tem atuação, se houver","text",null,null,null,null,!0)),h.push(q)}return $(".date").datepicker({dateFormat:"dd-mm-yy"}),h}}]),o}();