import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { clearErrors } from '../../actions';

const CreateTeamForm = (props) => {
    const [errors, setErrors] = useState({})

    useEffect(() => {
        return () => {
            props.clearErrors()
        }
    }, [])

    useEffect(() => {
        if (props.errors) {
            setErrors(props.errors)
        }
    }, [props.errors])

    function renderErrors(errors) {
        if (errors) {
            let Errors = errors.map((error, index) => <li key={index} className='error-text'>{error}</li> )
            return (<ul>{Errors}</ul>)
        } else {
            return null
        }
    }

    return (
        <div className="form">
            <h2>Create A Workspace</h2>
            <form onSubmit={props.onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Workspace Name</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name"
                        placeholder="Workspace Name"
                        autoComplete="off"
                        autoFocus="autofocus"
                        className={errors.name ? 'error' : null}
                    />
                    { renderErrors(errors.name) }
                </div>
                <div className="button">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return { 
        errors: state.errors
    }
}

export default connect(mapStateToProps, {clearErrors})(CreateTeamForm);