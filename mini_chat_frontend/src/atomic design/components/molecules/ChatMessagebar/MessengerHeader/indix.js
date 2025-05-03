import { UserName } from "../../../atoms/UsarName/index.js";

export function createMessengerHeader({ name = "Unknown", status = "Active" }) {
  const header = document.createElement("div");
  header.className = "messenger-header";

  const userNameElement = new UserName(name).render();
  userNameElement.classList.add("user-name-title"); 

  header.innerHTML = `
    <div class="messenger-title">
      <div class="active-user">
        ${userNameElement.outerHTML}
        <div class="user-status">
          <span class="status-indicator active"></span>
          <span class="status-text">${status}</span>
        </div>
      </div>
    </div>
    <div class="messenger-toolbar">
      <div class="dropdown-menu">
        <button class="menu-trigger">
          <i class="fa-solid fa-ellipsis"></i>
        </button>
      </div>
    </div>
  `;

  return header;
}
