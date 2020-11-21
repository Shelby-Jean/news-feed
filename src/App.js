import React from 'react';
import Stories from './components/Stories';
import './App.css';

class App extends React.Component {

  constructor() {
    super()
      this.state = {
        // stories: [],
        keywordInput: '',
        authorInput: '',
        relatedStories: []
    }
  }

  // componentDidMount = () => {
  //   fetch('http://hn.algolia.com/api/v1/search?query=foo&tags=story')
  //     .then(response => response.json())
  //     .then(data => this.setState({
  //       stories: data.hits
  //     }))
  //     .catch(error => console.log(`Error, ${error}`))
  // }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  searchKeyword = (event) => {
    event.preventDefault();
    const searchItem = this.state.keywordInput;
    fetch(`http://hn.algolia.com/api/v1/search?query=${searchItem}&tags=story`)
      .then(response => response.json())
      .then(data => this.setState({
        relatedStories: data.hits,
        keywordInput: ''
      }))
      .catch(error => console.log(`Error, ${error}`))
  }

  searchAuthor = (event) => {
    event.preventDefault();
    const searchItem = this.state.authorInput;
    fetch(`https://hn.algolia.com/api/v1/search?tags=story,author_${searchItem}`)
      .then(response => response.json())
      .then(data => this.setState({
        relatedStories: data.hits,
        authorInput: ''
      }))
      .catch(error => console.log(`Error, ${error}`))
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>News Feed</h1>

          <div>
            <form onSubmit={this.searchKeyword}>
              <input 
                name="keywordInput"
                value={this.state.keywordInput} 
                onChange={this.onChange} 
                placeholder="Search by keyword"
              />
              <button type="submit">Search</button>
            </form>

            <form onSubmit={this.searchAuthor}>
              <input 
                name="authorInput"
                value={this.state.authorInput} 
                onChange={this.onChange} 
                placeholder="Search by author"
              />
              <button type="submit">Search</button>
            </form>
          </div>

          <Stories relatedStories={this.state.relatedStories} />
          
        </header>
      </div>
    )
  }
}

export default App;