/* ============================================================
   NAVEGACAO.JS — Controle de Navegação e Seção Ativa
   Responsabilidade: Controla a navegação entre seções, elementos
   de navegação (pills), identificação da seção ativa ao rolar e
   navegação acessível por teclas de seta do teclado.
   ============================================================ */

/**
 * Inicializa os comportamentos de navegação da página.
 */
export function inicializarNavegacao() {
  const secoes = [...document.querySelectorAll(".secao")];
  const botoesPills = [...document.querySelectorAll(".pills .pill")];

  if (secoes.length === 0 || botoesPills.length === 0) return;

  // 1. Clique nos botões (pills) rola suavemente até a seção correspondente
  botoesPills.forEach((botao) => {
    botao.addEventListener("click", () => {
      const alvoId = botao.dataset.alvo;
      const secaoAlvo = document.getElementById(alvoId);
      if (secaoAlvo) {
        secaoAlvo.scrollIntoView({ block: "start" });
      }
    });
  });

  // 2. IntersectionObserver para destacar a pill da seção visível no momento
  const observadorSecoes = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          const indiceSecao = secoes.indexOf(entrada.target);
          botoesPills.forEach((botao, indiceBotao) => {
            botao.classList.toggle("ativo", indiceBotao === indiceSecao);
          });
        }
      });
    },
    { rootMargin: "-20% 0px -70% 0px" }
  );

  secoes.forEach((secao) => observadorSecoes.observe(secao));

  // 3. Navegação via teclado com as setas para a esquerda e direita
  document.addEventListener("keydown", (evento) => {
    // Ignora interação caso o foco esteja em campo de entrada de texto
    if (evento.target.tagName === "INPUT") return;

    // Remove o foco do botão para não interferir na navegação por teclado
    if (
      evento.target.tagName === "BUTTON" &&
      (evento.key === "ArrowLeft" || evento.key === "ArrowRight")
    ) {
      evento.target.blur();
    }

    if (evento.key !== "ArrowRight" && evento.key !== "ArrowLeft") return;

    // Encontra o índice da seção atualmente ativa
    const indiceAtual = botoesPills.findIndex((botao) =>
      botao.classList.contains("ativo")
    );

    let proximoIndice = indiceAtual + (evento.key === "ArrowRight" ? 1 : -1);
    if (indiceAtual === -1) proximoIndice = 0;

    // Mantém o índice dentro dos limites do array de seções
    proximoIndice = Math.max(0, Math.min(secoes.length - 1, proximoIndice));

    if (secoes[proximoIndice]) {
      secoes[proximoIndice].scrollIntoView({ block: "start" });
    }
  });
}
