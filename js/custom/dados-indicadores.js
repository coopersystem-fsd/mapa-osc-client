"use strict";require(["jquery-ui"],function(e){$("#tabs").tabs().addClass("ui-tabs-vertical ui-helper-clearfix"),$("#tabs li").removeClass("ui-corner-top").addClass("ui-corner-left"),$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(e,a){$(this).css(e),$("<div>").addClass("arrow").addClass(a.vertical).addClass(a.horizontal).appendTo(this)}}}),jQuery(document).ready(function(a){a(".scroll").click(function(e){e.preventDefault(),a("html,body").animate({scrollTop:a(this.hash).offset().top},800)})})}),require(["nv.d3.lib","graficoParaTabela"],function(e){var a=[{config:[",f","1",""],leg_X:"Região",leg_Y:"Quantidade de OSCs",tituloColuna:["Número de Empregados","Região","Quantidade de OSCs"],legenda:"Fonte: Ministério do Trabalho (2015).",titulo:"1- Distribuição de OSCs por número de empregados e região, Brasil - 2015",series:[{key:"Sem pessoal ",values:[{label:"Sudeste",value:173751},{label:"Sul",value:99698},{label:"Nordeste",value:108987},{label:"Centro-Oeste",value:27902},{label:"Norte",value:27504}]},{key:"1 a 2",values:[{label:"Sudeste",value:17456},{label:"Sul",value:7218},{label:"Nordeste",value:5388},{label:"Centro-Oeste",value:3191},{label:"Norte",value:1552}]},{key:"3 a 4",values:[{label:"Sudeste",value:6428},{label:"Sul",value:2844},{label:"Nordeste",value:2053},{label:"Centro-Oeste",value:1155},{label:"Norte",value:581}]},{key:"5 a 9",values:[{label:"Sudeste",value:6874},{label:"Sul",value:2953},{label:"Nordeste",value:1763},{label:"Centro-Oeste",value:1108},{label:"Norte",value:525}]},{key:"10 a 49",values:[{label:"Sudeste",value:10763},{label:"Sul",value:3613},{label:"Nordeste",value:2082},{label:"Centro-Oeste",value:1253},{label:"Norte",value:581}]},{key:"50 a 99",values:[{label:"Sudeste",value:2056},{label:"Sul",value:629},{label:"Nordeste",value:463},{label:"Centro-Oeste",value:281},{label:"Norte",value:125}]},{key:"100 a 499",values:[{label:"Sudeste",value:1787},{label:"Sul",value:561},{label:"Nordeste",value:426},{label:"Centro-Oeste",value:208},{label:"Norte",value:115}]},{key:"500 ou mais",values:[{label:"Sudeste",value:464},{label:"Sul",value:126},{label:"Nordeste",value:91},{label:"Centro-Oeste",value:51},{label:"Norte",value:24}]}]}],l=[{config:[",f","1",""],leg_X:"Região",leg_Y:"Quantidade de Empregos",tituloColuna:["Região","Número de Empregos nas OSCs"],legenda:"Fonte: Ministério do Trabalho (2015).",titulo:"2- Número de empregos formais nas OSCs por região, Brasil - 2015",key:"Grafico 2",values:[{label:"Sudeste",value:1698756},{label:"Sul",value:513450},{label:"Nordeste",value:381848},{label:"Centro-Oeste",value:220009},{label:"Norte",value:90825}]}],t=[{config:[",f","1",""],leg_X:"",leg_Y:"",tituloColuna:["Atividade Econômica","Número de OSC"],legenda:"Fonte: Secretaria da Receita Federal (2016).",titulo:"3- Distribuição de OSCs por área de atuação, Brasil - 2016",key:"Grafico 3",values:[{label:"Saúde",value:6841},{label:"Cultura e recreação",value:79917},{label:"Educação e pesquisa",value:39669},{label:"Assistência social",value:27383},{label:"Religião",value:208325},{label:"Associações patronais e profissionais",value:22261},{label:"Defesa de direitos e interesses",value:339104},{label:"Outras atividades associativas",value:77550},{label:"Outras organizações da sociedade civil",value:19136}]}],o=[{config:[",f","1",""],leg_X:"",leg_Y:"",tituloColuna:["Serviços","Número de OSC"],legenda:"Fonte: Ministério do Desenvolvimento Social (2016), Secretaria da Receita Federal (2016).",titulo:"4- Distribuição de OSCs de assistência social por tipo de serviço prestado, Brasil - 2016",key:"Grafico 9",values:[{label:"Serviços de Proteção Social Básica",value:10529},{label:"Serviços de Proteção Social Especial de Alta Complexidade",value:3780},{label:"Ações de Assessoramento e Defesa e Garantia de Direitos",value:15096},{label:"Serviços de Proteção Social Especial de Média Complexidade",value:3622},{label:"Outras Ofertas",value:6269},{label:"Benefícios Eventuais",value:2360}]}],u=[{config:[",f","1",""],leg_X:"",leg_Y:"",tituloColuna:["Tipo de Unidade","Número de OSC"],legenda:"Fonte: Ministério da Saúde (2016), Secretaria da Receita Federal (2016).",titulo:"5- Distribuição de OSCs de saúde por tipo de estabelecimento de saúde, Brasil - 2016",key:"Grafico 10",values:[{label:"Clínica/Centro de Especialidade",value:637},{label:"Hospital Geral",value:1607},{label:"Consultório Isolado",value:123},{label:"Unidade de Apoio Diagnose e Terapia",value:209},{label:"Policlínica",value:143},{label:"Hospital Especializado",value:211},{label:"Centro de Saúde/Unidade Básica",value:127},{label:"Outras",value:189}]}],i=[{config:[",f","1",""],leg_X:"Região",leg_Y:"Quantidade de OSCs",tituloColuna:["Tipo de Gestão","Região","Quantidade"],legenda:"Fonte: Ministério da Saúde (2016), Secretaria da Receita Federal (2016).",titulo:"6- Distribuição de OSCs de saúde por região e tipo de gestão, Brasil - 2016",series:[{key:"Municipal",values:[{label:"Sudeste",value:1419},{label:"Sul",value:463},{label:"Nordeste",value:311},{label:"Centro-Oeste",value:126},{label:"Norte",value:39}]},{key:"Estadual",values:[{label:"Sudeste",value:236},{label:"Sul",value:148},{label:"Nordeste",value:67},{label:"Centro-Oeste",value:24},{label:"Norte",value:11}]},{key:"Dupla",values:[{label:"Sudeste",value:177},{label:"Sul",value:271},{label:"Nordeste",value:63},{label:"Centro-Oeste",value:16},{label:"Norte",value:7}]}]}],r=[{config:[",f","1",""],leg_X:"Região",leg_Y:"Quantidade de OSCs",tituloColuna:["Tipo de Vínculo","Região","Quantidade"],legenda:"Fonte: Ministério do Trabalho (2016), Secretaria da Receita Federal (2016).",titulo:"7- Distribuição de OSCs de economia solidária por região e tipo de vínculo com outras entidades, Brasil - 2016",series:[{key:"Não possui vínculo",values:[{label:"Sudeste",value:19},{label:"Sul",value:15},{label:"Nordeste",value:17},{label:"Centro-Oeste",value:1},{label:"Norte",value:7}]},{key:"Federação de órgãos sociais",values:[{label:"Sudeste",value:0},{label:"Sul",value:0},{label:"Nordeste",value:11},{label:"Centro-Oeste",value:0},{label:"Norte",value:3}]},{key:"Governo",values:[{label:"Sudeste",value:5},{label:"Sul",value:4},{label:"Nordeste",value:6},{label:"Centro-Oeste",value:1},{label:"Norte",value:1}]},{key:"Movimento sindical",values:[{label:"Sudeste",value:2},{label:"Sul",value:5},{label:"Nordeste",value:6},{label:"Centro-Oeste",value:0},{label:"Norte",value:2}]},{key:"Instituição de ensino e/ou pesquisa",values:[{label:"Sudeste",value:4},{label:"Sul",value:7},{label:"Nordeste",value:0},{label:"Centro-Oeste",value:0},{label:"Norte",value:0}]}]}],s=[{config:[",f","1",""],leg_X:"Região",leg_Y:"Quantidade de OSCs",tituloColuna:["Tipo de Abrangência","Região","Quantidade"],legenda:"Fonte: Ministério do Trabalho (2016), Secretaria da Receita Federal (2016).",titulo:"8- Distribuição de OSCs de economia solidária por região e abrangência da atuação, Brasil - 2016",series:[{key:"Estadual e/ou inter-estadual",values:[{label:"Sudeste",value:26},{label:"Sul",value:28},{label:"Nordeste",value:30},{label:"Centro-Oeste",value:0},{label:"Norte",value:50}]},{key:"Nacional",values:[{label:"Sudeste",value:4},{label:"Sul",value:11},{label:"Nordeste",value:15},{label:"Centro-Oeste",value:0},{label:"Norte",value:7}]},{key:"Municipal e/ou inter-municipal",values:[{label:"Sudeste",value:6},{label:"Sul",value:5},{label:"Nordeste",value:8},{label:"Centro-Oeste",value:3},{label:"Norte",value:1}]}]}];createMultiBarChart("#grafico-1",a),createBarChart("#grafico-2",l),createDonutChart("#grafico-3",t),createDonutChart("#grafico-9",o),createDonutChart("#grafico-10",u),createMultiBarChart("#grafico-11",i),createMultiBarChart("#grafico-12",r),createMultiBarChart("#grafico-13",s),$("#tabela-1").click(function(){createTabela_MultBar_Line(a,!1)}),$("#tabela-2").click(function(){createTabela_Bar_Donut(l)}),$("#tabela-3").click(function(){createTabela_Bar_Donut(t)}),$("#tabela-9").click(function(){createTabela_Bar_Donut(o)}),$("#tabela-10").click(function(){createTabela_Bar_Donut(u)}),$("#tabela-11").click(function(){createTabela_MultBar_Line(i,!1)}),$("#tabela-12").click(function(){createTabela_MultBar_Line(r,!1)}),$("#tabela-13").click(function(){createTabela_MultBar_Line(s,!1)}),jQuery("#tabGrafico a").click(function(e){e.preventDefault(),jQuery(this).tab("show"),jQuery(window).trigger("resize")})});