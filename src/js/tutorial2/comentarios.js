/* ============================================================
   COMENTARIOS.JS — Controle de Exibição de Comentários
   Responsabilidade: Controla a interação relacionada aos comentários
   nos blocos de código, incluindo exibição, ocultação e estados
   visuais do botão associado.
   ============================================================ */

import { processarBlocosCodigo } from "./destaque.js";

/**
 * Inicializa o controle de exibição e ocultação de comentários.
 */
export function inicializarComentarios() {
  const botaoToggle = document.getElementById("toggleCom");
  if (!botaoToggle) return;

  let comentariosLigados = true;

  botaoToggle.addEventListener("click", () => {
    // Alterna o estado booleano
    comentariosLigados = !comentariosLigados;

    // Atualiza o texto e a classe visual do botão
    botaoToggle.textContent = "Comentários: " + (comentariosLigados ? "ligados" : "desligados");
    botaoToggle.classList.toggle("ativo", comentariosLigados);

    // Re-renderiza os blocos de código com ou sem comentários
    processarBlocosCodigo(comentariosLigados);
  });
}
