require(["jquery-ui"], function (React) {

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

require(['react', 'jsx!components/Util'], function (React) {

  require(['componenteAccordion'], function(HistoricoNotas){
    function Gloss(topico, desc){
      this.topico = topico;
      this.desc = desc;
    }

  var jsonDados = [
    {
      "topico":"Notas de lançamento da versão 2.0, implantada em março de 2017",
      "desc": [ "• Implantação de novos campos na página do perfil individual das OSCS que permitem catalogar detalhadamente atividades, práticas e projetos.",
                "• Desenvolvimento de um novo sistema para visualizar dados geográficos mais rápido, intuitivo, seguro e com maior volume de informações agregadas em uma só tela.",
                "• Melhorias no extrator de dados que permite à construção, de modo mais detalhado, de consultas integradas, gráficos e tabelas, bem como exportação dos dados formatos diferentes. ",
                "• Inserção de novos indicadores e infográficos dinâmicos, que se atualizam sempre que os dados das bases são alterados.",
                "• Criação da seção de editais públicos, que reúne chamadas dos setores público e privado de interesse das OSCs.",
                "• Introdução de orientações do Modelo de Acessibilidade em Governo Eletrônico, facilitando a navegação por pessoas com deficiência.",
                "• Inclusão dos dados da RAIS 2014, em lugar da edição 2013",
                "• Criação de séries históricas, a partir de 2009.",
                "• Refinamento dos códigos de programação para limpar erros em bases de dados.",
                "• Inserção de novos dados sobre recursos destinados às OSCs, com base em informações da base orçamentária Siafi, que são mais abrangentes que os dados registrados no sistema de Convênios (Siconv).",
                "• Construção e disponibilização de filtros de consulta para as OSCs, no campo natureza jurídica.",
                "• Automatização do processo para recebimento diário de dados do Ministério da Justiça sobre as OSCIPs.",
                "• Refinamento do sistema de buscas para facilitar que o usuário encontre as OSCs do interesse do usuário.",
                "• Criação de ambiente para autoclassificação das OSCs, por área de atuação.",
                "• Detalhamento e atualização da metodologia de construção dos dados do Mapa.",
                "• Ampliação da seção FAQ (Dúvidas Mais Frequentes).",
                "• Criação de um glossário de termos técnicos para auxiliar a esclarecer dúvidas dos usuários.",
                "• Aprimoramento do tutorial para apoiar os representantes das OSCs a navegarem e inserirem informações.",
                "• Atualização dos valores monetários pela inflação (IPCA).",
                "• Adoção de telas responsivas ao tamanho das janelas de visualização.",
                "• Desenvolvimento de melhorias quanto à compatibilidade do Mapa, sendo melhor visualizado nos navegadores: Chrome (versão 56 ou superior), Firefox (versão 51 ou superior), Edge (versão 25 ou superior), Opera (versão 43 ou superior)."
           ],
    },
    {
      "topico":"Notas de lançamento da versão 1.7.7, implantada em agosto de 2016",
      "desc": [ "• Disponibilização dos dados do extinto CNES/MJ e da base do Mapa em shapefile, ambos para download no Mapa.",
                "• Criação de tutoriais para cadastro de representante de OSC e edição da página da OSC, no formato texto (PDF).",
                "• Correção de algumas funções, entre elas: dos links no menu lateral para visualização de dados da OSC, do uso da tecla \"Enter\" para busca, da exibição dos certificados e títulos na página da OSC, do problema no carregamento de dados de OSCs no menu lateral e dos valores dos repasses exibidos na matriz de indicadores.",
                "• Inclusão das OSCIPs ausentes da RAIS 2013.",
                "• Inclusão de captcha no cadastro de representante de OSC e na edição da página da OSC.",
                "• Inclusão de textos de fonte dos dados da matriz de indicadores e dos campos de dirigentes da página da OSC.",
                "• Exclusão das informações referentes ao título de Utilidade Pública Federal.",
                "• Alterações do botão de \"Ver detalhes\" para \"Página da OSC\" no menu lateral, do texto do botão de \"Cadastre-se como representante\", dos campos de recursos públicos do menu lateral, da fonte do campo \"Nome fantasia\" da página da OSC, e do campo de CPF cadastrado pelo usuário.",
                "• Atualização dos infográficos, do conteúdo da seção Metodologia e do texto informativo de cadastro de representante de OSC.",
                "• Revisão do campo de fontes de recursos da página da OSC.",
                "• Atualização dos dados de repasses da Finep no menu lateral e na página da OSC, bem como do serviço de dados do Siconv.",
                "• Atualização das logomarcas do Governo Federal e da Secretaria de Governo.",
                "• Ampliação da seção FAQ (Dúvidas Mais Frequentes)."
           ],
    },
    {
    "topico":"Notas de lançamento da versão 1.7, ocorrida em maio de 2016",
    "desc": [ "• Disponibilização de uma página individual das OSCs com informações extraídas das bases públicas e campos para que representantes possam inserir informações sobre as entidad",
              "• Atualização do nome fantasia da OSCs (se houver) e de dados cadastrais das OSCs.",
              "• Inserção de informações sobre projetos, áreas de atuação e público beneficiário, entre outras.",
              "• Inclusão das OSCs que declararam a RAIS Negativa em 2013, que se somam às demais OSCs já incluídas.",
              "• Correção dos valores monetários dos repasses da administração pública federal para organizações da sociedade civil presentes no Sistema de Gestão de Convênios e Contratos de Repasse (Siconv) – a e demais bases – pelos índices do Índice Nacional de Preços ao Consumidor Amplo (IPCA)",
              "• Criação de página de sistema em manutenção para eventuais serviços de atualização do Mapa, bem como página de notificação do usuário em caso de ocorrência de eventuais erros no Mapa.",
              "• Atualização dos links úteis no rodapé.",
              "• Fixação das fontes dos dados exibidas no menu lateral, na tela com informações resumidas das OSCs e na matriz de indicadores.",
              "• Visualização das instituições que apoiam o Mapa.",
              "• Implementação do acesso à matriz de indicadores por meio do teclado.",
              "• Correção do menu da página da matriz de indicadores.",
              "• Inclusão do link para a página do Github na página das notas de lançamento de versão."
            ],
  },
    {
    "topico":"Notas de lançamento da versão 1.6, implantada em março de 2016",
    "desc": [
              "• Criação de página individual das OSCs.",
              "• Inserção de campos para definição das finalidades de atuação e público alvo dos projetos executados.",
              "• Correção das falhas de contraste no cabeçalho da página principal e de bugs nas abas de informações sobre as OSCs.",
              "• Inclusão das notas de versão com registro das atualizações do Mapa.",
              "• Correção dos totais apresentados nos clusteres de OSCs.",
              "• Desenvolvimento de melhorias na formação dos clusteres.",
              "• Atualização da metodologia de construção dos dados do Mapa.",
              "• Reestruturação da função auto completar, na barra de buscas, incluindo a busca por endereços das OSCs.",
              "• Atualização dos dados, rótulos, títulos e informações dos infográficos.",
              "• Aprimoramento das informações disponibilizadas no menu lateral.",
              "• Deslocamento da seção sobre documentos de parcerias e das OSCs para a página individual das mesmas.",
              "• Criação de página estática para informar sobre carga de dados e indisponibilidade do servidor."
            ],
    },
    {
    "topico":"Notas de lançamento da versão 1.5, implantada em fevereiro de 2016",
    "desc": [
              "• Reformulação da página com quadro-resumo de informações sobre a OSC.",
              "• Modificação e atualização do infográfico sobre a distribuição das OSCs por natureza jurídica e por região.",
              "• Atualização da metodologia de construção dos dados do Mapa.",
              "• Atualização da base de dados com os títulos de Utilidade Pública Federal conferidos às OSCs e das OSCs qualificadas como OSCIPs e sobre as OSCs detentoras do certificado CEBAS conferidos pelo Ministério da Saúde.",
              "• Correção de erros na tela de configurações de uso.",
              "• Instalação do gerador de estatísticas de acessos de usuários ao Mapa.",
              "• Adição de um sumário na página FAQ (Dúvidas Mais Frequentes).",
              "• Modificação das informações da seção \"Sobre o Mapa\".",
              "• Criação da página de acessibilidade como recomendado no EMAG 3.1.",
              "• Correção do redimensionamento da página principal.",
              "• Alteração da rotina de buscas para otimizar as consultas.",
              "• Inclusão da possibilidade de buscar as OSCs por CNPJ.",
              "• Implementação da escolha em lista utilizando o teclado e tecla \“enter\” na rotina de busca.",
              "• Correção da imagem associada ao nome do usuário logado no Mapa.",
              "• Criação de ambiente de integração contínua.",
              "• Migração do projeto para a tecnologia MAVEN 3 e para a tecnologia Java 1.8.",
              "• Adaptação do projeto ao GWT Bootstrap 3."
            ],
    }
    ];

    var historicoNotas = [];
    for (var i in jsonDados){
      historicoNotas.push(new Gloss(jsonDados[i].topico,jsonDados[i].desc));
    }

    HistoricoNotas = React.createFactory(HistoricoNotas);
    ReactDOM.render(HistoricoNotas({dados:historicoNotas}), document.getElementById("historico_notas_formato_dados"));
  });



});
