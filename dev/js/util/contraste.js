function desativaContraste() {
  createCookie("contraste",false,1);
}

function ativaContraste() {
  createCookie("contraste",true,1);
}

function ativarCSSContraste() {
  $("#alto_contraste").hide();
  $("#contraste_normal").show();
  $("body" ).css( "background-color", "#000000" );
  $("body" ).css( "color", "#ffffff" );
  $("a").css( "color", "#FFF333" );
  $("hr").css( "border-color", "#ffffff" );
  $("legend" ).css( "color", "#ffffff" );
  $("footer" ).css( "background-color", "#000000" );
  $(".partners").css( "background-color", "#000000" );
  $(".navbar-default").css( "background-color", "#000000" );
  $(".navbar-default").css( "border-bottom", "4px solid #ffffff" );
  $(".capacho").css( "border-left", "1px dotted #ffffff" );
  $(".dropdown-menu").css( "background-color", "#000000");
  $(".dropdown-menu").css( "border", "1px solid #ffffff");
  $(".modal-content").css( "background-color", "#000000");
  $(".modal-content").css( "border", "1px solid #ffffff");
  $(".subTitulo" ).css( "background-color", "#000000" );
  $(".pagination" ).find("a").css( "background-color", "#000000" );
  $(".ui-widget-content").css( "background-color", "#000000" );
  $(".ui-widget-content").css( "color", "#ffffff" );
  $(".btn-link").css( "color", "#FFF333" );
  $("#barra-brasil" ).css( "background-color", "#000000" );
  $("#topo_acessibilidade").css( "background-color", "#000000" );
  $(".tablesaw tr").css( "background-color", "#000000" );
  $(".sorting_1").css( "background-color", "#000000" );
  $(".table-responsive tr").css( "background-color", "#000000" );
  $(".panel-heading").css("background-color", "#333333");
  $(".panel-default").css("border-color","#ffffff");
  $(".panel-body").css("background-color", "#000000");
  $("#projetos .header").css("background-color", "#4682b4");
  $(".table-striped tr").css("background-color", "#000000");
  $(".nav-tabs .active a").css("background-color", "#337cbb");
  $(".colabore a" ).css( "color", "#ffffff" );
  $(".newsletter a" ).css( "color", "#ffffff" );
  $(".imgLinkExterno").attr("src","img/site-ext_inv.gif");
  $(".imgDadoOficial").attr("src","img/base_dados_inv.png");
  $(".imgDadoEditavel").attr("src","img/dado_representante_inv.png");
  $(".projeto .header").css("background-color", "#4682b4");
  $("#table_lista_projetos tr").css("background-color", "#333333");
  $(".form-control").css("background-color", "#02174a");
  $(".form-control").css("color", "#ffffff");
  $(".ui-autocomplete-input").css("background-image", "url(../img/lupa_inv.png)");
  $(".panel-heading h3").css("color", "#ffffff");

  $("#buscarPerfil li a").on({
    click:function (){
      $(".nav-pills a").css("background-color", "#000000");
      $(this).css("background-color", "#337cbb");
    }, mouseover: function(){
        $(this).css("background-color", "#333333");
    }, mouseout: function(){
        $(this).css("background-color", "#000000");
        $(".nav-pills .active a").css("background-color", "#337cbb");
  }
  });

  $("#selecao li > a").on({
    mouseover: function(){
      $(this).css("background-color", "#333333");
    }, mouseout: function(){
      $(this).css("background-color", "#000000");
    }
  });

  $("#navbar-ex-collapse li > a").on({
    mouseover: function(){
      $(this).css("color", "#337cbb");
    }, mouseout: function(){
      $(this).css("color", "#fff331");
    }
  });

  $(".panel-heading ").on({
    mouseover: function(){
      $(this).css("color", "#337cbb");
      $(this).css("background-color", "#d7eefb");
      $(this).find("h3").css("color", "#337cbb");
    }, mouseout: function(){
      $(this).css("color", "#fff331");
      $(this).css("background-color", "#333333");
      $(this).find("h3").css("color", "#ffffff");
    }
  });

  $(".panel-default").on({
    mouseover: function(){
      $(this).css("color", "#ffffff");
      $(this).css("background-color", "#d7eefb");
    }, mouseout: function(){
      $(this).css("color", "#ffffff");
      $(this).css("background-color", "#333333");
    }
  });

  $(".dropdown-toggle").on({
      click:function (){
      $(this).css("color", "#337cbb");
      $(this).css("background-color", "#000000");
    }, mouseover: function(){
      $(this).css("color", "#337cbb");
    }, mouseout: function(){
      $(this).css("color", "#fff331");
    }
  });

  $(".dropdown-menu li > a").on({
    mouseover: function(){
      $(this).css("color", "#ffffff");
      $(this).css("background-color", "#63aceb");
    }, mouseout: function(){
      $(this).css("background-color", "#000000");
    }
  });

  $(".nav-tabs li a").on({
    click:function (){
      $(".nav-tabs a").css("background-color", "#000000");
      $(this).css("background-color", "#337cbb");
    }, mouseover: function(){
        $(this).css("background-color", "#333333");
    }, mouseout: function(){
        $(this).css("background-color", "#000000");
        $(".nav-tabs .active a").css("background-color", "#337cbb");
    }
  });

  $(".selectboxit-list").css("background-color", "#337cbb");
  $(".selectboxit-list li a").css("color", "#ffffff");

  $(".selectboxit-list li a").on({
    mouseover: function(){
        $(this).css("color", "#fff331");
    }, mouseout: function(){
        $(this).css("color", "#ffffff");
    }
  });

  $( ".logoMapa" ).attr({src: "img/logo_contraste.png"});

}

