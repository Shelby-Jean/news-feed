import React from 'react';
import SearchForm from './components/SearchForm';
import Stories from './components/Stories';
import './App.css';

class App extends React.Component {
  state = {
        keywordInput: '',
        authorInput: '',
        dateInput: '',
        dateInSeconds: '',
        relatedStories: []
  }


  handleChange = (event) => {
    const epochDate = new Date(event.target.value).getTime();
    const searchDate = epochDate.toString().slice(0,10);
    this.setState({
      [event.target.name]: event.target.value,
      dateInSeconds: searchDate
    })
  }

  search = (event) => {
    event.preventDefault();
    const keyword = this.state.keywordInput;
    const author = this.state.authorInput;
    const date = this.state.dateInSeconds;
    let url = '';

    if(keyword && author) {
      url = `https://hn.algolia.com/api/v1/search?query=${keyword}&tags=story,author_${author}`;
    } else if(keyword) {
      url = `http://hn.algolia.com/api/v1/search?query=${keyword}&tags=story`;
    } else if(author) {
      url = `https://hn.algolia.com/api/v1/search?tags=story,author_${author}`;
    } else if(date) {
      url=`http://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i>${date}`
    } else {
      alert("Please enter search criteria in at least one input");
    }

    fetch(url)
        .then(response => response.json())
        .then(data => this.setState({
          relatedStories: data.hits,
          keywordInput: '',
          authorInput: '',
        }))
        .catch(error => console.log(`Error, ${error}`))
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>News Feed</h1>
          <SearchForm 
            search={this.search} 
            handleChange={this.handleChange} 
            keywordInput={this.state.keywordInput} 
            authorInput={this.state.authorInput} 
            dateInput={this.state.dateInput} 
          />
          <Stories relatedStories={this.state.relatedStories} />
        </header>
      </div>
    )
  }
}

export default App;