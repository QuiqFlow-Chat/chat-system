import { createContactItem } from "../../../molecules/ChatSidebar/ContactItem/index.js";
import { createContactsHeader } from "../../../molecules/ChatSidebar/Search/index.js";

export function createChatSidebar(contacts = []) {
  const sidebar = document.createElement('div');
  sidebar.className = 'chat-sidebar';

  const card = document.createElement('div');
  card.className = 'contacts-card';

  // Header
  const header = createContactsHeader();
  card.appendChild(header);

  // Body
  const body = document.createElement('div');
  body.className = 'contacts-body';

  const list = document.createElement('div');
  list.className = 'contacts-list';

  // Add contact items
  contacts.forEach(contact => {
    const contactItem = createContactItem(contact);
    list.appendChild(contactItem);
  });

  body.appendChild(list);
  card.appendChild(body);
  sidebar.appendChild(card);

  return sidebar;
}
