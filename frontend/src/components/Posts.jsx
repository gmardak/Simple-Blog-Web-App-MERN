import {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import Offcanvas from './Offcanvas';
import Form from './Form';
import Post from './Post';
import Footer from './Footer';


function CreatePost(){
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editCheck, setEditCheck] = useState(false);
  const [formPostId, setFormPostId] = useState('');
  const [formPostIdx, setFormPostIdx] = useState(undefined);
  console.log('posts');
  console.log(posts);
  const savePost = (createdPost)=>{
    setPosts((prevPosts)=>{
      return [...prevPosts, createdPost]
    });
    setTitle('');
    setBody('');
  }

  const deletePost = (postId, postIdx) =>{
    fetch('/delete', {
      method: 'POST',
      body: JSON.stringify(postId),
      headers: {
        'Content-Type':'application/json'
      }
    });
    console.log(posts);
    setPosts((prevPosts)=>{
      return [...posts.slice(0, postIdx), ...posts.slice(postIdx+1)];
    })
  }

  const editPost = (postId, postIdx, postTitle, postBody)=>{
    console.log('editPost');
    console.log(postId);
    console.log(postIdx);
    console.log(postTitle);
    console.log(postBody);
    setEditCheck(true);
    setTitle(postTitle);
    setBody(postBody);
    setFormPostId(postId)
    setFormPostIdx(postIdx)
  }

  const editForm = (postId, postIdx, postTitle, postBody)=>{
    setTitle(postTitle);
    setBody(postBody);
    console.log(editForm);
    let editedPostData = {
      postId: postId.id,
      title: postTitle,
      body: postBody
    }
    fetch('/edit', {
      method: 'POST',
      body: JSON.stringify(editedPostData),
      headers: {
        'Content-Type':'application/json'
      }
    });
    setTitle('');
    setBody('');
    setEditCheck(false);
    fetch('/read')
    .then(
      results=>{
        return results.json()})
    .then(
      data=>{
        setPosts(data)})
    .catch(err=>console.log(err));
  }

  useEffect(()=>{
    fetch('/read')
    .then(
      results=>{
        return results.json()})
    .then(
      data=>{
        setPosts(data)})
    .catch(err=>console.log(err))}, []);

  return (
    <Container fluid className='main-container vh-100 d-flex flex-column'>
      <Offcanvas />
      <Form
        id={formPostId}
        idx={formPostIdx}
        title={title}
        body={body}
        editBoolean= {editCheck}
        onCreatePost={savePost}
        onEditPost = {editForm}
        setTitle={setTitle}
        setBody={setBody}
        />
      {posts.map((post, index)=>(
        <Post
          key={post._id}
          id = {post._id}
          idx = {index}
          title = {post.title}
          body = {post.body}
          onDeletePost = {deletePost}
          onEditPost = {editPost}
        />
      ))}
      <Footer />
    </Container>
  );
}

export default CreatePost;
