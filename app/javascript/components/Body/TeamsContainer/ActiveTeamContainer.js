import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { } from '../../../actions';

const ActiveTeamContainer = (props) => {
    function returnTeam(teams, active_team_id) {
        let team = teams.filter((team) => team.id === active_team_id)
        return team[0]
    }

    let team = returnTeam(props.teams.all_teams, props.UI.activeWorkspace.workspace_id)
    console.log(team)

    if (team) {
        return(
            <div className="active-team-container">
                <div className="active-team-overview-and-members">
                    <div className="active-team-overview">
                        <h2>Overview</h2>
                        <div>
                            
                        </div>
                    </div>
                    <div className="active-team-members">
                        <h2>Members</h2>
                        <div></div>
                    </div>
                </div>
                <div className="active-team-projects">
                    <h2>Projects</h2>
                    
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
        UI: state.UI
    }
}

export default connect(mapStateToProps)(ActiveTeamContainer);