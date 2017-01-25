class DataForms{
  dadosGerais(dadosGerais, content){
    var dadosGerais = {
      "form_items": [
        {
          "id": "tx_nome_fantasia_osc",
          "label": "Nome Fantasia",
          "content": dadosGerais.tx_nome_fantasia_osc ? dadosGerais.tx_nome_fantasia_osc : null,
          "fonte": dadosGerais.ft_nome_fantasia_osc ? dadosGerais.ft_nome_fantasia_osc : null,
          "placeholder": "Insira o nome como a OSC é conhecida",
          "type": "text"
        },
        {
          "id": "tx_sigla_osc",
          "label": "Sigla da OSC",
          "content": dadosGerais.tx_sigla_osc ? dadosGerais.tx_sigla_osc : null,
          "fonte": dadosGerais.ft_sigla_osc ? dadosGerais.ft_sigla_osc : null,
          "placeholder": "Insira aqui a sigla da OSC, se houver",
          "type": "text"
        },/*
        {
          "id": "tx_endereco_eletronico_sugerido",
          "label": "Endereço eletrônico sugerido para esta página",
          "content": dadosGerais.tx_apelido_osc,
          "fonte": dadosGerais.ft_apelido,
          "placeholder": "Insira um nome que deve constar após o endereço mapaosc.ipea.gov.br/[nome da OSC]",
          "pretext": "mapaosc.ipea.gov.br/",
          "type": "text"
        },*/
        {
          "id": "tx_endereco",
          "label": "Endereço da OSC",
          "content": content ? content : null,
          "fonte": dadosGerais.ft_endereco ? dadosGerais.ft_endereco : null,
          "type": "p"
        },
        {
          "id": "tx_nome_situacao_imovel_osc",
          "label": "Situação do Imóvel",
          "content": dadosGerais.tx_nome_situacao_imovel_osc ? dadosGerais.tx_nome_situacao_imovel_osc : null,
          "fonte": dadosGerais.ft_situacao_imovel_osc ? dadosGerais.ft_situacao_imovel_osc : null,
          "type": "select",
          "options": [
            "Próprio",
            "Alugado",
            "Outro"
          ]
        },
        {
          "id": "tx_nome_responsavel_legal",
          "label": "Responsável Legal",
          "content": dadosGerais.tx_nome_responsavel_legal ? dadosGerais.tx_nome_responsavel_legal : null,
          "fonte": dadosGerais.ft_nome_responsavel_legal ? dadosGerais.ft_nome_responsavel_legal : null,
          "placeholder": "Insira o nome do responsável legal pela OSC",
          "type": "text"
        },
        {
          "id": "dt_inscricao_osc",
          "label": "Ano de inscrição no Cadastro de CNPJ",
          "content": dadosGerais.dt_inscricao_osc ? dadosGerais.dt_inscricao_osc : null,
          "fonte": dadosGerais.ft_inscricao_osc ? dadosGerais.ft_inscricao_osc: null,
          "placeholder": "Insira o ano em que a OSC foi legalmente criada",
          "type": "text"
        },
        {
          "id": "dt_fundacao_osc",
          "label": "Ano de Fundação",
          "content": dadosGerais.dt_fundacao_osc ? dadosGerais.dt_fundacao_osc : null,
          "fonte": dadosGerais.ft_fundacao_osc ? dadosGerais.ft_fundacao_osc : null,
          "placeholder": "Insira o ano de fundação da OSC",
          "type": "text"
        },
        {
          "id": "tx_email",
          "label": "E-mail oficial da OSC",
          "content": dadosGerais.tx_email ? dadosGerais.tx_email : null,
          "fonte": dadosGerais.ft_email ? dadosGerais.ft_email : null,
          "placeholder": "Insira o endereço de e-mail da OSC",
          "type": "text"
        },
        {
          "id": "tx_resumo_osc",
          "label": "O que a OSC faz",
          "content": dadosGerais.tx_resumo_osc ? dadosGerais.tx_resumo_osc : null,
          "fonte": dadosGerais.ft_resumo_osc ? dadosGerais.ft_resumo_osc : null,
          "placeholder": "Apresente ao público, resumida e objetivamente, o que a OSC faz. Insira os objetivos, as atividades, práticas ou o que achar mais adequado para retratar a OSC",
          "type": "textarea"
        },
        {
          "id": "tx_site",
          "label": "Site",
          "content": dadosGerais.tx_site ? dadosGerais.tx_site : null,
          "fonte": dadosGerais.ft_site ? dadosGerais.ft_site : null,
          "placeholder": "Insira o endereço da página da OSC na internet, se houver",
          "type": "text"
        },
        {
          "id": "tx_telefone",
          "label": "Telefone",
          "content": dadosGerais.tx_telefone ? dadosGerais.tx_telefone : null,
          "fonte": dadosGerais.ft_telefone ? dadosGerais.ft_telefone : null,
          "placeholder": "Insira o telefone da OSC",
          "type": "tel"
        }
      ]
    };
    return dadosGerais;
  }

  areasAtuacao(){
    var areasAtuacao = {
      "form_items": [
        {
          "id": "atividade_economica",
          "label": "Atividade econômica",
          "content": null,
          "fonte": null,
          "placeholder": "Insira atividade econômica",
          "type": "p",
          "custom_class": null
        },
        {
          "id": "macro_area_1",
          "label": "Macro Área 1",
          "content": null,
          "fonte": null,
          "placeholder": "Selecione a área de atuação da OSC",
          "type": "text",
          "custom_class": "autocomplete"
        },
        {
          "id": "macro_area_1_outros",
          "label": "Insira a subarea desejada",
          "content": null,
          "fonte": null,
          "placeholder": "Não constam informações nas bases de dados do Mapa.",
          "type": "text",
          "hide": true,
          "custom_class": null
        },
        {
          "id": "macro_area_2",
          "label": "Macro Área 2",
          "content": null,
          "fonte": null,
          "placeholder": "Selecione uma segunda área de atuação da OSC, se houver.",
          "type": "text",
          "custom_class": "autocomplete"
        },
        {
          "id": "macro_area_2_outros",
          "label": "Insira a subarea desejada",
          "content": null,
          "fonte": null,
          "placeholder": "Não constam informações nas bases de dados do Mapa.",
          "type": "text",
          "hide": true,
          "custom_class": null
        }
      ]
    };
    return areasAtuacao;
  }

  descricao(descricao){
    var descricao = {
      "form_items": [
        {
          "id": "tx_historico",
          "label": "Histórico",
          "content": descricao.tx_historico ? descricao.tx_historico : null,
          "fonte": descricao.ft_historico ? descricao.ft_historico : null,
          "placeholder": "De modo resumido e objetivo, diga como surgiu a OSC, quando, onde, por que e por quem foi fundada",
          "type": "textarea"
        },
        {
          "id": "tx_missao_osc",
          "label": "Missão",
          "content": descricao.tx_missao_osc ? descricao.tx_missao_osc : null,
          "fonte": descricao.ft_missao_osc ? descricao.ft_missao_osc : null,
          "placeholder": "Se houver, apresente qual a missão da OSC",
          "type": "textarea"
        },
        {
          "id": "tx_visao_osc",
          "label": "Visão",
          "content": descricao.tx_visao_osc ? descricao.tx_visao_osc : null,
          "fonte": descricao.ft_visao_osc ? descricao.ft_visao_osc : null,
          "placeholder": "Se houver, apresente a visão da OSC",
          "type": "textarea"
        },
        {
          "id": "tx_finalidades_estatutarias",
          "label": "Finalidades Estatutárias da OSC",
          "content": descricao.tx_finalidades_estatutarias ? descricao.tx_finalidades_estatutarias : null,
          "fonte": descricao.ft_finalidades_estatutarias ? descricao.ft_finalidades_estatutarias : null,
          "placeholder": "Apresente as finalidades estatutárias da OSC. Se preferir, copie do estatuto da OSC",
          "type": "textarea"
        },
        {
          "id": "tx_link_estatuto_osc",
          "label": "Link para o Estatuto da OSC",
          "content": descricao.tx_link_estatuto_osc ? descricao.tx_link_estatuto_osc : null,
          "fonte": descricao.ft_link_estatuto_osc ? descricao.ft_link_estatuto_osc : null,
          "placeholder": "Se houver, insira o link que leva ao estatuto da OSC",
          "type": "text"
        }
      ]
    }

    return descricao;
  }

  titulosCertificacoes(json){
    var certificado = validateObject(json.certificado) ? json.certificado : ""
    var utilidade_publica_estadual = certificado.utilidade_publica_estadual;
    var utilidade_publica_municipal = certificado.utilidade_publica_municipal;
    var titulosCertificacoes={
      "form_items": [
        {
          "id": "tx_utilidade_publica",
          "label": null,
          "content": null,
          "fonte": null,
          "placeholder": "Não constam informações nas bases de dados do Mapa.",
          "type": "checkbox",
          "options": [
            {
              "label":"Utilidade pública estadual",
              "value": "estadual",
              "checked": true
            },
            {
              "label":"Utilidade pública municipal",
              "value": "municipal",
              "checked": false
            }
          ]
        },
        {
          "id": "utilidade_publica_estadual",
          "label": "Insira data de validade para Utilidade pública estadual",
          "content": utilidade_publica_estadual ? utilidade_publica_estadual.dt_data_validade : null,
          "fonte": utilidade_publica_estadual ? utilidade_publica_estadual.ft_utilidade_publica_estadual : null,
          "placeholder": "Não constam informações nas bases de dados do Mapa.",
          "type": "text",
          "hide": true
        },
        {
          "id": "utilidade_publica_municipal",
          "label": "Insira data de validade para Utilidade pública municipal",
          "content": utilidade_publica_municipal ? utilidade_publica_municipal.dt_data_validade : null,
          "fonte": utilidade_publica_municipal ? utilidade_publica_municipal.ft_utilidade_publica_municipal : null,
          "placeholder": "Não constam informações nas bases de dados do Mapa.",
          "type": "text",
          "hide": true
        }
      ]
    };
    return titulosCertificacoes;
  }

  modalAjuda(){
    var modalAjuda = {
    	"dados_gerais":{"Dados Gerais":"Os campos abaixo trazem informações mais gerais sobre a OSC. Essas informações podem ser preenchidas ou editadas pelo(a) representante da OSC cadastrado(a) no Mapa, com a exceção do endereço, que é informação oficial proveniente da RAIS (Relação Anual de Informações Sociais) do Ministério do Trabalho."},
     	"areas_de_atuacao":{"Áreas e Subáreas de Atuação da OSC":"A seção informa, em primeiro lugar, a atividade econômica da OSC proveniente da declaração da RAIS (Relação Anual de Informações Sociais) do Ministério do Trabalho. Informações adicionais acerca de outras áreas e subáreas de atuação da organização podem ser adicionadas pelo representante da OSC."},
     	"certificacoes":{"Descrição da OSC":"Aqui a OSC pode contar um pouco de sua história, identificar a sua missão e visão (quando houver) e finalidades (previstas no seu estatuto). Os campos podem ser preenchidos pelo(a) representante da OSC cadastrado(a) no Mapa."},
     	"titulosCertificacoes":{"Títulos e Certificações":"Essa seção indica os títulos (Utilidade pública estadual ou municipal), qualificações (OSCIP) e certificações (CEBAS) concedidos pelo Poder Público à OSC.<br><br>Para saber mais sobre cada um dos títulos ou certificações, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>."},
     	"relacoesTrabalho":{"Relações de Trabalho e Governança":"Aqui o(a) representante da OSC pode indicar nominalmente quem compõe o quadro de dirigentes e de conselheiros da sua organização, além de preencher o número de trabalhadores voluntários da entidade. Isso garante transparência para quem busca informações sobre a OSC. Os campos relativos ao número de empregados formais provêm das informações lançadas na RAIS/MTE."},
     	"espacos":{"Espaços de Participação Social":"Nesse espaço, o(a) representante da OSC pode indicar a participação em espaços colegiados com o Poder Público (conselhos de políticas públicas), as oportunidades que teve de integrar espaços que traçaram diretrizes de políticas (conferências de políticas públicas), bem como outros espaços de participação compartilhados com o Poder Público ou autoorganizados pela própria sociedade civil (fóruns, redes etc.).<br><br>Para saber mais sobre cada um dos espaços de participação social, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>."},
     	"projetos":{"Projetos, atividade e programas":"Nesse espaço, o(a) representante da OSC pode trazer com riqueza de informações os trabalhos que a organização desenvolve (em projetos, atividades ou programas), especificando suas fontes de recursos, público envolvido, dentre outras informações. Aqui constarão também as informações oficiais de parcerias celebradas com o Poder Público, em respeito à Lei de Acesso à Informação.<br><br>Para saber mais sobre os termos referentes a parcerias e fontes de recursos das OSCs, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>."},
     	"fontes":{"Fonte de recursos anual da OSC":"Essa seção informa o somatório de todos os recursos por fonte autodeclarados pela OSC ano a ano."}
    };

    return modalAjuda;
  }

  jsonModalAjuda(){
    return {
      "Dados Gerais":"Os campos abaixo trazem informações mais gerais sobre a OSC. Essas informações podem ser preenchidas ou editadas pelo(a) representante da OSC cadastrado(a) no Mapa, com a exceção do endereço, que é informação oficial proveniente da RAIS (Relação Anual de Informações Sociais) do Ministério do Trabalho.",
      "Áreas e Subáreas de Atuação da OSC":"A seção informa, em primeiro lugar, a atividade econômica da OSC proveniente da declaração da RAIS (Relação Anual de Informações Sociais) do Ministério do Trabalho. Informações adicionais acerca de outras áreas e subáreas de atuação da organização podem ser adicionadas pelo representante da OSC.",
      "Descrição da OSC":"Aqui a OSC pode contar um pouco de sua história, identificar a sua missão e visão (quando houver) e finalidades (previstas no seu estatuto). Os campos podem ser preenchidos pelo(a) representante da OSC cadastrado(a) no Mapa.",
      "Títulos e Certificações":"Essa seção indica os títulos (Utilidade pública estadual ou municipal), qualificações (OSCIP) e certificações (CEBAS) concedidos pelo Poder Público à OSC.<br><br>Para saber mais sobre cada um dos títulos ou certificações, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>.",
      "Relações de Trabalho e Governança":"Aqui o(a) representante da OSC pode indicar nominalmente quem compõe o quadro de dirigentes e de conselheiros da sua organização, além de preencher o número de trabalhadores voluntários da entidade. Isso garante transparência para quem busca informações sobre a OSC. Os campos relativos ao número de empregados formais provêm das informações lançadas na RAIS/MTE.",
      "Espaços de Participação Social":"Nesse espaço, o(a) representante da OSC pode indicar a participação em espaços colegiados com o Poder Público (conselhos de políticas públicas), as oportunidades que teve de integrar espaços que traçaram diretrizes de políticas (conferências de políticas públicas), bem como outros espaços de participação compartilhados com o Poder Público ou autoorganizados pela própria sociedade civil (fóruns, redes etc.).<br><br>Para saber mais sobre cada um dos espaços de participação social, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>.",
      "Projetos, atividade e programas":"Nesse espaço, o(a) representante da OSC pode trazer com riqueza de informações os trabalhos que a organização desenvolve (em projetos, atividades ou programas), especificando suas fontes de recursos, público envolvido, dentre outras informações. Aqui constarão também as informações oficiais de parcerias celebradas com o Poder Público, em respeito à Lei de Acesso à Informação.<br><br>Para saber mais sobre os termos referentes a parcerias e fontes de recursos das OSCs, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>.",
      "Fonte de recursos anual da OSC":"Essa seção informa o somatório de todos os recursos por fonte autodeclarados pela OSC ano a ano."
    };
  }

  getSuggestions(){
    var suggestions = [
      {
        "cd_area_atuacao": 1,
        "tx_nome_area_atuacao": "Habitação"
      },
      {
        "cd_area_atuacao": 2,
        "tx_nome_area_atuacao": "Saúde"
      },
      {
        "cd_area_atuacao": 3,
        "tx_nome_area_atuacao": "Cultura e recreação"
      },
      {
        "cd_area_atuacao": 4,
        "tx_nome_area_atuacao": "Educação e Pesquisa"
      },
      {
        "cd_area_atuacao": 5,
        "tx_nome_area_atuacao": "Assistência social"
      },
      {
        "cd_area_atuacao": 6,
        "tx_nome_area_atuacao": "Religião"
      },
      {
        "cd_area_atuacao": 7,
        "tx_nome_area_atuacao": "Associações patronais, profissionais e de produtores rurais"
      },
      {
        "cd_area_atuacao": 8,
        "tx_nome_area_atuacao": "Meio ambiente e proteção animal"
      },
      {
        "cd_area_atuacao": 9,
        "tx_nome_area_atuacao": "Desenvolvimento e defesa de direitos"
      },
    ];
    return suggestions;
  }

  sectionsRelacoesGovernanca(){
    var sections = {
      "items": [
        {
            "id": "relacoes_trabalho",
            "priority": "2",
            "text": "Relações de Trabalho e Governança",
            "target": "relacoes_trabalho_e_governanca"
        },
        {
          "id": "governanca",
          "priority": "3",
          "text": "Governança da OSC",
          "target": "relacoes_trabalho"
        },
        {
          "id": "dirigentes",
          "priority": "4",
          "text": "Quadro de dirigentes",
          "subsections": []
        },
        {
          "id": "conselheiros",
          "priority": "4",
          "text": "Conselho Fiscal",
          "subsections": []
        },
        {
          "id": "conselho_fiscal",
          "priority": "4",
          "text": "Membros do conselho fiscal",
          "subsections": []
        },
        {
          "id": "trabalhadores",
          "priority": "3",
          "text": "Trabalhadores",
          "target": "relacoes_trabalho",
          "subsections": []
        }
      ]
    };
    return sections;
  }

  relacoesTrabalho(relacoes_trabalho){
    var relacoesTrabalho = {
      "form_items": [
        {
          "id": "trabalhadores",
          "label": "Total de trabalhadores",
          "content": relacoes_trabalho.nr_trabalhadores,
          "fonte": null,
          "placeholder": "Não constam informações nas bases de dados do Mapa.",
          "type": "p"
        },
        {
          "id": "empregados",
          "label": "Empregados",
          "content": relacoes_trabalho.nr_trabalhadores_vinculo,
          "fonte": relacoes_trabalho.ft_trabalhadores_vinculo,
          "placeholder": "Não constam informações nas bases de dados do Mapa.",
          "type": "p"
        },
        {
          "id": "deficiencia",
          "label": "Trabalhadores com deficiência",
          "content": relacoes_trabalho.nr_trabalhadores_deficiencia ? relacoes_trabalho.nr_trabalhadores_deficiencia : "Não constam informações nas bases de dados do Mapa.",
          "fonte": relacoes_trabalho.ft_trabalhadores_deficiencia,
          "placeholder": "Não constam informações nas bases de dados do Mapa.",
          "type": "p"
        },
        {
          "id": "voluntarios",
          "label": "Trabalhadores voluntários",
          "content": relacoes_trabalho.nr_trabalhadores_voluntarios,
          "fonte": relacoes_trabalho.ft_trabalhadores_voluntarios,
          "placeholder": "Insira o número de voluntários",
          "type": "text"
        },
        /*{
          "id": "outros",
          "label": "Outros trabalhadores",
          "content": relacoes_trabalho_outra.nr_trabalhadores,
          "fonte": relacoes_trabalho_outra.ft_trabalhadores,
          "placeholder": "Insira o total de trabalhadores com outros tipos de vínculo",
          "type": "text"
        }*/
      ]
    };

    return relacoesTrabalho;
  }

  trabalhadoresRelacoesGovernanca(){
    var trg = {
      "form_items": [
        {
          "id": "trabalhadores",
          "label": "Total de trabalhadores",
          "content": "",
          "fonte": null,
          "placeholder": "Não constam informações nas bases de dados do Mapa.",
          "type": "p"
        },
        {
          "id": "empregados",
          "label": "Empregados",
          "content": "Não constam informações nas bases de dados do Mapa.",
          "fonte": "",
          "placeholder": "Não constam informações nas bases de dados do Mapa.",
          "type": "p"
        },
        {
          "id": "deficiencia",
          "label": "Trabalhadores com deficiência",
          "content": "Não constam informações nas bases de dados do Mapa.",
          "fonte": "",
          "placeholder": "Não constam informações nas bases de dados do Mapa.",
          "type": "p"
        },
        {
          "id": "voluntarios",
          "label": "Trabalhadores voluntários",
          "content": "",
          "fonte": "",
          "placeholder": "Insira o número de voluntários",
          "type": "text"
        },
        /*{
          "id": "outros",
          "label": "Outros trabalhadores",
          "content": relacoes_trabalho_outra.nr_trabalhadores,
          "fonte": relacoes_trabalho_outra.ft_trabalhadores,
          "placeholder": "Insira o total de trabalhadores com outros tipos de vínculo",
          "type": "text"
        }*/
      ]
    };

    return trg;
  }

  partSocial(){
    var partSoc = {
    "items": [
        {
          "id": "participacao_social",
          "priority": "2",
          "text": "Espaços de Participação Social",
          "target": "participacao_social"
        },
        {
          "id": "conselhos",
          "priority": "3",
          "text": "Conselhos de Políticas Públicas",
          "target": "participacao_social"
        },
        {
          "id": "conferencias",
          "priority": "3",
          "text": "Conferências de Políticas Públicas",
          "target": "participacao_social"
        },
        {
          "id": "outros_part",
          "priority": "3",
          "text": "Outros espaços de participação social",
          "target": "participacao_social"
        }
      ]
    };
    return partSoc;
  }

  itemsRecurso(){
    var itemsRecurso = {
      "items": [
        {
            "id": "recursos_geral",
            "priority": "2",
            "text": "Fonte de recursos anual da OSC"
        },
        {
            "id": "recursos_proprios",
            "priority": "3",
            "text": "Recursos próprios"
        },
        {
          "id": "recursos_publicos",
          "priority": "3",
          "text": "Recursos públicos"
        },
        {
          "id": "recursos_privados",
          "priority": "3",
          "text": "Recursos privados",
          "subsections": []
        },
        {
          "id": "recursos_nao_financeiros",
          "priority": "3",
          "text": "Recursos não financeiros",
          "subsections": []
        }
      ]
    };

    return itemsRecurso;
  }

  tiposRecurso(){
    var tiposRecurso = {
      "recursos_geral": [
        {
          "id": "ano",
          "label": "Ano",
          "content": "2016",
          "fonte": null,
          "placeholder":"",
          "type": "select",
          "options": [
            "2016",
            "2015",
            "2014"
          ],
          "custom_class": "select-ano"
        },
      ],
      "recursos_proprios": [
        {
          "id": "patrimoniais",
          "label": "Rendimentos de fundos patrimoniais",
          "pretext": "R$"
        },
        {
          "id": "reservas",
          "label": "Rendimentos financeiros de reservas ou contas correntes  próprias"
        },
        {
          "id": "mensalidades",
          "label": "Mensalidades ou contribuições de associados"
        },
        {
          "id": "premios",
          "label": "Prêmios recebidos"
        },
        {
          "id": "venda",
          "label": "Venda de produtos"
        },
        {
          "id": "servicos",
          "label": "Prestação de serviços"
        },
        {
          "id": "bens",
          "label": "Venda de bens e direitos"
        }
      ],

      "recursos_publicos": [
        {
          "id": "federal",
          "label": "Parceria com o governo federal"
        },
        {
          "id": "estadual",
          "label": "Parceria com o governo estadual"
        },
        {
          "id": "municipal",
          "label": "Parceria com o governo municipal"
        },
        {
          "id": "multilaterais",
          "label": "Acordo com organismos multilaterais "
        },
        {
          "id": "estrangeiros",
          "label": "Acordo com governos estrangeiros"
        },
        {
          "id": "empresas_publicas",
          "label": "Empresas públicas ou sociedades de economia mista"
        }
      ],

      "recursos_privados": [
        {
          "id": "oscs_brasileiras",
          "label": "Parceria com OSCs brasileiras"
        },
        {
          "id": "oscs_estrangeiras",
          "label": "Parcerias com OSCs estrangeiras"
        },
        {
          "id": "religiosas_brasileiras",
          "label": "Parcerias com organizações religiosas brasileiras"
        },
        {
          "id": "religiosas_estrangeiras",
          "label": "Parcerias com organizações religiosas estrangeiras"
        },
        {
          "id": "empresas_brasileiras",
          "label": "Empresas privadas brasileiras"
        },
        {
          "id": "empresas_estrangeiras",
          "label": "Empresas privadas estrangeiras"
        },
        {
          "id": "doacoes_pj",
          "label": "Doações de pessoa jurídica"
        },
        {
          "id": "doacoes_pf",
          "label": "Doações de pessoa física"
        },
        {
          "id": "doacoes_servicos",
          "label": "Doações recebidas na forma de produtos e serviços (com Nota Fiscal)"
        }
      ],

      "recursos_nao_financeiros": [
        {
          "id": "voluntariado",
          "label": "Voluntariado"
        },
        {
          "id": "isencoes",
          "label": "Isenções"
        },
        {
          "id": "imunidades",
          "label": "Imunidades"
        },
        {
          "id": "bens_recebidos",
          "label": "Bens recebidos em direito de uso"
        },
        {
          "id": "doacoes_recebidas",
          "label": "Doações recebidas na forma de produtos e serviços (sem Nota Fiscal)"
        }
      ]
    };
    return tiposRecurso;
  }

  labelsProjeto(){
    var labelsProjeto = {
      "tx_nome_projeto": {
        "header": "Nome do projeto, atividade ou programa",
        "containerClass": "col-md-12",
        "removable": false,
        "type": "text",
        "options": null
      },
      "tx_nome_status_projeto": {
        "header": "Situação do projeto",
        "containerClass": "col-md-3",
        "removable": false,
        "type": "select",
        "options": ["Em execução", "Finalizado", "Outros"]
      },
      "dt_data_inicio_projeto": {
        "header": "Data de Início",
        "containerClass": "col-md-3",
        "removable": false,
        "type": "text",
        "options": null
      },
      "dt_data_fim_projeto": {
        "header": "Data de Fim",
        "containerClass": "col-md-3",
        "removable": false,
        "type": "text",
        "options": null
      },
      "tx_link_projeto": {
        "header": "Link",
        "containerClass": "col-md-3",
        "removable": false,
        "type": "text",
        "options": null
      },
      "nr_total_beneficiarios": {
        "header": "Total de Beneficiários",
        "containerClass": "col-md-3",
        "removable": false,
        "type": "text",
        "options": null
      },
      "nr_valor_total_projeto": {
        "header": "Valor Total",
        "containerClass": "col-md-3",
        "removable": false,
        "type": "text",
        "options": null
      },
      "tx_valor_captado_projeto": {
        "header": "Valor Captado",
        "containerClass": "col-md-3",
        "removable": false,
        "type": "text",
        "options": null
      },
      "fonte_de_recursos": {
        "header": "Fonte de Recursos",
        "containerClass": "col-md-3",
        "removable": false,
        "type": "select",
        "options": [
          "Público", "Privado", "Próprio"
        ]
      },
      "fonte_de_recursos_publico": {
        "header": "Fonte de Recursos Públicos",
        "containerClass": "col-md-3",
        "removable": false,
        "type": "select",
        "options": [
          "Municipal", "Federal", "Estadual"
        ]
      },
      "financiadores": {
        "header": "Financiadores do Projeto",
        "containerClass": "col-md-3",
        "removable": true,
        "type": "text",
        "options": null
      },
      "autodeclaradas": {
        "header": "Área de atuação do projeto, atividade ou programa",
        "containerClass": "col-md-3",
        "removable": true,
        "type": "text",
        "options": null
      },
      "publico_beneficiado": {
        "header": "Público Beneficiado",
        "containerClass": "col-md-3",
        "removable": true,
        "type": "text",
        "options": null
      },
      "tx_nome_abrangencia_projeto": {
        "header": "Abrangência de atuação",
        "containerClass": "col-md-3",
        "removable": false,
        "type": "select",
        "options": [
          "Municipal", "Estadual", "Regional", "Nacional"
        ]
      },
      "localizacao_projeto": {
        "header": "Local de execução",
        "containerClass": "col-md-3",
        "removable": true,
        "type": "text",
        "options": null
      },
      "parceiras": {
        "header": "OSCs Parceiras",
        "containerClass": "col-md-6",
        "removable": true,
        "type": "text",
        "options": null
      },
      "tx_nome_zona_atuacao": {
        "header": "Zona de Atuação",
        "containerClass": "col-md-3",
        "removable": false,
        "type": "select",
        "options": [
          "Rural", "Urbana"
        ]
      },
      "tx_metodologia_monitoramento": {
        "header": "Metodologia de Monitoramento e Avaliação do Projeto, atividade e/ou programa",
        "containerClass": "col-md-12",
        "removable": false,
        "type": "textarea",
        "options": null
      },
      "tx_descricao_projeto": {
        "header": "Descrição do Projeto, atividade e/ou programa",
        "containerClass": "col-md-12",
        "removable": false,
        "type": "textarea",
        "options": null
      },
      "objetivos": {
        "header": "Objetivos de desenvolvimento do milênio",//Objetivos do Desenvolvimento Sustentável - ODS - https://nacoesunidas.org/pos2015 (link externo)
        "containerClass": "col-md-12",
        "removable": false,
        "type": "select",
        "options": null
      },
      "objetivos_metas": {
        "header": null,
        "containerClass": null,
        "removable": false,
        "type": "select",
        "options": null
      }
    };
    return labelsProjeto;
  }

  getEmptyProject(){
    var project = {
      "id_projeto": null,
      "tx_identificador_projeto_externo": null,
      "ft_identificador_projeto_externo": null,
      "tx_nome_projeto": null,
      "ft_nome_projeto": "Usuário",
      "cd_status_projeto": null,
      "tx_nome_status_projeto": null,
      "ft_status_projeto": "Usuário",
      "dt_data_inicio_projeto": null,
      "ft_data_inicio_projeto": "Usuário",
      "dt_data_fim_projeto": null,
      "ft_data_fim_projeto": "Usuário",
      "tx_link_projeto": null,
      "ft_link_projeto": "Usuário",
      "nr_total_beneficiarios": null,
      "ft_total_beneficiarios": "Usuário",
      "nr_valor_total_projeto": null,
      "ft_valor_total_projeto": "Usuário",
      "nr_valor_captado_projeto": null,
      "ft_valor_captado_projeto": "Usuário",
      "tx_metodologia_monitoramento": null,
      "ft_metodologia_monitoramento": "Usuário",
      "tx_descricao_projeto": null,
      "ft_descricao_projeto": "Usuário",
      "cd_abrangencia_projeto": null,
      "tx_nome_abrangencia_projeto": null,
      "ft_abrangencia_projeto": "Usuário",
      "cd_zona_atuacao_projeto": null,
      "tx_nome_zona_atuacao": null,
      "ft_zona_atuacao_projeto": "Usuário",
      "publico_beneficiado": [],
      "area_atuacao": [],
      "area_atuacao_outra": [],
      "localizacao": [],
      "parceira": [],
      "financiador": [],
      "objetivo_meta": null,
      "recursos": null
    };
    return project;
  }

  oLanguageDataTable(){
    return {
      "sEmptyTable": "Nenhum registro encontrado",
      "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
      "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
      "sInfoFiltered": "(Filtrados de _MAX_ registros)",
      "sInfoPostFix": "",
      "sInfoThousands": ".",
      "sLengthMenu": "_MENU_ resultados por página",
      "sLoadingRecords": "Carregando...",
      "sProcessing": "Processando...",
      "sZeroRecords": "Nenhum registro encontrado",
      "sSearch": "Pesquisar",
      "oPaginate": {
          "sNext": "Próximo",
          "sPrevious": "Anterior",
          "sFirst": "Primeiro",
          "sLast": "Último"
      },
      "oAria": {
          "sSortAscending": ": Ordenar colunas de forma ascendente",
          "sSortDescending": ": Ordenar colunas de forma descendente"
      }
    };
  }
}
