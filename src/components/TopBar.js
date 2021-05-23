import {Component} from "react";
import logo from '../assets/hoaxify-logo.png'
import {Link} from "react-router-dom";

class TopBar extends Component {
    render() {
        return (
            <div className={'bg-white shadow-sm mb-2'}>
                <div className={'container'}>
                    <nav className={'navbar navbar-light navbar-expand'}>
                        <Link to={'/'} className={'navbar-brand'}>
                            <img src={logo} width={60} alt={'Hoaxify'}/> Hoaxify
                        </Link>
                        <ul className="nav navbar-nav ml-right">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/signup'}>Sign Up</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/login'}>Login</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }

}

export default TopBar;