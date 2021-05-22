import {Route, Switch} from 'react-router-dom';
import Home from "../components/Home";
import Login from "../components/Login";
import UserSignup from "../components/UserSignup";
import User from "../components/User";

function App() {
    return (
        <div>
            <div className={'container'}>
                <Switch>
                    <Route exact path={'/'} component={Home}/>
                    <Route path={'/login'} component={Login}/>
                    <Route path={'/signup'} component={UserSignup}/>
                    <Route path={'/:username'} component={User}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
