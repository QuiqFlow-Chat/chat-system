import { createContactItem } from "./components/molecules/ChatSidebar/ContactItem/index.js";

document.addEventListener('DOMContentLoaded', () => {
  const contact = createContactItem({
    name: 'Melody Macy',
    email: 'melody@altbox.com',
    time: '20 hrs',
    color: '#4caf50'
  });

  document.getElementById('apptest').appendChild(contact);
});