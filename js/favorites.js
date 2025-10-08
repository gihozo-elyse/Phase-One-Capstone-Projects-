
document.addEventListener('DOMContentLoaded', () => {
    setupMenu();
    loadFavorites();
});


function setupMenu() {
    const menuButton = document.getElementById('mobileMenuButton');
    const closeButton = document.getElementById('closeMenu');
    const sidebar = document.getElementById('sidebar');
    
    if (menuButton) {
        menuButton.onclick = () => {
            sidebar.classList.add('open');
        };
    }
    
    if (closeButton) {
        closeButton.onclick = () => {
            sidebar.classList.remove('open');
        };
    }
}


function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const container = document.getElementById('favoritesContainer');
    const empty = document.getElementById('emptyState');
    
    if (favorites.length === 0) {
        container.style.display = 'none';
        empty.style.display = 'block';
        return;
    }
    
    empty.style.display = 'none';
    container.style.display = 'grid';
    
    const html = favorites.map(book => makeFavoriteCard(book)).join('');
    container.innerHTML = html;
}

function makeFavoriteCard(book) {
    const addedDate = new Date(book.addedAt).toLocaleDateString();
    
    return `<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
        <div class="aspect-[2/3] overflow-hidden">
            <img src="${book.coverUrl}" alt="${book.title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
        </div>
        <div class="p-2">
            <h3 class="font-semibold text-gray-800 text-sm mb-1 line-clamp-2" title="${book.title}">${book.title}</h3>
            <p class="text-gray-600 text-xs mb-1 line-clamp-1">${book.author}</p>
            <p class="text-gray-500 text-xs mb-2">Added: ${addedDate}</p>
            <div class="flex flex-col gap-1">
                <button onclick="readBook('${book.key}')" class="w-full bg-gray-700 hover:bg-gray-900 text-white px-2 py-1.5 rounded text-xs font-medium transition-colors">Read Book</button>
                <button onclick="removeFromFavorites('${book.key}')" class="w-full bg-yellow-600 hover:bg-yellow-700 text-black px-2 py-1.5 rounded text-xs font-medium transition-colors">Remove</button>
            </div>
        </div>
    </div>`;
}


function removeFromFavorites(key) {
    if (!confirm('Remove this book from favorites?')) {
        return;
    }
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorites = favorites.filter(book => book.key !== key);
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    loadFavorites();
}

