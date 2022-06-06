import express, {Application, Request, Response} from 'express';
import {MongoClient, ObjectId} from 'mongodb';
import {validate, Length,} from 'class-validator';
import bodyParser from 'body-parser';
import path from 'path';
import {Post} from './post-validator';
require('dotenv').config();

// export class Post {
//   @Length(1, 50)
//   title: string;
//
//   @Length(1, 1000)
//   body: string;
// }

const uri = `mongodb+srv://${process.env.MONGODB_ID}:${process.env.MONGODB_PASSWORD}@cluster0.updhw.mongodb.net/postDB`;
// const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
client.connect();
const database = client.db('postDB');
const postsCollection = database.collection('posts');

const app: Application = express();
app.use(express.static(path.join(__dirname, 'frontend')));
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req:Request,res:Response)=>{
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/posts', (req:Request,res:Response)=>{
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const read = async function(){
  try{

    const cursor = await postsCollection.find({})
    const allPosts = await cursor.toArray();
    console.log(allPosts);

    return (allPosts);

  }catch(err){
    console.log(err);
  }
}

app.get('/read', (req:Request, res:Response)=>{
  console.log('READ GET');

  read().then(results=>{res.send(results)})

});

app.post('/create', (req:Request, res:Response)=>{
  console.log('CREATE POST');
  // let post = new Post();
  // post.title = req.body.title;
  // post.body = req.body.body;
  let post = new Post();
  post.title = req.body.title;
  post.body = req.body.body;
  console.log(post);

  validate(post).then(err=>{
    if(err.length > 0){
      console.log('validation failed. errors :', err);
    }else{
      console.log('validation successful');
      create(post);
    }
  })
  const create = async function (post:{}){
    try{

      const result = await postsCollection.insertOne(post).then(()=>{read().then((allResults)=>{res.send(allResults)})});
      // result.then(()=>{read().then((allResulsts)=>{res.send(allResults)})})


    }catch(err){
      console.log(err);

    }
  }

});


app.post('/delete', (req:Request, res:Response)=>{
  console.log('DELETE POST');

  const id = req.body.id;
  console.log(id);

  const deletePost = async function (id:string){
    try{

      const result = await postsCollection.findOneAndDelete({'_id':new ObjectId(id)});


    }catch(err){
      console.log(err);

    }
  }
  deletePost(id);
});

app.post('/edit', (req:Request, res:Response)=>{
  console.log('EDIT POST');

  let post = new Post();

  post.postId = req.body.postId;
  post.title = req.body.title;
  post.body = req.body.body;
  console.log(post);

  validate(post).then(err=>{
    if(err.length > 0){
      console.log('validation failed. errors :', err);
    }else{
      console.log('validation successful');
      editPost(post);
    }
  })

  // const postDetails = req.body;
  // console.log(postDetails);

  const editPost = async function (post:any){
    try{

      const result = await postsCollection.findOneAndUpdate({'_id':new ObjectId(post.postId.id)},{$set:{title:post.title, body:post.body}})
      .then(()=>{read().then((allResults)=>{res.send(allResults)})});


    }catch(err){
      console.log(err);

    }
  }
  // editPost(postDetails);
});


// let port = process.env.PORT;
let port =process.env.PORT || 3000;
// let port = 3000;
// if (port == null || port == "") {
//   port = 3000;
// }
app.listen(port, ()=>{
  console.log('Server is running');
});
