export function createContactsHeader() {
    const container = document.createElement('div');
    container.className = 'contacts-header';
  
    container.innerHTML = `
    <div class="search-container">
        <span class="search-icon">
            <i class="fa-solid fa-magnifying-glass"></i>
        </span>
        <input type="text" class="search-input" placeholder="Search by username or email...">
    </div>
    `;
    return container;
  }
  