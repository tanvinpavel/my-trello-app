import { Routes, Route } from 'react-router-dom';
import Layout from './views/layout/Layout';
import Home from './views/pages/home/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path='/' element={<Home/>}/>
      </Route>
    </Routes>
  );
}

export default App;
