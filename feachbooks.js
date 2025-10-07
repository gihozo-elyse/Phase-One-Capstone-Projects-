


async function searchBooks(query, limit = 12) {
    try {
        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${limit}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Could not fetch books');
        }
        
        const data = await response.json();
        const books = data.docs || [];
        
        // Make books simple
        const simpleBooks = books.map(book => {
            return {
                id: book.key,
                title: book.title || 'No Title',
                author: book.author_name ? book.author_name[0] : 'Unknown Author',
                year: book.first_publish_year || 'Unknown Year',
                coverId: book.cover_i
            };
        });
        
        return simpleBooks;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw new Error('Failed to search books. Try again.');
    }
}


async function getPopularBooks(limit = 12) {
    try {
        const popularTerms = ['fiction', 'science', 'history', 'romance', 'mystery'];
        const randomTerm = popularTerms[Math.floor(Math.random() * popularTerms.length)];
        
        const url = `https://openlibrary.org/search.json?q=${randomTerm}&limit=${limit}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Could not fetch books');
        }
        
        const data = await response.json();
        const books = data.docs || [];
        
        
        const simpleBooks = books.map(book => {
            return {
                id: book.key,
                title: book.title || 'No Title',
                author: book.author_name ? book.author_name[0] : 'Unknown Author',
                year: book.first_publish_year || 'Unknown Year',
                coverId: book.cover_i
            };
        });
        
        return simpleBooks;
    } catch (error) {
        console.error('Error fetching popular books:', error);
        throw new Error('Failed to load books. Try again.');
    }
}


window.searchBooks = searchBooks;
window.getPopularBooks = getPopularBooks;