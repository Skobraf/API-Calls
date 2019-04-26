import React, { Component } from 'react';
import request from 'superagent';
import GitRepo from './components/GitRepo';
import './App.css';


class App extends Component {
constructor(props) {
    super(props);
    // Sets up our initial state
    this.state = {
      error: false,
      isLoaded: false,
      items: [],
      count: 1
    };

    // Binds  scroll event handler
    window.onscroll = () => {
      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        this.setState({ count: this.state.count + 1 });
        this.loadUsers();
      }
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    let page = this.state.count;
    let jsonCall = `https://api.github.com/search/repositories?q=created:>2019-02-01&sort=stars&order=desc&per_page=100&page=${page}`;
    fetch(jsonCall)
      .then(res => res.json())
      .then(
        result => {
          const getItems = result.items.map(user => ({
            name: user.name,
            avatar: user.owner.avatar_url,
            description: user.description,
            numbIssues: user.open_issues_count,
            numbStars: user.stargazers_count,
            authorName: user.owner.login,
            timeInterval: user.created_at
          }));
          let nextUsers = getItems.sort((a, b) => b - a);
          this.setState({
            isLoaded: true,
            items: [...this.state.items, ...nextUsers]
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  render() {
    const { items } = this.state;

    return (
      <div>
        {items.map((user, i) => (
          <GitRepo key={i} user={user} />
        ))}
        
      </div>
    );
  }
}

export default App;
