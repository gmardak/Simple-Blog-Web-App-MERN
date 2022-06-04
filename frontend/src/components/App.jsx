import {Routes, Route} from 'react-router-dom';
import Home from './Home';
import Posts from './Posts'

function App(){

  return(
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/posts' element={<Posts />} />
    </Routes>
  );
}

export default App;
