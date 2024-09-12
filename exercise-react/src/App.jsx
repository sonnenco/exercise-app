import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <>
      <header>
        <h1>Exercises App</h1>
        <p>View, create and edit exercises using this <a target="_blank" href="https://www.mongodb.com/resources/languages/mern-stack">MERN</a> application.</p>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />}></Route>
          <Route path="/create-exercise" element={ <CreateExercisePage />}></Route>
          <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit} />}></Route>
        </Routes>
      </Router>
      <footer>
        © 2024 Colin Sonnenberg
      </footer>
    </>
  );
}

export default App;