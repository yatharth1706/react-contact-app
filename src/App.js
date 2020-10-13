import React, {lazy, Suspense} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home';

const CreateForm = lazy(() => import('./Components/CreateForm'));

function App() {
  return (
    <div className="ContactApp">
      
      <Suspense fallback = {<div className = "text-center">Loading....</div>}>
        <Home />
      </Suspense>
      
    </div>
  );
}

export default App;
