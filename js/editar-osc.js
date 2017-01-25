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

require(['react', 'rotas', 'jsx!components/Util', 'jsx!components/EditarOSC', 'jquery', 'datatables-responsive'], function (React) {

  var dadosForm = new DataForms();

  require(
    ['componenteFormItem', 'componenteCabecalho', 'componenteCheckbox', 'componenteSection', 'componenteAgrupador', 'componenteFormItemButtons','componenteAgrupadorInputProjeto','componenteAgrupadorConferencia','componenteAgrupadorConselhos'], function(FormItem, Cabecalho, Checkbox, Section, Agrupador, FormItemButtons, AgrupadorInputProjeto, AgrupadorConferencia, AgrupadorConselhos){
    function FormItens(id, label, content, fonte, placeholder, type, options, pretext, custom_class, hide, defaultFormItem){
      this.id = id;
      this.label = label;
      this.content = content;
      this.fonte = fonte;
      this.placeholder = placeholder;
      this.type = type;
      this.options = options;
      this.pretext = pretext;
      this.custom_class = custom_class;
      this.hide = hide;
      this.default = defaultFormItem;
    }
    //var valoresURL = window.location.href.split('?')[1]!==undefined ? window.location.href.split('?')[1].split('=') : null;
    var valoresURL = window.location.href.split('#')[1]!==undefined ? window.location.href.split('#/')[1].split('=') : null;
    var rotas = new Rotas();
    var urlRota = "";
    var idOsc = "";
    //console.log(rotas);
    if(valoresURL !== null){
      idOsc = valoresURL[0];
      urlRota = rotas.OSCByID_no_project(idOsc);
    }
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

    // console.log(urlRota);
    // api/osc/no_project/{id}
    $.ajax({
      //url: "http://localhost:8080/api/osc/no_project/"+idOsc,
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
        montarCabecalho(data);
        montarDadosGerais(data);
        montarAreasDeAtuacao(data);
        montarDescricao(data);
        montarTitulosCertificacoes(data);
        montarRelacoesGovernanca(data);
        montarEspacosParticipacaoSocial(data);
        montarProjetos(data);
        $(".date").datepicker({ dateFormat: 'dd-mm-yy' });
        montarFontedeRecursos(data);
        verificarContraste();
        clique();
      }
    });

  //função para contornar a não renderização de eventos (onclick, onmouseover...) pelo react
  function clique(){
    $(".ajuda").on("click", function(){
      abrirModalAjuda($(this).attr("data"));
      //console.log("ok");
    });
  }

	function montarCabecalho(json){
    function fCabecalho(Nome, cd_nur,NatJur){
        this.Nome = Nome;
        this.cd_nur = cd_nur;
        this.NatJur = NatJur;
      }
    if (validateObject(json.cabecalho)) {
      var Nome = json.cabecalho.tx_razao_social_osc ? json.cabecalho.tx_razao_social_osc : "";
      var cd_nur = json.cabecalho.cd_identificador_osc ? json.cabecalho.cd_identificador_osc : "";
      var NatJur = json.cabecalho.tx_nome_natureza_juridica_osc ? json.cabecalho.tx_nome_natureza_juridica_osc : "";

      var cabecalho = [];
      cabecalho.push(new fCabecalho(Nome, cd_nur, NatJur));
      Cabecalho = React.createFactory(Cabecalho);
      ReactDOM.render(Cabecalho({dados:cabecalho}), document.getElementById("cabecalho"));
    }
  }



  // Dados Gerais
  function montarDadosGerais(json){
    if (validateObject(json.dados_gerais)) {
      var dadosGerais = json.dados_gerais;
      var content = montarEnderecoImovel(dadosGerais)
      var dados_form =dadosForm.dadosGerais(dadosGerais, content);
      var items = dados_form.form_items;
      var headerPriority = '2';
      var headerText = 'Dados Gerais';
      var formItens = [];

      for (var i=0; i<items.length; i++){
        formItens.push(new FormItens(items[i].id, items[i].label, items[i].content, items[i].fonte, items[i].placeholder, items[i].type, items[i].options, items[i].pretext));
      }
      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:{priority: headerPriority, text: headerText}, dados:formItens}
        ), document.getElementById("dados_gerais")
      );
    }

    $("#tx_telefone").find("input").mask('(00) 0000-0000');
  }

  //Áreas de atuação
  function montarAreasDeAtuacao(json){
    //if (validateObject(json.area_atuacao)) {
    function AutocompleteItem(id, label, content, fonte, placeholder, type, custom_class, areas, subareas){
      this.id = id;
      this.label = label;
      this.content = content;
      this.fonte = fonte;
      this.placeholder = placeholder;
      this.type = type;
      this.custom_class = custom_class;
      this.areas = areas;
      this.subareas = subareas;
    }
    var areas_atuacao;
    var area_atuacao_outra;

    if(json.area_atuacao){
      areas_atuacao = json.area_atuacao.area_atuacao;
      area_atuacao_outra = json.area_atuacao.area_atuacao_outra;
    }

    if(areas_atuacao === undefined){
      areas_atuacao = [];
    }
    if(area_atuacao_outra === undefined){
      area_atuacao_outra = [];
    }
    areas_atuacao = areas_atuacao.concat(area_atuacao_outra);
    //console.log(areas_atuacao);
    var macro_area_suggestions = dadosForm.getSuggestions();
    $.when(
      $.ajax({
        url: rotas.AreaAtuacao(),
        type: 'get',
        dataType: 'json',
        data: {},

        success: function(data) {
          return data;
        },
        error: function(e) {
          console.log(e);
        }
      }),
      $.ajax({
        url: rotas.SubAreaAtuacao(),
        type: 'get',
        dataType: 'json',
        data: {},

        success: function(data) {
          return data;
        },
        error: function(e) {
          console.log(e);
        }
      })
    ).then(function (macro_area_suggestions, subarea_suggestions) {
      loadSuggestions(macro_area_suggestions[0], subarea_suggestions[0]);
    });

    function loadSuggestions(macro_area_suggestions, subarea_suggestions){
      //console.log(macro_area_suggestions);
      //console.log(subarea_suggestions);

      for (var i = 0; i < subarea_suggestions.length; i++) {
        subarea_suggestions[i]["label"] = subarea_suggestions[i]["tx_nome_subarea_atuacao"];
        subarea_suggestions[i]["value"] = subarea_suggestions[i]["tx_nome_subarea_atuacao"];
      }
      headerPriority = '2';
      headerText = 'Áreas e Subáreas de Atuação da OSC';
      formItens = [];
      dados_form = dadosForm.areasAtuacao();
      items = dados_form.form_items;
      formItens.push(new AutocompleteItem(items[0].id, items[0].label, json.dados_gerais.tx_nome_atividade_economica_osc, json.dados_gerais.ft_atividade_economica_osc, items[0].placeholder, items[0].type, items[0].custom_class, macro_area_suggestions, subarea_suggestions));
      items.splice(0,1);
      //console.log(items);
      for (var j=0; j<items.length; j++){
        var content = null;
        var fonte = null;
        if(areas_atuacao.length > j){
          content = areas_atuacao[j].tx_nome_area_atuacao;
          fonte = areas_atuacao[j].ft_nome_area_atuacao;
        }
        //formItens.push(new AutocompleteItem(items[j].id, items[j].label, content, fonte, items[j].placeholder, items[j].type, items[j].custom_class, macro_area_suggestions, subarea_suggestions));
        if(items[j].custom_class === "autocomplete"){
	        formItens.push(new AutocompleteItem(items[j].id, items[j].label, content, fonte, items[j].placeholder, items[j].type, items[j].custom_class, macro_area_suggestions, subarea_suggestions));
        } else {
          formItens.push(new FormItens(items[j].id, items[j].label, items[j].content, items[j].fonte, items[j].placeholder, items[j].type, items[j].options, items[j].pretext, null, items[j].hide));
        }
      }

      require(["react", "jquery-ui", "jquery"], function (React) {
        //autocomplete macro_area_1 e macro_area_2
        macro_area_suggestions = $.map(macro_area_suggestions, function(item) {
          newItem = {
            label: item.tx_nome_area_atuacao,
            value: item.tx_nome_area_atuacao,
            id: item.cd_area_atuacao
          };

          return newItem;
        });
        $("#areas_de_atuacao .autocomplete").autocomplete({
          minLength: 0,
          create: function(event, ui) {
            var value = $(this).attr("placeholder");
            for (var i = 0; i < macro_area_suggestions.length; i++) {
              var suggestion = macro_area_suggestions[i].value;
              if (suggestion === value){
                var $container = $(this).siblings(".checkboxList");
                var $element = $container.find("#subareas-"+i);
                if($element.hasClass('hidden')){
                  $element.toggleClass('hidden');
                }

                for (var j = 0; j < areas_atuacao.length; j++) {
                  if((value === areas_atuacao[j].tx_nome_area_atuacao)){
                    var subarea_exists = false;
                    $element.find("label").each(function(){
                      if(areas_atuacao[j].tx_nome_subarea_atuacao === $(this).text().trim()){
                        subarea_exists = $(this);
                      }
                    });
                    if(subarea_exists){
                      subarea_exists.find("input").prop('checked', true);
                    } else {
                      $element.find("#outros").val(areas_atuacao[j].tx_nome_subarea_atuacao);
                    }
                  }
                }
              }
            }
          },
          source: macro_area_suggestions,
          change: function( event, ui ) {
          },
          select: function(event, ui){
           var targetElement = event.target;
           var id = macro_area_suggestions.indexOf(ui.item)+1;
           var $container = $($(targetElement).siblings(".checkboxList")[0]);
           $container.children().each(function( index ) {
             if(!$(this).hasClass('hidden')){
               $(this).toggleClass('hidden');
               $(this).children().each(function(index){
                 var $input = $($(this).find('input')[0]);
                 if ($input.is(':checked')){
                   $input.prop('checked', false);
                 }
                 if ($input.prop('type') == "text"){
                   $input.val("");
                 }
               });
             }
           });
           var $element = $container.find("#subareas-"+id);
           if($element.hasClass('hidden')){
             $element.toggleClass('hidden');
           }
         }
       });
       $(".autocomplete").on("click", function(){
         $(this).autocomplete( "search", "" );
       });
        //interações seção areas de atuacao
        $(".checkboxList :checkbox").change(function() {

          if($(this).val() === "Outros"){
            var pai = $(this).closest(".form-group");
            var id = pai.find(".autocomplete").attr("id");
            var $inputContainer = pai.siblings().find("#"+id+"_outros").closest(".form-group");
            $inputContainer.toggleClass('hidden');
            if($inputContainer.hasClass('hidden')){
              var $input = $inputContainer.find('input');
              $input.val("");
            }
          }
        });
      });

      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:{priority: headerPriority, text: headerText}, dados:formItens}
        ), document.getElementById("areas_de_atuacao")
      );
    }

  }

  //Descrição
  function montarDescricao(json){

      var descricao = validateObject(json.descricao) ? json.descricao : "";
      headerPriority = '2';
      headerText = 'Descrição da OSC';
      formItens = [];
      dados_form = dadosForm.descricao(descricao);
      items = dados_form.form_items;
      for (j=0; j<items.length; j++){
        formItens.push(new FormItens(items[j].id, items[j].label, items[j].content, items[j].fonte, items[j].placeholder, items[j].type));
      }
      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:{priority: headerPriority, text: headerText}, dados:formItens}
        ), document.getElementById("descricao")
      );

    //Salvar
    $("#descricao").append('<button id="salvar" class="btn-primary btn">Salvar</button>');
    var newJson = {};
    $("#descricao").find("#salvar").click(function(){
      $("#descricao .form-control").each(function(){

        newJson[$(this).attr("id")] = $(this).val();
      });
    });
  }

  //Títulos e certificações
  function montarTitulosCertificacoes(json){
    var tx_sem_titulos = "Não há registros de títulos ou certificações";

    var utilidade_publica_estadual;
    var utilidade_publica_municipal;

    var certificacoes = validateObject(json.certificado) ? json.certificado.certificado : "";

    headerPriority = '2';
    headerText = 'Títulos e Certificações';
    formItens = [];
    dados_form = dadosForm.titulosCertificacoes(json);
    if(certificacoes){
      items = certificacoes;
    } else {
      items = [];
    }

    if(items.length > 0){
      for (j=0; j<items.length; j++){
        var dataValidadeText = "Data de Validade: " + (items[j].dt_fim_certificado?items[j].dt_fim_certificado:"Não informada");
        formItens.push(new FormItens(items[j].id_certificado, items[j].tx_nome_certificado, dataValidadeText, items[j].ft_certificado, null, "p"));
      }
    } else {
      formItens.push(new FormItens(null, null, tx_sem_titulos, "base", null, "p"));
    }
    items = dados_form.form_items;
    var autoElement = React.createElement('div', { id: 'auto' });
    var manualLabel = React.createElement('label', null, 'Utilidade pública');
    var manualElement = React.createElement('div', { id: 'manual' });
    var root = React.createElement('div', { id: 'root' }, autoElement, manualLabel, manualElement);
    ReactDOM.render(root, document.getElementById('certificacoes'));

    FormItem = React.createFactory(FormItem);
    ReactDOM.render(
      FormItem(
        {header:{priority: headerPriority, text: headerText}, dados:formItens}
      ), document.getElementById("auto")
    );
    formItens = [];
    for (j=0; j<items.length; j++){
      formItens.push(new FormItens(items[j].id, items[j].label, items[j].content, items[j].fonte, items[j].placeholder, items[j].type, items[j].options, null, null, items[j].hide));
    }

    FormItem = React.createFactory(FormItem);
    ReactDOM.render(
      FormItem(
        {header:null, dados:formItens}
      ), document.getElementById("manual")
    );

    //interações seção títulos e certificações
    $("#certificacoes :checkbox").change(function() {
      var $inputContainer = $(this).closest(".form-group").siblings().find("#utilidade_publica_"+this.value).closest(".form-group");
      $inputContainer.toggleClass('hidden');
      if($inputContainer.hasClass('hidden')){
        var $input = $inputContainer.find('input');
        $input.val("");
      }
    });

    $("#manual").find("input:text").each(function(){
      if ($(this).attr("placeholder") !== "Não constam informações nas bases de dados do Mapa."){
        var utilidade_publica_id = $(this).attr("id").replace("data_validade_", "");

        $("#manual").find("input:checkbox").each(function(){
          if($(this).val() === utilidade_publica_id){
            $(this).prop('checked', true);
          }
        });

        $(this).parents(".hidden").toggleClass('hidden');
      }
    });
  }

    //Relações de trabalho e governança
    function montarRelacoesGovernanca(json){
      // Governança: Dirigentes
      var tx_sem_relacoes = "Não há registros de relações de trabalho e governança";

      var sections = dadosForm.sectionsRelacoesGovernanca();
      items = sections.items;
      Section = React.createFactory(Section);
      ReactDOM.render(
        Section(
          {dados:items}
        ), document.getElementById(items[0].target)
      );
      function DadosForm(label, content) {
        this.nome = label;
        this.cargo = content;
      }

      //var dirigentes = json.relacoes_trabalho_governanca.governanca;
      //var conselheiros = json.relacoes_trabalho_governanca.conselho_fiscal;
	    var dirigentes = '0';
      var conselheiros = 0;

      //var relacoes_trabalho = json.relacoes_trabalho_governanca.relacoes_trabalho;
      var relacoes_trabalho =0;

      if (validateObject(json.relacoes_trabalho_governanca)) {
      // Governança: Dirigentes
      if (validateObject(json.relacoes_trabalho_governanca.governanca)){
        dirigentes = json.relacoes_trabalho_governanca.governanca
      }
      // Governança: Conselheiros
      if (validateObject(json.relacoes_trabalho_governanca.governanca)){
        conselheiros = json.relacoes_trabalho_governanca.conselho_fiscal;
      }

      formItens = [];
      for (j=0; j<dirigentes.length; j++){
        for (var property in dirigentes[j]) {
          if (dirigentes[j].hasOwnProperty(property)) {
            if(property == "tx_nome_dirigente"){
              formItens.push(new FormItens(dirigentes[j].id, "Nome", dirigentes[j].tx_nome_dirigente, dirigentes[j].ft_nome_dirigente, null, "text"));
            }
            if(property == "tx_cargo_dirigente"){
              formItens.push(new FormItens(dirigentes[j].id, "Cargo", dirigentes[j].tx_cargo_dirigente, dirigentes[j].ft_cargo_dirigente, null, "text"));
            }
          }
        }
      }
      formItens.push(new FormItens(null, "Nome do dirigente", null , null, "Insira o nome do dirigente", "text", null, null, null, null, true));
      formItens.push(new FormItens(null, "Cargo do dirigente", null , null, "Insira o cargo do dirigente", "text", null, null, null, null, true));
      Agrupador = React.createFactory(Agrupador);
      ReactDOM.render(
        Agrupador(
          {dados:formItens}
        ), document.getElementById("dirigentes")
      );
      formItens = [];
      //formItens.push(new FormItens(null, "Quantidade de conselheiros", conselheiros, null, null, "p"));
      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:null, dados:formItens}
        ), document.getElementById("conselheiros")
      );
      addItem('dirigentes');

      // Governança: Conselheiros
      var conselho_fiscal = conselheiros;//json.relacoes_trabalho_governanca.conselho_fiscal;
      formItens = [];
      for (var i = 0; i < conselho_fiscal.length; i++) {
        var conselheiro = conselho_fiscal[i];
        formItens.push(new FormItens(conselheiro.id_conselheiro, "Nome", conselheiro.tx_nome_conselheiro, conselheiro.ft_nome_conselheiro, "Insira o nome do conselheiro fiscal", "text"));
      }
      formItens.push(new FormItens(null, "Nome", null , null, "Insira o nome do conselheiro fiscal", "text", null, null, null, null, true));
      FormItemButtons = React.createFactory(FormItemButtons);
      ReactDOM.render(
        FormItemButtons(
          {header:null, dados:formItens}
        ), document.getElementById("conselho_fiscal")
      );

      addItem('conselho_fiscal');

      //Trabalhadores
      //var relacoes_trabalho = json.relacoes_trabalho_governanca.relacoes_trabalho;
      //var relacoes_trabalho_outra = json.relacoes_trabalho_governanca.relacoes_trabalho_outra[0];

      if (validateObject(json.relacoes_trabalho_governanca.relacoes_trabalho)) {
          relacoes_trabalho = json.relacoes_trabalho_governanca.relacoes_trabalho;
      }
      dados_form = dadosForm.relacoesTrabalho(relacoes_trabalho);
      formItens = [];
      for (var i = 0; i < dados_form.form_items.length; i++) {
        var campo = dados_form.form_items[i];
        formItens.push(new FormItens(campo.id, campo.label, campo.content, campo.fonte, campo.placeholder, campo.type));
      }
      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:null, dados:formItens}
        ), document.getElementById("trabalhadores")
      );
    }
    else {
      formItens = [];
      formItens.push(new FormItens(null, "Nome do dirigente", null , null, "Insira o nome do dirigente", "text", null, null, null, null, true));
      formItens.push(new FormItens(null, "Cargo do dirigente", null , null, "Insira o cargo do dirigente", "text", null, null, null, null, true));
      Agrupador = React.createFactory(Agrupador);
      ReactDOM.render(
        Agrupador(
          {dados:formItens}
        ), document.getElementById("dirigentes")
      );
        addItem('dirigentes');

      formItens = [];
      formItens.push(new FormItens(null, "Nome", null , null, "Insira o nome do conselheiro fiscal", "text", null, null, null, null, true));
      FormItemButtons = React.createFactory(FormItemButtons);
      ReactDOM.render(
        FormItemButtons(
          {header:null, dados:formItens}
        ), document.getElementById("conselho_fiscal")
      );
      addItem('conselho_fiscal');

      formItens = [];
      dados_form = dadosForm.trabalhadoresRelacoesGovernanca();
      for (var i = 0; i < dados_form.form_items.length; i++) {
        var campo = dados_form.form_items[i];
        formItens.push(new FormItens(campo.id, campo.label, campo.content, campo.fonte, campo.placeholder, campo.type));
      }
      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:null, dados:formItens}
        ), document.getElementById("trabalhadores")
      );
      addItem('trabalhadores');
    }
}

    // Espaços participacao social;
    function montarEspacosParticipacaoSocial(json){
      var tx_sem_participacao_social = "Não há registros de participação social";
      //var conselhos = json.participacao_social.conselho;
      //var conferencias = json.participacao_social.conferencia;
      //var outras = json.participacao_social.outra;
      var conselhos='0';
      var conferencias = '0';
      var outras ='0';

      var participacao_social_form = dadosForm.partSocial();

      items = participacao_social_form.items;
      Section = React.createFactory(Section);
      ReactDOM.render(
        Section(
          {dados:items}
        ), document.getElementById(items[0].target)
      );/*
      function DadosForm(label, content) {
        this.nome = label;
        this.cargo = content;
      }*/

      if (validateObject(json.participacao_social)){

      if (validateObject(json.participacao_social.conselho)) {
        conselhos = json.participacao_social.conselho;
      }

      if (validateObject(json.participacao_social.conferencia)) {
         conferencias = json.participacao_social.conferencia;
       }

       if (validateObject(json.participacao_social.outra)) {
         outras = json.participacao_social.outra;
       }

        formItens = [];

        if (conselhos) {
          var conselho = participacao_social_form.items;
          for (j=0; j<conselhos.length; j++){
            for (var property in conselhos[j]) {
              if (conselhos[j].hasOwnProperty(property)) {
                if(property == "conselho"){
                  formItens.push(new FormItens(conselhos[j].conselho.id, "Nome do Conselho", conselhos[j].conselho.tx_nome_conselho, conselhos[j].conselho.ft_conselho, null, "text"));
                  formItens.push(new FormItens(2, "Titularidade", conselhos[j].conselho.tx_nome_tipo_participacao, conselhos[j].conselho.ft_tipo_participacao, null, "text"));
                  formItens.push(new FormItens(3, "Nome de representante", conselhos[j].conselho.tx_nome_representante_conselho , conselhos[j].conselho.ft_nome_representante_conselho, null, "text"));
                  formItens.push(new FormItens(4, "Periodicidade da Reunião", conselhos[j].conselho.tx_periodicidade_reuniao, conselhos[j].conselho.ft_periodicidade_reuniao, null, "text"));
                  formItens.push(new FormItens(5, "Data de início de vigência", conselhos[j].conselho.dt_data_inicio_conselho, conselhos[j].conselho.ft_data_inicio_conselho, null, "text", null, null, "date"));
                  formItens.push(new FormItens(6, "Data de fim de vigência", conselhos[j].conselho.dt_data_fim_conselho, conselhos[j].conselho.ft_data_fim_conselho, null, "text", null, null, "date"));
                }
                /*
                if(property == "tx_nome_conselho"){
                  formItens.push(new FormItens(conselho[j].id, "Nome do Conselho", conselhos[j].tx_nome_conselho, conselhos[j].ft_conselho, null, "text"));
                }

                if(property == "tx_nome_tipo_participacao"){
                  formItens.push(new FormItens(conselho[j].id, "Titularidade", conselhos[j].tx_nome_tipo_participacao, conselhos[j].ft_tipo_participacao, null, "text"));
                }
                if(property == "tx_nome_representante_conselho"){
                  formItens.push(new FormItens(conselho[j].id, "Nome de representante", conselhos[j].tx_nome_representante_conselho , conselhos[j].ft_nome_representante_conselho, null, "text"));
                }
                if(property == "tx_periodicidade_reuniao"){
                  formItens.push(new FormItens(conselho[j].id, "Periodicidade da Reunião", conselhos[j].tx_periodicidade_reuniao, conselhos[j].ft_periodicidade_reuniao, null, "text"));
                }
                if(property == "dt_data_inicio_conselho"){
                  formItens.push(new FormItens(conselho[j].id, "Data de início de vigência", conselhos[j].dt_data_inicio_conselho, conselhos[j].ft_data_inicio_conselho, null, "text", null, null, "date"));
                }
                if(property == "dt_data_fim_conselho"){
                  formItens.push(new FormItens(conselho[j].id, "Data de fim de vigência", conselhos[j].dt_data_fim_conselho, conselhos[j].ft_data_fim_conselho, null, "text", null, null, "date"));
                }*/
             }
            }
          }
          formItens.push(new FormItens("tx_nome_conselho"+"-0", "Nome do Conselho", null,null, "Insira no nome do conselho de política pública", "text"));
          formItens.push(new FormItens("tx_nome_tipo_participacao"+"-0", "Titularidade", null,null, "Diga se a OSCs ocupa vaga de titular ou suplente", "text"));
          formItens.push(new FormItens("tx_nome_representante_conselho"+"-0", "Nome de representante", null,null, "Insira o nome do representante da OSC no Conselho", "text"));
          formItens.push(new FormItens("tx_periodicidade_reuniao"+"-0", "Periodicidade da Reunião", null,null, "Indique de quanto em quanto tempo as reuniões do Conselho ocorrem", "text"));
          formItens.push(new FormItens("dt_data_inicio_conselho"+"-0", "Data de início de vigência", null,null, "Insira a data em que se iniciou a atividade de representante da OSC no Conselho", "text", null, null, "date"));
          formItens.push(new FormItens("dt_data_fim_conselho"+"-0", "Data de fim de vigência", null,null, "Insira a data em que se encerrou a atividade de representante da OSC no Conselho", "text", null, null, "date"));

          Agrupador = React.createFactory(AgrupadorConselhos);
          ReactDOM.render(
            Agrupador(
              {header:null, dados:formItens}
            ), document.getElementById("conselhos")
          );
        };

        addItem('conselhos');

        formItens = [];//
          if (conferencias.length) {
            var conferencia = participacao_social_form.items;
            for (j=0; j<conferencias.length; j++){
              for (var property in conferencias[j]) {
                if (conferencias[j].hasOwnProperty(property)) {
                  if(property == "tx_nome_conferencia"){
                    formItens.push(new FormItens(property+"-"+conferencias[j].id, "Nome da Conferência", conferencias[j].tx_nome_conferencia, conferencias[j].ft_conferencia, null, "text"));
                  }
                  if(property == "tx_nome_forma_participacao_conferencia"){
                    formItens.push(new FormItens(property+"-"+conferencias[j].id, "Forma de participação na conferência", conferencias[j].tx_nome_forma_participacao_conferencia, conferencias[j].ft_forma_participacao_conferencia, null, "text"));
                  }
                  if(property == "dt_ano_realizacao"){
                    formItens.push(new FormItens(property+"-"+conferencias[j].id , "Ano de realização da conferência", conferencias[j].dt_ano_realizacao, conferencias[j].ft_ano_realizacao, null, "text", null, null, "date"));
                  }
               }
              }
            }
            formItens.push(new FormItens("tx_nome_conferencia"+"-0", "Nome da Conferência", null,null, "Caso a OSC tenha participado, indique aqui o nome da conferência de política pública", "text"));
            formItens.push(new FormItens("tx_nome_forma_participacao_conferencia"+"-0", "Forma de participação na conferência", null,null, "Indique qual foi a forma de atuação da OSC nesta Conferência", "text"));
            formItens.push(new FormItens("dt_ano_realizacao"+"-0", "Ano de realização da conferência", null,null, "Indique o ano em que se realizou a Conferência", "text", null, null, "date"));


            Agrupador = React.createFactory(AgrupadorConferencia);
            ReactDOM.render(
              Agrupador(
                {header:null, dados:formItens}
              ), document.getElementById("conferencias")
            );
          }


          addItem('conferencias');

      formItens = [];//
      if (outras.length) {
        var outra = participacao_social_form.items;
        for (j=0; j<outras.length; j++){
          for (var property in outras[j]) {

            if (outras[j].hasOwnProperty(property)) {

              if(property == "tx_nome_participacao_social_outra"){
                formItens.push(new FormItens(outra[j].id, "Atuação em Fóruns, Articulações, Coletivos e Redes de OSCs", outras[j].tx_nome_participacao_social_outra, outras[j].ft_participacao_social_outra, null, "text"));
              }
           }
          }
        }

        formItens.push(new FormItens(null, "Atuação em Fóruns, Articulações, Coletivos e Redes de OSCs", null , null, "Indique em quais outros espaços de participação a OSC atualmente tem atuação, se houver", "text", null, null, null, null, true));

        FormItemButtons = React.createFactory(FormItemButtons);
        ReactDOM.render(
          FormItemButtons(
            {header:null, dados:formItens}
          ), document.getElementById("outros_part")
        );
      }

      addItem('outros_part');
	  }
    else {

      formItens = [];
      formItens.push(new FormItens(null, "Nome do Conselho", null,null, "Insira no nome do conselho de política pública", "text"));
      formItens.push(new FormItens(null, "Titularidade", null,null, "Diga se a OSCs ocupa vaga de titular ou suplente", "text"));
      formItens.push(new FormItens(null, "Nome de representante", null,null, "Insira o nome do representante da OSC no Conselho", "text"));
      formItens.push(new FormItens(null, "Periodicidade das reuniões do Conselho", null,null, "Indique de quanto em quanto tempo as reuniões do Conselho ocorrem", "text"));
      formItens.push(new FormItens(null, "Data de início de vigência da representação da OSC no Conselho", null,null, "Insira a data em que se iniciou a atividade de representante da OSC no Conselho", "text", null, null, "date"));
      formItens.push(new FormItens(null, "Data de encerramento de vigência da representação no Conselho", null,null, "Insira a data em que se encerrou a atividade de representante da OSC no Conselho", "text", null, null, "date"));
      Agrupador = React.createFactory(AgrupadorConselhos);
      ReactDOM.render(
        Agrupador(
          {header:null, dados:formItens}
        ), document.getElementById("conselhos")
      );
      addItem('conselhos');

      formItens = [];
      formItens.push(new FormItens(null, "Nome da Conferência", null,null, "Caso a OSC tenha participado, indique aqui o nome da conferência de política pública", "text"));
      formItens.push(new FormItens(null, "Forma de participação na conferência", null,null, "Indique qual foi a forma de atuação da OSC nesta Conferência", "text"));
      formItens.push(new FormItens(null, "Ano de realização da conferência", null,null, "Indique o ano em que se realizou a Conferência", "text", null, null, "date"));

      Agrupador = React.createFactory(AgrupadorConferencia);
      ReactDOM.render(
        Agrupador(
          {header:null, dados:formItens}
        ), document.getElementById("conferencias")
      );
      addItem('conferencias');

      formItens = [];
      formItens.push(new FormItens(null, "Atuação em Fóruns, Articulações, Coletivos e Redes de OSCs", null , null, "Indique em quais outros espaços de participação a OSC atualmente tem atuação, se houver", "text", null, null, null, null, true));
      FormItemButtons = React.createFactory(FormItemButtons);
      ReactDOM.render(
        FormItemButtons(
          {header:null, dados:formItens}
        ), document.getElementById("outros_part")
      );
      addItem('outros_part');

    }
  }

  function montarFontedeRecursos(json){
    // console.log(json.recursos);

    var sections = dadosForm.itemsRecurso();

    recursos_form = dadosForm.tiposRecurso();

    var anos = ["2016", "2015", "2014"];
    for (var j = 0; j < anos.length; j++) {
      montarPorAno(anos[j], j);
    }
    function montarPorAno(ano, index) {
      // console.log(ano);
      $("#recursos").append('<div id='+ano+'></div>');
      if(index !== 0){
        $('#'+ano).toggleClass("hidden");
      }
      items = sections.items;
      // console.log(items);
      Section = React.createFactory(Section);
      ReactDOM.render(
        Section(
          {dados:items, ano: ano}
        ), document.getElementById(ano)
      );

      //geral, seleção do ano
      items = recursos_form.recursos_geral;
      formItens = [];
      for (var i=0; i<items.length; i++){
        formItens.push(new FormItens(items[i].id, items[i].label, ano, items[i].fonte, items[i].placeholder, items[i].type, items[i].options, items[i].pretext, items[i].custom_class));
      }
      FormItem = React.createFactory(FormItem);
      ReactDOM.render(
        FormItem(
          {header:null, dados:formItens}
        ), document.getElementById("recursos_geral-"+ano)
      );

      //recursos
      var recursosArray=[
        {//proprios
          "items": recursos_form.recursos_proprios,
          "divId": "recursos_proprios"
        },
        {//publicos
          "items": recursos_form.recursos_publicos,
          "divId": "recursos_publicos"
        },
        {//privados
          "items": recursos_form.recursos_privados,
          "divId": "recursos_privados"
        },
        {//nao financeiros
          "items": recursos_form.recursos_nao_financeiros,
          "divId": "recursos_nao_financeiros"
        }
      ];

      for(var k=0; k<recursosArray.length; k++){
        var formItens = [];
        var items = recursosArray[k].items;
        var divId = recursosArray[k].divId;

        for (var i=0; i<items.length; i++)
          formItens.push(new FormItens(items[i].id, items[i].label, items[i].content, items[i].fonte, items[i].placeholder, items[i].type, items[i].options, items[i].pretext));

        FormItem = React.createFactory(FormItem);
        ReactDOM.render(
          FormItem(
            {header:null, dados:formItens}
          ), document.getElementById(divId+"-"+ano)
        );
      }

      // máscara monetária
      $("#recursos_proprios-"+ano).find('input').mask('000.000.000.000.000,00', {reverse: true});
      $("#recursos_proprios-"+ano).find('input').addClass('with-pretext');
      $("#recursos_proprios-"+ano).find('.input-box').prepend('<span class="pretext">R$</span>');

      $("#recursos_publicos-"+ano).find('input').mask('000.000.000.000.000,00', {reverse: true});
      $("#recursos_publicos-"+ano).find('input').addClass('with-pretext');
      $("#recursos_publicos-"+ano).find('.input-box').prepend('<span class="pretext">R$</span>');

      $("#recursos_privados-"+ano).find('input').mask('000.000.000.000.000,00', {reverse: true});
      $("#recursos_privados-"+ano).find('input').addClass('with-pretext');
      $("#recursos_privados-"+ano).find('.input-box').prepend('<span class="pretext">R$</span>');

      $("#recursos_nao_financeiros-"+ano).find('input').mask('000.000.000.000.000,00', {reverse: true});
      $("#recursos_nao_financeiros-"+ano).find('input').addClass('with-pretext');
      $("#recursos_nao_financeiros-"+ano).find('.input-box').prepend('<span class="pretext">R$</span>');
    }

    // interacoes da selecao de anos
    $(".select-ano").find(".form-control").bind("change", function(){
      var ano = $(this).val();
      if($("#"+ano).hasClass('hidden')){
        $("#"+ano).toggleClass('hidden');
        $("#"+ano).siblings().addClass('hidden');
      }

    });

  }
    // Lista de Projetos
    function montarProjetos(json){
      if (validateObject(json.projeto_abreviado)) {
            var projects_list = json.projeto_abreviado;
            var headerProjeto = {
              "id": "lista_projetos",
              "priority": "2",
              "text": "Projetos, atividade e programas"
            };

            Section = React.createFactory(Section);
            ReactDOM.render(
              Section(
                {dados:[headerProjeto]}
              ), document.getElementById("projetos")
            );
            $( "#lista_projetos" ).append( '<table id="table_lista_projetos"></table>' );
            var columns = 2;
            var sizeOfData = projects_list.length;
            newData = new Array(sizeOfData);
            for (var i=0; i < projects_list.length; i++){
              newData[i] = new Array(columns);
              newData[i][0] = projects_list[i].id_projeto;
              newData[i][1] = projects_list[i].tx_nome_projeto;
            }
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
              "oLanguage": dadosForm.oLanguageDataTable();
             });

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
               carregaProjeto(id_projeto);
               verificarContraste();
              } else {
               var $divDadosProjeto = $(projetos[0]);
               $divDadosProjeto.toggleClass("hidden");
              }
             });

    }
    else {
      var projects_list =  '0';
      var headerProjeto = {
        "id": "lista_projetos",
        "priority": "2",
        "text": "Projetos, atividade e programas"
      };

      Section = React.createFactory(Section);
      ReactDOM.render(
        Section(
          {dados:[headerProjeto]}
        ), document.getElementById("projetos")
      );

      $( "#lista_projetos" ).append( '<table id="table_lista_projetos"></table>' );
      var columns = 2;
      var sizeOfData = projects_list.length;
      newData = new Array(sizeOfData);
      for (var i=0; i < projects_list.length; i++){
        newData[i] = new Array(columns);
        newData[i][0] = 1;
        newData[i][1] = "";
      }
      //console.log(newData);
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
        "oLanguage": dadosForm.oLanguageDataTable();
       });
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
        carregaProjeto(id_projeto);
        verificarContraste();
       } else {
        var $divDadosProjeto = $(projetos[0]);
        $divDadosProjeto.toggleClass("hidden");
       }
      });
    }
  }
    // Projetos
    function carregaProjeto(id){
      var labelMap = dadosForm.labelsProjeto();

      var buttonRemove = {
        "type": "remove",
        "value": "Remover"
      };

      var buttonAdd = {
        "type": "add",
        "value": "Adicionar"
      };

      function InputProjeto(id, content, type, options, removable, buttons, buttonsInLine){
        this.id = id;
        this.content = content;
        this.type = type;
        this.options = options;
        this.removable = removable;
        this.buttons = buttons;
        this.buttonsInLine = buttonsInLine;
      }

      function AgrupadorDeInputs(id, containerClass, header, inputs, buttons){
        this.id = id;
        this.containerClass = containerClass;
        this.header = header;
        this.inputs = inputs;
        this.buttons = buttons;
      }

      // rotas.ProjectByID(id)
      if(id === "-1"){
        var empty_project = dadosForm.getEmptyProject();
        montarProjeto(empty_project);
      } else {
        $.ajax({
          url: rotas.ProjectByID(id),
          type: 'GET',
          dataType: 'json',
          data:{},
          error:function(e){
            console.log("Erro no ajax: ");
            console.log(e);
          },
          success: function(data){
            montarProjeto(data);
          }
        });
      }

      function montarProjeto(json){
        var project = json;
        var agrupadores = [];
        var projectId = project.id_projeto;
        for (var property in project) {
          if ((project.hasOwnProperty(property)) && (labelMap[property] !== undefined)) {
            var sectionId = property;
            var value = project[property];
            var header = labelMap[property].header;
            var containerClass = labelMap[property].containerClass;
            var removable = labelMap[property].removable;
            var type = labelMap[property].type;
            var options = labelMap[property].options;
            var buttons = null;
            var buttonsInLine = false;

            if((value === null) || (value.constructor !== Array)){
              var inputProjeto = new InputProjeto(sectionId, value, type, options, removable, buttons, buttonsInLine);

              var agrupadorInputProjeto = new AgrupadorDeInputs(sectionId, containerClass, header, [inputProjeto], buttons);
              agrupadores.push(agrupadorInputProjeto);
            }
          }
        }
        var autodeclaradas = project.area_atuacao.concat(project.area_atuacao_outra);

        var localizacao = getLocalizacaoProjeto(projectId, project.localizacao);
        var fonte = getFonteDeRecursosProjeto(projectId);
        var publicoBeneficiado = getPublicoBeneficiadoProjeto(projectId, project.publico_beneficiado);
        var financiadores = getFinanciadoresProjeto(projectId, project.financiador);
        var autodeclaradas = getAutodeclaradasProjeto(projectId, autodeclaradas);
        var parceiras = getParceirasProjeto(projectId, project.parceira);
        var valorMeta = "";
        var idObjetivo = "";
        var multipleInputs = [
          localizacao, publicoBeneficiado, financiadores,
          autodeclaradas, parceiras, fonte
        ];
        for (var j = 0; j < multipleInputs.length; j++) {
          var agrupador = createAgrupadorMultipleInputs(multipleInputs[j]);
          agrupadores.push(agrupador);
        }

        function createAgrupadorMultipleInputs(object){
          var sectionId = object.id
          var element = labelMap[object.id];
          var inputs = [];
          var value = "";
          var removable = element.removable;
          var type = element.type;
          var options = element.options;
          var suboptions = null;
          var buttonsInput = null;
          var buttonsInLine = false;
          if(removable){
            buttonsInput = [buttonRemove];
            buttonsAgrupador = [buttonAdd];
            buttonsInLine = true;
          }
          for (var i = 0; i < object.dados.length; i++) {
            var inputId = sectionId;
            for (var property in object.dados[i]) {
              if (object.dados[i].hasOwnProperty(property)) {
                if(sectionId == "fonte_de_recursos"){
                  if(property === "tx_nome_origem_fonte_recursos_projeto"){
                    value = object.dados[i][property];
                    options = labelMap[object.id].options;
                    var inputProjeto = new InputProjeto(inputId, value, type, options, removable, buttonsInput, buttonsInLine);
                    inputs.push(inputProjeto);
                  } else if (property === "tx_nome_fonte_recursos_projeto"){
                    options = labelMap[object.id+"_publico"].options;
                    var inputId = "sub-" + sectionId;
                    var inputProjeto = new InputProjeto(inputId, value, type, options, removable, buttonsInput, buttonsInLine);
                    inputs.push(inputProjeto);
                  }
                } else if(property.slice(0,2) === "tx"){
                  value = object.dados[i][property];
                  var inputProjeto = new InputProjeto(inputId, value, type, options, removable, buttonsInput, buttonsInLine);
                  inputs.push(inputProjeto);
                }
              }
            }
          }
          var header = element.header;
          var containerClass = element.containerClass;
          var buttonsAgrupador = null;
          if(removable){
            buttonsInput = [buttonRemove];
            buttonsAgrupador = [buttonAdd];
          }
          var agrupadorInputProjeto = new AgrupadorDeInputs(sectionId, containerClass, header, inputs, buttonsAgrupador);
          return agrupadorInputProjeto;
        }

        AgrupadorInputProjeto = React.createFactory(AgrupadorInputProjeto);
        ReactDOM.render(
          AgrupadorInputProjeto(
            {dados:agrupadores}
          ), document.getElementById("projeto-"+id)
        );

        $(".date").datepicker({ dateFormat: 'dd-mm-yy' });

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

        //metas e objetivos
        if(project.objetivo_meta === null){
          var objetivo = -1;
          var cd_objetivo = -1;
          var meta = -1;
          var cd_meta = -1;
        } else {
          var objetivo = project.objetivo_meta.tx_nome_objetivo_projeto;
          var cd_objetivo = project.objetivo_meta.cd_objetivo_projeto;
          var meta = project.objetivo_meta.tx_nome_meta_projeto;
          var cd_meta = project.objetivo_meta.cd_meta_projeto;
        }
        var $divProjeto = $('#projeto-'+id);
        $divProjeto.append('<div class="col-md-12" id="objetivos-metas"</div>');
        var $divObjetivosMetasProjeto = $divProjeto.find("#objetivos-metas");
        $divObjetivosMetasProjeto.append('<div id="objetivos" class="objetivos"></div>');
        $divObjetivosProjeto = $divObjetivosMetasProjeto.find('#objetivos');
        $divObjetivosProjeto.append('<div class="header">Objetivos do Desenvolvimento Sustentável - ODS - <a href=https://nacoesunidas.org/pos2015 target=_blank>.</a> </div>');
        $divObjetivosProjeto.append('<div class="form-group"><div id="objetivos"><select class="form-control"></select></div></div>');
        $divObjetivosMetasProjeto.append('<div id="metas-'+cd_objetivo+'" class="metas"></div>');
        var $divMetasProjeto = $divObjetivosMetasProjeto.find("#metas-"+cd_objetivo);
        $divMetasProjeto.append('<div class="header" title="Marque as metas que se enquadram neste projeto">Metas Relacionadas ao ODS definido</div>');
        $divMetasProjeto.append('<ol id="selectable-'+cd_objetivo +'" class="selectable"></ol>');

        // rotas.Objetivos()
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

        function montarObjetivos(json){

          var options = json;
          var $selectObjetivos = $divObjetivosProjeto.find("select");
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
        loadMetas(cd_objetivo);
        function montarMetas(data, cd_objetivo){
          var $selectMetas = $divProjeto.find('#selectable-'+cd_objetivo);
          var options = data;
          for (var i = 0; i < options.length; i++) {
            if(options[i].cd_meta_projeto == cd_meta){
              $selectMetas.append('<li class="ui-widget-content ui-selected">' + options[i].tx_nome_meta_projeto + '</li>');
            } else {
              $selectMetas.append('<li class="ui-widget-content">' + options[i].tx_nome_meta_projeto + '</li>');
            }
          }
        }
        $('#selectable-'+cd_objetivo).selectable();

         $('.objetivos').find('select').on('change', function(){
          cd_objetivo = $(this).children(":selected").attr("id")
           $(this).parents("#objetivos-metas").find(".metas").each(function(){
            if(!$(this).hasClass('hidden')){
             $(this).toggleClass('hidden');
            }
           });

          // $(this).removeClass("ui-selected");
          $divObjetivosMetasProjeto.append('<div id="metas-'+cd_objetivo+'" class="metas"></div>');
          $('#metas-'+cd_objetivo).append('<div class="header" title="Marque as metas que se enquadram neste projeto">Metas Relacionadas ao ODS definido</div>');
          $('#metas-'+cd_objetivo).append('<ol id="selectable-'+cd_objetivo +'" class="selectable"></ol>');
          if($('#metas-'+cd_objetivo).hasClass('hidden')){
           $('#metas-'+cd_objetivo).toggleClass('hidden');
          }
          loadMetas(cd_objetivo);
          $('.selectable').selectable();
         });
      }
    }

    // Salvar
    $("#salvar").click(function(){

      //Dados Gerais
      //$("#dados_gerais").append('<button id="salvar" class="btn-primary btn">Salvar</button>');
      var newJson = {};
       $("#dados_gerais :input").each(function(){
         var key = $(this).attr("id");
         var value = $(this).val();
         newJson[key] = value;
       });
       newJson["headers"] = authHeader;
       newJson["id_osc"] = idOsc;
       //console.log(newJson);

       $.ajax({
        url: rotas.DadosGerais(idOsc),
        type: 'POST',
        dataType: 'json',
        data: newJson,

         success: function(data) {
           console.log(data);
         },
         error: function(e) {
          showUnauthorizedUser(e);
          console.log(e);
         }
       });
      //console.log(newJson);

     //Áreas de atuação
     var newJson = [];
     $("#areas_de_atuacao .autocomplete").each(function(){
       newJson.push({
         "ft_area_declarada": "Usuário",
         "tx_nome_area_atuacao": $(this).val()
       });
     });
     $("#areas_de_atuacao .checkboxList").children(":not(.hidden)").each(function(index){
       var subareas = [];
       $(this).find("input:checked").each(function(){
         subareas.push($(this).closest("label").text());
       });
      var key = "tx_nome_subarea_atuacao";
      newJson[index][key] = subareas;
     });
     newJson["headers"] = authHeader;
     newJson["id_osc"] = idOsc;
     //console.log(newJson);
    $.ajax({
     url: rotas.AreaAtuacao(idOsc),
     type: 'POST',
     dataType: 'json',
     data: newJson,

      success: function(data) {
        console.log(data);
      },
      error: function(e) {
        showUnauthorizedUser(e);
        console.log(e);
      }
    });

     //Descricao
      var newJson = {};
      $("#descricao .form-control").each(function(){
        newJson[$(this).attr("id")] = $(this).val();
      });
      newJson["headers"] = authHeader;
      newJson["id_osc"] = idOsc;
      //console.log(newJson);

      $.ajax({
       url: rotas.Descricao(idOsc),
       type: 'POST',
       dataType: 'json',
       data: newJson,

        success: function(data) {
          console.log(data);
        },
        error: function(e) {
          showUnauthorizedUser(e);
          console.log(e);
        }
      });

      //Certificacoes
      var newJson = [];
      $("#certificacoes .form-control").each(function(){
        var item = {};
        item[$(this).attr("id")] = {};
        item[$(this).attr("id")].dt_fim_certificado = $(this).val();
        newJson.push(item);
      });
      newJson["headers"] = authHeader;
      newJson["id_osc"] = idOsc;
      //console.log(newJson);

      $.ajax({
       url: rotas.Certificado(idOsc),
       type: 'POST',
       dataType: 'json',
       data: newJson,

        success: function(data) {
          console.log(data);
        },
        error: function(e) {
          showUnauthorizedUser(e);
          console.log(e);
        }
      });

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
        $.ajax({
         url: rotas.ProjectByID(idProjeto),
         type: 'POST',
         dataType: 'json',
         data: newJson,

          success: function(data) {
            console.log(data);
          },
          error: function(e) {
            showUnauthorizedUser(e);
            console.log(e);
          }
        });
      });
    });
  });
});

