"use strict";function getParameter(a,e){e||(e=location.href);var o="[\\?&]"+(a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]"))+"=([^&#]*)",i=new RegExp(o).exec(e);return null==i?null:i[1]}require(["jquery-ui"],function(a){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(a,e){$(this).css(a),$("<div>").addClass("arrow").addClass(e.vertical).addClass(e.horizontal).appendTo(this)}}})});var urlRota,type_http;require(["rotas","jquery-ui","datatables-responsive","leafletCluster","simplePagination","util"],function(a){function e(a){return a=a.replace(/[ÀÁÂÃÄÅ]/g,"A"),a=a.replace(/[àáâãäå]/g,"a"),a=a.replace(/[ÉÈÊË]/g,"E"),a=a.replace(/[éèêë]/g,"e"),a=a.replace(/[ÍÌÎÏ]/g,"I"),a=a.replace(/[íìîï]/g,"i"),a=a.replace(/[ÓÒÔÕ]/g,"O"),a=a.replace(/[óòôõ]/g,"o"),a=a.replace(/[ÚÙÛÜ]/g,"U"),a=a.replace(/[úùûü]/g,"u"),a=a.replace(/[Ç]/g,"C"),a=a.replace(/[ç]/g,"c")}function o(a,e){var o;$("#loading").removeClass("hide"),$("#resultadoconsulta_formato_dados").hide(),e?(type_http="POST",o=C):(type_http="GET",o=null),$.ajax({url:a,type:type_http,dataType:"json",data:o,error:function(a){console.log("Erro no ajax: "+a)},success:function(a){if("Nenhuma Organização encontrada!"!==a){var e=a.length,o=new Array(e),i=0,r="Dado não informado.";for(var n in a)if("0"!=n){o[i]=new Array(6);var t=null!==a[n][4]?a[n][4]:"img/camera.jpg";o[i][0]='<img class="img-circle media-object" src='+t+' height="64" width="64">',o[i][1]=null!==a[n][0]?a[n][0]:r,o[i][2]=null!==a[n][1]?a[n][1]:r,o[i][3]=null!==a[n][2]?a[n][2]:r,o[i][4]=null!==a[n][3]?a[n][3]:r,o[i][5]='<button type="button" onclick="location.href=\'visualizar-osc.html#'+n+'\';" class="btn btn-info"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Detalhar</button>',i++}if(void 0!==o[0]){var s=$("#resultadoconsulta_formato_dados").DataTable({responsive:!0,processing:!0,deferLoading:1e3,deferRender:!0,searching:!1,data:o,dom:"Bfrtip",bPaginate:!1,bSort:!0,aaSorting:[[1,"asc"]],columns:[{title:"",width:50},{title:"Nome da OSC",width:200},{title:"CNPJ"},{title:"Natureza Jurídica"},{title:"Endereço"},{title:"Detalhar"}],aoColumnDefs:[{bSortable:!1,aTargets:[0]},{bSortable:!1,aTargets:[5]},{bSortable:!1,aTargets:[4]}],autoWidth:!0});s.destroy(),s.draw(),$("#resultadoconsulta_formato_dados").show(),$("#loading").addClass("hide")}else $("#modalMensagem").modal({backdrop:"static",keyboard:!1}),$("#modalTitle").text("Nenhuma OSC encontrada!"),"avancado"!==B&&"municipio"!==B?$("#modalConteudo").text('Sua pesquisa "'+decodeURIComponent(k)+'" não retornou nenhuma OSC.'):$("#modalConteudo").text("Sua pesquisa não retornou nenhuma OSC."),$("#modalMensagem").modal("show")}else $("#modalMensagem").modal({backdrop:"static",keyboard:!1}),$("#modalTitle").text("Nenhuma OSC encontrada!"),"avancado"!==B&&"municipio"!==B?$("#modalConteudo").text('Sua pesquisa "'+decodeURIComponent(k)+'" não retornou nenhuma OSC.'):$("#modalConteudo").text("Sua pesquisa não retornou nenhuma OSC."),$("#modalMensagem").modal("show")}}),$("#resultadoconsulta_formato_dados").on("draw.dt",function(){verificarContraste()})}function i(a){for(var e in a)if("0"!=e){var o=function(a,e,o){if(""!==e&&null!==e||null!==o&&""!==o){var i=new PruneCluster.Marker(e,o);return i.data.ID=a,S.PrepareLeafletMarker=function(a,e){a.on("click",function(){!function(a,e){e.bindPopup('<img id="loading" src="img/loading.gif" style="padding-top: 10px; padding-left: 10px;"/>').openPopup(),$.ajax({url:G.OSCPopUpByID(a),type:"GET",dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a)},success:function(o){if(void 0!==o){var i=(null!==o.tx_endereco?o.tx_endereco:"")+" - "+(null!==o.tx_bairro?o.tx_bairro:""),r='<div class="mapa_organizacao clearfix"><span id="spantitle" class="magneticTooltip"><button id="title" class="btn-link"  onclick=location.href="visualizar-osc.html#'+a+'"><h4>'+(null!==o.tx_nome_osc?o.tx_nome_osc:"Dado não informado.")+'</h4></button></span><div class="coluna1"><strong></strong><strong>Endereço: </strong>'+i+"<br><strong>Atividade Econômica: </strong>"+(null!==o.tx_nome_atividade_economica?o.tx_nome_atividade_economica:"Dado não informado.")+"<br><strong>Natureza Jurídica: </strong>"+(null!==o.tx_nome_natureza_juridica?o.tx_nome_natureza_juridica:"Dado não informado.")+'<br><br><div align="center"><button type = button class="btn btn-info" onclick=location.href="visualizar-osc.html#'+a+'"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Detalhar</button></div></div></div>';e.bindPopup(r).openPopup()}}})}(e.ID,a)})},S.RegisterMarker(i),S}return null}(e,a[e][0],a[e][1]);null!==o&&P.addLayer(o)}$("#loadingMapModal").hide(),S.ProcessView()}function r(a){var e=a.target;e.setStyle({weight:5,color:"#666",dashArray:"",fillOpacity:.7}),L.Browser.ie||L.Browser.opera||e.bringToFront(),"GO"==e.feature.properties.Name&&e.bringToBack(),V.update(e.feature.properties)}function n(a){l.resetStyle(a.target),V.update()}function t(a){var e=a.target;P.fitBounds(e.getBounds())}function s(a){return a>6e4?"#800026":a>45e3?"#E31A1C":a>3e4?"#FC4E2A":a>15e3?"#FEB24C":a>1e3?"#FED976":"#FFEDA0"}function c(a,e){var s;"regiao"==e||"todos"==e?s="labelClassRegiao":"estado"==e&&(s="labelClassEstado");for(var l in a){var u=L.divIcon({id:a[l].id_regiao,className:s,html:"<p>"+a[l].nr_quantidade_osc_regiao+"</p>"});b[a[l].id_regiao]=a[l].nr_quantidade_osc_regiao;var m=function(a,e,s,l,u){if(""!==s&&null!==s||null!==l&&""!==l){var m;return"regiao"==u||"todos"==u?m=L.marker([s,l],{icon:a}).on("click",function(a){var e=a.target.options.icon.options.id;$("#loadingMapModal").show(),$.ajax({url:G.ClusterEstadoPorRegiao(e),type:"GET",dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a)},success:function(i){if(o(urlRota,R),void 0!==i.length){for(var r=0,n=0;n<i.length;n++)r+=i[n].nr_quantidade_osc_regiao;d(r)}else d(Object.keys(i).length-1);void 0!==i&&(P.setView([a.target._latlng.lat,a.target._latlng.lng],5),P.removeLayer(a.target),delete M[e],c(i,"estado"))}})}):"estado"==u&&(m=L.marker([s,l],{icon:a}).on("click",function(a){var e=a.target.options.icon.options.id;$("#loadingMapModal").show(),$.ajax({url:G.OSCByStateInMap(e),type:"GET",dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a)},success:function(s){if(o(urlRota,R),void 0!==s.length){for(var c=0,l=0;l<s.length;l++)c+=s[l].nr_quantidade_osc_regiao;d(c)}else d(Object.keys(s).length-1);if(void 0!==s){P.setView([a.target._latlng.lat,a.target._latlng.lng],6),P.removeLayer(a.target);var u=g[e];u.off(),u.on({mouseover:r,mouseout:n,click:t}),i(s)}}})})),m}}(u,a[l].id_regiao,a[l].geo_lat_centroid_regiao,a[l].geo_lng_centroid_regiao,e);v.addLayer(m),"estado"==e?f[a[l].id_regiao]=m:"regiao"!=e&&"todos"!=e||(M[a[l].id_regiao]=m)}y||(v.addTo(P),y=!0),$("#loadingMapModal").hide()}function d(a){$(".pagination").pagination({items:a,itemsOnPage:10,hrefTextPrefix:"#",prevText:"Anterior",nextText:"Próximo",onPageClick:function(a){!function(a){null===a&&(a=0);var e=10*parseInt(a)-10;"avancado"==B?(urlRota=G.ConsultaAvancadaLista(e),R=!0):"municipio"==B?urlRota=G.OSCByCounty(k,e):"estado"==B?urlRota=G.OSCByState(k,e):"regiao"==B?urlRota=G.OSCByRegion(k,e):"todos"==B?urlRota=G.AllOSC(e):"organizacao"==B&&(urlRota=G.OSCByName(getParameter("organizacao"),e,getParameter("tipoBusca")));o(urlRota,R)}(a)}})}var l,u,m,p=new Util,b={},_={},g={},f={},M={},v=L.layerGroup(),A=L.layerGroup(),h=L.layerGroup(),y=!1,I=!0,R=!1,N=!1,E="",x="",C={},j="",X=18,O={center:new L.LatLng(-16.55555555,-60.55555555),zoom:4,minZoom:4},P=new L.Map("map",O),S=new PruneClusterForLeaflet,T=L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",{maxZoom:X,attribution:'&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'}),q=L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYW9zY3MiLCJhIjoiY2owbDJpYWxwMDM3dTMzbzh6dDU2bnpzdyJ9._dh2UCWnAeNeG0ZL5sQ5gA",{id:"mapbox.dark",attribution:'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>'}),F=L.tileLayer("http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",{maxZoom:20,subdomains:["mt0","mt1","mt2","mt3"]});P.addLayer(F),P.addLayer(q),P.addLayer(T);var D=new L.Control.FullScreen;P.addControl(D);var z,B,G=new Rotas,w=void 0!==window.location.href.split("?")[1]?window.location.href.split("?")[1].split("="):null,J=$("#buscarPerfil .tab-content");if(J.find(".btn.btn-primary").on("click",function(){var a=J.find(".tab-pane.fade.active.in"),o=a.attr("id"),i=a.find(".form-control").val();i=e(i.trim()).replace(/ /g,"_").replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g,"").replace(/\./g,",").replace(/\+{2,}/g,"_"),"organizacao"==o&&""!==i?(u="./resultado-consulta.html?"+o+"="+i+"&tipoBusca=0",location.href=u):""!==(i=$(".response").val())?(u="./resultado-consulta.html?"+o+"="+i,location.href=u):$("#errorLabel").removeClass("hide")}),$("#organizacao .form-control").autocomplete({minLength:3,source:function(a,o){j=e(a.term.trim()).replace(/ /g,"_").replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g,"").replace(/\./g,","),$.ajax({url:G.AutocompleteOSCByName(j,10,0),type:"GET",dataType:"json",success:function(a){o($.map(a,function(a){return{label:a.tx_nome_osc,value:a.tx_nome_osc,id:a.id_osc}}))},error:function(a){o([])}})},select:function(a,o){u="./resultado-consulta.html?organizacao="+e(o.item.value.trim()).replace(/ /g,"_").replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g,"").replace(/\./g,",").replace(/\+{2,}/g,"_")+"&tipoBusca=1",location.href=u}}),$("#municipio .form-control").autocomplete({minLength:3,source:function(a,o){$.ajax({url:G.AutocompleteOSCByCounty(e(a.term).replace(/ /g,"_").replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g,"").replace(/\./g,","),25),type:"GET",dataType:"json",success:function(a){o($.map(a,function(a){return{label:a.edmu_nm_municipio+" - "+a.eduf_sg_uf,value:a.edmu_nm_municipio+" - "+a.eduf_sg_uf,id:a.edmu_cd_municipio}}))},error:function(a){o([])}})},select:function(a,e){$(".response").val(e.item.id),u="./resultado-consulta.html?municipio="+e.item.id,location.href=u}}),$("#estado .form-control").autocomplete({minLength:3,source:function(a,o){$.ajax({url:G.AutocompleteOSCByState(e(a.term).replace(/ /g,"_").replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g,"").replace(/\./g,","),10),type:"GET",dataType:"json",success:function(a){o($.map(a,function(a){return{label:a.eduf_nm_uf,value:a.eduf_nm_uf,id:a.eduf_cd_uf}}))},error:function(){o([])}})},select:function(a,e){$(".response").val(e.item.id),u="./resultado-consulta.html?estado="+e.item.id,location.href=u}}),$("#regiao .form-control").autocomplete({minLength:3,source:function(a,o){$.ajax({url:G.AutocompleteOSCByRegion(e(a.term).replace(/ /g,"_").replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g,"").replace(/\./g,","),10),type:"GET",dataType:"json",success:function(a){o($.map(a,function(a){return{label:a.edre_nm_regiao,value:a.edre_nm_regiao,id:a.edre_cd_regiao}}))},error:function(){o([])}})},select:function(a,e){$(".response").val(e.item.id),u="./resultado-consulta.html?regiao="+e.item.id,location.href=u}}),$(".ui-autocomplete-input").keypress(function(a){if(13==a.which)return $(".btn-primary").click(),$(".ui-menu-item").hide(),!1}),null!==w){B=w[0];var k=w[1];if(k=k.replace(/\./g,""),k=k.split("&")[0],"organizacao"==B)urlRota=G.OSCByName(getParameter("organizacao"),0,getParameter("tipoBusca")),z=G.OSCByNameInMap(getParameter("organizacao"),getParameter("tipoBusca")),I=!1,N=!0;else if("municipio"==B)urlRota=G.OSCByCounty(k,0),z=G.OSCByCountyInMap(k),I=!1,N=!0,m=k,E="do município ",x="municipio.png";else if("estado"==B)urlRota=G.OSCByState(k,0),z=G.ClusterEstadoPorRegiao(k),N=!0,m=k,E="do estado ",x="estado.png";else if("regiao"==B)urlRota=G.OSCByRegion(k,0),z=G.ClusterRegiao(k),N=!0,m=k,E="da região ",x="regiao.png";else if("avancado"==B){if(C.avancado=window.localStorage.getItem("params_busca_avancada"),"{}"==C.avancado||p.contains('{"IDH":{',C.avancado)?(B="todos",z=G.ClusterPais(),urlRota=G.AllOSC(0)):(urlRota=G.ConsultaAvancadaLista(0),z=G.ConsultaAvancadaMapa(),I=!1,R=!0),function(a,e){if("avancado"==e){var o=JSON.parse(a),i=o.dadosGerais,r="<b><u>Filtros utilizados:</u></b> ",n=!1;if(i){i.tx_razao_social_osc&&(r+="<b><i>Nome da OSC:</i></b> "+i.tx_razao_social_osc+", "),i.tx_nome_regiao&&(r+="<b><i>Região:</i></b> "+i.tx_nome_regiao+", "),i.tx_nome_fantasia_osc&&(r+="<b><i>Nome Fantasia:</i></b> "+i.tx_nome_fantasia_osc+", "),i.tx_nome_uf&&(r+="<b><i>Estado:</i></b> "+i.tx_nome_uf+", "),i.cd_identificador_osc&&(r+="<b><i>CNPJ:</i></b> "+i.cd_identificador_osc+", "),i.cd_situacao_imovel_osc&&$.ajax({url:G.SituacaoImovel_id(i.cd_situacao_imovel_osc),type:"GET",async:!1,dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){a.length>0&&(r+="<b><i>Situação do Imóvel:</i></b> "+a[0].tx_nome_situacao_imovel+", ")}}),(i.anoFundacaoMIN||i.anoFundacaoMAX)&&(r+="<b><i>Ano de Fundação</i></b> ",i.anoFundacaoMIN&&(r+="<b><i>maior que:</i></b> "+i.anoFundacaoMIN+", "),i.anoFundacaoMAX&&(r+="<b><i>menor que:</i></b> "+i.anoFundacaoMAX+", ")),i.tx_nome_municipio&&(r+="<b><i>Município:</i></b> "+i.tx_nome_municipio+", ");var t="<b><i>Natureza Jurídica:</i></b> ";i.naturezaJuridica_associacaoPrivada&&(t+="Associação Privada, ",n=!0),i.naturezaJuridica_fundacaoPrivada&&(t+="Fundação Privada, ",n=!0),i.naturezaJuridica_organizacaoReligiosa&&(t+="Organização Religiosa, ",n=!0),i.naturezaJuridica_organizacaoSocial&&(t+="Organização Social, ",n=!0),i.naturezaJuridica_outra&&(t+="Não informado, ",n=!0),n&&(r+=t),i.cd_objetivo_osc&&$.ajax({url:G.Objetivos_ODS_id(i.cd_objetivo_osc),type:"GET",async:!1,dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){a.length>0&&(r+="<b><i>Objetivos do Desenvolvimento Sustentável - ODS:</i></b> "+a[0].tx_nome_objetivo_projeto+", ")}}),i.cd_meta_osc&&$.ajax({url:G.Metas_ODS_Id(i.cd_meta_osc),type:"GET",async:!1,dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){a.length>0&&(r+="<b><i>Metas Relacionadas ao ODS:</i></b> "+a[0].tx_nome_meta_projeto+", ")}})}var s=o.atividadeEconomica;s&&(r+="<b><i>Atividade Econômica (CNAE):</i></b> "+s.tx_atividade_economica+", ");var c=o.areasSubareasAtuacao;if(c){var d=[];$.ajax({url:G.AreaAtuacao(),type:"GET",async:!1,dataType:"json",error:function(a){console.log("Erro no ajax: ")},success:function(a){for(var e in c){var o=parseInt(e.split("cd_area_atuacao-")[1]);void 0!=o&&$.each(a,function(a,e){o==e.cd_area_atuacao&&-1===d.indexOf(e.tx_nome_area_atuacao)&&d.push(e.tx_nome_area_atuacao)})}$.ajax({url:G.SubAreaAtuacao(),type:"GET",async:!1,dataType:"json",error:function(a){console.log("Erro no ajax: ")},success:function(a){for(e in c){var o=parseInt(e.split("cd_subarea_atuacao-")[1]);void 0!=o&&$.each(a,function(a,e){o==e.cd_subarea_atuacao&&-1===d.indexOf(e.tx_nome_subarea_atuacao)&&d.push(e.tx_nome_subarea_atuacao)})}d.length>0&&(r+="<b><i>Área e Subárea de Atuação:</i></b> "+d.join(", ")+", ")}})}})}var l=o.titulacoesCertificacoes;if(l){var u=[];$.ajax({url:G.Busca_Certificado(),type:"GET",async:!1,dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){var e={1:"titulacao_entidadeAmbientalista",2:"titulacao_cebasEducacao",3:"titulacao_cebasSaude",4:"titulacao_oscip",5:"titulacao_utilidadePublicaFederal",6:"titulacao_cebasAssistenciaSocial",7:"titulacao_utilidadePublicaEstadual",8:"titulacao_utilidadePublicaMunicipal",9:"titulacao_naoPossui"};for(var o in l)for(var i in e)if(e[i]==o)for(var n in a)a[n].cd_certificado==i&&-1===u.indexOf(a[n].tx_nome_certificado)&&u.push(a[n].tx_nome_certificado);u.length>0&&(r+="<b><i>Titulações e Certificações:</i></b> "+u.join(", ")+", ")}})}var m=o.relacoesTrabalhoGovernanca;m&&(m.tx_nome_dirigente&&(r+="<b><i>Nome do Dirigente:</i></b> "+m.tx_nome_dirigente+", "),m.tx_cargo_dirigente&&(r+="<b><i>Cargo do Dirigente:</i></b> "+m.tx_cargo_dirigente+", "),m.tx_nome_conselheiro&&(r+="<b><i>Nome do Membro do Conselho Fiscal:</i></b> "+m.tx_nome_conselheiro+", "),(m.totalTrabalhadoresMIN||m.totalTrabalhadoresMAX)&&(r+="<b><i>Total de Trabalhadores</i></b> ",m.totalTrabalhadoresMIN&&(r+="<b><i>maior que:</i></b> "+m.totalTrabalhadoresMIN+", "),m.totalTrabalhadoresMAX&&(r+="<b><i>menor que:</i></b> "+m.totalTrabalhadoresMAX+", ")),(m.totalEmpregadosMIN||m.totalEmpregadosMAX)&&(r+="<b><i>Total de Empregados</i></b> ",m.totalEmpregadosMIN&&(r+="<b><i>maior que:</i></b> "+m.totalEmpregadosMIN+", "),m.totalEmpregadosMAX&&(r+="<b><i>menor que:</i></b> "+m.totalEmpregadosMAX+", ")),(m.trabalhadoresDeficienciaMIN||m.trabalhadoresDeficienciaMAX)&&(r+="<b><i>Trabalhadores com Deficiência</i></b> ",m.trabalhadoresDeficienciaMIN&&(r+="<b><i>maior que:</i></b> "+m.trabalhadoresDeficienciaMIN+", "),m.trabalhadoresDeficienciaMAX&&(r+="<b><i>menor que:</i></b> "+m.trabalhadoresDeficienciaMAX+", ")),(m.trabalhadoresVoluntariosMIN||m.trabalhadoresVoluntariosMAX)&&(r+="<b><i>Trabalhadores voluntários</i></b> ",m.totalTrabalhadoresMIN&&(r+="<b><i>maior que:</i></b> "+m.trabalhadoresVoluntariosMIN+", "),m.totalTrabalhadoresMAX&&(r+="<b><i>menor que:</i></b> "+m.trabalhadoresVoluntariosMAX+", ")));var p=o.espacosParticipacaoSocial;p&&(p.cd_conselho&&$.ajax({url:G.Conselho_id(p.cd_conselho),type:"GET",async:!1,dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){a.length>0&&(r+="<b><i>Nome do Conselho:</i></b> "+a[0].tx_nome_conselho+", ")}}),p.tx_nome_representante_conselho&&(r+="<b><i>Nome de representante conselho:</i></b> "+p.tx_nome_representante_conselho+", "),p.cd_tipo_participacao&&$.ajax({url:G.Titularidade_id(p.cd_tipo_participacao),type:"GET",async:!1,dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){a.length>0&&(r+="<b><i>Titularidade:</i></b> "+a[0].tx_nome_tipo_participacao+", ")}}),p.dt_data_inicio_conselho&&(r+="<b><i>Data de Início de Vigência:</i></b> "+p.dt_data_inicio_conselho+", "),p.dt_data_fim_conselho&&(r+="<b><i>Data de Fim de Vigência:</i></b> "+p.dt_data_fim_conselho+", "),p.cd_conferencia&&$.ajax({url:G.Conferencia_id(p.cd_conferencia),type:"GET",async:!1,dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){a.length>0&&(r+="<b><i>Nome da Conferência:</i></b> "+a[0].tx_nome_conferencia+", ")}}),p.cd_forma_participacao_conferencia&&$.ajax({url:G.FormaParticipacaoConferencia_id(p.cd_forma_participacao_conferencia),type:"GET",async:!1,dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){a.length>0&&(r+="<b><i>Forma de Participação na Conferência:</i></b> "+a[0].tx_nome_forma_participacao_conferencia+", ")}}),(p.anoRealizacaoConferenciaMIN||p.anoRealizacaoConferenciaMAX)&&(r+="<b><i>Ano de Realização da Conferência</i></b> ",p.anoRealizacaoConferenciaMIN&&(r+="<b><i>maior que:</i></b> "+p.anoRealizacaoConferenciaMIN+", "),p.anoRealizacaoConferenciaMAX&&(r+="<b><i>menor que:</i></b> "+p.anoRealizacaoConferenciaMAX+", ")));var b=o.projetos;b&&(b.tx_nome_projeto&&(r+="<b><i>Nome do Projeto:</i></b> "+b.tx_nome_projeto+", "),b.cd_status_projeto&&$.ajax({url:G.SituacaoProjeto_id(b.cd_status_projeto),type:"GET",async:!1,dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){a.length>0&&(r+="<b><i>Situação do projeto:</i></b> "+a[0].tx_nome_status_projeto+", ")}}),b.dt_data_inicio_projeto&&(r+="<b><i>Data de Início Projeto:</i></b> "+b.dt_data_inicio_projeto+", "),b.dt_data_fim_projeto&&(r+="<b><i>Data de Fim Projeto:</i></b> "+b.dt_data_fim_projeto+", "),b.cd_abrangencia_projeto&&$.ajax({url:G.AbrangenciaProjeto_id(b.cd_abrangencia_projeto),type:"GET",async:!1,dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){a.length>0&&(r+="<b><i>Abrangência de atuação:</i></b> "+a[0].tx_nome_abrangencia_projeto+", ")}}),b.cd_zona_atuacao_projeto&&$.ajax({url:G.ZonaAtuacaoProjeto_id(b.cd_zona_atuacao_projeto),type:"GET",async:!1,dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){a.length>0&&(r+="<b><i>Zona de Atuação:</i></b> "+a[0].tx_nome_zona_atuacao+", ")}}),b.cd_origem_fonte_recursos_projeto&&$.ajax({url:G.FontesRecursosProjeto_id(b.cd_origem_fonte_recursos_projeto),type:"GET",async:!1,dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){a.length>0&&(r+="<b><i>Fontes de Recursos:</i></b> "+a[0].tx_nome_origem_fonte_recursos_projeto+", ")}}),b.cd_objetivo_projeto&&$.ajax({url:G.Objetivos_ODS_id(b.cd_objetivo_projeto),type:"GET",async:!1,dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){a.length>0&&(r+="<b><i>Objetivos do Desenvolvimento Sustentável - ODS para Projeto:</i></b> "+a[0].tx_nome_objetivo_projeto+", ")}}),b.cd_meta_projeto&&$.ajax({url:G.Metas_ODS_Id(b.cd_meta_projeto),type:"GET",async:!1,dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){a.length>0&&(r+="<b><i>Metas Relacionadas ao ODS para projeto:</i></b> "+a[0].tx_nome_meta_projeto+", ")}}),b.tx_nome_financiador&&(r+="<b><i>Financiadores do Projeto:</i></b> "+b.tx_nome_financiador+", "),b.tx_nome_regiao_localizacao_projeto&&(r+="<b><i>Local de Execução:</i></b> "+b.tx_nome_regiao_localizacao_projeto+", "),b.tx_nome_publico_beneficiado&&(r+="<b><i>Público Beneficiado:</i></b> "+b.tx_nome_publico_beneficiado+", "),b.tx_nome_osc_parceira_projeto&&(r+="<b><i>OSC Parceiras:</i></b> "+b.tx_nome_osc_parceira_projeto+", "),(b.totalBeneficiariosMIN||b.totalBeneficiariosMAX)&&(r+="<b><i>Total de Beneficiários</i></b> ",b.totalBeneficiariosMIN&&(r+="<b><i>maior que:</i></b> "+b.totalBeneficiariosMIN+", "),b.totalBeneficiariosMAX&&(r+="<b><i>menor que:</i></b> "+b.totalBeneficiariosMAX+", ")),(b.valorTotalMIN||b.valorTotalMAX)&&(r+="<b><i>Valor Total Projeto</i></b> ",b.valorTotalMIN&&(r+="<b><i>maior que:</i></b> "+b.valorTotalMIN+", "),b.valorTotalMAX&&(r+="<b><i>menor que:</i></b> "+b.valorTotalMAX+", ")),(b.valorRecebidoMIN||b.valorRecebidoMAX)&&(r+="<b><i>Valor Recebido Projeto</i></b> ",b.valorRecebidoMIN&&(r+="<b><i>maior que:</i></b> "+b.valorRecebidoMIN+", "),b.valorRecebidoMAX&&(r+="<b><i>menor que:</i></b> "+b.valorRecebidoMAX+", ")));var _=o.fontesRecursos;_&&((_.anoFonteRecursoMIN||_.anoFonteRecursoMAX)&&(r+="<b><i>Fontes de recursos anuais da OSC Ano</i></b> ",_.anoFonteRecursoMIN&&(r+="<b><i>maior que:</i></b> "+_.anoFonteRecursoMIN+", "),_.anoFonteRecursoMAX&&(r+="<b><i>menor que:</i></b> "+_.anoFonteRecursoMAX+", ")),(_.rendimentosFinanceirosReservasContasCorrentesPropriasMIN||_.rendimentosFinanceirosReservasContasCorrentesPropriasMAX)&&(r+="<b><i>Rendimentos financeiros de reservas ou contas correntes próprias</i></b> ",_.rendimentosFinanceirosReservasContasCorrentesPropriasMIN&&(r+="<b><i>maior que:</i></b> "+_.rendimentosFinanceirosReservasContasCorrentesPropriasMIN+", "),_.rendimentosFinanceirosReservasContasCorrentesPropriasMAX&&(r+="<b><i>menor que:</i></b> "+_.rendimentosFinanceirosReservasContasCorrentesPropriasMAX+", ")),(_.rendimentosFundosPatrimoniaisMIN||_.rendimentosFundosPatrimoniaisMAX)&&(r+="<b><i>Rendimentos de fundos patrimoniais</i></b> ",_.rendimentosFundosPatrimoniaisMIN&&(r+="<b><i>maior que:</i></b> "+_.rendimentosFundosPatrimoniaisMIN+", "),_.rendimentosFundosPatrimoniaisMAX&&(r+="<b><i>menor que:</i></b> "+_.rendimentosFundosPatrimoniaisMAX+", ")),(_.mensalidadesContribuicoesAssociadosMIN||_.mensalidadesContribuicoesAssociadosMAX)&&(r+="<b><i>Mensalidades ou contribuições de associados</i></b> ",_.mensalidadesContribuicoesAssociadosMIN&&(r+="<b><i>maior que:</i></b> "+_.mensalidadesContribuicoesAssociadosMIN+", "),_.mensalidadesContribuicoesAssociadosMAX&&(r+="<b><i>menor que:</i></b> "+_.mensalidadesContribuicoesAssociadosMAX+", ")),(_.vendaBensDireitosMIN||_.vendaBensDireitosMAX)&&(r+="<b><i>Venda de bens e direitos</i></b> ",_.vendaBensDireitosMIN&&(r+="<b><i>maior que:</i></b> "+_.vendaBensDireitosMIN+", "),_.vendaBensDireitosMAX&&(r+="<b><i>menor que:</i></b> "+_.vendaBensDireitosMAX+", ")),(_.premiosRecebidosMIN||_.premiosRecebidosMAX)&&(r+="<b><i>Prêmios recebidos</i></b> ",_.premiosRecebidosMIN&&(r+="<b><i>maior que:</i></b> "+_.premiosRecebidosMIN+", "),_.premiosRecebidosMAX&&(r+="<b><i>menor que:</i></b> "+_.premiosRecebidosMAX+", ")),(_.vendaProdutosMIN||_.vendaProdutosMAX)&&(r+="<b><i>Venda de produtos</i></b> ",_.vendaProdutosMIN&&(r+="<b><i>maior que:</i></b> "+_.vendaProdutosMIN+", "),_.vendaProdutosMAX&&(r+="<b><i>menor que:</i></b> "+_.vendaProdutosMAX+", ")),(_.prestacaoServicosMIN||_.prestacaoServicosMAX)&&(r+="<b><i>Prestação de serviços</i></b> ",_.prestacaoServicosMIN&&(r+="<b><i>maior que:</i></b> "+_.prestacaoServicosMIN+", "),_.prestacaoServicosMAX&&(r+="<b><i>menor que:</i></b> "+_.prestacaoServicosMAX+", ")),(_.empresasPublicasSociedadesEconomiaMistaMIN||_.empresasPublicasSociedadesEconomiaMistaMAX)&&(r+="<b><i>Empresas públicas ou sociedades de economia mista</i></b> ",_.empresasPublicasSociedadesEconomiaMistaMIN&&(r+="<b><i>maior que:</i></b> "+_.empresasPublicasSociedadesEconomiaMistaMIN+", "),_.empresasPublicasSociedadesEconomiaMistaMAX&&(r+="<b><i>menor que:</i></b> "+_.empresasPublicasSociedadesEconomiaMistaMAX+", ")),(_.acordoOrganismosMultilateraisMIN||_.acordoOrganismosMultilateraisMAX)&&(r+="<b><i>Acordo com organismos multilaterais</i></b> ",_.acordoOrganismosMultilateraisMIN&&(r+="<b><i>maior que:</i></b> "+_.acordoOrganismosMultilateraisMIN+", "),_.acordoOrganismosMultilateraisMAX&&(r+="<b><i>menor que:</i></b> "+_.acordoOrganismosMultilateraisMAX+", ")),(_.parceriaGovernoFederalMIN||_.parceriaGovernoFederalMAX)&&(r+="<b><i>Parceria com o governo federal</i></b> ",_.parceriaGovernoFederalMIN&&(r+="<b><i>maior que:</i></b> "+_.parceriaGovernoFederalMIN+", "),_.parceriaGovernoFederalMAX&&(r+="<b><i>menor que:</i></b> "+_.parceriaGovernoFederalMAX+", ")),(_.parceriaGovernoEstadualMIN||_.parceriaGovernoEstadualMAX)&&(r+="<b><i>Parceria com o governo estadual</i></b> ",_.parceriaGovernoEstadualMIN&&(r+="<b><i>maior que:</i></b> "+_.parceriaGovernoEstadualMIN+", "),_.parceriaGovernoEstadualMAX&&(r+="<b><i>menor que:</i></b> "+_.parceriaGovernoEstadualMAX+", ")),(_.parceriaGovernoMunicipalMIN||_.parceriaGovernoMunicipalMAX)&&(r+="<b><i>Parceria com o governo municipal</i></b> ",_.parceriaGovernoMunicipalMIN&&(r+="<b><i>maior que:</i></b> "+_.parceriaGovernoMunicipalMIN+", "),_.parceriaGovernoMunicipalMAX&&(r+="<b><i>menor que:</i></b> "+_.parceriaGovernoMunicipalMAX+", ")),(_.acordoGovernosEstrangeirosMIN||_.acordoGovernosEstrangeirosMAX)&&(r+="<b><i>Acordo com governos estrangeiros</i></b> ",_.acordoGovernosEstrangeirosMIN&&(r+="<b><i>maior que:</i></b> "+_.acordoGovernosEstrangeirosMIN+", "),_.acordoGovernosEstrangeirosMAX&&(r+="<b><i>menor que:</i></b> "+_.acordoGovernosEstrangeirosMAX+", ")),(_.parceriaOscBrasileirasMIN||_.parceriaOscBrasileirasMAX)&&(r+="<b><i>Parceria com OSCs brasileiras</i></b> ",_.parceriaOscBrasileirasMIN&&(r+="<b><i>maior que:</i></b> "+_.parceriaOscBrasileirasMIN+", "),_.parceriaOscBrasileirasMAX&&(r+="<b><i>menor que:</i></b> "+_.parceriaOscBrasileirasMAX+", ")),(_.parceriaOscEstrangeirasMIN||_.parceriaOscEstrangeirasMAX)&&(r+="<b><i>Parceria com OSCs estrangeiras</i></b> ",_.parceriaOscEstrangeirasMIN&&(r+="<b><i>maior que:</i></b> "+_.parceriaOscEstrangeirasMIN+", "),_.parceriaOscEstrangeirasMAX&&(r+="<b><i>menor que:</i></b> "+_.parceriaOscEstrangeirasMAX+", ")),(_.parceriaOrganizacoesReligiosasBrasileirasMIN||_.parceriaOrganizacoesReligiosasBrasileirasMAX)&&(r+="<b><i>Parceria com organizações religiosas brasileiras</i></b> ",_.parceriaOrganizacoesReligiosasBrasileirasMIN&&(r+="<b><i>maior que:</i></b> "+_.parceriaOrganizacoesReligiosasBrasileirasMIN+", "),_.parceriaOrganizacoesReligiosasBrasileirasMAX&&(r+="<b><i>menor que:</i></b> "+_.parceriaOrganizacoesReligiosasBrasileirasMAX+", ")),(_.parceriaOrganizacoesReligiosasEstrangeirasMIN||_.parceriaOrganizacoesReligiosasEstrangeirasMAX)&&(r+="<b><i>Parceria com organizações religiosas estrangeiras</i></b> ",_.parceriaOrganizacoesReligiosasEstrangeirasMIN&&(r+="<b><i>maior que:</i></b> "+_.parceriaOrganizacoesReligiosasEstrangeirasMIN+", "),_.parceriaOrganizacoesReligiosasEstrangeirasMAX&&(r+="<b><i>menor que:</i></b> "+_.parceriaOrganizacoesReligiosasEstrangeirasMAX+", ")),(_.empresasPrivadasBrasileirasMIN||_.empresasPrivadasBrasileirasMAX)&&(r+="<b><i>Empresas privadas brasileiras</i></b> ",_.empresasPrivadasBrasileirasMIN&&(r+="<b><i>maior que:</i></b> "+_.empresasPrivadasBrasileirasMIN+", "),_.empresasPrivadasBrasileirasMAX&&(r+="<b><i>menor que:</i></b> "+_.empresasPrivadasBrasileirasMAX+", ")),(_.EmpresasEstrangeirasMIN||_.EmpresasEstrangeirasMAX)&&(r+="<b><i>Empresas estrangeiras</i></b> ",_.EmpresasEstrangeirasMIN&&(r+="<b><i>maior que:</i></b> "+_.EmpresasEstrangeirasMIN+", "),_.EmpresasEstrangeirasMAX&&(r+="<b><i>menor que:</i></b> "+_.EmpresasEstrangeirasMAX+", ")),(_.doacoesPessoaJuridicaMIN||_.doacoesPessoaJuridicaMAX)&&(r+="<b><i>Doações de pessoa jurídica</i></b> ",_.doacoesPessoaJuridicaMIN&&(r+="<b><i>maior que:</i></b> "+_.doacoesPessoaJuridicaMIN+", "),_.doacoesPessoaJuridicaMAX&&(r+="<b><i>menor que:</i></b> "+_.doacoesPessoaJuridicaMAX+", ")),(_.doacoesPessoaFisicaMIN||_.doacoesPessoaFisicaMAX)&&(r+="<b><i>Doações de pessoa física</i></b> ",_.doacoesPessoaFisicaMIN&&(r+="<b><i>maior que:</i></b> "+_.doacoesPessoaFisicaMIN+", "),_.doacoesPessoaFisicaMAX&&(r+="<b><i>menor que:</i></b> "+_.doacoesPessoaFisicaMAX+", ")),(_.doacoesRecebidasFormaProdutosServicosComNFMIN||_.doacoesRecebidasFormaProdutosServicosComNFMAX)&&(r+="<b><i>Doações recebidas na forma de produtos e serviços (com NF)</i></b> ",_.doacoesRecebidasFormaProdutosServicosComNFMIN&&(r+="<b><i>maior que:</i></b> "+_.doacoesRecebidasFormaProdutosServicosComNFMIN+", "),_.doacoesRecebidasFormaProdutosServicosComNFMAX&&(r+="<b><i>menor que:</i></b> "+_.doacoesRecebidasFormaProdutosServicosComNFMAX+", ")),(_.voluntariadoMIN||_.voluntariadoMAX)&&(r+="<b><i>Voluntariado</i></b> ",_.voluntariadoMIN&&(r+="<b><i>maior que:</i></b> "+_.voluntariadoMIN+", "),_.voluntariadoMAX&&(r+="<b><i>menor que:</i></b> "+_.voluntariadoMAX+", ")),(_.isencoesMIN||_.isencoesMAX)&&(r+="<b><i>Isenções:</i></b> ",_.isencoesMIN&&(r+="<b><i>maior que:</i></b> "+_.isencoesMIN+", "),_.isencoesMAX&&(r+="<b><i>menor que:</i></b> "+_.isencoesMAX+", ")),(_.imunidadesMIN||_.imunidadesMAX)&&(r+="<b><i>Imunidades</i></b> ",_.imunidadesMIN&&(r+="<b><i>maior que:</i></b> "+_.imunidadesMIN+", "),_.imunidadesMAX&&(r+="<b><i>menor que:</i></b> "+_.imunidadesMAX+", ")),(_.bensRecebidosDireitoUsoMIN||_.bensRecebidosDireitoUsoMAX)&&(r+="<b><i>Bens recebidos em direito de uso</i></b> ",_.bensRecebidosDireitoUsoMIN&&(r+="<b><i>maior que:</i></b> "+_.bensRecebidosDireitoUsoMIN+", "),_.bensRecebidosDireitoUsoMAX&&(r+="<b><i>menor que:</i></b> "+_.bensRecebidosDireitoUsoMAX+", ")),(_.doacoesRecebidasFormaProdutosServicosSemNFMIN||_.doacoesRecebidasFormaProdutosServicosSemNFMAX)&&(r+="<b><i>Doações recebidas na forma de produtos e serviços (sem NF)</i></b> ",_.doacoesRecebidasFormaProdutosServicosSemNFMIN&&(r+="<b><i>maior que:</i></b> "+_.doacoesRecebidasFormaProdutosServicosSemNFMIN+", "),_.doacoesRecebidasFormaProdutosServicosSemNFMAX&&(r+="<b><i>menor que:</i></b> "+_.valorMAX+", ")));var g=o.IDH;g&&g.IDH_Municipal&&(r+="<b><i>Índice de Desenvolvimento Humano:</i></b> IDH Municipal - Faixa: ",g.baixo&&(r+="baixa, "),g.medio&&(r+="médio, "),g.alto&&(r+="alto, ")),$("#filtros p").html(r)}}(C.avancado,B),p.contains("IDH_M",C.avancado))p.carregaAjax(G.Ipea_Data("13IDHM",2010),"GET",null);p.contains("IDHM R",C.avancado)&&p.carregaAjax(G.Ipea_Data("13IDHM_R",2010),"GET",null),p.contains("IDHM E",C.avancado)&&p.carregaAjax(G.Ipea_Data("13IDHM_E",2010),"GET",null),p.contains("IDHM L",C.avancado)&&p.carregaAjax(G.Ipea_Data("13IDHM_L",2010),"GET",null),p.contains("Freq",C.avancado)&&p.carregaAjax(G.Ipea_Data("13I_FREQ_PROP",2010),"GET",null)}else console.log("ERRO de URL!")}else B="todos",z=G.ClusterPais(),urlRota=G.AllOSC(0);if(N){var H="Análise "+E;$("#analisePerfil").text(H),$("#analisePerfil").attr("href","analise-perfil.html?localidade="+m);var U='<img src="img/'+x+'" alt="" height=40>';$("#analisePerfil").append(U)}var V=L.control();$("#loadingMapModal").show();var Z;R?(type_http="POST",Z=C):(type_http="GET",Z=null),$.ajax({url:z,type:type_http,dataType:"json",data:Z,error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){if(""!==a&&void 0!==a&&"Nenhuma Organização encontrada!"!==a){o(urlRota,R);var e=0;if(I){if(void 0!==a.length)for(var r=0;r<a.length;r++)e+=a[r].nr_quantidade_osc_regiao;d(e),$("#legenda p").append(e),c(a,B)}else d(e=Object.keys(a).length-1),$("#legenda p").append(e),i(a)}else $("#modalMensagem").modal({backdrop:"static",keyboard:!1}),$("#modalTitle").text("Nenhuma OSC encontrada!"),"avancado"!==B&&"municipio"!==B?$("#modalConteudo").text('Sua pesquisa "'+decodeURIComponent(k)+'" não retornou nenhuma OSC.'):$("#modalConteudo").text("Sua pesquisa não retornou nenhuma OSC."),$("#modalMensagem").modal("show")}}),$.ajax({url:G.ClusterEstado(),type:"GET",dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){if(void 0!==a){var e={},u={};for(var m in a)e[a[m].tx_sigla_regiao]=a[m].nr_quantidade_osc_regiao,u[a[m].tx_sigla_regiao]=a[m].id_regiao;P.addControl(new L.Control.Layers({"Satélite":F,Contraste:q,Mapa:T},{"Mapa de calor":A,IDHM:h},{collapsed:!1})),function(a,e){var u;$.each(statesData.features,function(o){u=statesData.features[o].properties.Name,statesData.features[o].properties.density=a[u],statesData.features[o].properties.id=e[u]}),P.addLayer(A),P.addLayer(h),V.onAdd=function(a){return this._div=L.DomUtil.create("div","info"),this.update(),this._div},V.update=function(a){this._div.innerHTML="<h4>OSCs por Estado</h4>"+(a?"<b>"+a.Name+"</b><br />"+a.density+" OSCs.":"Passe o mouse sobre um estado")},V.addTo(P);var m=L.control({position:"bottomright"});m.onAdd=function(a){var e=L.DomUtil.create("div","info legend"),o=[0,1e3,15e3,3e4,45e3,6e4];e.innerHTML+="<h5>Escala de OSCs por estado</h5>";for(var i=0;i<o.length;i++)e.innerHTML+='<i style="background:'+s(o[i]+1)+'"></i> '+parseInt(o[i]+1)+(o[i+1]?"&ndash;"+o[i+1]+"<br>":"+");return e},m.addTo(P),l=L.geoJson(statesData,{style:function(a){return{fillColor:s(a.properties.density),weight:2,opacity:1,color:"white",dashArray:"3",fillOpacity:.6}},onEachFeature:function(a,e){e.on({mouseover:r,mouseout:n,click:function(a){var e=a.target;if(P.fitBounds(e.getBounds()),function(a){$("#loadingMapModal").show(),$.ajax({url:G.OSCByStateInMap(a),type:"GET",dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){if(o(urlRota,R),void 0!==a.length){for(var e=0,r=0;r<a.length;r++)e+=a[r].nr_quantidade_osc_regiao;d(e)}else d(Object.keys(a).length-1);void 0!==a&&i(a)}})}(e.feature.properties.id),void 0==M[e.feature.properties.Regiao]){var s=f[e.feature.properties.id];void 0!=s&&P.removeLayer(s)}else!function(a){var e=a.feature.properties.Regiao;$("#loadingMapModal").show(),$.ajax({url:G.ClusterEstadoPorRegiao(e),type:"GET",dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a)},success:function(i){if(o(urlRota,R),void 0!==i.length){for(var r=0,n=0;n<i.length;n++)r+=i[n].nr_quantidade_osc_regiao;d(r)}else d(Object.keys(i).length-1);if(void 0!==i){c(i,"estado");var t=M[e];P.removeLayer(t),delete M[e];var s=f[a.feature.properties.id];P.removeLayer(s)}}})}(e);e.off(),e.on({mouseover:r,mouseout:n,click:t})}}),A.addLayer(e),h.addLayer(e),g[e.feature.properties.id]=e,_[e.feature.properties.id]=e}}).addTo(P)}(e,u)}}}),P.on("zoomend",function(a){P.getZoom()==X&&(P.removeLayer(A),P.removeLayer(h))})});