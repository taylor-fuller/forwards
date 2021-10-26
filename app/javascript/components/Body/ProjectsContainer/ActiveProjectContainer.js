import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { amendActiveProject, amendActiveWorkspace } from '../../../actions';

const ActiveProjectContainer = (props) => {
    if (props.projects.all_projects) {
        return(
            'project page'
        )
    } else {
        return null
    }
}
    

const mapStateToProps = state => {
    return { 
        teams: state.teams,
        projects: state.projects,
        projects_led: state.projects_led
    }
}

export default connect(mapStateToProps, { amendActiveProject, amendActiveWorkspace })(ActiveProjectContainer);