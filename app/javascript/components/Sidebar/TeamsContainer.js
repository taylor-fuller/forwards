import React, { Component } from 'react';
import "../../../assets/stylesheets/TeamsContainer.css"
import axios from 'axios'
import Modal from 'react-modal';

// import AOS from 'aos';
// import 'aos/dist/aos.css';

// AOS.init({
//   duration: 500,
// })

const csrfToken = document.querySelector('[name="csrf-token"]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

Modal.setAppElement(document.getElementById('root'));

class TeamsContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            teams: [],
            modalIsOpen: false
        }

        axios.get('http://localhost:3000/api/teams', {    
        })
        .then( (data) => {
            this.setState({
                teams: [...data.data.teams]
            })
            console.log(this.state.teams)
            console.log(data)
        })
        .catch( (data) => {
        })

        this.handleModalToggle = this.handleModalToggle.bind(this)
    }

    handleModalToggle() {
        if (this.state.modalIsOpen == false) {
            this.setState({
                modalIsOpen: true
            })
        } else if (this.state.modalIsOpen == true) {
            this.setState({
                modalIsOpen: false
            })
        }
    }



    render () {
        return (
            <div className="teams-container">
                {/* <button onClick={this.handleModalToggle}>Open Modal</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Example Modal"
                >
                    <button onClick={this.handleModalToggle}>close</button>
                    <div>I am a modal</div>
                    <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                    </form>
                </Modal> */}
            </div>
        )
    }
}

export default TeamsContainer;