import { useState } from 'react';
import {Container, Button, Offcanvas, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function MenuCanvas() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light">
        <Container fluid>
          <Navbar.Brand href="/">AGISO</Navbar.Brand>
          <Button className='d-flex' variant="light" onClick={handleShow}>
            <i className="fa-solid fa-bars"></i>
          </Button>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>AGISO</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link className='menu-links' to='/'>Главная страница</Link>
          <Link className='menu-links' to='/posts'>Статьи</Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MenuCanvas;
