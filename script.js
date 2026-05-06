'use strict';

/* MENU HAMBURGUESA */

const hamburguesa = document.querySelector('.hamburguesa');
const menu = document.querySelector('.menu');

hamburguesa.addEventListener('click', () => {
  menu.classList.toggle('activo');
});

/* cerrar menú al tocar link (celular) */
const links = document.querySelectorAll('.menu a');

links.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('activo');
  });
});

/* CARRUSEL */

const grande = document.querySelector('.grande');
const imagenes = document.querySelectorAll('.grande img');

const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');

let index = 0;
const total = imagenes.length;

/* MOVER CARRUSEL */
function actualizarCarrusel(sinAnimacion = false) {
  if (sinAnimacion) {
    grande.style.transition = 'none';
  } else {
    grande.style.transition = 'transform 0.4s ease';
  }

  grande.style.transform = `translateX(-${index * 100}%)`;
}

/* SIGUIENTE */
btnNext.addEventListener('click', () => {
  index++;

  if (index >= total) {
    index = 0;
    actualizarCarrusel(true); // sin animación
  } else {
    actualizarCarrusel();
  }
 });

/* ANTERIOR */
btnPrev.addEventListener('click', () => {
  index--;

  if (index < 0) {
    index = total - 1;
    actualizarCarrusel(true);
  } else {
    actualizarCarrusel();
  }
 });

let startX = 0;
let endX = 0;

grande.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

grande.addEventListener('touchmove', (e) => {
  endX = e.touches[0].clientX;
});

grande.addEventListener('touchend', () => {
  const diff = startX - endX;

  if (Math.abs(diff) < 50) return;

  if (diff > 0) {
  index++;

  if (index >= total) {
    index = 0;
    actualizarCarrusel(true);
  } else {
    actualizarCarrusel();
  }

} else {
  index--;

  if (index < 0) {
    index = total - 1;
    actualizarCarrusel(true);
  } else {
    actualizarCarrusel();
  }
}
});

/* ANIMACION AL SCROLL */

const elementos = document.querySelectorAll('.card, .hero-texto, .hero-img, .texto-unite, .caja-form');

const observer = new IntersectionObserver((entradas) => {

  entradas.forEach(entrada => {

    if (entrada.isIntersecting) {
      entrada.target.classList.add('mostrar');
    }

  });

}, {
  threshold: 0.2
});

elementos.forEach(el => {
  observer.observe(el);
});

/* HEADER AL HACER SCROLL */

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {

  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

});