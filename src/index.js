import {nanoid} from 'nanoid';
import'material-icons/iconfont/material-icons.css';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Lodash from 'lodash.throttle';
import './sass/main.scss';

import { getRefs } from './js/getRefs';
import { renderMarkup } from './js/renderMarkup';
import * as Storage from './js/storage';

const LS_KEY = 'contacts';
const {formSearch, modalForm, contactsList} = getRefs();
const notyf = new Notyf();

init();
modalForm.addEventListener('submit', onSubmit);
formSearch.addEventListener('input', lodach(onSearch, 500));
contactsList.addEventListener('click', onDelete);

function init() {
  const contactsFromLS = Storage.load(LS_KEY);

  if (contactsFromLS) {
    renderMarkup(contactsFromLS, contactsList);
  }
};

function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(modalForm);

  const name = formData.get('name').trim();
  const phone = formData.get('phone').trim();
  const email = formData.get('email').trim();

  if (!name || !phone || !email) return notyf.error('Заповніть всі поля');

  const newContact = {
    id: nanoid(),
    name,
    phone,
    email,
  };

  const contacts = Storage.load(LS_KEY) ?? [];
  Storage.save(LS_KEY, [...contacts, newContact]);

  contacts.push(newContact);
  renderMarkup(contactsFromLS, contactsList);

  modalForm.reset();
};

function onSearch(e) {
  const searchValue = e.target.value.toLowerCase().trim();
  const contacts = Storage.load(LS_KEY);
  if (contacts) {
    const parseContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchValue))
  }
  renderMarkup(contactsFromLS, contactsList);
};

function onDelete(e) {
  const currentIndex = e.target.dataset.id;
  const contacts = Storage.load(LS_KEY);

  if (!currentIndex) return;

  if (contacts) {
    const updatedContacts = contacts.filter(
      contact => contact.id !== currentIndex,
    );
    Storage.save(LS_KEY, [...updatedContacts]);
    renderMarkup(updatedContacts, contactsList);
  }
};
