import { initLabels } from '../../atoms/Lable/index.js';
import { initInputs } from '../../atoms/Input/index.js';


document.addEventListener('DOMContentLoaded', () => {
  initLabels();
  initInputs();
  
  const emailLabel = document.querySelector('[data-label]');
  const emailInput = document.querySelector('[data-input]');

});