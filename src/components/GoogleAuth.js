import React from 'react';

class GoogleAuth extends React.Component {

    state = { isSignedIn: null };

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
                //Now to make the component re-render we change the state of the component.
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                //Wiring up a change handler/Event listener
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return <div />;
        } else if (this.state.isSignedIn) {
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

export default GoogleAuth;