import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Components/Pages/Home';
import Contact from './Components/Pages/Contact';
import Company from './Components/Pages/Company';
import NewProject from './Components/Pages/NewProject';
import Projects from './Components/Pages/Projects';

import Container from './Components/Layout/Container';
import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer'
import Project from './Components/Pages/Project';

/* */
function App() {
  return (
    <Router>
      <Navbar/>
      <Container customClass="min-heigth">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/Projects" element={<Projects />}></Route>
          <Route path="/Company" element={<Company />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
          <Route path="/NewProject" element={<NewProject />}></Route>
          <Route path="/Project/:id" element={<Project/>}></Route>
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
