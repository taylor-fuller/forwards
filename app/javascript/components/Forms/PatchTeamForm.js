import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { selectTeam } from '../../reducers';

const PatchTeamForm = (props) => {
    const [teamName, setTeamName] = useState(props.team.name)
    const [teamLead, setTeamLead] = useState(props.team.lead_id)

    function renderSelects() {
        if (props.team.members.length === 1) {
            let lead = props.team.members.find((member) => member.id === props.team.lead_id)
            let lead_name = lead.first_name + ' ' + lead.last_name
            return (
                <Fragment>
                    <div className="form-group">
                        <label htmlFor="lead_id">Team Lead</label>
                        <div className="small-red">Add another member to the team to change team lead</div>
                        <select name="lead_id" id="lead_id" value={teamLead} disabled>
                            <option value={teamLead} disabled hidden>{lead_name}</option>
                        </select>
                    </div>
                </Fragment>
            )
        } else {
            const members = props.team.members.map(member => <option key={member.id} value={member.id} label={member.first_name + ' ' + member.last_name} id={member.id}>{ member.first_name + ' ' + member.last_name }</option>)
            return (
                <div className="form-group">
                    <label htmlFor="lead_id">Team Lead</label>
                    <select name="lead_id" value={teamLead} id="lead_id" onChange={(event) => setTeamLead(event.target.value)} readOnly>
                        <option value='' disabled hidden>Select a Member</option>
                        { members }
                    </select>
                </div>
            )
        }
    }

    return (
        <div className="form">
            <h2>Edit {props.team.name}</h2>
            <form onSubmit={props.onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Team Name</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name"
                        value={teamName}
                        autoComplete="off"
                        autoFocus="autofocus"
                        onChange={(event) => setTeamName(event.target.value)}
                    />
                </div>
                { renderSelects() }
                <div className="button">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    let Team = selectTeam(state.teams.all_teams, state.UI.activeWorkspace.workspace_id)
    
    return { 
        team: Team,
        UI: state.UI
    }
}

export default connect(mapStateToProps)(PatchTeamForm);