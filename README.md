# 📚 Book Odyssey

A modern, responsive web application for discovering, searching, and managing your favorite books using the Open Library API.



##  Features

- **   Book Discovery**: Browse popular books from various genres
- **  Smart Search**: Search for books by title, author, or subject
- **  Favorites Management**: Save your favorite books to a personal collection
- **  Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ** Book Reader**: View book details and read books directly through Open Library
- ** Modern UI**: Beautiful gradient design with smooth animations
- ** Local Storage**: Favorites are saved locally in your browser

##  Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (to fetch books from Open Library API)

### Installation

1. Clone or download this repository to your local machine
2. Navigate to the project directory
3. Open `index.html` in your web browser

```bash






## 📁 Project Structure

```
book-odyssey/
│
├── index.html              # Home page with book search and display
├── favorites.html          # Favorites page showing saved books
├── about.html             # About page
├── feachbooks.js          # API functions for fetching books
│
├── js/
│   ├── app.js             # Main application logic and book reader
│   ├── favorites.js       # Favorites management functionality
│   └── about.js           # About page functionality
│
└── README.md              # Project documentation
```

## 🎯 How to Use

### Home Page

1. **Browse Popular Books**: The home page automatically loads popular books when you visit
2. **Search for Books**: 
   - Enter a book title, author name, or subject in the search bar
   - Press Enter or click the Search button
   - Results will display in a responsive grid
3. **Read a Book**: Click the blue "Read Book" button to view book details and access the full book on Open Library
4. **Add to Favorites**: Click the yellow "Add to Favorites" button to save a book to your collection

### Favorites Page

1. Navigate to the Favorites page from the sidebar menu
2. View all your saved books in a compact grid layout
3. **Read Book**: Click the blue button to view book details
4. **Remove**: Click the red button to remove a book from your favorites

### Book Reader

When you click "Read Book":
- A modal opens with book information
- View the book's description, publication date, and subjects
- Click "Read on Open Library" to access the full book text
- Close the modal by clicking the X or Close button

## 🛠️ Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with Tailwind CSS
- **JavaScript (ES6+)**: Application logic and interactivity
- **Tailwind CSS**: Utility-first CSS framework via CDN
- **Open Library API**: Book data and information
- **Local Storage API**: Persistent favorites storage

## 📡 API Reference

This project uses the [Open Library API](https://openlibrary.org/developers/api):

- **Search Books**: `https://openlibrary.org/search.json?q={query}`
- **Book Details**: `https://openlibrary.org/works/{id}.json`
- **Book Covers**: `https://covers.openlibrary.org/b/id/{cover_id}-{size}.jpg`

## 🎨 Features in Detail

### Responsive Grid Layout
- **Mobile**: 2 columns
- **Small tablets**: 3 columns
- **Medium screens**: 4 columns
- **Large screens**: 5 columns
- **Extra large screens**: 6 columns

### Book Cards
- Compact design with book cover images
- Title, author, and publication year
- Hover effects for better interactivity
- Two action buttons: Read and Add to Favorites

### Search Functionality
- Real-time search with Enter key support
- Loading spinner during API requests
- Error handling with user-friendly messages
- Empty state when no results found

### Favorites System
- Persistent storage using browser's Local Storage
- Add/remove books with confirmation
- Displays date when book was added
- Automatic page refresh after changes

## 🔧 Customization

### Changing Colors

The project uses Tailwind CSS classes. Main colors used:
- **Primary**: Yellow (`yellow-600`, `yellow-700`)
- **Secondary**: Blue (`blue-600`, `blue-700`)
- **Accent**: Gray shades for backgrounds
- **Danger**: Red (`red-600`, `red-700`)

### Modifying Book Limits

In `feachbooks.js`, you can change the number of books fetched:

```javascript
// Default is 12 books
async function getPopularBooks(limit = 12) { ... }
async function searchBooks(query, limit = 12) { ... }
```

##  Troubleshooting

### Books Not Loading
- Check your internet connection
- Open browser console (F12) to see any error messages
- Ensure `feachbooks.js` is loaded correctly

### Favorites Not Saving
- Check if Local Storage is enabled in your browser
- Clear browser cache and try again
- Check browser console for errors

### Images Not Displaying
- Some books may not have cover images
- Placeholder images will be shown automatically
- Check if the Open Library CDN is accessible

##  Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

##  Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

##  License

This project is open source and available under the [MIT License](LICENSE).

##  Acknowledgments

- **Open Library**: For providing the free book API
- **Tailwind CSS**: For the utility-first CSS framework
- **Open Source Community**: For inspiration and resources

##  Contact

For questions or feedback, please open an issue in the repository.

---

**Built with  using Open Library API**

*"Through reading comes knowledge, through knowledge comes journey - guided by the most loyal friend called: a book."*
