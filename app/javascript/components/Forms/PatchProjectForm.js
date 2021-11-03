import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { selectTeam } from '../../reducers';

const PatchProjectForm = (props) => {
    const [projectName, setProjectName] = useState(props.project.name)
    const [projectDescription, setProjectDescription] = useState(props.project.description)
    const [projectLead, setProjectLead] = useState(props.project.lead_id)

    function renderSelects() {
        if (props.team.members.length === 1) {
            let lead = props.team.members.find((member) => member.id === props.project.lead_id)
            let lead_name = lead.first_name + ' ' + lead.last_name
            return (
                <Fragment>
                    <div className="form-group">
                        <label htmlFor="lead_id">Project Lead</label>
                        <div className="small-red">Add another member to the team to change project lead</div>
                        <select name="lead_id" id="lead_id" value={projectLead} disabled>
                            <option value={projectLead} disabled hidden>{lead_name}</option>
                        </select>
                    </div>
                </Fragment>
            )
        } else {
            const members = props.team.members.map(member => <option key={member.id} value={member.id} label={member.first_name + ' ' + member.last_name} id={member.id}>{ member.first_name + ' ' + member.last_name }</option>)
            return (
                <div className="form-group">
                    <label htmlFor="lead_id">Project Lead</label>
                    <select name="lead_id" value={projectLead} id="lead_id" onChange={(event) => setProjectLead(event.target.value)} readOnly>
                        <option value='' disabled hidden>Select a Member</option>
                        { members }
                    </select>
                </div>
            )
        }
    }

    return (
        <div className="form">
            <h2>Edit {props.UI.activeProject.project_name}</h2>
            <form onSubmit={props.onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Project Name</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name"
                        value={projectName}
                        autoComplete="off"
                        autoFocus="autofocus"
                        onChange={(event) => setProjectName(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Project Description</label>
                    <textarea 
                        id="description"
                        name="description"
                        value={projectDescription}
                        autoComplete="off"
                        row="10"
                        cols="70"
                        onChange={(event) => setProjectDescription(event.target.value)}
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
    let Team = selectTeam(state.teams.all_teams, state.UI.activeWorkspace.workspace_id) || null
    let Project = Team.projects.find((project) => project.id === state.UI.activeProject.project_id)
    
    return { 
        team: Team,
        project: Project,
        UI: state.UI
    }
}

export default connect(mapStateToProps)(PatchProjectForm);