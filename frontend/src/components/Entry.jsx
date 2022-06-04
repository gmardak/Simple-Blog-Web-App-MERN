import {Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function Entry(){
  let titleText = 'Добро пожаловать на AGISO!'
  let bodyText = 'Вы можете использовать этот веб-сайт, чтобы добавлять свои заметки, делиться своими идеями и выражать свое мнение.';

  return(
    <>
      <Row className='h-100 justify-content-center align-items-center'>
        <Col className='col-xs-12 col-9 text-center'>
          <h1>{titleText}</h1>
          <p className='body-text'>{bodyText}</p>
          <Link to='/posts'><Button variant="outline-secondary">Начать писать</Button></Link>
        </Col>

      </Row>
    </>
  );
}

export default Entry;
