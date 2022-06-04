import Offcanvas from './Offcanvas';
import Footer from './Footer';
import Entry from './Entry';
import {Container} from 'react-bootstrap';

function Home(){
  return(
    <Container fluid className='main-container vh-100 d-flex flex-column'>
      <Offcanvas />
      <Entry />
      <Footer />
    </Container>
  );
}

export default Home;
