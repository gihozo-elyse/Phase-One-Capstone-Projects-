// Simple book search app

// When page loads
document.addEventListener('DOMContentLoaded', () => {
    setupMenu();
    setupSearch();
});
// Menu stuff
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

// Search stuff
function setupSearch() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    
    if (searchButton) {
        searchButton.onclick = performSearch;
    }
    
    if (searchInput) {
        searchInput.onkeypress = (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        };
    }
    
    // Load some popular books when page loads
    loadPopularBooks();
}

// Load popular books
async function loadPopularBooks() {
    try {
        const books = await window.getPopularBooks(12);
        showBooks(books);
    } catch (error) {
        console.error('Error loading popular books:', error);
    }
}

// Search for books
async function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (!query) return;
    
    showLoading();
    hideError();
    hideEmpty();
    
    try {
        const books = await window.searchBooks(query, 20);
        showBooks(books);
    } catch (error) {
        console.error('Search error:', error);
        showError('Could not find books. Try again.');
    } finally {
        hideLoading();
    }
}

// Show books on page
function showBooks(books) {
    const booksGrid = document.getElementById('booksGrid');
    
    console.log('Books received:', books);
    
    if (books.length === 0) {
        showEmpty();
        return;
    }
    
    const html = books.map(book => makeBookCard(book)).join('');
    booksGrid.innerHTML = html;
    console.log('Books displayed:', books.length);
}

// Make one book card
function makeBookCard(book) {
    const coverId = book.coverId;
    let coverUrl = 'https://via.placeholder.com/150x200?text=No+Cover';
    
    if (coverId) {
        coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-S.jpg`;
    }
    
    const title = book.title || 'No Title';
    const author = book.author || 'Unknown Author';
    const year = book.year || 'Unknown Year';
    const key = book.id;
    
    return `<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
        <div class="aspect-[2/3] overflow-hidden">
            <img src="${coverUrl}" alt="${title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
        </div>
        <div class="p-2">
            <h3 class="font-semibold text-gray-800 text-sm mb-1 line-clamp-2" title="${title}">${title}</h3>
            <p class="text-gray-600 text-xs mb-1 line-clamp-1">${author}</p>
            <p class="text-gray-500 text-xs mb-2">${year}</p>
            <div class="flex flex-col gap-1">
                <button onclick="readBook('${key}')" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-2 py-1.5 rounded text-xs font-medium transition-colors">Read Book</button>
                <button onclick="addToFavorites('${key}', '${title}', '${author}', '${coverUrl}')" class="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1.5 rounded text-xs font-medium transition-colors">Add to Favorites</button>
            </div>
        </div>
    </div>`;
}

// Add book to favorites
function addToFavorites(key, title, author, coverUrl) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    // Check if already there
    const alreadyExists = favorites.some(fav => fav.key === key);
    if (alreadyExists) {
        alert('Already in favorites!');
        return;
    }
    
    const book = {
        key,
        title,
        author,
        coverUrl,
        addedAt: new Date().toISOString()
    };
    
    favorites.push(book);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Show success
    const button = event.target;
    const oldText = button.textContent;
    button.textContent = 'Added!';
    button.style.backgroundColor = '#16a34a';
    
    setTimeout(() => {
        button.textContent = oldText;
        button.style.backgroundColor = '';
    }, 2000);
}

// Show/hide loading
function showLoading() {
    const spinner = document.getElementById('loadingSpinner');
    const grid = document.getElementById('booksGrid');
    
    if (spinner) spinner.classList.remove('hidden');
    if (grid) grid.innerHTML = '';
}

function hideLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) spinner.classList.add('hidden');
}

// Show/hide error
function showError(message) {
    const error = document.getElementById('errorMessage');
    if (error) {
        error.textContent = message;
        error.classList.remove('hidden');
    }
}

function hideError() {
    const error = document.getElementById('errorMessage');
    if (error) error.classList.add('hidden');
}

// Show/hide empty state
function showEmpty() {
    const empty = document.getElementById('emptyState');
    if (empty) empty.classList.remove('hidden');
}

function hideEmpty() {
    const empty = document.getElementById('emptyState');
    if (empty) empty.classList.add('hidden');
}

// Read book functionality
async function readBook(bookKey) {
    try {
        // Show loading state
        const loadingModal = createLoadingModal();
        document.body.appendChild(loadingModal);
        
        // Fetch book details from Open Library
        const response = await fetch(`https://openlibrary.org${bookKey}.json`);
        if (!response.ok) throw new Error('Could not load book');
        
        const bookData = await response.json();
        
        // Remove loading modal
        loadingModal.remove();
        
        // Create and show reader modal
        const readerModal = createReaderModal(bookData);
        document.body.appendChild(readerModal);
        
    } catch (error) {
        console.error('Error reading book:', error);
        alert('Unable to open book reader. This book may not be available for reading.');
    }
}

// Create loading modal
function createLoadingModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-8 text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-gray-700">Loading book...</p>
        </div>
    `;
    return modal;
}

// Create reader modal
function createReaderModal(bookData) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
    modal.id = 'readerModal';
    
    const title = bookData.title || 'Unknown Title';
    const description = bookData.description?.value || bookData.description || 'No description available for this book.';
    const subjects = bookData.subjects?.slice(0, 5).join(', ') || 'No subjects listed';
    const publishDate = bookData.first_publish_date || 'Unknown';
    
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 flex justify-between items-center">
                <h2 class="text-xl font-bold">${title}</h2>
                <button onclick="closeReader()" class="text-white hover:text-gray-200 text-2xl font-bold">&times;</button>
            </div>
            
            <div class="p-6 overflow-y-auto flex-1">
                <div class="mb-4">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">About this book</h3>
                    <p class="text-gray-700 leading-relaxed">${description}</p>
                </div>
                
                <div class="mb-4">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Details</h3>
                    <p class="text-gray-600"><strong>First Published:</strong> ${publishDate}</p>
                    <p class="text-gray-600"><strong>Subjects:</strong> ${subjects}</p>
                </div>
                
                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                    <p class="text-sm text-gray-700">
                        <strong>Note:</strong> Full text reading is available through Open Library. 
                        <a href="https://openlibrary.org${bookData.key}" target="_blank" class="text-blue-600 hover:underline">
                            Click here to read the full book on Open Library
                        </a>
                    </p>
                </div>
            </div>
            
            <div class="bg-gray-100 p-4 flex justify-end gap-2">
                <a href="https://openlibrary.org${bookData.key}" target="_blank" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors">
                    Read on Open Library
                </a>
                <button onclick="closeReader()" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded font-medium transition-colors">
                    Close
                </button>
            </div>
        </div>
    `;
    
    return modal;
}

// Close reader modal
function closeReader() {
    const modal = document.getElementById('readerModal');
    if (modal) modal.remove();
}

