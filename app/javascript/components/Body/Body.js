import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../../../assets/stylesheets/Body'
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// AOS.init({
//   duration: 500,
// })

const csrfToken = document.querySelector('[name="csrf-token"]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

const Body = (props) => {
    const [activeSidebarOption, setActiveSidebarOption] = useState(props.activeOption)

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        setActiveSidebarOption(props.activeOption)
    }, [props.activeOption])

    function determineRender(active) {
        let content;
        if (active === 'dashboard') {
            content = (
                <div className="dashboard-container">
                    <div className="tasks">
                        <h2>Tasks</h2>
                    </div>
                    <div className="projects-and-teams">
                        <div className="projects">
                            <h2>Projects</h2>
                        </div>
                        <div className="teams">
                            <h2>Teams</h2>
                        </div>
                    </div>
                </div>
            )
        } else if (active === 'tasks') {
            content = (
                <div className="tasks-container">
                    <div className="tasks">
                        <h2>Tasks</h2>
                    </div>
                </div>
            )
        } else if (active === 'projects') {
            content = (
                <div className="projects-container">
                    <div className="projects">
                        <h2>Projects</h2>
                    </div>
                </div>
            )
        } else if (active === 'teams') {
            content = (
                <div className="teams-container">
                    <div className="teams">
                        <h2>Teams</h2>
                    </div>
                </div>
            )
        }
        return content
    }

    const Content = determineRender(activeSidebarOption)

    return (
        <div className="body-content">
            <div className="main-container">
                { Content }
            </div>
        </div>
    )
}

export default Body;