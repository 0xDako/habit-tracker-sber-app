import React, { useState, useEffect } from "react"
import ReactDOM from 'react-dom'
import "./App.css"
import HabitBox from './components/HabitBox'


//////////////////////////////////////
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import LinearProgress from '@material-ui/core/LinearProgress';
/////////////////////////////////////

import MainPage from "./pages/MainPage.js"

const App = () =>{


    useEffect(() => {

    }, []);

    return (
        <React.Fragment>
            <HabitBox habbitName={'Бросить курить'} progressValue={33} maxValue={66}/>
        </React.Fragment>
        // <React.Fragment>
        // <AppBar position="static">   
        //     <Toolbar>
        //     Здесь будет ассистент сбера
        //     </Toolbar>
        // </AppBar>
        // <MainPage/>
        // </React.Fragment>
    );
}

export default App