import React, { Component } from 'react';
import GitRepo from './components/GitRepo';
import './App.css';


class App extends Component {
  state = {
    error:null,
    isLoaded: false,
    items:[],
    count:1,
    visible: 2
  }
  apiCall = () => {
      const jsonCall = `https://api.github.com/search/repositories?q=created:>2018-02-01&sort=stars&order=desc&page=${this.state.count}`
       fetch(jsonCall)
        .then(res => res.json())
        .then(
          (result) => {
             let sortedArray = result.items.sort((a, b) => {
              return b.stargazers_count - a.stargazers_count;
                    })

            this.setState({
              isLoaded: true,
              items: sortedArray
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
    }
  loadMore = () => {
      this.setState((prev) => {
      return {visible: prev.visible + 4};
    });
 }

  render() {
    return (
      <section>
     <div>
        {this.state.items.slice(0, this.state.visible).map((item, index) => {
          return(
            <div key={index}>
              <h1>{index}</h1>
            </div>
            )
        })}
     </div>
     {this.state.visible < this.state.items.length && 
        <button onClick={this.loadMore} type='button'>Load more</button>
     }
     <button onClick={this.apiCall} >add</button>
     </section>
    );
  }
}

export default App;
