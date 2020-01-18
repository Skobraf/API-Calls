import {useState, useEffect, useRef} from 'react';
export const useFetch = (url,handleScroll) => {
    const isCurrent = useRef(true);
    const [items, setItems] = useState({items: [], loading: true});
    const date = new moment(new Date()).subtract(1, "months");
    const dateFormat = date.format("YYYY-MM-DD");

    useEffect(() => {
        return () => {
            isCurrent.current = false;
        }
    }, [])
    
    useEffect(() => {
        setItems( state => ({ items: state.items, loading: true }));
        fetch(url)
            .then(res = res.json())
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
                      setItems(prev => [...prev, ...getItems]);
                })
                .catch(err => {
                    setItems(state => ({items: state.items, loading: false}))
                });
                window.addEventListener("scroll", handleScroll);
                return () => window.removeEventListener("scroll", handleScroll);
    }, [url,setItems]);
    
    return items;
}
