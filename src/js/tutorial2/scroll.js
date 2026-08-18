/* ============================================================
   SCROLL.JS — Comportamentos Relacionados ao Scroll e Demos
   Responsabilidade: Concentra comportamentos da página e das
   demonstrações interativas que dependem de scroll ou posição.
   ============================================================ */

const DURACAO_VIDEO_CAPA = 5.04; // Duração simulada do vídeo em segundos

/**
 * Demonstração 01: O menu que desliza e some após 50px de rolagem.
 */
function inicializarDemoMenu() {
  const elementos = document.querySelectorAll('[data-demo="menu"]');

  elementos.forEach((raiz) => {
    const areaScroll = raiz.querySelector(".p-scroll");
    const menu = raiz.querySelector(".p-menu");
    const valorHUD = raiz.querySelector(".p-hud .v");
    const estadoHUD = raiz.querySelector(".p-hud .c");

    if (!areaScroll || !menu || !valorHUD || !estadoHUD) return;

    areaScroll.addEventListener("scroll", () => {
      const scrollY = Math.round(areaScroll.scrollTop);
      valorHUD.textContent = scrollY;

      // Após 50px de scroll, adiciona a classe que desloca o menu para fora
      if (scrollY > 50) {
        menu.classList.add("menu-rolado");
        estadoHUD.textContent = "menu-rolado";
        estadoHUD.classList.add("rosa");
      } else {
        menu.classList.remove("menu-rolado");
        estadoHUD.textContent = "sem classe";
        estadoHUD.classList.remove("rosa");
      }
    });
  });
}

/**
 * Demonstração 02: Blocos que aparecem ao entrar na tela com IntersectionObserver.
 */
function inicializarDemoBlocos() {
  const elementos = document.querySelectorAll('[data-demo="blocos"]');

  elementos.forEach((raiz) => {
    const areaScroll = raiz.querySelector(".p-scroll");
    const contadorHUD = raiz.querySelector(".p-hud .v");
    const botaoReiniciar = raiz.querySelector('[data-acao="reiniciar"]');
    const blocos = raiz.querySelectorAll(".p-central");

    if (!areaScroll || !contadorHUD) return;

    let observador = null;

    function reiniciarObservador() {
      if (observador) observador.disconnect();

      let blocosVistos = 0;
      contadorHUD.textContent = "0";
      blocos.forEach((bloco) => bloco.classList.remove("visivel"));
      areaScroll.scrollTop = 0;

      // Cria um observador vinculado à área de rolagem interna
      observador = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
              entrada.target.classList.add("visivel");
              observador.unobserve(entrada.target); // Para de vigiar o bloco animado
              blocosVistos++;
              contadorHUD.textContent = blocosVistos;
            }
          });
        },
        { root: areaScroll, threshold: 0.15 }
      );

      blocos.forEach((bloco) => observador.observe(bloco));
    }

    if (botaoReiniciar) {
      botaoReiniciar.addEventListener("click", reiniciarObservador);
    }

    reiniciarObservador();
  });
}

/**
 * Demonstração 03: Vídeo que avança e conteúdo que some com o scrub do slider.
 */
function inicializarDemoScrub() {
  const elementos = document.querySelectorAll('[data-demo="scrub"]');

  elementos.forEach((raiz) => {
    const slider = raiz.querySelector(".d-slider");
    const conteudo = raiz.querySelector(".p-capa-conteudo");
    const barra = raiz.querySelector(".p-barra");
    const seta = raiz.querySelector(".p-seta");
    const video = raiz.querySelector(".p-video");
    const hudPercentual = raiz.querySelector(".p");
    const hudOpacidade = raiz.querySelector(".ov");
    const hudCurrentTime = raiz.querySelector(".ct");

    if (!slider) return;

    function atualizarCena() {
      const progresso = slider.value / 100;

      // O conteúdo da capa desaparece e encolhe nos primeiros 10% (0.0 a 0.1)
      const taxaOcultacao = Math.min(progresso / 0.1, 1);
      [conteudo, barra, seta].forEach((elemento) => {
        if (!elemento) return;
        elemento.style.opacity = (1 - taxaOcultacao).toFixed(2);
        elemento.style.transform =
          (elemento === seta ? "translateX(-50%) " : "") +
          "scale(" +
          (1 - 0.4 * taxaOcultacao).toFixed(3) +
          ")";
      });

      // O vídeo surge suavemente nos primeiros 80% (0.0 a 0.8)
      const opacidadeVideo = Math.min(progresso / 0.8, 1);
      if (video) {
        video.style.opacity = opacidadeVideo.toFixed(2);
      }

      // Atualiza valores exibidos no painel informativo
      if (hudPercentual) hudPercentual.textContent = Math.round(slider.value);
      if (hudOpacidade) hudOpacidade.textContent = opacidadeVideo.toFixed(2);
      if (hudCurrentTime) {
        hudCurrentTime.textContent = (progresso * DURACAO_VIDEO_CAPA).toFixed(2);
      }
    }

    slider.addEventListener("input", atualizarCena);
    atualizarCena();
  });
}

/**
 * Demonstração 04: Alternância entre estados de F5 com ou sem clearScrollMemory.
 */
function inicializarDemoF5() {
  const elementos = document.querySelectorAll('[data-demo="f5"]');

  elementos.forEach((raiz) => {
    const botoes = raiz.querySelectorAll("[data-f5]");
    const telas = raiz.querySelectorAll("[data-f5-tela]");

    function exibirCenario(modo) {
      telas.forEach((tela) => {
        tela.classList.toggle("ativo", tela.dataset.f5Tela === modo);
      });
      botoes.forEach((botao) => {
        botao.classList.toggle("on", botao.dataset.f5 === modo);
      });
    }

    botoes.forEach((botao) => {
      botao.addEventListener("click", () => exibirCenario(botao.dataset.f5));
    });

    exibirCenario("com");
  });
}

/**
 * Inicializa todas as demonstrações e comportamentos dependentes de scroll.
 */
export function inicializarScroll() {
  inicializarDemoMenu();
  inicializarDemoBlocos();
  inicializarDemoScrub();
  inicializarDemoF5();
}
