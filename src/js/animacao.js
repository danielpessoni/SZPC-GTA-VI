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
    const media = gsap.matchMedia();

    function animarElementos(linhaDoTempo, escala) {
        linhaDoTempo.to(".capa-conteudo, .capa-barra, .capa-seta", {
            opacity: 0,
            scale: escala,
            duration: 0.1
        }, 0);

        linhaDoTempo.to(video, {
            opacity: 1,
            duration: 0.8
        }, 0);
    }

    media.add("(min-width: 769px)", () => {
        const linhaDoTempo = gsap.timeline({
            scrollTrigger: {
                trigger: ".capa",
                start: "top top",
                end: "+=2500",
                scrub: 1,
                pin: true
            }
        });

        animarElementos(linhaDoTempo, 0.6);

        linhaDoTempo.to(video, {
            currentTime: video.duration,
            duration: 1,
            ease: "none"
        }, 0);
    });

    media.add("(max-width: 768px)", () => {
        let tempoDesejado = 0;
        let atualizacaoAgendada = false;
        let listenerSeeked;

        function aplicarTempo() {
            atualizacaoAgendada = false;

            if (video.readyState < 2 || video.seeking) {
                return;
            }

            if (Math.abs(video.currentTime - tempoDesejado) > 0.04) {
                video.currentTime = tempoDesejado;
            }
        }

        function solicitarTempo(tempo) {
            tempoDesejado = tempo;

            if (!atualizacaoAgendada) {
                atualizacaoAgendada = true;
                requestAnimationFrame(aplicarTempo);
            }
        }

        listenerSeeked = () => {
            if (Math.abs(video.currentTime - tempoDesejado) > 0.04) {
                solicitarTempo(tempoDesejado);
            }
        };

        video.addEventListener("seeked", listenerSeeked);

        const linhaDoTempo = gsap.timeline({
            scrollTrigger: {
                trigger: ".capa",
                start: "top top",
                end: "+=1600",
                scrub: 0.2,
                pin: true,
                onUpdate: (self) => {
                    solicitarTempo(video.duration * self.progress);
                }
            }
        });

        animarElementos(linhaDoTempo, 0.8);

        return () => {
            video.removeEventListener("seeked", listenerSeeked);
        };
    });
}

// Verifica se os metadados do vídeo já carregaram para obter a duration correta
if (video.readyState >= 1) {
    animarCapa();
} else {
    video.addEventListener("loadedmetadata", animarCapa);
}