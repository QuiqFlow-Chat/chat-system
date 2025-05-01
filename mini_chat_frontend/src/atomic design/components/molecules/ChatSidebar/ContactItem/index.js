import { createAvatar } from "../../../atoms/Avatar/index.js";

export function createContactItem({ name = '', email = '', time = '', color = '#f1416c' }) {
  const container = document.createElement('div');
  container.className = 'contact-item';

  const avatar = createAvatar(name[0] || 'U').setBackgroundColor(color);

  const details = document.createElement('div');
  details.className = 'contact-details';

  const info = document.createElement('div');
  info.className = 'contact-info';

  info.innerHTML = `
    <div class="contact-name">${name}</div>
    <div class="contact-email">${email}</div>
  `;

  details.appendChild(avatar.avatar);
  details.appendChild(info);

  const timeDiv = document.createElement('div');
  timeDiv.className = 'contact-time';
  timeDiv.textContent = time;

  container.appendChild(details);
  container.appendChild(timeDiv);

  return container;
}
