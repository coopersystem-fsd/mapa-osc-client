"use strict";var _createClass=function(){function c(e,a){for(var t=0;t<a.length;t++){var c=a[t];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(e,c.key,c)}}return function(e,a,t){return a&&c(e.prototype,a),t&&c(e,t),e}}();function _classCallCheck(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}var Cabecalho=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"montarCabecalho",value:function(e,a,t,c,n){var o=a.validateObject(e.cabecalho,""),r={Nome:a.validateObject(o.tx_razao_social_osc,""),cd_nur:a.validateObject(o.cd_identificador_osc,""),NatJur:a.validateObject(o.tx_nome_natureza_juridica_osc,""),imgLogo:a.validateObject(o.im_logo,"")},l=[];l.push(r),n=t.createFactory(n),c.render(n({dados:l}),document.getElementById("cabecalho"))}}]),e}();