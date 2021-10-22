import React, { useState, useEffect } from 'react';
import "../../assets/stylesheets/App.css"
import Sidebar from './Sidebar/Sidebar';
import Body from './Body/Body'
import axios from 'axios'
import { connect } from 'react-redux';
import { fetchTeams, fetchProjects, fetchTasks, fetchSettings, amendActiveSidebar } from '../actions';

// import AOS from 'aos';
// import 'aos/dist/aos.css';

// AOS.init({
//   duration: 500,
// })

const csrfToken = document.querySelector('[name="csrf-token"]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

const App = (props) => {
    useEffect(() => {
        props.fetchTeams()
        props.fetchProjects()
        props.fetchTasks()
        props.fetchSettings()
    }, [])


    return (
        <div id="view">
            <Sidebar/>
            <div className="content-container">
                <Body/>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return { 
        teams: state.teams,
        projects: state.projects,
        tasks: state.tasks,
        settings: state.settings
    }
}

export default connect(mapStateToProps, { fetchTeams, fetchProjects, fetchTasks, fetchSettings, amendActiveSidebar })(App);