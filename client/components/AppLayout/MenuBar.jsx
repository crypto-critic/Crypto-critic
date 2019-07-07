import React from 'react';
import {Link} from 'react-router-dom'
import './menubar.css'
import {connect} from "react-redux";

class MenuBar extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        const { user, money, locale} = this.props;
        return (
            <div className='header-wrap'>
                <div className='header-main'>
                    <div className='nav-info'>
                        <a className='logo-wrap'>
                            <img className='logo-img' src={'/assets/img/main-logo.png'} />
                        </a>
                        <div className='header-line'></div>
                        <div className='nav-wrap'>
                            <span><Link to='/'><p className='nav-link'>Ranking</p></Link></span>
                            <span><Link to='/explorer'><p className='nav-link'>Explorer</p></Link></span>
                            <span><Link to='/apis'><p className='nav-link'>APIs</p></Link></span>
                        </div>
                    </div>
                    <div className='user-info-box'>
                        {
                            user && user.email? (
                                <div className='user-wrap'>
                                    <Link to='/me'><i className='fas fa-user' /></Link>
                                </div>
                            ) : (
                                <div className='user-no-login'>
                                    <Link to='/login'><p className='user-login'>Login</p></Link>
                                    <Link to='/register'><p className='user-register'>Register</p></Link>
                                </div>
                            )
                        }
                        <div className='other-wrap'>
                            <div className='header-line'></div>
                            <div className='user-other user-contact'></div>
                            <div className='header-line'></div>
                            <div className='user-other' id='languageBoxTop'>
                                <div id='languageTop' className='now-language'>
                                    <img src={`/assets/img/flags/${locale.toLowerCase()}.svg`} />
                                </div>
                                <div id='languageListTop' className='language-list'>
                                    <ul>
                                        <li className='language'><span className="text">简体中文</span></li>
                                        <li className='language'><span className="text">English</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authentication,
        money: state.money.money,
        locale: state.locale.locale
    };
}

const connectedMenuBar = connect(mapStateToProps)(MenuBar);
export { connectedMenuBar as MenuBar };

