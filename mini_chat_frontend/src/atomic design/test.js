import { createChatSidebar } from "./components/organisms/Chat/Sidebar/index.js";

const randomColor= ['#4cd964','#5ac8fa','#ff2d55','#bb86fc','#007aff']
const contacts = [
  {
    name: 'Melody Macy',
    email: 'melody@altbox.com',
    time: '20 hrs',
    color: randomColor[Math.floor(Math.random() * randomColor.length)]
  },
  {
    name: 'Farah N.',
    email: 'farah@domain.com',
    time: '5 hrs',
    color: randomColor[Math.floor(Math.random() * randomColor.length)]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = createChatSidebar(contacts);
  document.getElementById('apptest').appendChild(sidebar);
});
