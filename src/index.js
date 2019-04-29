import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import GitRepo from "./components/GitRepo";
import "./styles.css";

const App = props => {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleScroll = () => {
    window.onscroll = () => {
      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setCount(prev => prev + 1);
        loadUsers();
      }
    };
  };

  let loadUsers = () => {
    setIsLoaded(true);
    let page = count;
    let jsonCall = `https://api.github.com/search/repositories?q=created:>2019-03-26&sort=stars&order=desc&per_page=20&page=${page}`;
    fetch(jsonCall)
      .then(res => res.json())
      .then(result => {
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
        setItems(prev => [...prev, ...nextUsers]);
      })
      .catch(err => {
        console.log(err);
        setIsLoaded(false);
      });
  };
  useEffect(() => {
    loadUsers();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {items.map((user, i) => (
        <GitRepo key={i} user={user} />
      ))}
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
