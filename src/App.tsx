import './App.css';
import { Link } from 'react-router-dom';
import Card from './components/card/card.tsx';
import History from './components/history/history.tsx';

function App() {
  return (
    <>
      <div className="navigation">
        <Link to="/rhf" className="leftLink">
          Form with React Hook Form
        </Link>
        <Link to="/uncontrolled" className="rightLink">
          Form with uncontrolled components
        </Link>
      </div>
      <div className="cards">
        <Card isRHF={true}></Card>
        <Card isRHF={false}></Card>
      </div>
      <History />
    </>
  );
}

export default App;
