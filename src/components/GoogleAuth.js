import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        //Since this loading is an async call, we pass in a callback function
        window.gapi.load('client:auth2', () => {
            //To the init function we pass in the client Id we acquired.
            window.gapi.client.init({
                clientId: '1022003441792-11fi6am556cisgd2bfnbg0cfot2erp8o.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                //This is a promise resolution, which is why we need a then and not a callback fn.
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                //Wiring up a change handler/Event listener
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn();
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null || this.props.isSignedIn === undefined) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <div className="ui red google button" onClick={this.onSignInClick}>
                    <i className="google icon" />
                    Sign in with Google
                </div>
            )
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    };
}

//This function is always outside the class
const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);