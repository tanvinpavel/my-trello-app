import { Route, Routes } from 'react-router-dom';
import Layout from './views/layout/Layout';
import Home from './views/pages/home/Home';
import ListView from './views/pages/listView/ListView';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/board' element={<ListView/>}/>
        <Route path='/progress' element={'hello'}/>
      </Route>
    </Routes>
  );
}

export default App;
