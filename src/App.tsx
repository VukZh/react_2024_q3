import {useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {Link} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#242424',
      color: '#ffffff',
    }}>
      <Link to="/rhf">rhf</Link>
      <Link to="/uncontrolled">uncontrolled</Link>
      <div>
        forms
      </div>
    </div>
  );
}

export default App;
