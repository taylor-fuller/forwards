import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { amendActiveWorkspace } from '../../../actions';
import Emoji from '../../Emoji/Emoji';

const MyTeamsContainer = (props) => {
    let homeRef = useRef()

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

    function returnTeamLeadName(team_id) {
        let team
        let team_lead
        team = props.teams.all_teams.filter((team) => team.id === team_id)
        if (team[0]) {
            team_lead = team[0].members.filter((member) => member.id === team[0].lead_id)
            if (team_lead[0]) {
                return (team_lead[0].first_name + ' ' + team_lead[0].last_name)
            }
        }
    }
    
    let teams
    let teamsLed
    
    if (props.teams.all_teams) {
        if (props.teams_led.length >= 1) {
            teamsLed = props.teams_led.map(team => <div key={team.id} id={team.id} className='team-item' onClick={() => props.amendActiveWorkspace(team)}><h3>{team.name}</h3> <h3 className={returnTasksDueTodayForTeam(team.id) === 0 ? "grey" : 'red'}>{returnTasksDueTodayForTeam(team.id)}</h3> <h3 className={returnTasksDueSoonForTeam(team.id) === 0 ? "grey" : 'orange'}>{returnTasksDueSoonForTeam(team.id)}</h3> <h3>{team.projects.length}</h3> <h3>{team.tasks.all_tasks.length}</h3> <h3>{team.members.length}</h3></div>)
        }
        if (props.teams.others_teams.length >= 1) {
            teams = props.teams.others_teams.map(team => <div key={team.id} id={team.id} className='team-item' onClick={() => props.amendActiveWorkspace(team)}><h3>{team.name}</h3> <h3 className={returnTasksDueTodayForTeam(team.id) === 0 ? "grey" : 'red'}>{returnTasksDueTodayForTeam(team.id)}</h3> <h3 className={returnTasksDueSoonForTeam(team.id) === 0 ? "grey" : 'orange'}>{returnTasksDueSoonForTeam(team.id)}</h3> <h3>{team.members.length}</h3> <h3>{returnTeamLeadName(team.id)}</h3></div>)
        }
        return(
            <div className="teams-container" ref={homeRef}> 
                <div className="teams">
                    { teamsLed ? <h2>Teams Led</h2> : null }
                    { teamsLed ? <div className="teams-led"><div className="team-header"><h3>Team</h3> <h3>Tasks Due Today</h3> <h3>Tasks Due Soon</h3> <h3>Active Projects</h3> <h3>Active Tasks</h3> <h3>Members</h3></div> { teamsLed }</div> : null }
                    <h2>Teams</h2>
                    <div className="all-teams">
                        { teams ? <div className="team-header"><h3>Team</h3> <h3>Tasks Due Today</h3> <h3>Tasks Due Soon</h3> <h3>Members</h3> <h3>Team Lead</h3> </div> : null }
                        { teams ? teams : <div className="empty">No Teams &nbsp;&nbsp;&nbsp;&nbsp;<Emoji symbol='😔'/></div> }
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
        teams_led: state.teams_led,
    }
}

export default connect(mapStateToProps, { amendActiveWorkspace })(MyTeamsContainer);