import React, {lazy, Suspense} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateForm = lazy(() => import('./Components/CreateForm'));

function App() {
  return (
    <div className="ContactApp">
      <h3 className="text-center mt-2">Create Contact</h3>
      <Suspense fallback = {<div className = "text-center">Loading....</div>}>
        <CreateForm />
      </Suspense>
      
    </div>
  );
}

export default App;
