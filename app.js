'use strict';

// const { Button } = require("bootstrap");

// hover list item :

const nav = document.querySelector('.nav');

// functional code for mouseover and mouseout
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const targetLink = e.target;
    const sibiling = targetLink.closest('.nav').querySelectorAll('.nav__link');
    const logo = targetLink.closest('.nav').querySelector('img');
    sibiling.forEach(el => {
      if (el !== targetLink) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

// mouseover and mouseout in nav__link :
nav.addEventListener('mouseover', e => handleHover(e, 0.5));
nav.addEventListener('mouseout', e => handleHover(e, 1));
////////////////////////////////////////////////////////////////////////////////////////////////

// open modal : login bankist app ::
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnShowModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');

// functional close and open modal :

// open function modal :
const btnOpenModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// close function modal :
const funCloseModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// show modal :
btnShowModal.forEach(btn => btn.addEventListener('click', btnOpenModal));

// close modal :
overlay.addEventListener('click', funCloseModal);
btnCloseModal.addEventListener('click', funCloseModal);
document.addEventListener('keydown', e => {
  const keyClick = e.key;
  if (keyClick === 'Escape' && !modal.classList.contains('hidden'))
    funCloseModal();
});
///////////////////////////////////////////////////////////////////////////////////

// load section in site :

const sections = document.querySelectorAll('.section');

// functional load sections :
const loadSections = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

// observer section on scroll :

const scrollObserver = new IntersectionObserver(loadSections, {
  root: null,
  threshold: 0.15,
});

// executing :
sections.forEach(sec => {
  scrollObserver.observe(sec);
  sec.classList.add('section--hidden');
});
//////////////////////////////////////////////////////////////////////////////////////
// load images in section 1 : (load lazy images) ::

const imageLable = document.querySelectorAll('img[data-src]');

const objectObserver = {
  root: null,
  threshold: 0,
  rootMargin: '200px',
};

const lazyObserve = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const lazyObserver = new IntersectionObserver(lazyObserve, objectObserver);

imageLable.forEach(img => lazyObserver.observe(img));
////////////////////////////////////////////////////////////////////
// sllider : __ carousel : section :
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotcontainer = document.querySelector('.dots');

const maxSlide = slides.length;
let currentSlide = 0;

const createDots = function () {
  slides.forEach((_, i) => {
    dotcontainer.insertAdjacentHTML(
      'beforeend',
      `<Button class="dots__dot" data-slide="${i}"></Button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
  );
};

const nextSlide = function () {
  if (currentSlide === maxSlide - 1) currentSlide = 0;
  else currentSlide++;
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) currentSlide = maxSlide - 1;
  else currentSlide--;
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

goToSlide(currentSlide);
createDots();
activateDot(currentSlide);

btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', e => {
  const keyClick = e.key;
  if (keyClick === 'ArrowLeft') prevSlide();
  if (keyClick === 'ArrowRight') nextSlide();
});

dotcontainer.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
///////////////////////////////////////////////////////////////////////////////////
// sticky menu :
const headerLable = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const styckyMenu = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const objectSticky = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const stickyNav = new IntersectionObserver(styckyMenu, objectSticky);

stickyNav.observe(headerLable);
//////////////////////////////////////////////////////////////////////////////////
//operations sections select ::
const operations = document.querySelector('.operations__tab-container');
const containerTabs = document.querySelectorAll('.operations__content');
const tabs = document.querySelectorAll('.operations__tab');

operations.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) return;
  //remove
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  containerTabs.forEach(el =>
    el.classList.remove('operations__content--active')
  );

  //active :
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
//////////////////////////////////////////////////////////////////////////////////
