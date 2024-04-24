import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';

import Header from './layout/Header'
import FormCreation from './pages/FormCreation'
import CriteriaList from './pages/CriteriaList';
// import LabData from './pages/LabData'
// import Labs from './pages/Labs'

class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<FormCreation/>}/>
                        <Route path="/criteria" element={<CriteriaList/>}/>
                        {/* <Route path="/labs/:id" element={<LabData/>} />  */}
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}


export default App;