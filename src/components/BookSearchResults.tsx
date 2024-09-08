import { Spinner } from "./Spinner";
import { BookCard } from "./BookCard";
import { Book } from "../types/BookType";

interface BookSearchResultsPropsI {
  applicationState: "idle" | "loading" | "success" | "error";
  books: Book[];
}

const BookSearchResults = ({
  applicationState,
  books,
}: BookSearchResultsPropsI) => {
  if (!applicationState) {
    return <div className="mt-4 text-lg">Waiting to find a book</div>;
  }
  switch (applicationState) {
    case "idle":
      return <div className="mt-4 text-lg">Waiting to find a book</div>;
    case "loading":
      return <Spinner />;
    case "success":
      return books.length > 0 ? (
        books.map((book, index) => <BookCard book={book} key={index} />)
      ) : (
        <div className="mt-4 text-lg">Pre loved book not found!</div>
      );
    default:
      return null;
  }
};

export default BookSearchResults;
