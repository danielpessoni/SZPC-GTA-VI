# 🌴 GTA VI — HUB, Landing Page & Tutoriais Interativos

Plataforma integrada e interativa desenvolvida com foco no universo de **Grand Theft Auto VI**. O ecossistema reúne a Landing Page oficial apresentada durante a **Semana do Zero ao Programador Contratado (SZPC)** da escola **Dev em Dobro**, tutoriais interativos de dissecação de código/comportamento refatorados com auxílio de Inteligência Artificial e um **HUB central** autoral que conecta todas as páginas, recursos, autor e mentores em uma única experiência imersiva.

---

## 🕹️ Vertentes e Funcionalidades

O projeto é estruturado em vertentes complementares, cada uma com propósitos didáticos e visuais específicos:

### 1. 🌐 HUB Central (`index.html`)
* **Ponto de Encontro Centralizado:** Desenvolvido de forma autoral para consolidar em um único local todos os acessos do ecossistema: a Landing Page final, os tutoriais técnicos, o repositório e os perfis do autor e dos mentores.
* **Identidade Visual Temática:** Estruturado com base na paleta preta e amarela e tipografia de alto impacto originadas do primeiro tutorial, integrando também o banner oficial do canal do YouTube dos mentores veiculado durante o evento.
* **Integração Dinâmica com a API do GitHub:** Script assíncrono (`src/js/github.js`) que consome a API pública do GitHub para renderizar em tempo real a foto de perfil (`avatar_url`) e o nome de usuário do autor (`danielpessoni`) e dos mentores (`devemdobro`).

### 2. 🎬 Landing Page GTA VI (`html/gta6-lp.html`)
* **Projeto Principal da SZPC:** Reprodução fiel da landing page promocional do GTA VI com foco em alta fidelidade visual, narrativa e design responsivo.
* **Vídeo em Background com Efeito Scrub & Pin (GSAP):** A tela inicial fixa a capa na viewport (`pin: true`) enquanto o progresso do vídeo `.mp4` avança sincronizado com a rolagem do usuário (`scrub: 1`).
* **Menu Inteligente com Ocultação Automática:** O cabeçalho monitora a rolagem vertical (`window.scrollY > 50`) e desliza suavemente para fora da tela com a classe `menu-rolado`, retornando automaticamente ao atingir o topo.
* **Animações de Entrada (Reveal on Scroll):** Utilização de `IntersectionObserver` para animar com suavidade e transição vertical os blocos de história e o card do trailer conforme adentram a área visível da tela.

### 3. 📖 Tutorial 1 — HTML e Interface Lado a Lado (`html/tutorial1.html`)
* **Dissecação Estrutural:** Material complementar concebido inicialmente pelos mentores e refatorado com IA para estudo aprofundado de marcação semântica.
* **Comparativo Visual:** Apresenta cada componente do projeto (Menu, Capa, Barra de Lançamento, Seção de História, Card do Trailer e Rodapé) com o código HTML destacado à esquerda e a renderização gráfica real à direita.

### 4. ⚡ Tutorial 2 — Código e Comportamento Interativo (`html/tutorial2.html`)
* **Laboratório Dinâmico de JavaScript e CSS:** Foco na relação direta entre instrução de código e comportamento em tela.
* **Demos Interativas em Tempo Real:**
  * *HUD de Scroll:* Exibição do valor exato de `scrollY` e do momento do disparo da classe do menu.
  * *Observador de Blocos:* Demonstração do `IntersectionObserver` com contador de elementos vistos e botão para reiniciar o ciclo de observação.
  * *Controle de Scrub por Slider:* Slider interativo que simula a rolagem, permitindo inspecionar opacidade, escala e tempo de vídeo (`currentTime`).
  * *Comparativo de F5 (Memória de Scroll):* Demonstração prática do comportamento de recarregamento com e sem a limpeza de memória do `ScrollTrigger`.
* **Navegação Inteligente por Pills e Teclado:** Seletor fixo superior sincronizado via `IntersectionObserver` com a seção visível, com suporte a navegação por teclado utilizando as setas direcionais (`←` e `→`).
* **Highlight Sintático Nativo e Toggle de Comentários:** Mecanismo de coloração de sintaxe em tempo real com botão para ligar/desligar os comentários explicativos do código.

---

## 💻 Recursos de Código e Arquitetura

O projeto explora técnicas modernas de desenvolvimento frontend nativo, estruturação modular e boas práticas de engenharia:

