class Avatar {
    constructor(avatarElement) {
      this.avatar = avatarElement;
    }
    
    setBackgroundColor(color) {
      this.avatar.style.backgroundColor = color;
      return this;
    }
  }
  
  export function createAvatar(initial = 'M') {
    const div = document.createElement('div');
    div.className = 'avatar';
    div.textContent = initial.toUpperCase();
  
    return new Avatar(div);
  }
  