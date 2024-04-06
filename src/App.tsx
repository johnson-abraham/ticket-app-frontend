import React, { useState } from 'react';
import './App.css';
import { BookTicket } from './components/ticket-booking/book-ticket';
import { SearchTicket } from './components/ticket-search/search-ticket';

enum CurrentPage {
  BookTicket,
  SearchTicket,
}

function App() {
  const [currentPage, setCurrentPage] = useState(CurrentPage.BookTicket);

  return (
    <>
      <h1
        style={{
          cursor: 'pointer',
          color: currentPage === CurrentPage.BookTicket ? 'blue' : 'black',
        }}
        onClick={() => setCurrentPage(CurrentPage.BookTicket)}
      >
        Book Ticket
      </h1>
      <h1
        style={{
          cursor: 'pointer',
          color: currentPage === CurrentPage.SearchTicket ? 'blue' : 'black',
        }}
        onClick={() => setCurrentPage(CurrentPage.SearchTicket)}
      >
        Search Ticket
      </h1>
      {currentPage === CurrentPage.BookTicket ? <BookTicket /> : null}
      {currentPage === CurrentPage.SearchTicket ? <SearchTicket /> : null}
    </>
  );
}

export default App;
