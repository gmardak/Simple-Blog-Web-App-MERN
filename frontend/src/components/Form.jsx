import {Container, Row, Col, Button} from 'react-bootstrap';
import {useState} from 'react';

function Form(props){

  // const [title, setTitle] = useState(props.title);
  // const [text, setText] = useState(props.body);
  console.log('Form');
  console.log(props.title);
  console.log(props.body);

  function changeTitle(event){
    // title = event.target.value;
    props.setTitle(event.target.value)
  }

  function changeText(event){
    // text = event.target.value;
    props.setBody(event.target.value)
  }

  function submitPost(event){
    event.preventDefault();
    let post = {
      title: props.title,
      body: props.body
    }

    fetch('/create', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type':'application/json'
      }
    });
    props.onCreatePost(post);
  }

  function editForm(event){
    event.preventDefault();
    props.onEditPost({id:props.id}, props.idx, props.title, props.body)
  }
  return(
    <Container fluid className='form-container'>
    <form onSubmit={props.editBoolean?editForm:submitPost}>
        <Row className='text-center justify-content-center form-row'>

          <Col className='col-12 col-sm-10 col-md-10 col-lg-8 col-xl-8'>
            <input onChange={changeTitle} className = 'input-area' type='text' placeholder="Название вашей статьи" name='title' value={props.title}>
            </input>
          </Col>
          <Col className='col-12 col-sm-10 col-md-10 col-lg-8 col-xl-8'>
            <textarea onChange={changeText} className = 'input-area' rows='10' placeholder="Текст вашей статьи" name ='text' value={props.body}>
            </textarea>
          </Col>
          <Col className='col-12 col-sm-10 col-md-10 col-lg-8 col-xl-8'>
            <Button variant="outline-secondary" type='submit'>Сохранить</Button>
          </Col>
        </Row>
      </form>
    </Container>

  );
}

export default Form;
