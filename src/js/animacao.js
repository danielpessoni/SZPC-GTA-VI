// Sempre começar a página no topo (o pin da capa depende disso)
ScrollTrigger.clearScrollMemory("manual");
window.scrollTo(0, 0);

/* ------------------------------------------------------------
   1. O MENU QUE SOME AO ROLAR
   ------------------------------------------------------------ */
const menu = document.getElementById("menu");

window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        menu.classList.add("menu-rolado");
    } else {
        menu.classList.remove("menu-rolado");
    }
});

/* ------------------------------------------------------------
   2. OS BLOCOS QUE APARECEM AO ENTRAR NA TELA
   ------------------------------------------------------------ */
const blocos = document.querySelectorAll(".aparecer");

const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
            observador.unobserve(entrada.target);
        }
    });
}, { threshold: 0.15 });

blocos.forEach(function (bloco) {
    observador.observe(bloco);
});

/* ------------------------------------------------------------
   3. O VÍDEO DA CAPA QUE ANDA COM O SCROLL
   ------------------------------------------------------------ */
gsap.registerPlugin(ScrollTrigger);

const video = document.querySelector(".capa-video");

function animarCapa() {
    const linhaDoTempo = gsap.timeline({
        scrollTrigger: {
            trigger: ".capa",
            start: "top top",
            end: "+=2500",
            scrub: 1,
            pin: true
        }
    });

    // Desaparece com os textos e botões da capa
    linhaDoTempo.to(".capa-conteudo, .capa-barra, .capa-seta", {
        opacity: 0,
        scale: 0.6,
        duration: 0.1
    }, 0);

    // Revela o vídeo aumentando a opacidade
    linhaDoTempo.to(video, {
        opacity: 1,
        duration: 0.8
    }, 0);

    // Avança o tempo do vídeo (currentTime) conforme o scroll
    linhaDoTempo.to(video, {
        currentTime: video.duration,
        duration: 1,
        ease: "none"
    }, 0);
}

// Verifica se os metadados do vídeo já carregaram para obter a duration correta
if (video.readyState >= 1) {
    animarCapa();
} else {
    video.addEventListener("loadedmetadata", animarCapa);
}