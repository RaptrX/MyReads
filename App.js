import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import * as BooksApi from './BooksAPI'
import ListOfBooks from './ListOfBooks'
import SearchBooks from './SearchBooks'

// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksApi.getAll().then((allBooks) => {
      this.setState(() => ({
        books: allBooks,
      }))
    })
  }

  handleUpdateShelf = (book, shelf)=> {
    const idx = this.state.books.indexOf(book)
    const booksUpdated = [...this.state.books]
    
    if (shelf === 'none') {
      booksUpdated.splice(idx,1)
    } else if (book.shelf === 'none'){
      const bookUpdated = { ...book, shelf }
      booksUpdated.push(bookUpdated)
    } else {
      const bookUpdated = { ...book, shelf }
      booksUpdated[idx] = bookUpdated
    }
    
    BooksApi.update(book, shelf).then(() => {
      this.setState(() => ({
        books: booksUpdated,
      }))
    })
  }

  render(){
    return(
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
    	<div className='app'>
    	  <Route exact path='/' render={() => (
            <ListOfBooks books={this.state.books} onUpdateShelf={this.handleUpdateShelf}/>
          )} />
		  <Route path='/search' render={() => (
            <SearchBooks books={this.state.books} onUpdateShelf={this.handleUpdateShelf}/>
          )}/>
    	</div>
      </BrowserRouter>
    )
  }
  
}

export default BooksApp
