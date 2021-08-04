
import axios from 'axios'
import './App.css';

function App() {
  const test = async () => {
    console.log(123);
    const res = await axios('http://localhost:5000/manage/user/list')
    console.log(res);
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={test}>按钮</button>
      </header>
    </div>
  );
}

export default App;
