import React, { Component } from 'react';
import "../../assets/stylesheets/App.css"
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Sidebar from './Sidebar/Sidebar';
import axios from 'axios'
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// AOS.init({
//   duration: 500,
// })

const csrfToken = document.querySelector('[name="csrf-token"]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

class App extends Component {
    render () {
        return (
            <div id="view">
                <Header />
                <div className="content-container">
                    <Sidebar />
                    <div className="main-content">

                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default App;