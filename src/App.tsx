import './App.css';
import { Link } from 'react-router-dom';
import { useFormRHF } from './hooks/useFormRHF.tsx';
import Card from './components/card/card.tsx';

function App() {
  const { formDataRHF } = useFormRHF();

  console.log('formDataRHF::::::: ', formDataRHF);

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
    </>
  );
}

export default App;
