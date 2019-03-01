import React, { Component } from 'react';
import GitRepo from './components/GitRepo';
import './App.css';


class App extends Component {
  state = {
    error:null,
    isLoaded: false,
    items:[]
  }
  apiCall = () => {
       fetch('https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc')
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.items
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
        console.log(result.items)
    }

  render() {
    return (
     <div>
        <GitRepo />
        <button onClick={this.apiCall}>add</button>
     </div>
    );
  }
}

export default App;
