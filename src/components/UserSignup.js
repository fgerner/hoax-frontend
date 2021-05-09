import {Component} from "react";

export class UserSignup extends Component {
    state = {
        displayName: '',
        username: '',
        password: '',
        passwordRepeat: '',
        pendingApiCall: false
    }

    onChangeDisplayName = (event) => {
        this.setState({displayName: event.target.value})
    }
    onChangeUsername = (event) => {
        this.setState({username: event.target.value})
    }
    onChangePassword = (event) => {
        this.setState({password: event.target.value})
    }
    onChangePasswordRepeat = (event) => {
        this.setState({passwordRepeat: event.target.value})
    }

    onClickSignup = () => {
        const user = {
            username: this.state.username,
            displayName: this.state.displayName,
            password: this.state.password
        }
        this.setState({pendingApiCall: true});
        this.props.actions.postSignup(user)
            .then((response) => {
                this.setState({pendingApiCall: false});
            })
            .catch((error) => {
                this.setState({ pendingApiCall: false });
                console.log(error);
            });
    }

    render() {
        return (
            <div className={'container'}>
                <h1 className={'text-center'}>Sign Up</h1>

                <div className={'col-12 mb-3'}>
                    <label htmlFor="display-name">Display Name</label>
                    <input
                        className={'form-control'}
                        id={'display-name'}
                        type="text"
                        placeholder={'Your display name'}
                        value={this.state.displayName}
                        onChange={this.onChangeDisplayName}
                    />
                </div>
                <div className={'col-12 mb-3'}>
                    <label htmlFor="username">Username</label>
                    <input
                        className={'form-control'}
                        id={'username'}
                        type="text"
                        placeholder={'Your username'}
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    />
                </div>
                <div className={'col-12 mb-3'}>
                    <label htmlFor="password">Password</label>
                    <input
                        className={'form-control'}
                        id={'password'}
                        type="password"
                        placeholder={'Your password'}
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                </div>
                <div className={'col-12 mb-3'}>
                    <label htmlFor="password-repeat">Password Repeat</label>
                    <input
                        className={'form-control'}
                        id={'password-repeat'}
                        type="password"
                        placeholder={'Repeat your password'}
                        value={this.state.passwordRepeat}
                        onChange={this.onChangePasswordRepeat}
                    />
                </div>
                <div className={'text-center'}>
                    <button
                        disabled={this.state.pendingApiCall}
                        className={'btn btn-primary'}
                        onClick={this.onClickSignup}
                    >
                        {this.state.pendingApiCall && (
                            <div className="spinner-border text-light spinner-border-sm mr-sm-1" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>)}
                        Sign up
                    </button>
                </div>
            </div>
        )
    }
}

UserSignup.defaultProps = {
    actions: {
        postSignup: () => {
            return new Promise((resolve, reject) => {
                resolve({});
            });
        }
    }
}


export default UserSignup;