import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

const ListOfBooks = (props) => {
  
  const currentShelf = (books, shelf) => {
    return books.filter((book) => {
      return book.shelf === shelf
    })
  }
  
  const shelves = [
    { shelf: 'currentlyReading', name: 'Currently Reading' },
    { shelf: 'wantToRead', name: 'Want To Read' },
    { shelf: 'read', name: 'Read' },
  ]
  
  const listOfShelves = shelves.map((shelf) => {
    return(
      <BookShelf key={shelf.shelf} title={shelf.name} books={currentShelf(props.books, shelf.shelf)} onUpdateShelf={props.onUpdateShelf}/>
    )
  })

  return(
    <div className='list-books'>
      <div className='list-books-title'>
    	<h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
    	  {listOfShelves}
      </div>
	  <div className='open-search'>
		<Link to='/search'>Find a book</Link>
	  </div>
    </div>
  )

}

ListOfBooks.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
}

export default ListOfBooks