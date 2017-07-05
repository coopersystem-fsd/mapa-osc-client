"use strict";function _classCallCheck(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,a){for(var t=0;t<a.length;t++){var o=a[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(a,t,o){return t&&e(a.prototype,t),o&&e(a,o),a}}(),Projeto=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"getFonteDeRecursosProjeto",value:function(e){return{id:"fonte_recursos",dados:e[Object.keys(e)[0]]}}},{key:"montarProjetos",value:function(e,a){var t=[],o=a.validateObject(e.projeto_abreviado,[]),r={id:"lista_projetos",priority:"2",text:"Projetos, atividades e programas - PAP"};t.push(r);for(var n=3,i=o.length,c=new Array(i),l=0;l<o.length;l++)c[l]=new Array(n),c[l][0]=a.validateObject(o[l].id_projeto,1),c[l][1]=a.validateObject(o[l].tx_nome_projeto,""),c[l][2]="<span className='input-group-btn'><button id='rem_projeto2' className='btn-danger btn'>Remover Projeto</button></span>";t.push(c);for(var n=3,i=o.length,c=new Array(i),l=0;l<o.length;l++)c[l]=new Array(n),c[l][0]=a.validateObject(o[l].id_projeto,1),c[l][1]=a.validateObject(o[l].tx_nome_projeto,""),c[l][2]="<span className='input-group-btn'><button id='rem_projeto2' className='btn-danger btn'>Remover Projeto</button></span>";return t.push(c),t}},{key:"montarProjeto",value:function(e,a,t,o){var r=t.labelsProjeto(),n=[],i=(e.id_projeto,a.validateObject(e.projeto,e)),e=a.validateObject(i[0],i),c=a.validateObject(e.ft_identificador_projeto_externo,"Representante"),l=a.validateObject(e.objetivo_meta,null);for(var s in e)if("area_atuacao"!=s&&"osc_parceira"!=s&&"area_atuacao_outra"!=s&&e.hasOwnProperty(s)&&void 0!==r[s]){var u=s,d=e[s],p=r[s].header,j=r[s].containerClass,v=r[s].removable,_=r[s].type,b=r[s].options,f=r[s].placeholder;if(null===d||d.constructor!==Array){var g=a.InputProjeto(u,d,_,b,v,null,!1,f,c,l),h=a.AgrupadorDeInputs(u,j,p,[g],null);n.push(h)}}e.hasOwnProperty("fonte_de_recursos");a.validateObject(e.area_atuacao,[]);var O=a.validateObject(e.area_atuacao_outra,[]),P=a.validateObject(e.localizacao,[]),m=(a.getTipoProjeto("localizacao_projeto",P),this.getFonteDeRecursosProjeto(a.validateObject(e.fonte_recursos,[])));m.dados=a.validateObject(e.fonte_recursos,[]);for(var y=a.validateObject(e.publico_beneficiado,[]),A=(a.getTipoProjeto("publico_beneficiado",y),a.validateObject(e.financiador_projeto,[])),O=(a.getTipoProjeto("financiador_projeto",A),a.getTipoProjeto("area_atuacao_outra",O)),w=a.validateObject(e.osc_parceira,[]),k=(a.getTipoProjeto("osc_parceira",w),e.osc_parceira?e.osc_parceira.length:0),C=0;C<k;C++)a.validateObject(e.osc_parceira[C].id_osc,null);a.validateObject(e.objetivo_meta)&&e.objetivo_meta.id_objetivo_projeto;for(var I=[m],x=0;x<I.length;x++)if(a.validateObject(I[x].dados,!1)){var T=this.createAgrupadorMultipleInputs(I[x],r,a);n.push(T)}return n}},{key:"carregaProjeto",value:function(e,a,t,o,r){var n={},i=null;if(r){var c=a.getEmptyProject();n.agrupadores=this.montarProjeto(c,o,a,t)}else $.ajax({url:"js/controller.php",type:"GET",async:!1,dataType:"json",data:{flag:"consulta",rota:t.ProjectByID(e)},error:function(e){console.log("Erro no ajax: "),console.log(e)},success:function(e){n.projeto=e}}),i=this.montarProjeto(n.projeto,o,a,t),n.agrupadores=i;return n}},{key:"createAgrupadorMultipleInputs",value:function(e,a,t){var o={type:"remove",value:"Remover"},r={type:"add",value:"Adicionar"},n=e.id,i=a[e.id],c=[],l="",s=t.validateObject(i)?i.removable:"",u=t.validateObject(i)?i.type:"",d=t.validateObject(i)?i.options:"",p=null,j=!1;if(s&&(p=[o],P=[r],j=!0),0===e.dados.length){_=n;l="";g=t.InputProjeto(_,l,u,d,s,p,j);c.push(g)}for(var v=0;v<e.dados.length;v++){var _=n;for(var b in e.dados[v])if(e.dados[v].hasOwnProperty(b))if("fonte_recursos"==n){if("tx_nome_origem_fonte_recursos_projeto"===b){l=e.dados[v][b],d=a[e.id].options;g=t.InputProjeto(_,l,u,d,s,p,j);c.push(g)}}else if("tx"===b.slice(0,2)){l=e.dados[v][b];var f=e.dados[v].cd_area_atuacao_projeto,g=t.InputProjeto(_,l,u,d,s,p,j,null,null,f);c.push(g)}}var h=t.validateObject(i)?i.header:"",O=t.validateObject(i)?i.containerClass:"col-md-3",P=null;return s&&(p=[o],P=[r]),t.AgrupadorDeInputs(n,O,h,c,P)}}]),e}();