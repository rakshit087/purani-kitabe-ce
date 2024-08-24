"use client";

import { Book } from "../types/BookType";

interface BookCardI {
  book: Book;
}

export function BookCard({ book }: BookCardI) {
  return (
    <div className="flex gap-4 w-full mt-8">
      <div className="min-h-[100px] min-w-[75px] rounded-xl flex justify-center items-center">
        <img src={book.bookCover} alt={book.title} width={150} height={175} />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="font-semibold">{book.title}</p>
          <p className="text-xs">By {book.author}</p>
          <p className="my-2 text-lg">₹{book.price}</p>
          <p className="text-xs">Source: {book.source || "Unknown"}</p>
          <p className="text-xs mt-1">ISBN: {book.isbn || "Unknown"}</p>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <a href={book.productUrl} target="_blank" className="w-full">
            <button className="flex-1 w-full bg-black text-white rounded-xl py-1">
              Buy
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
