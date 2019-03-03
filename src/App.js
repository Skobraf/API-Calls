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
      hasMore: true,
      isLoading: false,
      items: [],
      count: 1
    };

    // Binds our scroll event handler
    window.onscroll = () => {
      const {
        loadUsers,
        state: { error, isLoading, hasMore }
      } = this;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        this.setState({ count: this.state.count + 1 });
        loadUsers();
        console.log("finished");
      }
    };
  }

  componentWillMount() {
    // Loads some users on initial load
    this.loadUsers();
  }

  loadUsers = () => {
    let p = this.state.count;
    let jsonCall = `https://api.github.com/search/repositories?q=created:>2019-02-01&sort=stars&order=desc&per_page=20&page=${p}`;
    console.log(jsonCall);
    fetch(jsonCall)
      .then(res => res.json())
      .then(
        result => {
          const getItems = result.items.map(user => {
            return (
               {
            name: user.name,
            avatar: user.owner.avatar_url,
            description: user.description,
            numbIssues: user.open_issues_count,
            numbStars: user.stargazers_count,
            authorName:user.owner.login,
            timeInterval: user.created_at
          }
              )
          }
          );
          let nextUsers = getItems.sort((a,b) => {
            return b - a;
          });
          console.log(nextUsers);
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
    const { error, hasMore, isLoading, items } = this.state;

    return (
      <div>
        {items.map((user, i) => (
            <GitRepo 
            key={i}
            user={user}
            />
        ))}
      </div>
    );
  }
}

export default App;
