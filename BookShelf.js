import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

const BookShelf = (props) => {
  
  const listOfBooks = props.books.length === 0 ? 
    <li key='empty'>Nothing to see here, please add some books</li> 
    : 
    props.books.map((book) => {
      return (
        <li key={book.id}>
          <Book book={book} onUpdateShelf={props.onUpdateShelf}/>
        </li>
      )
  })

  return(
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{props.title}</h2>
	  <div className='bookshelf-books'>
		<ol className='books-grid'>{listOfBooks}</ol>
	  </div>
    </div>
  )
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default BookShelf