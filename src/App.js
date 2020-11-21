import React from 'react';
import Stories from './components/Stories';
import './App.css';

class App extends React.Component {

  constructor() {
    super()
      this.state = {
        stories: [],
        input: '',
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
      input: event.target.value
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    const searchItem = this.state.input;
    fetch(`http://hn.algolia.com/api/v1/search?query=${searchItem}&tags=story`)
      .then(response => response.json())
      .then(data => this.setState({
        relatedStories: data.hits
      }))
      .catch(error => console.log(`Error, ${error}`))
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>News Feed</h1>
          <form onSubmit={this.onSubmit}>
            <input value={this.state.input} onChange={this.onChange} placeholder="Search by keyword"/>
            {/* <input value={this.state.input} onChange={this.onChange} placeholder="Search by author"/>
            <input value={this.state.input} onChange={this.onChange} placeholder="Search by keyword"/> */}
            <button type="submit">Search</button>
          </form>
          <Stories relatedStories={this.state.relatedStories} />
        </header>
      </div>
    )
  }
}

export default App;

