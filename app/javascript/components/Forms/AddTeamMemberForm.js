import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const csrfToken = document.querySelector('[name="csrf-token"]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

const override = css`
  display: block;
  margin: 0 auto;
`;

const AddTeamMemberForm = (props) => {
    const [memberArray, setMemberArray] = useState([])
    const [newMember, setNewMember] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.post('https://forwards-app.herokuapp.com/api/users', {
            team_id: props.UI.activeWorkspace.workspace_id
        })
        .then((data) => {
            if (data.data.users.length === 0) {
                setMemberArray('empty')
            } else {
                setMemberArray([...data.data.users])
            }
            setLoading(false)
        })
    }, [])

    if (memberArray === 'empty') {
        return (
            <h2 className="empty">Sorry, it looks like all available users have already been added to this team</h2>
        )
    } else if (loading === true) {
        return(<div className="empty"><ClipLoader color={'#ff8851'} loading={loading} css={override} size={25} /></div>)
    } else if (loading === false) {
        const members = memberArray.map(member => <option key={member.id} value={member.id} label={member.first_name + ' ' + member.last_name} id={member.id}>{ member.first_name + ' ' + member.last_name }</option>)
        return (
            <div className="form">
                <form onSubmit={props.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="user_id" className="small">Select a User to add to {props.UI.activeWorkspace.workspace_name}</label>
                        <select name="user_id" value={newMember} id="user_id" onChange={(event) => setNewMember(event.target.value)} readOnly>
                            <option value='' disabled hidden>Select a User</option>
                            { members }
                        </select>
                    </div>
                    <div className="button">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        teams: state.teams,
        UI: state.UI
    }
}

export default connect(mapStateToProps)(AddTeamMemberForm);