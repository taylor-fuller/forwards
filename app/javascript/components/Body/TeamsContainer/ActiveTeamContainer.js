import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { } from '../../../actions';

const ActiveTeamContainer = (props) => {
    if (props.teams && (typeof props.teams !== 'undefined')) {
        return(
            'team page'
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

export default connect(mapStateToProps, {  })(ActiveTeamContainer);