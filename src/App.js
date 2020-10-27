import React,{useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';

function App() {
  const [theme, setTheme] = useState('');
  useEffect(() => {
    let temp = window.localStorage.getItem("theme");
    setTheme(temp);
  }, [])

  return (
    <div className={theme === "Light" ?  "ContactApp" : "dark"}>
        <Home />
    </div>
  );
}

export default App;
