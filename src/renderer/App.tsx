/* eslint-disable react/button-has-type */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import icon from '../../assets/icon.svg';
import './styles/tailwind.css';
import './styles/output.css';

import ea from '../../assets/illustrations/ea.svg';

const Hello = () => {
  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <img alt="ea" src={ea} width="70%" height="80%" />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
