import React from 'react';
import SearchForm from './components/SearchForm';
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

  search = (event) => {
    event.preventDefault();
    const keyword = this.state.keywordInput;
    const author = this.state.authorInput;
    let url = '';

    if(keyword && author) {
      url = `https://hn.algolia.com/api/v1/search?query=${keyword}&tags=story,author_${author}`;
    } else if(keyword) {
      url = `http://hn.algolia.com/api/v1/search?query=${keyword}&tags=story`;
    } else if(author) {
      url = `https://hn.algolia.com/api/v1/search?tags=story,author_${author}`;
    } else {
      alert("Please enter search criteria in at least one input");
    }

    fetch(url)
        .then(response => response.json())
        .then(data => this.setState({
          relatedStories: data.hits,
          keywordInput: '',
          authorInput: ''
        }))
        .catch(error => console.log(`Error, ${error}`))
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>News Feed</h1>
          <SearchForm search={this.search} onChange={this.onChange} keywordInput={this.state.keywordInput} authorInput={this.state.authorInput} />
          <Stories relatedStories={this.state.relatedStories} />
        </header>
      </div>
    )
  }
}

export default App;