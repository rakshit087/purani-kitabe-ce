import { useEffect, useState } from "react";
import { Book } from "./types/BookType";
import BookSearchResults from "./components/BookSearchResults";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [applicationState, setApplicationState] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");

  useEffect(() => {
    chrome.storage.local.get(["state"], (result) => {
      if (result.state) {
        if (result.state.applicationState) {
          setApplicationState(result.state.applicationState);
        }
        if (result.state.books) {
          setBooks(result.state.books);
        }
      }
    });
    const listener = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      console.log("changes: ", changes.state);
      if (changes.state) {
        setBooks(changes.state.newValue.books);
        setApplicationState(changes.state.newValue.applicationState);
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
      <BookSearchResults books={books} applicationState={applicationState} />
    </div>
  );
}

export default App;
