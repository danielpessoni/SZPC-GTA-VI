/* ============================================================
   DESTAQUE.JS — Processamento e Destaque Visual de Código
   Responsabilidade: Coloração sintática dos blocos de código
   (HTML, CSS e JavaScript) e remoção opcional de comentários.
   ============================================================ */

/**
 * Escapa caracteres HTML especiais para evitar injeção e exibição incorreta.
 * @param {string} texto
 * @returns {string}
 */
function escapar(texto) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Colore tags HTML e seus respectivos atributos/valores.
 * @param {string} tag
 * @returns {string}
 */
function pintarTag(tag) {
  return tag.replace(
    /^(&lt;\/?)([a-zA-Z0-9!-]*)([\s\S]*?)(\/?&gt;)$/,
    function (_, abertura, nome, resto, fechamento) {
      const atributos = resto
        .replace(
          /([a-zA-Z-]+)(=)("[^"]*")/g,
          '<span class="atr">$1</span>=<span class="val">$3</span>'
        )
        .replace(/(\s)([a-zA-Z-]+)(?=[\s]|$)/g, '$1<span class="atr">$2</span>');

      return (
        '<span class="tag">' +
        abertura +
        '</span><span class="nome">' +
        nome +
        '</span>' +
        atributos +
        '<span class="tag">' +
        fechamento +
        "</span>"
      );
    }
  );
}

/**
 * Realiza a coloração sintática de trechos de código HTML.
 * @param {string} codigo
 * @returns {string}
 */
function pintarHTML(codigo) {
  let texto = escapar(codigo);
  const marcadores = [];

  // Isola comentários HTML
  texto = texto.replace(/&lt;!--[\s\S]*?--&gt;/g, (match) => {
    marcadores.push('<span class="com">' + match + "</span>");
    return "\u0000" + (marcadores.length - 1) + "\u0000";
  });

  // Colore tags HTML
  texto = texto.replace(/&lt;\/?[a-zA-Z!][\s\S]*?&gt;/g, (match) => {
    marcadores.push(pintarTag(match));
    return "\u0000" + (marcadores.length - 1) + "\u0000";
  });

  // Restaura trechos destacados
  return texto.replace(/\u0000(\d+)\u0000/g, (_, indice) => marcadores[+indice]);
}

/**
 * Realiza a coloração sintática de trechos de código JavaScript.
 * @param {string} codigo
 * @returns {string}
 */
function pintarJS(codigo) {
  let texto = escapar(codigo);
  const marcadores = [];
  const guardar = (conteudo) => {
    marcadores.push(conteudo);
    return "\u0000" + (marcadores.length - 1) + "\u0001";
  };

  // Isola comentários de linha e de bloco
  texto = texto.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, (match) =>
    guardar('<span class="com">' + match + "</span>")
  );

  // Isola strings literais
  texto = texto.replace(/(["'])(?:\\.|(?!\1)[^\\\n])*\1/g, (match) =>
    guardar('<span class="val">' + match + "</span>")
  );

  // Colore palavras-chave, números e chamadas de função
  return texto
    .split(/(\u0000\d+\u0001)/)
    .map((parte) => {
      if (/^\u0000\d+\u0001$/.test(parte)) {
        return marcadores[+parte.slice(1, -1)];
      }
      return parte
        .replace(
          /\b(const|let|var|function|return|if|else|new|true|false|null|undefined|this)\b/g,
          '<span class="tag">$1</span>'
        )
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="nome">$1</span>')
        .replace(/([A-Za-z_$][\w$]*)(?=\s*\()/g, '<span class="atr">$1</span>');
    })
    .join("");
}

/**
 * Realiza a coloração sintática de trechos de código CSS.
 * @param {string} codigo
 * @returns {string}
 */
function pintarCSS(codigo) {
  let texto = escapar(codigo);
  const marcadores = [];
  const guardar = (conteudo) => {
    marcadores.push(conteudo);
    return "\u0000" + (marcadores.length - 1) + "\u0000";
  };

  // Isola comentários CSS
  texto = texto.replace(/\/\*[\s\S]*?\*\//g, (match) =>
    guardar('<span class="com">' + match + "</span>")
  );

  // Colore seletores CSS antes do abre-chaves
  texto = texto.replace(
    /([^{};\u0000\n][^{};\u0000]*)(\{)/g,
    (_, seletor, abertura) => '<span class="nome">' + seletor + "</span>" + abertura
  );

  // Colore propriedades e valores CSS
  texto = texto.replace(
    /([-a-zA-Z]+)(\s*:\s*)([^;{}\n]+)(;)/g,
    '<span class="atr">$1</span>$2<span class="val">$3</span>$4'
  );

  // Restaura comentários
  return texto.replace(/\u0000(\d+)\u0000/g, (_, indice) => marcadores[+indice]);
}

/**
 * Encaminha o código para a função de pintura de acordo com a linguagem.
 * @param {string} codigo
 * @param {string} linguagem - 'html', 'css' ou 'js'
 * @returns {string} HTML com a sintaxe colorida
 */
export function pintar(codigo, linguagem) {
  if (linguagem === "html") return pintarHTML(codigo);
  if (linguagem === "css") return pintarCSS(codigo);
  return pintarJS(codigo);
}

/**
 * Remove comentários de blocos de código preservando o restante da formatação.
 * @param {string} codigo
 * @param {string} linguagem
 * @returns {string} Código limpo sem comentários
 */
export function removerComentarios(codigo, linguagem) {
  let resultado = codigo;
  if (linguagem === "html") {
    resultado = resultado.replace(/[ \t]*<!--[\s\S]*?-->[ \t]*\n?/g, "");
  } else {
    resultado = resultado.replace(/[ \t]*\/\*[\s\S]*?\*\/[ \t]*\n?/g, "");
    resultado = resultado.replace(/[ \t]*\/\/[^\n]*\n?/g, "");
  }
  return resultado.replace(/\n{3,}/g, "\n\n").trim();
}

/**
 * Processa e destaca todos os elementos <pre class="codigo"> presentes no documento.
 * @param {boolean} [comComentarios=true] - Define se os comentários devem ser exibidos
 */
export function processarBlocosCodigo(comComentarios = true) {
  const blocos = document.querySelectorAll("pre.codigo");

  blocos.forEach((pre) => {
    // Preserva o código original no dataset se ainda não estiver salvo
    if (!pre.dataset.cru) {
      pre.dataset.cru = encodeURIComponent(pre.textContent.trim());
    }

    const codigoCru = decodeURIComponent(pre.dataset.cru);
    const linguagem = pre.dataset.lang || "js";
    const codigoFormatado = comComentarios
      ? codigoCru
      : removerComentarios(codigoCru, linguagem);

    pre.innerHTML = pintar(codigoFormatado, linguagem);
  });
}
