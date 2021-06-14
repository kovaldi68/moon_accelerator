'use strict';

var pageHeader = document.querySelector('.page-header');
var menuToggle = document.querySelector('.page-header__toggle');
const mediaDesktop = window.matchMedia('(min-width: 1024px)');

pageHeader.classList.remove('page-header--nojs');

const onMenuHandler = (evt) => {
  evt.preventDefault();
  const headerHeight = pageHeader.offsetHeight;

  if (pageHeader.classList.contains('page-header--opened')) {
    pageHeader.classList.remove('page-header--opened')
    document.body.style.paddingTop = 0;
  } else {
    pageHeader.classList.add('page-header--opened')
    document.body.style.paddingTop = `${headerHeight}px`;
  }
};

const closeHeader = () => {
  if (mediaDesktop.matches) {
    document.body.style.paddingTop = 0;
    pageHeader.classList.remove("page-header--opened");
  }
}

menuToggle.addEventListener('click', onMenuHandler);
closeHeader();
