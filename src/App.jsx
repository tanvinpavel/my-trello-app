import { Route, Routes } from 'react-router-dom';
import Layout from './views/layout/Layout';
import Home from './views/pages/home/Home';
import ManageBoard from './views/pages/manageBoard/ManageBoard';
import WorkSpace from './views/pages/workSpace/WorkSpace';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/board' element={<ManageBoard/>}/>
        <Route path='/progress' element={<WorkSpace/>}/>
      </Route>
    </Routes>
  );
}

export default App;
