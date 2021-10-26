import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import MyTeamsContainer from './TeamsContainer/MyTeamsContainer';
import MyProjectsContainer from './ProjectsContainer/MyProjectsContainer';
import MyTasksContainer from './TasksContainer/MyTasksContainer';
import DashboardContainer from './DashboardContainer/DashboardContainer';

// import AOS from 'aos';
// import 'aos/dist/aos.css';

// AOS.init({
//   duration: 500,
// })

const HomeContainer = (props) => {
    let homeRef = useRef()

    useEffect(() => {
        if (homeRef.current) {
            homeRef.current.scrollTo(0, 0)
        }
    }, [props.activeSidebarOption])
    
    if (props.UI.activeSidebarOption === 'Dashboard') {
        return <DashboardContainer />
    } else if (props.UI.activeSidebarOption === 'My Tasks') {
        return <MyTasksContainer />
    } else if (props.UI.activeSidebarOption === 'My Projects') {
        return <MyProjectsContainer />
    } else if (props.UI.activeSidebarOption === 'My Teams') {
        return <MyTeamsContainer />
    } else {
        return null
    }
}
    

const mapStateToProps = state => {
    return { 
        UI: state.UI
    }
}

export default connect(mapStateToProps)(HomeContainer);