import React from 'react'
import './saidbar.css'
import logoImage from '../image/Logo.png';
import dasicon from '../image/desbord.png';
import Proicon from '../image/Analitycs.png'
import payicon from '../image/Vector.png'
import moneicon from '../image/Vector (1).png'
import secuicon from '../image/Vector (2).png'
import helpicon from '../image/arcticons_eufy-security.png'
import settingicon from '../image/setting2.png'
const saidbar = () => {
    return (
        <div>
            <div className="desbord">
                <div className="sidebar">
                    <div className="logo">
                        <div className="toggle_btn">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                                <span className="navbar-toggler-icon"><i className="fa fa-bars" aria-hidden="true"></i></span>
                            </button>
                        </div>

                        <div className="logod">
                            <img src={logoImage} alt="Logo" />
                        </div>
                    </div>
                    <nav className="navbar navbar-expand-md">
                        <div className="hello">
                            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                                <a className="active" href="#home">  <img src={dasicon} alt="dasicon" /> Dashboard</a>
                            </div>
                        </div>
                    </nav>
                </div>

            </div>
        </div>
    )
}

export default saidbar
