import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../../actions';

const ActiveProjectContainer = (props) => {
    const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>

    if (props.projects.all_projects) {
        return(
            <div className="active-project-container">
                <div className="project-tasks-container">
                    <div className="project-tasks-container-header">
                        <h2>Tasks <span className='icon' onClick={() => props.toggleModal(true, 'createTask')}>{addIcon}</span></h2>
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

export default connect(mapStateToProps, { toggleModal })(ActiveProjectContainer);