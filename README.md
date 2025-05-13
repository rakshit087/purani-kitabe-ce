# पुरानी Kitabe (Purani Kitabe)

A Chrome extension that helps users find and compare book prices across different platforms. The extension provides a user-friendly interface to search for books and view their availability and pricing information.

## Features

- Search for books across multiple platforms
- View book details including title, author, price, and cover image
- Compare prices from different sources
- Real-time price updates
- Clean and intuitive user interface
- Responsive design with Tailwind CSS

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Chrome Extension APIs

## Project Structure

```
src/
├── components/
│   ├── BookCard.tsx        # Individual book display component
│   ├── BookSearchResults.tsx # Main search results container
│   ├── ClearButton.tsx     # Clear search functionality
│   ├── RefreshButton.tsx   # Refresh data functionality
│   └── Spinner.tsx         # Loading state component
├── types/
│   └── BookType.ts         # TypeScript interfaces for book data
├── assets/                 # Static assets
├── App.tsx                 # Main application component
└── main.tsx               # Application entry point
```

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build the extension:
   ```bash
   npm run build
   ```

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select the `dist` directory from the build output

## Usage

1. Click the extension icon in your Chrome toolbar
2. Enter a book title or ISBN in the search box
3. View the results showing prices from different sources
4. Click on any result to visit the book's page on the respective platform

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
