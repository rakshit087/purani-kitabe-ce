import { Spinner } from "./Spinner";
import { BookCard } from "./BookCard";
import { Book } from "../types/BookType";
import { ClearButton } from "./ClearButton";
import RefreshButton from "./RefreshButton";

interface BookSearchResultsPropsI {
  applicationState: "idle" | "loading" | "success" | "error";
  books: Book[];
  searchQuery: string;
}

const BookSearchResults = ({
  applicationState,
  books,
  searchQuery,
}: BookSearchResultsPropsI) => {
  if (!applicationState) {
    return <div className="mt-4 text-lg">Waiting to find a book </div>;
  }
  switch (applicationState) {
    case "idle":
      return <div className="mt-4 text-lg">Waiting to find a book</div>;
    case "loading":
      return (
        <div className="mt-4 flex flex-col justify-center items-center">
          <p className="text-base">
            Looking for {searchQuery.substring(0, 24)}{" "}
            {searchQuery.length > 24 && "..."}
          </p>
          <Spinner className="mt-4" size={32} />
        </div>
      );

    case "success":
      return books.length > 0 ? (
        <div className="mt-4">
          <p className="text-base font-semibold mb-4">
            {searchQuery.substring(0, 24)} {searchQuery.length > 24 && "..."}
          </p>
          <div className="flex flex-row-reverse gap-4">
            <RefreshButton />
            <ClearButton />
          </div>
          {books.map((book, index) => (
            <BookCard book={book} key={index} />
          ))}
        </div>
      ) : (
        <div className="mt-4 flex justify-center items-center flex-col">
          <p className="text-base text-center mb-4">
            {searchQuery.substring(0, 24)} {searchQuery.length > 24 && "..."}{" "}
            not found!
          </p>
          <RefreshButton />
        </div>
      );
    default:
      return null;
  }
};

export default BookSearchResults;
