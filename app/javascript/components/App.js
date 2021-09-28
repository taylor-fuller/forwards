import React from 'react';
import "../../assets/stylesheets/App.css"
import Header from './Header/Header';
import Footer from './Footer/Footer';
import axios from 'axios'
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// AOS.init({
//   duration: 500,
// })

const csrfToken = document.querySelector('[name="csrf-token"]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

function App() {
    return (
        <div id="view">
            <Header />
            <div className="content-container">
                TEST
            </div>
            <Footer />
        </div>
    )
}

export default App;