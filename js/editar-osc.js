/* jshint ignore:start */
require(["jquery-ui", "libs/jquery-mask/jquery.mask.min"], function (React) {

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

  function readURL(input) {
    if (input.files && input.files[0] && input.files[0].type.match('image.*')) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#imagemLogo").attr('src', e.target.result)
      };
      reader.readAsDataURL(input.files[0]);
    }
    else {
      $('#errorLabel').removeClass('hide');
    }
  }

  $('.custom-file-upload').on("change", function(){
    $('input[type=file]').each(function(index){
      if ($('input[type=file]').eq(index).val() != ""){
        readURL(this);
      }
    });
  });

});

require(['react', 'rotas', 'jsx!components/Util', 'jsx!components/EditarOSC', 'jquery', 'jquery-ui', 'datatables-responsive', 'editarCabecalho'], function (React) {

  var dadosForm = new DataForms();
  var util = new Util();
  var rotas = new Rotas();
  var cabecalhoObject = new Cabecalho();
  var dadosGerais = new DadosGerais();
  var areasAtuacao = new AreaAtuacao();
  var descricao = new Descricao();
  var titulosCertificacoes = new TitulosCertificacoes();
  var relacoesGovernanca = new RelacoesGovernanca();
  var espacosPartSocial = new EspacosPartSocial();
  var projeto = new Projeto();
  var fonteRecurso = new FonteRecurso();
  var old_json = null;
  var newJson = {};

  require(['componenteFormItem', 'componenteCabecalho', 'componenteCheckbox', 'componenteSection',
  'componenteAgrupador', 'componenteFormItemButtons','componenteAgrupadorInputProjeto','componenteAgrupadorConferencia','componenteAgrupadorConselhos'],
  function(FormItem, Cabecalho, Checkbox, Section, Agrupador, FormItemButtons, AgrupadorInputProjeto, AgrupadorConferencia, AgrupadorConselhos){

    var valoresURL = window.location.href.split('#')[1]!==undefined ? window.location.href.split('#/')[1].split('=') : null;
    var urlRota = "";
    var idOsc = "";
    //console.log(rotas);
    if(valoresURL !== null){
      idOsc = valoresURL[0];
      urlRota = rotas.OSCByID_no_project(idOsc);
    }
    //window.localStorage.setItem('User', 17);
    //window.localStorage.setItem('Authorization', "vhYFzMQd8FzeMgM89P99Bx6qR7coRXBGHycCaTr27F4=");
    var user = window.localStorage.getItem('User');
    var auth  = window.localStorage.getItem('Authorization');

    $("#unauthorized" ).dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      autoOpen: false,
      buttons: {
        "OK": function() {
          $( this ).dialog( "close" );
        }
      }
    });

    var authHeader = {
      "User": user,
      "Authorization": auth
    }

    var divObjetivosMetasProjeto='';

    $.ajax({
      url: rotas.OSCByID_no_project(idOsc),
      type: 'GET',
      dataType: 'json',
      data:{flag: "", rota: urlRota},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
        //console.log(data);
        //Cabeçalho
        cabecalhoObject.montarCabecalho(data, util, React, ReactDOM, Cabecalho);
        old_json = data;
        // Dados Gerais
        dadosGerais.montarDadosGerais(data, util, dadosForm, React, ReactDOM, FormItem);
        //Áreas de atuação
        var txtAtvEconomica = util.validateObject(data.dados_gerais.tx_nome_atividade_economica_osc) ? data.dados_gerais.tx_nome_atividade_economica_osc : "";
        var fonteAtvEconomica = util.validateObject(data.dados_gerais.ft_atividade_economica_osc) ? data.dados_gerais.ft_atividade_economica_osc : "";
        areasAtuacao.montarAreasDeAtuacao(data, util, dadosForm, rotas, txtAtvEconomica, fonteAtvEconomica, React, ReactDOM, FormItem);
        //Descrição
        descricao.montarDescricao(data, util, dadosForm.descricao(descricao), React, ReactDOM, FormItem);
        //Títulos e certificações
        var dados_form = dadosForm.titulosCertificacoes(data, util);
        titulosCertificacoes.montarTitulosCertificacoes(data, util, dados_form, React, ReactDOM, FormItem);
        //Relações de trabalho e governança
        var formItens = relacoesGovernanca.montarRelacoesGovernanca(data, util, dadosForm);
        relacoesGovernanca.ativarTrabalhoGovernanca(dadosForm, formItens, React, ReactDOM, Section, Agrupador, FormItem, FormItemButtons, util);
        // Espaços participacao social
        var arrayObj = espacosPartSocial.iniciarEspacosPartSoc(data, util, dadosForm, Section, React, ReactDOM);
        espacosPartSocial.ativarEspacosPart(arrayObj, util, React, ReactDOM, Agrupador, AgrupadorConselhos, AgrupadorConferencia, FormItemButtons);
        //Projetos
        projeto.montarProjetos(data, util);
        //ativarProjetos(data, util, dadosForm);
        //Fonte de recurso
        fonteRecurso.montarFontedeRecursos(data, util, dadosForm, React, ReactDOM, Section, FormItem);
        //Acessibilidade
        verificarContraste();
        //função para contornar a não renderização de eventos (onclick, onmouseover...) pelo react
        clique();
        //Datas
        $(".date").datepicker({ dateFormat: 'dd-mm-yy' });
        //Seleção anual como opção do date picker
        $(function() {
            $('.ano').datepicker({
                changeYear: true,
                showButtonPanel: true,
                dateFormat: 'yy',
                yearRange: '1950:2050',
                onClose: function(dateText, inst) {
                    var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                    $(this).datepicker('setDate', new Date(year, 1));
                }
            });
          	$(".ano").focus(function () {
                $(".ui-datepicker-calendar").hide();
                $('.ui-datepicker-month').hide();
                $('.ui-datepicker-prev').hide();
                $('.ui-datepicker-next').hide();
            });
        });
      }
    });

    function ativarProjetos(data, util){
      var projetosArray = projeto.montarProjetos(data, util);
      var headerProjeto = projetosArray[0];
      Section = React.createFactory(Section);
      ReactDOM.render(
        Section(
          {dados:[headerProjeto]}
        ), document.getElementById("projetos")
      );
      $( "#lista_projetos" ).append( '<table id="table_lista_projetos"></table>' );

      var newData = projetosArray[1];
      var table_lista_projetos = montaTabelaListaProjetos(newData);
      Section = React.createFactory(Section);
      ReactDOM.render(
        Section(
          {dados:[headerProjeto]}
        ), document.getElementById("projetos")
      );
      $( "#lista_projetos" ).append( '<table id="table_lista_projetos"></table>' );

      var newData = projetosArray[2];
      var table_lista_projetos = montaTabelaListaProjetos(newData);
      $('#table_lista_projetos').append('<span class="input-group-btn">'+
      '<button id="add_projeto" class="btn-primary btn">Adicionar Projeto</button>'+
      '</span>');
      $('#add_projeto').click(function(){
        table_lista_projetos.row.add([
          "-1",
          "Novo Projeto"
        ]).draw();
        verificarContraste();
      });

      $("#table_lista_projetos").on('click', 'tr', function(){
        var id_projeto = table_lista_projetos.row(this).data()[0];
        var divId = "projeto-" + id_projeto;
        var projetos = $(this).next(".projeto");
        if(projetos.length < 1){
          $(this).after('<div id="' + divId + '" class="projeto col-md-12">');
          var result = projeto.carregaProjeto(id_projeto, dadosForm, rotas, util);

          agrupamento(result, id_projeto);
          metasObjetivos(data, id_projeto);
          verificarContraste();
        } else {
          var $divDadosProjeto = $(projetos[0]);
          $divDadosProjeto.toggleClass("hidden");
        }
      });
    }

    function montaTabelaListaProjetos(newData){
      var table_lista_projetos = $('#table_lista_projetos').DataTable({
        responsive: true,
        deferLoading: 1000,
        deferRender: true,
        data: newData,
        columns: [
          {DT_RowId: "Id"},
          {title: "Nome do Projeto"}
        ],
        order: [],
        aoColumnDefs: [
          {bSortable :false, aTargets: [0]},
          {
            "targets": [ 0 ],
            "visible": false,
            "searchable": false
          },
        ],
        autoWidth: true,
        "oLanguage": dadosForm.oLanguageDataTable()
      });

      return table_lista_projetos;
    }

    function agrupamento(agrupadores, id){
      AgrupadorInputProjeto = React.createFactory(AgrupadorInputProjeto);
      ReactDOM.render(
        AgrupadorInputProjeto(
          {dados:agrupadores}
        ), document.getElementById("projeto-"+id)
      );

      $(".date").datepicker({ dateFormat: 'dd-mm-yy' });
      $(".ano").datepicker({ dateFormat: 'yy' });

      // interacoes
      $('#projeto-'+id).on("click", ".btn-danger", function(){
        $(this).parents(".input-group").remove();
      });

      $('#projeto-'+id).find(".btn-primary").bind("click", function(){
        $(this).parent().siblings(".form-group").append(
          '<div class="input-group">'+
          '<div>'+
          '<input class="form-control" placeholder="Insira a informação"></input>'+
          '</div>'+
          '<span class="input-group-btn">'+
          '<button class="btn-danger btn">Remover</button>'+
          '</span>'+
          '</div>'
        );
      });
    }

    function metasObjetivos(project, id){
      //metas e objetivos
      var objetivo_meta = util.validateObject(project.objetivo_meta) ? project.objetivo_meta : "";
      var objetivo = util.validateObject(objetivo_meta.tx_nome_objetivo_projeto) ? objetivo_meta.tx_nome_objetivo_projeto : -1;
      var cd_objetivo = util.validateObject(objetivo_meta.cd_objetivo_projeto) ? objetivo_meta.cd_objetivo_projeto : -1;
      var meta = util.validateObject(objetivo_meta.tx_nome_meta_projeto) ? objetivo_meta.tx_nome_meta_projeto : -1;
      var cd_meta = util.validateObject(objetivo_meta.cd_meta_projeto) ? objetivo_meta.cd_meta_projeto : -1;

      $.ajax({
        url: rotas.Objetivos(),
        type: 'GET',
        dataType: 'json',
        data:{},
        error:function(e){
          console.log("Erro no ajax: ");
          console.log(e);
        },
        success: function(data){
          montarObjetivos(data);
        }
      });

      var $divProjeto = $('#projeto-'+id);
      $divProjeto.append('<div class="col-md-12" id="objetivos-metas"</div>');

      $divObjetivosMetasProjeto = $divProjeto.find("#objetivos-metas");
      $divObjetivosMetasProjeto.append('<div id="objetivos" class="objetivos"></div>');

      $divObjetivosProjeto = $divObjetivosMetasProjeto.find('#objetivos');
      $divObjetivosProjeto.append('<div class="header">Objetivos do Desenvolvimento Sustentável - ODS - <a href=https://nacoesunidas.org/pos2015 target=_blank>.</a> </div>');
      $divObjetivosProjeto.append('<div class="form-group"><div id="objetivos"><select class="form-control"></select></div></div>');
      $divObjetivosMetasProjeto.append('<div id="metas-'+cd_objetivo+'" class="metas"></div>');

      var $divMetasProjeto = $divObjetivosMetasProjeto.find("#metas-"+cd_objetivo);
      $divMetasProjeto.append('<div class="header" title="Marque as metas que se enquadram neste projeto">Metas Relacionadas ao ODS definido</div>');
      $divMetasProjeto.append('<ol id="selectable-'+cd_objetivo +'" class="selectable"></ol>');

      if(cd_objetivo){
        loadMetas(cd_objetivo);
      }
    }

    function montarObjetivos(json){
      var options = json;
      var $selectObjetivos = $divObjetivosProjeto.find("select");
      $selectObjetivos.append('<option selected id="' + 0 + '">' + "Selecione um item" + '</option>');
      for (var i = 0; i < options.length; i++) {
        if(options[i].cd_objetivo_projeto === cd_objetivo){
          $selectObjetivos.append('<option selected id="' + options[i].cd_objetivo_projeto + '">' + options[i].tx_nome_objetivo_projeto + '</option>');
        } else {
          $selectObjetivos.append('<option id="' + options[i].cd_objetivo_projeto + '">' + options[i].tx_nome_objetivo_projeto + '</option>');
        }
      }
    }

    function loadMetas(cd_objetivo){
      // rotas.Metas()
      $.ajax({
        url: rotas.MetaProjeto(cd_objetivo),
        type: 'GET',
        dataType: 'json',
        data:{},
        error:function(e){
          console.log("Erro no ajax: ");
          console.log(e);
        },
        success: function(data){
          montarMetas(data, cd_objetivo);
        }
      });
    }

    function montarMetas(data, cd_objetivo){
      if (util.validateObject(data)){
        var checkboxItems = [];
        function CheckboxItems(id, label, value, type, custom_class){
          this.id = id;
          this.label = label;
          this.value = value;
          this.type = type;
          this.custom_class = custom_class;
        }
        //console.log(data);
        items = data;
        for (var i=0; i<items.length; i++){
          checkboxItems.push(new CheckboxItems(items[i].cd_meta_projeto, items[i].tx_nome_meta_projeto, items[i].tx_nome_meta_projeto, "checkbox", null));
        }
        Checkbox = React.createFactory(Checkbox);
        ReactDOM.render(
          Checkbox(
            {header:{priority: headerPriority, text: headerText}, dados:checkboxItems}
          ), document.getElementById("selectable-"+cd_objetivo)
        );
        //console.log(CheckboxItems);
      }
    }

    function carregaMetas($divObjetivosMetasProjeto){
      $('.objetivos').find('select').on('change', function(){
        cd_objetivo = $(this).children(":selected").attr("id")
        $(this).parents("#objetivos-metas").find(".metas").each(function(){
          if(!$(this).hasClass('hidden')){
            $(this).toggleClass('hidden');
          }
        });

        // $(this).removeClass("ui-selected");
        //console.log($divObjetivosMetasProjeto);
        $divObjetivosMetasProjeto.append('<div id="metas-'+cd_objetivo+'" class="metas"></div>');
        $('#metas-'+cd_objetivo).append('<div class="header" title="Marque as metas que se enquadram neste projeto">Metas Relacionadas ao ODS definido</div>');
        $('#metas-'+cd_objetivo).append('<ol id="selectable-'+cd_objetivo +'" class="selectable"></ol>');
        if($('#metas-'+cd_objetivo).hasClass('hidden')){
          $('#metas-'+cd_objetivo).toggleClass('hidden');
        }
        //console.log(cd_objetivo);
        if(parseInt(cd_objetivo) !== 0){
          loadMetas(cd_objetivo);
        }
      });
    }

    function clique(){
      var jsonModalAjuda = dadosForm.jsonModalAjuda();
      $(".ajuda").on("click", function(){
        util.abrirModalAjuda($(this).attr("data"), jsonModalAjuda);
      });
    }

    // Salvar
    $("#salvar").click(function(){
      var success="";//guarda mensagens dos saves das secoes da pagina
      //Dados Gerais
      var newJson = util.validateObject(old_json.dados_gerais) ? old_json.dados_gerais : {};
      $("#dados_gerais :input").each(function(){
        var key = $(this).attr("id");
        var value = $(this).val();
        newJson[key] = value;
      });
      newJson["headers"] = authHeader;
      newJson["id_osc"] = idOsc;

      success = util.carregaAjax(rotas.DadosGerais(idOsc), 'POST', newJson);
      console.log(success);

      //Áreas de atuação
      if(util.validateObject(old_json.area_atuacao)){
        newJson = old_json.area_atuacao;
      } else{
        newJson={};
        newJson.area_atuacao = [];
      }

      var suggestions = dadosForm.getSuggestions();
      $("#areas_de_atuacao .autocomplete").each(function(){
        var cd_area = 0;
        for (var i = 0; i < suggestions.length; i++) {
          if($(this).val() === suggestions[i].tx_nome_area_atuacao){
            cd_area = suggestions[i].cd_area_atuacao;
          }
        }

        var macro_area_id = $(this).attr("id").substring(11);
        var idMacroAreaOutros = $("#macro_area_"+macro_area_id+"_outros").val();

        obj_area_atuacao = {
          "cd_area_atuacao": cd_area,
          "tx_nome_area_atuacao": ($(this).val() === "Outros") ? idMacroAreaOutros : $(this).val(),
          "ft_area_atuacao": "Usuário",
          "id_area_atuacao": null
        }

        var subareas = [];
        $(this).siblings(".checkboxList").children(":not(.hidden)").each(function(index){
          $(this).find("input:checked").each(function(){
            var labelOutros = $(this).closest("label").text();
            var isLabelOutros = ($(this).closest("label").text() === "Outros");

            subareas.push({
              "tx_nome_subarea_atuacao": isLabelOutros ? $("#sub_area_"+macro_area_id+"_outros").val() : labelOutros,
              "cd_subarea_atuacao": $(this).val(),
              "id_area_atuacao": null
            });
          });

          if(subareas){
            obj_area_atuacao.subareas = subareas;
          }
          newJson.area_atuacao.push(obj_area_atuacao);
        });
      });
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;

        success = util.carregaAjax(rotas.AtualizarAreaAtuacao(idOsc), 'POST', newJson);
        console.log(success);

        //Descricao
        var newJson = {};
        $("#descricao .form-control").each(function(){
          newJson[$(this).attr("id")] = $(this).val();
        });
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        //console.log(newJson);

        success = util.carregaAjax(rotas.Descricao(idOsc), 'POST', newJson);
        console.log(success);

        //Certificacoes
        var newJson = {};
        newJson.certificados = [];
        $("#certificacoes .form-control").each(function(){
          var cd_certificado = 0;
          if($(this).attr("id").substring(18) === "estadual"){
            cd_certificado = 6;
          }
          if($(this).attr("id").substring(18) === "municipal"){
            cd_certificado = 7;
          }
          var item = {};
          item[$(this).attr("id")] = {};
          item[$(this).attr("id")].dt_fim_certificado = $(this).val();
          item[$(this).attr("id")].dt_inicio_certificado = null;
          item[$(this).attr("id")].ft_certificado = authHeader.User;
          item[$(this).attr("id")].ft_inicio_certificado = authHeader.User;
          item[$(this).attr("id")].ft_fim_certificado = authHeader.User;
          item[$(this).attr("id")].cd_certificado = cd_certificado;
          newJson.certificados.push(item);
        });
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        //console.log(newJson);

        success = util.carregaAjax(rotas.Certificado(idOsc), 'POST', newJson);
        console.log(success);

        // Projetos
        var newJson = [];
        var idProjeto = "";
        $(".projeto").each(function(){
          var str = $(this).attr("id");
          idProjeto = str.substring(str.indexOf("-") + 1);
          $(this).find(".form-group").each(function(){
            if($(this).children().length <= 1){
              $child = $(this).children(':first');
              var key = $(this).attr("id");
              var value = $child.find(".form-control").val();
              if(key)
              newJson[key] = value;
            } else {
              var children = $(this).children();
              var key = $(this).attr("id");
              newJson[key] = [];
              for (var i = 0; i < children.length; i++) {
                var $child = $(children[i]);
                newJson[key].push($child.find(":input").val());
              }
            }
          });
          newJson["meta"] = $(".metas :visible").find(".ui-selected").text();
          newJson["headers"] = authHeader;
          newJson["id_osc"] = idOsc;
          //console.log(newJson);
          success = util.carregaAjax(rotas.ProjectByID(idProjeto), 'POST', newJson);
          console.log(success);
        });
      //});
    });
  });

});
