import React from 'react'

const SearchForm = (props) => {
  return (
    <div>
      <form onSubmit={props.search}>
        <input 
          name="keywordInput"
          value={props.keywordInput} 
          onChange={props.onChange} 
          placeholder="Search by keyword"
        />
        <input 
          name="authorInput"
          value={props.authorInput} 
          onChange={props.onChange} 
          placeholder="Search by author"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default SearchForm;