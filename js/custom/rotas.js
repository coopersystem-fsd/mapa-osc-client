"use strict";function _classCallCheck(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,a){for(var t=0;t<a.length;t++){var r=a[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(a,t,r){return t&&e(a.prototype,t),r&&e(a,r),a}}(),Rotas=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"getBaseUrl",value:function(){return"https://mapaosc-desenv.ipea.gov.br"}},{key:"getBaseUrlCMS",value:function(){return this.getBaseUrl().replace("https:","http:")+":8181"}},{key:"AutocompleteOSCByName",value:function(e,a,t){return this.getBaseUrl()+":8383/api/search/osc/autocomplete/"+e+"/"+a+"/0/"+t}},{key:"AutocompleteOSCByCnpj",value:function(e,a){return this.getBaseUrl()+":8383/api/search/cnpj/autocomplete/"+e+"/"+a+"/0"}},{key:"AutocompleteOSCByCounty",value:function(e,a){return this.getBaseUrl()+":8383/api/menu/geo/municipio/"+e+"/"+a+"/0"}},{key:"AutocompleteOSCByState",value:function(e,a){return this.getBaseUrl()+":8383/api/menu/geo/estado/"+e+"/"+a+"/0"}},{key:"AutocompleteOSCByRegion",value:function(e,a){return this.getBaseUrl()+":8383/api/menu/geo/regiao/"+e+"/"+a+"/0"}},{key:"OSCPopUpByID",value:function(e){return this.getBaseUrl()+":8383/api/osc/popup/"+e}},{key:"OSCByID",value:function(e){return this.getBaseUrl()+":8383/api/osc/"+e}},{key:"OSCByNameInMap",value:function(e,a){return this.getBaseUrl()+":8383/api/search/osc/geo/"+e+"/0/0/"+a}},{key:"OSCByCountyInMap",value:function(e){return this.getBaseUrl()+":8383/api/search/municipio/geo/"+e}},{key:"OSCByStateInMap",value:function(e){return this.getBaseUrl()+":8383/api/search/estado/geo/"+e}},{key:"OSCByRegionInMap",value:function(e){return this.getBaseUrl()+":8383/api/search/regiao/geo/"+e}},{key:"AllOSCInMap",value:function(){return this.getBaseUrl()+":8383/api/geo/osc/"}},{key:"OSCByName",value:function(e,a,t){return this.getBaseUrl()+":8484/api/search/osc/lista/"+e+"/10/"+a+"/"+t}},{key:"OSCByCounty",value:function(e,a){return this.getBaseUrl()+":8484/api/search/municipio/lista/"+e+"/10/"+a}},{key:"OSCByState",value:function(e,a){return this.getBaseUrl()+":8484/api/search/estado/lista/"+e+"/10/"+a}},{key:"OSCByRegion",value:function(e,a){return this.getBaseUrl()+":8484/api/search/regiao/lista/"+e+"/10/"+a}},{key:"AllOSC",value:function(e){return this.getBaseUrl()+":8484/api/search/all/lista/10/"+e}},{key:"ClusterMunicipio",value:function(){return this.getBaseUrl()+":8383/api/geo/cluster/municipio"}},{key:"ClusterEstado",value:function(){return this.getBaseUrl()+":8383/api/geo/cluster/estado"}},{key:"ClusterEstadoPorRegiao",value:function(e){return this.getBaseUrl()+":8383/api/geo/cluster/estado/"+e}},{key:"ClusterPais",value:function(){return this.getBaseUrl()+":8383/api/geo/cluster/regiao"}},{key:"ClusterRegiao",value:function(e){return this.getBaseUrl()+":8383/api/geo/cluster/regiao/"+e}},{key:"OSCByID_no_project",value:function(e){return this.getBaseUrl()+":8383/api/osc/no_project/"+e}},{key:"ProjectByID",value:function(e){return this.getBaseUrl()+":8383/api/projeto/"+e}},{key:"AtualizarProjectByID",value:function(e){return this.getBaseUrl()+":8383/api/osc/projeto/"+e}},{key:"CriarProjectByID",value:function(e){return this.getBaseUrl()+":8383/api/osc/projeto/insert/"+e}},{key:"RemoverProjectByID",value:function(e,a){return this.getBaseUrl()+":8383/api/osc/projeto/"+e+"/"+a}},{key:"Objetivos",value:function(){return this.getBaseUrl()+":8383/api/menu/osc/objetivo_projeto"}},{key:"MetasById",value:function(e){return this.getBaseUrl()+":8383/api/menu/osc/meta_projeto/"+e}},{key:"AreaAtuacao",value:function(){return this.getBaseUrl()+":8383/api/menu/osc/area_atuacao"}},{key:"AtualizarAreaAtuacao",value:function(e){return this.getBaseUrl()+":8383/api/osc/area_atuacao/"+e}},{key:"DadosGerais",value:function(e){return this.getBaseUrl()+":8383/api/osc/dadosgerais/"+e}},{key:"SubAreaAtuacao",value:function(){return this.getBaseUrl()+":8383/api/menu/osc/subarea_atuacao"}},{key:"MetaProjeto",value:function(e){return this.getBaseUrl()+":8383/api/menu/osc/meta_projeto/"+e}},{key:"Descricao",value:function(e){return this.getBaseUrl()+":8383/api/osc/descricao/"+e}},{key:"Certificado",value:function(e){return this.getBaseUrl()+":8383/api/osc/certificado/"+e}},{key:"RelacoesTrabalho",value:function(e){return this.getBaseUrl()+":8383/api/osc/relacoestrabalho/"+e}},{key:"RelacoesTrabalhoOutra",value:function(e){return this.getBaseUrl()+":8383/api/osc/relacoestrabalhooutra/"+e}},{key:"ParticipacaoSocialConselho",value:function(e){return this.getBaseUrl()+":8383/api/osc/participacaosocialconselho/"+e}},{key:"ParticipacaoSocialConferencia",value:function(e){return this.getBaseUrl()+":8383/api/osc/participacaosocialconferencia/"+e}},{key:"OutraParticipacaoSocial",value:function(e){return this.getBaseUrl()+":8383/api/osc/participacaosocialoutra/"+e}},{key:"PeriodicidadeReuniao",value:function(){return this.getBaseUrl()+":8383/api/menu/osc/periodicidade_reuniao/"}},{key:"Conselho",value:function(){return this.getBaseUrl()+":8383/api/menu/osc/conselho/"}},{key:"Conferencia",value:function(){return this.getBaseUrl()+":8383/api/menu/osc/conferencia/"}},{key:"Titularidade",value:function(){return this.getBaseUrl()+":8383/api/menu/osc/tipo_participacao/"}},{key:"FontesRecursosById",value:function(e){return this.getBaseUrl()+":8383/api/osc/recursos/"+e}},{key:"FontesRecursos",value:function(){return this.getBaseUrl()+":8383/api/menu/osc/fonte_recursos_osc"}},{key:"AtualizarFontesRecursos",value:function(e){return this.getBaseUrl()+":8383/api/osc/recursososc/"+e}},{key:"ConselhoFiscal",value:function(e){return this.getBaseUrl()+":8383/api/osc/conselhofiscal/"+e}},{key:"Dirigente",value:function(e){return this.getBaseUrl()+":8383/api/osc/dirigente/"+e}},{key:"Edital",value:function(){return this.getBaseUrl()+":8383/api/edital"}},{key:"Login",value:function(){return this.getBaseUrl()+":8383/api/user/login/"}},{key:"ReceberNoticia",value:function(){return this.getBaseUrl()+":8383/api/user/newsletter/"}},{key:"CadastroRepresentante",value:function(){return this.getBaseUrl()+":8383/api/user/"}},{key:"CadastroRepresentanteEstadoMunicipio",value:function(){return this.getBaseUrl()+":8383/api/user/governo/"}},{key:"ValidarLocalidade",value:function(e){return this.getBaseUrl()+":8383/api/user/governo/ativo/localidade/"+e}},{key:"Contato",value:function(){return this.getBaseUrl()+":8383/api/user/contato/"}},{key:"RecuperSenha",value:function(){return this.getBaseUrl()+":8383/api/user/esquecisenha/"}},{key:"AlterarSenha",value:function(){return this.getBaseUrl()+":8383/api/user/alterarsenha/"}},{key:"ValidarUsuario",value:function(e){return this.getBaseUrl()+":8383/api/user/"+e}},{key:"UpdateUsuario",value:function(e){return this.getBaseUrl()+":8383/api/user/"+e}},{key:"UpdateUsuarioGov",value:function(e){return this.getBaseUrl()+":8383/api/user/governo/"+e}},{key:"AtivarUsuario",value:function(e){return this.getBaseUrl()+":8383/api/user/ativarcadastro/"+e}},{key:"SituacaoImovel",value:function(){return this.getBaseUrl()+":8383/api/menu/osc/situacao_imovel/"}},{key:"FontesRecursosProjeto",value:function(){return this.getBaseUrl()+":8383/api/menu/osc/origem_fonte_recursos_projeto/"}},{key:"ZonaAtuacaoProjeto",value:function(){return this.getBaseUrl()+":8383/api/menu/osc/zona_atuacao_projeto/"}},{key:"AbrangenciaProjeto",value:function(){return this.getBaseUrl()+":8383/api/menu/osc/abrangencia_projeto/"}},{key:"SituacaoProjeto",value:function(){return this.getBaseUrl()+":8383/api/menu/osc/status_projeto/"}},{key:"FormaParticipacaoConferencia",value:function(){return this.getBaseUrl()+":8383/api/menu/osc/forma_participacao_conferencia/"}},{key:"ConsultaAvancadaLista",value:function(e){return this.getBaseUrl()+":8484/api/search/advanced/lista/10/"+e}},{key:"ConsultaAvancadaMapa",value:function(e){return this.getBaseUrl()+":8383/api/search/advanced/geo/0/0"}},{key:"AutocompleteAtividadeEconomica",value:function(e,a){return this.getBaseUrl()+":8383/api/search/atividade_economica/autocomplete/"+e+"/"+a}},{key:"Imprensa",value:function(){return this.getBaseUrlCMS()+"/imprensa"}},{key:"NoticiaByID",value:function(e){return this.getBaseUrlCMS()+"/noticiaByID/"+e}},{key:"VideoByID",value:function(e){return this.getBaseUrlCMS()+"/videoByID/"+e}},{key:"MenuMrosc",value:function(){return this.getBaseUrlCMS()+"/menuMrosc"}},{key:"ConteudoMroscByID",value:function(e){return this.getBaseUrlCMS()+"/conteudoMroscByID/"+e}},{key:"BarraTransparencia",value:function(e){return this.getBaseUrl()+":8383/api/osc/barratransparencia/"+e}},{key:"RecuperarOscPorLocalidadeAreaAtuacao",value:function(e,a){return this.getBaseUrl()+":8383/api/osc/listaareaatuacao/"+e+"/municipio/"+a}},{key:"RecuperarOscPorGeolocalizacaoAreaAtuacao",value:function(e,a,t){return this.getBaseUrl()+":8383/api/osc/listaareaatuacao/"+e+"/geolocalizacao/"+a+"/"+t}},{key:"RecuperarOscAtualizacao",value:function(){return this.getBaseUrl()+":8383/api/osc/listaatualizadas/"}},{key:"RecuperarMunicipio",value:function(e,a){return this.getBaseUrl()+":8383/api/geo/localidade/municipio/"+e+"/"+a}},{key:"RecuperarOscPorAreaAtuacao",value:function(e){return this.getBaseUrl()+":8383/api/osc/listaareaatuacao/"+e}},{key:"EnviarArquivoEstadoMunicipio",value:function(){return this.getBaseUrl()+":8383/api/gov/carregararquivoparcerias"}}]),e}();