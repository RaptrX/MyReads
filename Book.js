import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
  }

  state = {
    shelf: this.props.book.shelf ? this.props.book.shelf : 'none',
  }

  handleChangeShelf = (event) => {
    this.props.onUpdateShelf(this.props.book, event.target.value)
    
    this.setState(() => ({
      shelf: event.target.value,
    }))
    
  }

  render() {
    const authors = this.props.book.authors.length === 0 ? [] : this.props.book.authors
    const image = 'url(' + this.props.book.imageLinks.thumbnail + ')'
    
    return(
      <div className='book'>
    	<div className='book-top'>
    	  <div className='book-cover' style={{backgroundImage:image}}>
		  </div>
		  <div className='book-shelf-changer'>
			<select value={this.state.shelf} onChange={this.handleChangeShelf}>
			  <option value='disabled' disabled>Move book to</option>
			  <option value='currentlyReading'>Currently Reading</option>
			  <option value='wantToRead'>Want to Read</option>
			  <option value='read'>Read</option>
			  <option value='none'>None</option>
			</select>
		  </div>
    	</div>
		<div className='book-title'>{this.props.book.title}</div>
		<div className='book-authors'>
		  {authors.map((author) => {
            return <div>{author}</div>
          })}
        </div>
      </div>
    )
  }
  
}

export default Book