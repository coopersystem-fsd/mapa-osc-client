require(['rotas','jquery',"jquery-ui"], function (React) {

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

  $("#voltaPagAnterior").on("click", function(){
    history.go(-1);
  });

  function addLinkVoltar(id){
  		$("#voltaNoticia").attr("href","noticia.html#/"+id);
  }

  var rotas = new Rotas();
  var valoresURL = window.location.href.split('#')[1]!==undefined ? window.location.href.split('#/')[1].split('=') : null;
  var idNoticia = "";

  if(valoresURL !== null){
    idNoticia = valoresURL[0];
    addLinkVoltar(idNoticia);
  }

  $.ajax({
    url: rotas.NoticiaByID(idNoticia),
    type: 'GET',
    dataType: 'json',
    error: function(e){
        console.log("ERRO no AJAX :" + e);
        $('.manutencao').css('display', 'block');
        $('.loading').addClass('hide');
    },
    success: function(data){
      var html = '<div class="row"><div class="col-md-12"><h2 class="text-primary">'+data.tx_titulo_noticia+'</h2><hr></div></div>';

      html += '<span class="glyphicon glyphicon-calendar txtData" aria-hidden="true"></span><label class="dt_pub_news">Publicado em '+data.dt_noticia+'</label>';
      html += '<div class="text-justify txtBloco">'+data.tx_descricao_noticia+'</div>';

      $('#noticia').append(html);
      $( ".dt_pub_news" ).before( $( ".social" ) );
      $( ".social" ).css("display","flex")
      $('.loading').addClass('hide');
      $(".social iframe").each(function() {
        $(this).attr('title', '');
      });
    }
  });

});
