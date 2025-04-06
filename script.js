"use strict";

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
};

navToggleEvent(navElemArr);
navToggleEvent(navLinks);

/**
 * header sticky
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 200) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

//////////////////////////// slider projetos /////////////////////////////////////

const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const classList = document.querySelector(".class-list");
const cards = document.querySelectorAll(".scrollbar-item");

let currentIndex = 0; // Índice do card atual

// Função para calcular a largura do card
function getCardWidth() {
  return cards[0].offsetWidth; // Largura do primeiro card
}

// Função para atualizar a posição de rolagem
function updateScrollPosition() {
  const cardWidth = getCardWidth(); // Obtém a largura do card
  const scrollPosition = currentIndex * cardWidth; // Posição do card atual

  classList.scrollTo({
    left: scrollPosition,
    behavior: "smooth", // Suaviza a rolagem
  });
}

// Evento de clique na seta da direita
rightArrow.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex >= cards.length) {
    currentIndex = 0; // Volta para o primeiro card
  }
  updateScrollPosition();
});

// Evento de clique na seta da esquerda
leftArrow.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = cards.length - 1; // Volta para o último card
  }
  updateScrollPosition();
});

// Suporte para navegação por teclado
document.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") {
    currentIndex++;
    if (currentIndex >= cards.length) {
      currentIndex = 0; // Volta para o primeiro card
    }
    updateScrollPosition();
  } else if (event.key === "ArrowLeft") {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = cards.length - 1; // Volta para o último card
    }
    updateScrollPosition();
  }
});

// Suporte para toque em dispositivos móveis
let touchStartX = 0;
let touchEndX = 0;

classList.addEventListener("touchstart", event => {
  touchStartX = event.changedTouches[0].screenX; // Captura a posição inicial do toque
});

classList.addEventListener("touchend", event => {
  touchEndX = event.changedTouches[0].screenX; // Captura a posição final do toque
  handleTouchGesture();
});

function handleTouchGesture() {
  if (touchEndX < touchStartX) {
    // Deslizar para a esquerda
    currentIndex++;
    if (currentIndex >= cards.length) {
      currentIndex = 0; // Volta para o primeiro card
    }
  } else if (touchEndX > touchStartX) {
    // Deslizar para a direita
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = cards.length - 1; // Volta para o último card
    }
  }
  updateScrollPosition();
}

// Atualiza a posição de rolagem ao redimensionar a janela
window.addEventListener("resize", updateScrollPosition);

////////////////////////// counter ////////////////////////////

document.addEventListener("DOMContentLoaded", function() {
  const counts = document.querySelectorAll(".count");
  const speed = 100; // Aumente este valor para desacelerar o contador

  counts.forEach(counter => {
    function upDate() {
      const target = Number(counter.getAttribute("data-target")); // Obtém o valor do data-target
      const count = Number(counter.innerText); // Obtém o valor atual do contador
      const inc = target / speed; // Calcula o incremento

      if (count < target) {
        counter.innerText = Math.ceil(count + inc); // Atualiza o contador
        setTimeout(upDate, 15); // Chama a função novamente após 15ms
      } else {
        counter.innerText = target; // Garante que o contador não ultrapasse o alvo
      }
    }
    upDate(); // Inicia a contagem
  });
});

////////////////// scrool to top button //////////////////////

const scrollToTopButton = document.getElementById('js-top');

const scrollFunc = () => {

    let y = window.scrollY;

    if (y > 0) {
        scrollToTopButton.className = "top-link show";
    } else {
        scrollToTopButton.className = "top-link hide";
    }
};

window.addEventListener("scroll", scrollFunc);

const scrollToTop = () => {

    const c = document.documentElement.scrollTop || document.body.scrollTop;

    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 1);
    }
};

scrollToTopButton.onclick = function (e) {
    e.preventDefault();
    scrollToTop();
}