import { useEffect, useState } from "react";
import { Book } from "./types/BookType";
import { BookCard } from "./components/BookCard";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    chrome.storage.local.get(["books"], (result) => {
      if (result.books) {
        setBooks(result.books);
        chrome.action.setBadgeText({ text: "" });
      }
    });
    const listener = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes.books) {
        setBooks(changes.books.newValue);
      }
    };
    chrome.storage.onChanged.addListener(listener);
    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }, []);
  return (
    <div className="min-w-80 flex flex-col justify-center items-center py-4 px-4">
      <h1 className="text-3xl font-bold underline">पुरानी Kitabe</h1>
      {books ? (
        books.map((book, index) => {
          return <BookCard book={book} key={index} />;
        })
      ) : (
        <div className="mt-4">No Books found!</div>
      )}
    </div>
  );
}

export default App;
