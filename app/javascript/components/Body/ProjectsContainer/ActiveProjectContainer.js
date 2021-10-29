import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { amendActiveProject, amendActiveWorkspace } from '../../../actions';

const ActiveProjectContainer = (props) => {
    if (props.projects.all_projects) {
        return(
            <div className="active-project-container">
                <div className="project-tasks-container">
                    <div className="project-tasks-container-header">
                        <h2>Tasks</h2>
                    </div>
                </div>
                <div className="project-task-details-container">

                </div>
            </div>
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