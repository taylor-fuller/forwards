import React, { useState, useEffect } from 'react';
import "../../assets/stylesheets/App.css"
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Sidebar from './Sidebar/Sidebar';
import Body from './Body/Body'
import axios from 'axios'
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// AOS.init({
//   duration: 500,
// })

const csrfToken = document.querySelector('[name="csrf-token"]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

const App = () => {
    const [activeOption, setActiveOption] = useState('dashboard')

    useEffect(() => {
        dashboard = document.getElementById('dashboard')
        tasks = document.getElementById('tasks')
        projects = document.getElementById('projects')
        tasks = document.getElementById('tasks')

        dashboard.addEventListener('click', function(event) {
            event.stopPropagation();
            if (dashboard.contains(event.target)) {
                setActiveOption('dashboard')
            }
        })

        tasks.addEventListener('click', function(event) {
            event.stopPropagation();
            if (tasks.contains(event.target)) {
                setActiveOption('tasks')
            }
        })

        projects.addEventListener('click', function(event) {
            event.stopPropagation();
            if (projects.contains(event.target)) {
                setActiveOption('projects')
            }
        })

        teams.addEventListener('click', function(event) {
            event.stopPropagation();
            if (teams.contains(event.target)) {
                setActiveOption('teams')
            }
        })
    }, [])

    return (
        <div id="view">
            <Sidebar activeOption={activeOption} />
            <div className="content-container">
                <Header />
                <Body activeOption={activeOption} />
            </div>
        </div>
    )
}

export default App;