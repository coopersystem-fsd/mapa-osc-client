require(['jquery-ui'], function (React) {
  $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );

  $(document).tooltip({
    position: {
      my: "center bottom-20",
      at: "center top",
      using: function( position, feedback ) {
        $( this ).css( position );
        $( "<div>" )
          .addClass( "arrow" )
          .addClass( feedback.vertical )
          .addClass( feedback.horizontal )
          .appendTo( this );
      }
    }
  });

  jQuery(document).ready(function($) {
      $(".scroll").click(function(event){
          event.preventDefault();
          $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
     });
  });

});


require(["rotas","nv.d3.lib","graficoParaTabela"], function (React) {
  var rotas = new Rotas();

  $("#voltaPagAnterior").on("click", function(){
    history.go(-1);
  });

  function addLinkVoltar(id){
  		$("#voltaPerfil").attr("href","analise-perfil.html?localidade="+id);
  }

  var valoresURL = window.location.href.split('?')[1]!==undefined ? window.location.href.split('?')[1].split('=') : null;
  var idLocalidade = "";

  if(valoresURL !== null){
    idLocalidade = valoresURL[1];
    addLinkVoltar(idLocalidade);
  }


function formatar_fontes(fontes){
  var fonte_format = ". ";

  if(fontes != null){
    fonte_format = fontes.join(", ").replace(/'/gi,"");
    fonte_format += ". ";
  }

  return "Fonte: " + fonte_format ;
}

function formatar_tipo_localidade(tipo_localidade,artigo){
  var tx_tipoLocalidade = tipo_localidade.toLowerCase();
  var txt_tipo = "do "+tx_tipoLocalidade;

  if(artigo == 1){
    txt_tipo = "O "+tx_tipoLocalidade;
  }

  if(tx_tipoLocalidade == 'região'){
    txt_tipo = "da "+ tx_tipoLocalidade;

    if(artigo == 1){
      txt_tipo = "A "+ tx_tipoLocalidade;
    }
  }

  return txt_tipo;
}

  $.ajax({
    url: rotas.RecuperarPerfilByIDLocalidade(idLocalidade),
    type: 'GET',
    dataType: 'json',
    error: function(e){
        console.log("ERRO no AJAX :" + e);
        $('.manutencao').css('display', 'block');
        $('.loading').addClass('hide');
        $('.tela').addClass('hide');
    },
    success: function(data){

      $("#tx_localidade").text(data.tx_localidade);

      //Características

      //$("#tabela caption").text(formatar_fontes(data.caracteristicas.fontes));
      var fontes1 = [];
      fontes1.push('Quantidade OSCs e Quantidade Trabalhadores: '+data.caracteristicas.ft_quantidade_osc);
      $("#tabela caption").text(formatar_fontes(fontes1));

      var fontes2 = [];
      if (data.caracteristicas.ft_orcamento_empenhado.length) {
        fontes2.push('Valores de Recursos: '+data.caracteristicas.ft_orcamento_empenhado);
      }

      $("#tabela caption").append('<br>'+formatar_fontes(fontes2));

      var fontes3 = [];
      if (data.caracteristicas.ft_quantidade_projetos.length) {
        fontes3.push('Quantidade Projetos: '+data.caracteristicas.ft_quantidade_projetos);
      }
      else {
        fontes3.push('Quantidade Projetos: Não há projetos');
      }
      $("#tabela caption").append('<br>'+formatar_fontes(fontes3));

      var txt = '<h5><a id="tabela-p1" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>';
      $("#tabela caption").append(txt);


      //if(data.caracteristicas.nr_orcamento_empenhado == null){
          data.caracteristicas.nr_orcamento_empenhado = 0;
      //}

      var tab = '<tr>';
      tab += '<td>'+data.caracteristicas.nr_quantidade_osc.toLocaleString('pt-BR')+'</td>';
      tab += '<td>'+data.caracteristicas.nr_quantidade_trabalhadores.toLocaleString('pt-BR')+'</td>';
      tab += '<td>'+formatarDinheiro(data.caracteristicas.nr_orcamento_empenhado)+'</td>';
      tab += '<td>'+data.caracteristicas.nr_quantidade_projetos.toLocaleString('pt-BR')+'</td>';
      tab += '</tr>';

      $("#tabela tbody").append(tab);

      txt = '<p>'+data.tx_localidade+' é o <b>'+data.evolucao_quantidade_osc_ano.nr_colocacao_nacional+'º</b> em relação a quantidade de OSCs no âmbito nacional. ';
      txt += 'Nesse ranking, o estado ('+data.evolucao_quantidade_osc_ano.tx_primeiro_colocado_estado+', <b>'+data.evolucao_quantidade_osc_ano.nr_quantidade_oscs_primeiro_colocado_estado.toLocaleString('pt-BR')+'</b> OSCs) ';
      txt += 'e o município ('+data.evolucao_quantidade_osc_ano.tx_primeiro_colocado_municipio+', <b>'+data.evolucao_quantidade_osc_ano.nr_quantidade_oscs_primeiro_colocado_municipio.toLocaleString('pt-BR')+'</b> OSCs) são os que contêm mais OSCs. '
      txt += 'O estado ('+data.evolucao_quantidade_osc_ano.tx_ultimo_colocado_estado[0]+') e o município ('+data.evolucao_quantidade_osc_ano.tx_ultimo_colocado_municipio[0]+') ';
      txt += 'são os que contêm menos OSCs, <b>'+data.evolucao_quantidade_osc_ano.nr_quantidade_oscs_ultimo_colocado_estado.toLocaleString('pt-BR')+'</b> e <b>'+data.evolucao_quantidade_osc_ano.nr_quantidade_oscs_ultimo_colocado_municipio.toLocaleString('pt-BR')+'</b> respectivamente.';
      txt += '</p>';

      $("#tx_caracteristicas").append(txt);

      var grafico = {};
      grafico['configuracao'] = ["f","1","","f"];
      grafico['legenda_x'] = "Ano";
      grafico['legenda_y'] = "Quantidade OSC";
      grafico['titulo_colunas'] = ["Evolução","Ano","Quantidade"];
      grafico['titulo'] = "Evolucao da quantidade OSCs por ano";
      grafico['fontes'] = data.evolucao_quantidade_osc_ano.fontes;
      grafico['legenda'] = "";
      grafico['tipo_grafico'] = "linechart";
      //grafico['series_1'] = data.evolucao_quantidade_osc_ano.series_1;

      var series_1 = [];
      series_1.push(data.evolucao_quantidade_osc_ano.series_1[0]);

      var evol = {};
      evol['area'] = false;
      evol['color'] = '#ff7f0e';
      evol['key'] = "Quantidade OSC Acumulada";
      evol['tipo_valor'] = '';

      var valores = [];
      var valor_acum = 0;

      for (var i = 0; i < data.evolucao_quantidade_osc_ano.series_1.length; i++) {
        for (var j = 0; j < data.evolucao_quantidade_osc_ano.series_1[i].values.length; j++) {
          var valor = {}
          valor['x'] =  data.evolucao_quantidade_osc_ano.series_1[i].values[j].x;
          valor_acum += data.evolucao_quantidade_osc_ano.series_1[i].values[j].y;
          valor['y'] = valor_acum;
          valores.push(valor);
        }
      }

      evol['values'] = valores;
      series_1.push(evol)
      grafico['series_1'] = series_1;

      escolherGrafico("p1",grafico);

      //natureza juridica

      var txt = '<p>Na população de OSCs '+formatar_tipo_localidade(data.tx_tipo_localidade,2)+', <b>'+data.natureza_juridica.nr_porcentagem_maior+'%</b> são classificadas como ';
      txt += data.natureza_juridica.tx_porcentagem_maior+'. A média nacional é de <b>'+data.natureza_juridica.nr_porcentagem_maior_media_nacional+'%</b> de OSCs identificadas como ';
      txt += data.natureza_juridica.tx_porcentagem_maior_media_nacional;
      txt += '.</p>';

      $("#tx_natureza_juridica").append(txt);

      txt = '<h5 class="legenda_perfil">'+formatar_fontes(data.natureza_juridica.fontes)+'</h5>';
      txt +='<h5><a id="tabela-p2" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>';
      $("#tx_natureza_juridica").append(txt);

      var grafico = {};
      grafico['configuracao'] = ["f","1","","f"];
      grafico['legenda_x'] = "Natureza Jurídica";
      grafico['legenda_y'] = "Quantidade OSC";
      grafico['titulo_colunas'] = ["Natureza Jurídica","Quantidade OSC"];
      grafico['titulo'] = "Número de OSCs por natureza jurídica";
      grafico['fontes'] = data.natureza_juridica.fontes;
      grafico['legenda'] = "";
      grafico['tipo_grafico'] = "barchart";
      grafico['series_1'] = data.natureza_juridica.series_1;

      escolherGrafico("p2",grafico);

      //Repasse de Recursos

      var txt = '<p>'+data.tx_localidade;
      if(data.repasse_recursos.nr_repasse_media > 0){
        txt += ' é o <b>'+data.repasse_recursos.nr_colocacao_nacional+'º</b> em relação aos repasses de recursos para OSCs, com média de <b>';
        txt += formatarDinheiro(data.repasse_recursos.nr_repasse_media)+'</b> por ano.';
      }
      else {
        txt += ' não possui declarações de OSCs sobre repasse de recursos nos últimos 3 anos.';
      }

      txt += ' A média nacional de repasse de recursos é de <b>'+formatarDinheiro(data.repasse_recursos.nr_repasse_media_nacional)+'</b>. ';

      if(data.repasse_recursos.tx_maior_tipo_repasse[0] != null){
        txt += 'Além dos repasses federais, a categoria de recursos mais declarada foi '+data.repasse_recursos.tx_maior_tipo_repasse+' com <b>'+data.repasse_recursos.nr_porcentagem_maior_tipo_repasse+'%</b> do total.';
      }
      txt += '</p>';

      let txtPadrao = " Valores correntes.";

      $("#tx_repasse_recursos").append(txt);

      txt = '<h5 class="legenda_perfil">'+formatar_fontes(data.repasse_recursos.fontes)+txtPadrao+'</h5>';//["SigaBrasil. Valores deflacionados para Dez/2018."]

      txt +='<h5><a id="tabela-p3" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>';
      $("#tx_repasse_recursos").append(txt);

      var grafico = {};
      grafico['configuracao'] = ["f","1000","","f"];
      grafico['legenda_x'] = "Ano";
      grafico['legenda_y'] = "Recursos (em milhares R$)";
      grafico['titulo_colunas'] = ["Repasse","Ano","Recursos"];
      grafico['titulo'] = "Evolução de recursos transferidos para OSCs";
      grafico['fontes'] = data.repasse_recursos.fontes;
      grafico['legenda'] = "";
      grafico['tipo_grafico'] = "linechart";

      if(data.repasse_recursos.series_1 != null){
        grafico['series_1'] = data.repasse_recursos.series_1;
      }
      else{
        var ano = new Date().getFullYear();

          var series_vazia = [
           {
             "tipo_valor":"$",
             values: [{"x" : ano-2, "y" : 0 },{"x" : ano-1, "y" : 0 },{"x" : ano, "y" : 0 }],
             key: 'Recursos próprios'
           },
           {
             "tipo_valor":"$",
             values: [{"x" : ano-2, "y" : 0 },{"x" : ano-1, "y" : 0 },{"x" : ano, "y" : 0 }],
             key: 'Recursos públicos'
           },
           {
             "tipo_valor":"$",
             values: [{"x" : ano-2, "y" : 0 },{"x" : ano-1, "y" : 0 },{"x" : ano, "y" : 0 }],
             key: 'Recursos privados'
           },
           {
             "tipo_valor":"$",
             values: [{"x" : ano-2, "y" : 0 },{"x" : ano-1, "y" : 0 },{"x" : ano, "y" : 0 }],
             key: 'Recursos não financeiros'
           }
         ];

        grafico['series_1'] = series_vazia;
      }

      escolherGrafico("p3",grafico);

      //Orcamento federal
      txt = 'A média de transferências Federais é de <b>'+formatarDinheiro(data.orcamento.media)+'</b>.';

      $("#tx_transferencias_federais").append(txt);

      txt = '<h5 class="legenda_perfil">'+formatar_fontes(data.orcamento.fontes)+'</h5>';//["SigaBrasil. Valores deflacionados para Dez/2018."]

      txt +='<h5><a id="tabela-p6" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>';
      $("#tx_transferencias_federais").append(txt);

      var grafico = {};
      grafico['configuracao'] = ["f","1000","","f"];
      grafico['legenda_x'] = "Ano";
      grafico['legenda_y'] = "Transferências Federais (em milhares R$)";
      grafico['titulo_colunas'] = ["Transferências Federais","Ano","Quantidade"];
      grafico['titulo'] = "Transferências Federais para OSCs por ano";
      grafico['fontes'] = data.orcamento.fontes;
      grafico['legenda'] = "";
      grafico['tipo_grafico'] = "linechart";

      if(data.orcamento.series_1 != null){


        if(data.orcamento.series_1[0].values){
          data.orcamento.series_1[0].values = [{"x" : ano-2, "y" : 0 },{"x" : ano-1, "y" : 0 },{"x" : ano, "y" : 0 }];
        }


        grafico['series_1'] = data.orcamento.series_1;
      }
      else{
        var ano = new Date().getFullYear();

          var series_vazia = [
           {
             "tipo_valor":"$",
             values: [{"x" : ano-2, "y" : 0 },{"x" : ano-1, "y" : 0 },{"x" : ano, "y" : 0 }],
             key: 'Orçamento empenhado'
           }
         ];

        grafico['series_1'] = series_vazia;
      }

      escolherGrafico("p6",grafico);



      //Área de Atuação

      var txt = '<p>'+data.tx_localidade+' possui <b>'+data.area_atuacao.nr_porcentagem_maior+'%</b> das OSCs atuando em '+data.area_atuacao.tx_porcentagem_maior['0'];

      for (var i = 0; i < data.area_atuacao.media_nacional.length; i++) {
        if(data.area_atuacao.media_nacional[i].tx_area_atuacao == data.area_atuacao.tx_porcentagem_maior['0']){
            txt += ', enquanto o percentual médio nacional de OSCs nesta categoria é de <b>'+data.area_atuacao.media_nacional[i].nr_area_atuacao+'%</b>.';
        }
        break;
      }

      $("#tx_area_atuacao").append(txt);

      txt = '<h5 class="legenda_perfil">'+formatar_fontes(data.area_atuacao.fontes)+'</h5>';
      txt +='<h5><a id="tabela-p4" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>';
      $("#tx_area_atuacao").append(txt);

      var grafico = {};
      grafico['configuracao'] = ["f","1","","f"];
      grafico['legenda_x'] = "Atividade Econômica";
      grafico['legenda_y'] = "Quantidade OSC";
      grafico['titulo_colunas'] = ["Atividade Econômica","Quantidade OSC"];
      grafico['titulo'] = "Distribuição de OSCs por área de atuação";
      grafico['fontes'] = data.area_atuacao.fontes;
      grafico['legenda'] = "";
      grafico['tipo_grafico'] = "donutchart";
      grafico['series_1'] = data.area_atuacao.series_1;

      escolherGrafico("p4",grafico);

      //Trabalhadores

      var txt = '<p>'+data.tx_localidade+' foram identificados ';
      txt += '<b>'+data.trabalhadores.series_1['0'].value+'</b> '+data.trabalhadores.series_1['0'].label + '. ';
      txt += 'Alem desses, as OSCS declararam <b>'+data.trabalhadores.series_1['2'].value+'</b> '+data.trabalhadores.series_1['2'].label +' e ';
      txt += '<b>'+data.trabalhadores.series_1['1'].value+'</b> '+data.trabalhadores.series_1['1'].label+'.';
      txt += '</p>';


      $("#tx_trabalhadores").append(txt);

      txt = '<h5 class="legenda_perfil">'+formatar_fontes(data.trabalhadores.fontes)+'</h5>';
      txt +='<h5><a id="tabela-p5" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>';
      $("#tx_trabalhadores").append(txt);

      var grafico = {};
      grafico['configuracao'] = ["f","1","","f"];
      grafico['legenda_x'] = "Tipo";
      grafico['legenda_y'] = "Número de trabalhadores";
      grafico['titulo_colunas'] = ["Tipo","Número de trabalhadores"];
      grafico['titulo'] = "Distribuição de trabalhodores";
      grafico['fontes'] = data.trabalhadores.fontes;
      grafico['legenda'] = "";
      grafico['tipo_grafico'] = "barchart";
      grafico['series_1'] = data.trabalhadores.series_1;

      escolherGrafico("p5",grafico);

      // Limpar tela
      $( ".dt_pub_news" ).before( $( ".social" ) );
      $( ".social" ).css("display","flex")
      $('.loading').addClass('hide');
      $(".social iframe").each(function() {
        $(this).attr('title', '');
      });
    }
  });


});
