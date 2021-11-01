import React, { useEffect, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import { toggleModal, amendActiveTask, toggleTaskComplete } from '../../../actions';
import 'react-circular-progressbar/dist/styles.css';

const ActiveTaskContainer = (props) => {
    
    if (props.UI.activeTask) {

        return(
            <div>{props.UI.activeTask.task_name}</div>
        )
    } else {
        return null
    }
}

const mapStateToProps = state => {
    return { 
        teams: state.teams,
        projects: state.projects,
        projects_led: state.projects_led,
        UI: state.UI
    }
}

export default connect(mapStateToProps, { toggleModal, toggleTaskComplete })(ActiveTaskContainer);