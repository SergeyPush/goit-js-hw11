import './styles.css';
import menuItems from './menu.json';
import menuItemTemplate from './templates/menu-item-template.hbs';
import { saveToStorage, getThemeFromStorage } from './helpers';

// Set variables
const menuList = document.querySelector('#menu');
const themeSwitch = document.querySelector(
  "button[data-action='theme-switch']",
);
const switchButton = document.querySelector(
  "button[data-action='theme-switch'] i",
);

const defaultTheme = 'white';
document.addEventListener('DOMContentLoaded', handleDomLoad);
themeSwitch.addEventListener('click', handleClickThemeButton);

// Create markup
const markup = menuItemTemplate(menuItems);
menuList.insertAdjacentHTML('beforeend', markup);

//Set theme when page is loaded
function handleDomLoad() {
  const currentTheme = getTheme();
  updateTheme(currentTheme);
}

// Change theme when clicking on button
function handleClickThemeButton() {
  const currentTheme = getTheme();
  const newTheme = changeTheme(currentTheme);
  saveToStorage('theme', newTheme);
  updateTheme(newTheme);
}

// Get current theme or set default if storage is empty
function getTheme() {
  const currentTheme = getThemeFromStorage('theme');
  if (currentTheme) {
    return currentTheme;
  } else {
    saveToStorage('theme', defaultTheme);
    return defaultTheme;
  }
}

// Update DOM with current theme
function updateTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.remove('theme-white');
    document.body.classList.add('theme-dark');
    switchButton.textContent = 'brightness_5';
  } else {
    document.body.classList.remove('theme-dark');
    document.body.classList.add('theme-white');
    switchButton.textContent = 'brightness_3';
  }
}
// Change theme
function changeTheme(theme) {
  return theme === 'white' ? 'dark' : 'white';
}