function verificarContraste(){
    if(readCookie("contraste") == "true"){
      ativarCSSContraste();
    }
}

var setLogin = false;
function verificarLogado(){

  var cd_localidade = window.localStorage.getItem('cd_localidade');
  if(cd_localidade != undefined && cd_localidade != ""){
    var nome_localidade = window.localStorage.getItem('nome_localidade');
    $("#btn-localidade").text(nome_localidade);
  }

  var user = window.localStorage.getItem('User');
  var aut  = window.localStorage.getItem('Authorization');
  var nome  = window.localStorage.getItem('Nome');
  var perfil  = window.localStorage.getItem('Perfil');
  var divMenu;

  if (user){
    if(!setLogin)
    {
      if(perfil == 2){
        divMenu = ".menuLogado";
        $(divMenu).removeClass("logado");
        $("#btnEditarOSCs").removeClass("logado");
      }else if(perfil == 3 || perfil == 4){
        divMenu = ".menuLogado_EM";
        $(divMenu).removeClass("logado");
        $("#btnEnviarDados").removeClass("logado");
      }
      $("#btnEntrar").addClass("logado");
      $(".btnCadastrar").addClass("logado");
      $(divMenu + " .dropdown-toggle").append(nome);
      $(divMenu + " .dropdown-toggle").append(" <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>");
    }
    setLogin = true;
    return true;
  }else{
    if(setLogin)
    {
      if(perfil == 2){
        divMenu = ".menuLogado";
        $("#btnEditarOSCs").addClass("logado");
      }else if(perfil == 3 || perfil == 4){
        divMenu = ".menuLogado_EM";
        $("#btnEnviarDados").addClass("logado");
      }

      $(divMenu + " .dropdown-toggle").html('');
      $(divMenu).addClass("logado");

      $("#btnEntrar").removeClass("logado");
      $(".btnCadastrar").removeClass("logado");
    }
    setLogin = false;
    return false;
  }
}

function deslogar(){
  window.localStorage.removeItem('User');
  window.localStorage.removeItem('Authorization');
  window.localStorage.removeItem('Nome');
  window.localStorage.removeItem('Osc');
  window.localStorage.removeItem('Perfil');
  $(".menuLogado .dropdown-toggle").html('');
  $(".menuLogado").addClass("logado");
  $("#btnEditarOSCs").addClass("logado");
  $("#btnEnviarDados").addClass("logado");
  $("#btnEntrar").removeClass("logado");
  $(".btnCadastrar").removeClass("logado");
  window.location= "index.html";
  return true;
}

function ativaEnterModalLogin(){
    $('#senhaLogin').keypress(function(e) { if(e.keyCode == 13) { $('a#btn-logar-modal')[0].click(); } } );
}

function ativaEnterModalLocalidade(){
    $('#localidade').keypress(function(e) { if(e.keyCode == 13) { $('a#btn-localidade-modal')[0].click(); } } );
}

verificarContraste();
