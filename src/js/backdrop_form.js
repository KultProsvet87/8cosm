import IMask from 'imask';
import axios from 'axios';
const phoneInput = document.getElementById('forn__tel');
const nameInput = document.getElementById('form_name');

const maskForNameField = IMask(nameInput, {
  mask: /^[a-zA-Zа-яА-ЯЇїІіЄєЫыЁё\s\']+$/,
});

const maskOptions = {
  mask: '+00(000)000-00-00',
  lazy: false,
  placeholderChar: 'X',
};
const mask = IMask(phoneInput, maskOptions);

const formPopUpBacdrop = document.querySelector('.backdrop');
const formPopUpOpenClose = document.querySelectorAll('.js-formPopUp');
const header = document.querySelector('header');
const mobMenuBtnModalFormOpen = document.querySelector('.mob_menu_btn');
const mobMenuEl = document.querySelector('.mob_menu');

mobMenuBtnModalFormOpen.addEventListener('click', () => {
  formPopUpBacdrop.classList.toggle('is-hidden');
  mobMenuEl.classList.toggle('is-hidden');
  header.classList.toggle('is-hidden');
});

const handleClick = () => {
  formPopUpBacdrop.classList.toggle('is-hidden');
  document.body.classList.toggle('scroll_lock');
  header.classList.toggle('is-hidden');
};

formPopUpOpenClose.forEach(btn => btn.addEventListener('click', handleClick));

const formPopUp = document.querySelector('.form_popUp');
const formFeedbackSection = document.querySelector('.form');

const handleSubmit = async e => {
  e.preventDefault();
  const { phone, name } = e.currentTarget;
  const nameField = e.target.elements.name;
  const phoneField = e.target.elements.phone;
  const regExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

  if (nameField.value === '' || !regExp.test(phoneField.value)) {
    return;
  }

  if (
    nameField.classList.contains('is-invalid') ||
    phoneField.classList.contains('is-invalid')
  ) {
    return;
  }
  const message = `<b><i>Ім'я:</i></b> ${name.value}%0A<b><i>Телефон:</i></b> <i>${phone.value}</i>`;

  await fetchMessage(message);
};
async function fetchMessage(message) {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot5840078401:AAE4S72HncySMPCNH2I-fUunf3-7RSts6d8/sendMessage?chat_id=-1001508491750&parse_mode=html&text=${message}`
    );
    window.location.href = './thx.html';
  } catch (error) {
    console.log(error.message);
  }
}

formPopUp.addEventListener('submit', handleSubmit);
formFeedbackSection.addEventListener('submit', handleSubmit);
