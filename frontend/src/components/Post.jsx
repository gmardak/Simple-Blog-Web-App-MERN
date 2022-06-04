import {Row, Col} from 'react-bootstrap';

function Post(props){

  function editPost(){
    window.scrollTo({top:0});
    props.onEditPost({id:props.id}, props.idx, props.title, props.body, props.editBoolean);
  }

  function deletePost(){
    props.onDeletePost({id:props.id}, props.idx);
  }

  return(
      <Row className='justify-content-center'>
        <Col className='post col-11' lg={8} md={10} sm={10}>
          <h3 className='post-title'>{props.title}</h3>
          <p>{props.body}</p>
        </Col>
        <Col className='col-1'>
          <Row className='edit-button'>
            <Col>
              <i type="button" class="fa-solid fa-pen-to-square" onClick={editPost}></i>
            </Col>
          </Row>

          <Row>
            <Col>
              <i type="button" class="fa-solid fa-trash" onClick={deletePost}></i>
            </Col>
          </Row>
        </Col>
      </Row>
  );
}

export default Post;
