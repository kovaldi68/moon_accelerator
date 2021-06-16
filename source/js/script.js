'use strict';

const pageHeader = document.querySelector('.page-header');
const menuToggle = document.querySelector('.page-header__toggle');
const mediaDesktop = window.matchMedia('(min-width: 1024px)');
const anchors = document.querySelectorAll('a[href*="#"]');
const submitButton = document.querySelector('.button--submit');
const body = document.body;
const nameInput = document.querySelector('.form__input--name');
const phoneInput = document.querySelector('.form__input--phone');

const ALERT_SHOW_TIME = 3000;


pageHeader.classList.remove('page-header--nojs');

const onSubmitButtonHandler = function() {

  if (isStorageSupport) {
    localStorage.setItem('userName', nameInput.value);
    localStorage.setItem('userPhone', phoneInput.value);
  }
}

const showAlert = (message, color) => {
  const alertContainer = document.createElement('div');

  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.color = 'white';
  alertContainer.style.padding = '16px 3px';
  alertContainer.style.fontSize = '15px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = color;

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

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

const scrollSmooth = () => {
  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const blockID = anchor.getAttribute('href').substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    })
  }
}

//localStorage

let isStorageSupport = true;
let storageName = '';
let storagePhone = '';

try {
  storageName = localStorage.getItem('userName');
  storagePhone = localStorage.getItem('userPhone');
} catch (err) {
  isStorageSupport = false;
}

const storageData = () => {
  if (storageName && storagePhone) {
    nameInput.value = storageName;
    phoneInput.value = storagePhone;
  }
}

submitButton.addEventListener('click', onSubmitButtonHandler);
menuToggle.addEventListener('click', onMenuHandler);
closeHeader();
scrollSmooth();
storageData();
