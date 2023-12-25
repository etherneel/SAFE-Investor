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
                                <a href="#news"> <img src={Proicon} alt="Proicon" /> Proposals</a>
                                <a href="#contact">  <img src={payicon} alt="payicon" /> Payments</a>
                                <a href="#about">  <img src={moneicon} alt="moneicon" /> Deposit</a>
                                <a href="#news">  <img src={secuicon} alt="secuicon" /> Moneybox</a>
                                <a href="#contact">  <img src={helpicon} alt="helpicon" /> Securities</a>

                                <div className="menu2">
                                    <a href="#about">  <img src={helpicon} alt="helpicon" /> Help</a>
                                    <a href="#about">  <img src={settingicon} alt="settingicon" /> Settings</a>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

            </div>
        </div>
    )
}

export default saidbar
