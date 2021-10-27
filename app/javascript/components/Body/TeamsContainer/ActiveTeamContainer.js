import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../../actions';

const ActiveTeamContainer = (props) => {
    const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--base0)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>

    function returnTeam(teams, active_team_id) {
        let team = teams.filter((team) => team.id === active_team_id)
        return team[0]
    }

    function returnTasksDueTodayForTeam(team_id) {
        let team
        team = props.teams.all_teams.filter((team) => team.id === team_id)
        if (team[0]) {
            return team[0].tasks.due_today.length
        }
    }

    function returnTasksDueSoonForTeam(team_id) {
        let team
        team = props.teams.all_teams.filter((team) => team.id === team_id)
        if (team[0]) {
            return team[0].tasks.due_soon.length
        }
    }

    let team = returnTeam(props.teams.all_teams, props.UI.activeWorkspace.workspace_id)

    if (team) {
        return(
            <div className="active-team-container">
                <div className="active-team-overview-and-members">
                    <div className="active-team-overview">
                        <h2>Overview</h2>
                        <div className="overview">

                        </div>
                    </div>
                    <div className="active-team-members">
                        <h2>Members <span className='icon' onClick={() => props.toggleModal(true, 'addTeamMember')}>{addIcon}</span></h2>
                        <div className="active-team-members">

                        </div>
                    </div>
                </div>
                <div className="active-team-projects">
                    <h2>Projects <span className='icon' onClick={() => props.toggleModal(true, 'createProject')}>{addIcon}</span></h2>
                    <div className="projects-container">

                    </div>
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

export default connect(mapStateToProps, {toggleModal})(ActiveTeamContainer);