* **Arquitetura Modular em ES Modules (JavaScript):** O código do Tutorial 2 foi desacoplado em módulos independentes (`index.js`, `destaque.js`, `comentarios.js`, `navegacao.js` e `scroll.js`), garantindo clareza cirúrgica de responsabilidades, alta legibilidade e facilidade de manutenção mesmo após longos períodos sem alterações.
* **Highlight Sintático Customizado com Regex:** Motor próprio em `destaque.js` para parsing e coloração de sintaxe em tempo de execução para blocos HTML, CSS e JavaScript sem dependência de bibliotecas externas pesadas.
* **Consumo de API Externa com Fetch Assíncrono:** Utilização de `async/await` com tratamento de exceções (`try/catch`) para obter dados dinâmicos da API do GitHub.
* **Manipulação Avançada de Animações com GSAP & ScrollTrigger:** Criação de linhas do tempo (`gsap.timeline`), pinning de elementos, amarração de tempo de mídia ao scroll (`scrub`) e limpeza preventiva de memória via `ScrollTrigger.clearScrollMemory("manual")`.
* **Intersection Observer API Nativa:** Monitoramento performático de visibilidade de elementos para disparos pontuais de animação (`unobserve`) e sincronização de menu ativo com `rootMargin`.
* **Organização CSS em Múltiplas Camadas:**
  * `src/css/geral/`: `reset.css`, `variaveis.css` (centralização de cores, fontes, espaçamentos e transições) e `scroll.css` (customização de barras de rolagem).
  * Folhas específicas por contexto: `index.css`, `projeto.css`, `tutorial1.css` e `tutorial2.css`.
* **Layouts Fluidos e Acessibilidade:** Emprego semântico de tags HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`), propriedades Flexbox, CSS Grid, unidades relativas e navegação acessível por teclado.

---

## 🛠️ Stacks Utilizadas

* **HTML5:** Estruturação semântica, formulários/sliders para demos, tags multimídia (`<video>`) e vetores gráficos SVG.
* **CSS3:** Flexbox, CSS Grid, Custom Properties (Variáveis CSS), transições suaves, transformações 2D/3D, pseudo-elementos e *media queries* responsivas.
* **JavaScript (ES6+ / Vanilla JS & ES Modules):** Manipulação de DOM, Fetch API, IntersectionObserver API, modularização nativa (`import`/`export`), controle de eventos e manipulação de classes.
* **GSAP (GreenSock Animation Platform) & ScrollTrigger:** Linhas do tempo e sincronização precisa de animações atreladas à rolagem da página.
* **GitHub REST API:** Integração assíncrona para exibição dinâmica dos dados dos perfis de desenvolvedor.
* **Inteligência Artificial como Ferramenta de Refatoração:** Utilização intencional de IA para refatorar, modularizar a lógica do JavaScript e estruturar o aprendizado técnico com máxima clareza.

---

## 🎯 Contexto e Propósito Histórico

Este repositório registra o aprendizado, a consolidação técnica e o aprofundamento prático desenvolvidos a partir da **Semana do Zero ao Programador Contratado (SZPC)**, evento promovido pela escola **Dev em Dobro**.

* **A Landing Page GTA VI (`gta6-lp.html`):** Foi o projeto prático principal desenvolvido ao longo das lives da SZPC, servindo como alicerce para o domínio de estruturação HTML, estilização CSS e animações com GSAP.
* **Os Tutoriais 1 e 2 (`tutorial1.html` e `tutorial2.html`):** Foram disponibilizados pelos mentores como materiais complementares de estudo gerados com suporte de IA. Como exercício ativo de evolução técnica, o código foi totalmente **refatorado com o auxílio de IA**, tendo como propósito treinar a própria habilidade de engenharia, análise crítica e direcionamento de ferramentas de Inteligência Artificial.
* **O Desafio do Tutorial 2:** Teve destaque especial pelo processo de **modularização do JavaScript**. A lógica foi segmentada em arquivos dedicados com responsabilidades únicas e código autodocumentado, permitindo que a finalidade de cada módulo permaneça transparente e compreensível a qualquer momento futuro.
* **O HUB Central (`index.html`):** Foi criado de forma autoral para servir como central de navegação e integração do projeto. Inspirado na identidade visual do primeiro tutorial e no banner do YouTube dos mentores, ele unifica o projeto final, os materiais de estudo, os canais oficiais da Dev em Dobro e as informações do desenvolvedor.

---

### 🔗 Links e Referências

* **Desenvolvedor:** [Daniel Pessoni (GitHub)](https://github.com/danielpessoni)
* **Repositório do Projeto:** [SZPC - HUB - GTA VI](https://github.com/danielpessoni/SZPC-GTA-VI)
* **Mentores / Escola:** [Dev em Dobro (YouTube)](https://www.youtube.com/@DevemDobro) | [Instagram](https://www.instagram.com/devemdobro/)
