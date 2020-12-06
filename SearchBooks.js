import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksApi from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
  
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
  }

  state = {
    searchTerm: '',
    searchResults: [],
  }

  searchBooks = () => {
    BooksApi.search(this.state.searchTerm, 20).then(
      searchResults => {
        const results = searchResults.map(result => {
          const idx = this.props.books.find(book => {
            return book.id === result.id
          })
          
          if (idx !== undefined){
            return idx
          } else {
            return { ...result, shelf: 'none'}
          }
        })
        return results
      }).then(searchResults => {
      this.setState(() => ({
        searchResults: searchResults,
      }))
    }).catch(() => {
        this.setState(() => ({
          searchResults: [],
        }))
      })
  }

  handleSearchChange = event => {
    const searchTerm = event.target.value
    
    this.setState(() => ({
      searchTerm: searchTerm,
    }))
    
    if (searchTerm.length > 1){
      this.searchBooks()
    } else {
      this.setState(() => ({
        searchResults: [],
      }))
    }
  }

  render() {
    const listOfBooks = this.state.searchResults.length === 0 ? 
    <li key='none'>Nothing Found, please edit your search</li>
    :
    this.state.searchResults.map(book => {
      return(
    	<li key={book.id}>
		  <Book book={book} onUpdateShelf={this.props.onUpdateShelf}/>
		</li>
      )
    })
    return(
      <div className='searchBooks'>
      	<div className='search-books-bar'>
      	  <Link className='close-search' to='/'>Exit</Link>
      	  <div className='search-books-input-wrapper'>
      		<input type='text' onChange={this.handleSearchChange} value={this.state.searchTerm} placeholder='Enter term to search for'/>
      	  </div>
      	</div>
		<div className='search-books-results'>
		  <ol className='books-grid'>{listOfBooks}</ol>
		</div>
      </div>
    )
  }
}

export default SearchBooks