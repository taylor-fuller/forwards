import React from 'react';

const TeamForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div className="form-group">
                <label htmlFor="name"></label>
                <input 
                    type="text" 
                    id="name"
                    name="name"
                    placeholder="Workspace Name"
                    autoComplete="off"
                    autoFocus="autofocus"
                />
            </div>
            <div className="button">
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default TeamForm;