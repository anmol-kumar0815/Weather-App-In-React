import './App.css';
import Container from './myComponents/container';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className='title'>Future</p>
        <img src="logo.png" className="App-logo" alt="logo" />
        <p className='title'>Weather</p>
      </header>

      <Container />

    </div>
  );
}

export default App;
