import { createAvatar } from "../../../../atoms/Avatar/index.js";
import { UserName } from "../../../../atoms/UsarName/index.js";



export function createMessageContact({
  name = "",
  time = "",
  color = "#f1416c",
  imgSrc = null,
  reverseOrder = false,
}) {
  const container = document.createElement("div");
  container.className = "message-contact";

  // Avatar
  let avatar;
  if (imgSrc) {
    const div = document.createElement("div");
    div.className = "avatar small";
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = name;
    div.appendChild(img);
    avatar = div;
  } else {
    const avatarObj = createAvatar(name[0] || "U").setBackgroundColor(color);
    avatar = avatarObj.avatar;
    avatar.classList.add("small");
  }

  // User Details
  const userDetails = document.createElement("div");
  userDetails.className = "user-details";

  const userName = new UserName(name).render();

  const messageTime = document.createElement("div");
  messageTime.className = "message-time";
  messageTime.textContent = time;

  if (reverseOrder) {
    userDetails.appendChild(messageTime);
    userDetails.appendChild(userName);
  } else {
    userDetails.appendChild(userName);
    userDetails.appendChild(messageTime);
  }

  container.appendChild(avatar);
  container.appendChild(userDetails);

  return container;
}
