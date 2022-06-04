import {useState} from 'react';

function retrievePosts(){
  const [posts, setPosts] = useState([]);
  fetch('/retrieve_posts')
  .then((results)=>{
    console.log(results);
    return results.josn();})
  .then((posts)=>{
    setPosts(posts)
  })
  .catch(err=>console.log(err));
}

export default retrievePosts;
