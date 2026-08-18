/* ============================================================
   INDEX.JS — Ponto de Entrada da Aplicação
   Responsabilidade: Coordena e inicializa todos os módulos
   de comportamento da interface após o carregamento do DOM.
   Não cria conteúdo nem estrutura HTML.
   ============================================================ */

import { processarBlocosCodigo } from "./destaque.js";
import { inicializarComentarios } from "./comentarios.js";
import { inicializarScroll } from "./scroll.js";
import { inicializarNavegacao } from "./navegacao.js";

/**
 * Função principal de inicialização da interface.
 */
function iniciarAplicacao() {
  // 1. Processa e aplica coloração de sintaxe aos blocos de código presentes no HTML
  processarBlocosCodigo(true);

  // 2. Inicializa os controles do botão de alternância de comentários
  inicializarComentarios();

  // 3. Inicializa os comportamentos e demonstrações interativas de scroll
  inicializarScroll();

  // 4. Inicializa os controles de navegação (pills, seção ativa e atalhos de teclado)
  inicializarNavegacao();
}

// Garante a execução somente após o DOM estar completamente carregado
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarAplicacao);
} else {
  iniciarAplicacao();
}