function showUnauthorizedUser(e){
  if(e.status === 403){
    $('#unauthorized').dialog('open');
    console.log(e);
  }
}

function getFonteDeRecursosProjeto(id){
  var fonte = {
    "fonte_de_recursos": [
      {
        "id_fonte_recursos_projeto": 1,
        "cd_origem_fonte_recursos_projeto": 1092,
        "tx_nome_origem_fonte_recursos_projeto": "Público",
        "cd_fonte_recursos_projeto": null,
        "tx_nome_fonte_recursos_projeto": "Federal",
        "ft_fonte_recursos_projeto": null
      }
    ]
  };
  var key = Object.keys(fonte)[0];
  var objFonte = {
    "id": key,
    "dados": fonte[key]
  };
  return objFonte;
}
function getLocalizacaoProjeto(id, dados){
  var localizacao = {
    "localizacao_projeto": dados
  };
  var key = Object.keys(localizacao)[0];
  var objLocalizacao = {
    "id": key,
    "dados": localizacao[key]
  };
  return objLocalizacao;
}
function getPublicoBeneficiadoProjeto(id, dados){
  var publico_beneficiado = {
    "publico_beneficiado": dados
  };
  var key = Object.keys(publico_beneficiado)[0];
  var objBeneficiado = {
    "id": key,
    "dados": publico_beneficiado[key]
  };
  return objBeneficiado;
}
function getFinanciadoresProjeto(id, dados){
  var financiadores = {
    "financiadores": dados
  };
  var key = Object.keys(financiadores)[0];
  var objFinanciadores = {
    "id": key,
    "dados": financiadores[key]
  };
  return objFinanciadores;
}
function getAutodeclaradasProjeto(id, dados){
  var autodeclaradas = {
    "autodeclaradas": dados
  };
  var key = Object.keys(autodeclaradas)[0];
  var objAutodeclaradas = {
    "id": key,
    "dados": autodeclaradas[key]
  };
  return objAutodeclaradas;
}
function getParceirasProjeto(id, dados){
  var parceiras = {
    "parceiras": dados
  };
  var key = Object.keys(parceiras)[0];
  var objParceiras = {
    "id": key,
    "dados": parceiras[key]
  };
  return objParceiras;
}
function validateObject(obj){
  if(obj === null){
    return false;
  }
  else if(obj===undefined){
    return false;
  }
  if(Object.keys(obj).length === 0 && obj.constructor === Object){
    return false;
  }
  return true;
}
function addItem(idDiv){
  $('#'+idDiv+' button').on('click', function(){
    if($(this).hasClass('btn-primary')){
      var $cloneDiv = ($(this).parent());
      var $input = $cloneDiv.find('input[type=text]');
      var values = new Array();
      $input.parent().removeClass('has-error');
      $('.alert-danger').remove();
      $input.each(function(i){
        if($(this).val() !== "" ){
            values[i] = true;
        }
        else {
          values[i] = false;
          $(this).parent().addClass('has-error').after('<span class = "alert-danger">É necessário que os campos estejam preenchidos.</span>');
        }
      });
      if(values.every(isTrue)){
        $input.parent().removeClass('has-error');
        $input.after().find('span').remove();
        var $clone = $cloneDiv.find('button').text('Remover').attr('class', 'btn-danger btn');
        $cloneChildren = $('#'+idDiv).children();
        $cloneDiv.clone().appendTo($cloneChildren);
        $cloneDiv.parent().children().last().find('button').text('Adicionar').attr('class', 'btn-primary btn').click(addItem(idDiv));
        $cloneDiv.parent().children().last().find('input[type=text]').val('');
        $(".date").datepicker({ dateFormat: 'dd-mm-yy' });
      }
    }
    else {
      $(this).parent().remove();
    }
 });
}

