import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import HomePageContainer from './HomePage/HomePageContainer';
import VariablesContainer from './Variables/VariablesContainer';



function App() {
  return (
      <div className="App container">
        <header>
          <NavLink to={'/'} >VIN DECODER</NavLink>
          <NavLink to={'/variables'} >Variables</NavLink>
        </header>
        <main className='container' >
            <Routes>
              <Route path='/' element={<HomePageContainer />} />
              <Route path='/variables/*' element={<VariablesContainer />} />
            </Routes>
        </main>
      </div>

  );
}

export default App;
