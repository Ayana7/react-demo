import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App  from './App';

import About from './components/About';
import MembersPage from './components/MembersPage';
import PageResize from './components/PageResize';


class AppRouter extends React.Component<any , any>{
  render(){
    return (
      <div>
        <BrowserRouter>
          <Routes>
            
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/PageResize" element={<PageResize />} />


          </Routes>
        </BrowserRouter>
      </div>
      
    );
  }
  
}
export default AppRouter;