function montarEnderecoImovel(dadosGerais){
  var endereco = [dadosGerais.tx_endereco, dadosGerais.nr_localizacao,
    dadosGerais.tx_endereco_complemento, dadosGerais.tx_bairro,
    dadosGerais.tx_nome_municipio, dadosGerais.tx_nome_uf, dadosGerais.tx_sigla_uf,
    "CEP: "+dadosGerais.nr_cep];
  var tx_endereco_completo = '';
  for (var i = 0; i < endereco.length; i++) {
    if (endereco[i] !== null){
      tx_endereco_completo += (tx_endereco_completo === '' ? '' : ', ');
      tx_endereco_completo += endereco[i];
    }
  }
  if (tx_endereco_completo === '') {
    tx_endereco_completo = 'Endereço não registrado.';
  }
  return tx_endereco_completo;
}


function isTrue(obj){
  if(obj){
    return true;
  }
  else {
    return false;
  }
}

var dadosForm = new DataForms();
var jsonModalAjuda = dadosForm.jsonModalAjuda();

function abrirModalAjuda(titulo) {
	var	corpo = jsonModalAjuda[titulo];
  //console.log(corpo);
	var tituloCompleto = "Ajuda - "+titulo;
	acionarModalAjuda(tituloCompleto, corpo);
}

function acionarModalAjuda(titulo, corpo) {
  $("#modalTitulo").html("");
  $("#modalTitulo").html(titulo);
  $("#corpoModal").html("");
  $("#corpoModal").html(corpo);
  $("#modalAjuda").modal('show');
  verificarContraste();
}
