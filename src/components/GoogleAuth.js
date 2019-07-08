import React from 'react';

class GoogleAuth extends React.Component {

    componentDidMount() {
        //Since this loading is an async call, we pass in a callback function
        window.gapi.load('client:auth2', () => {
            //To the init function we pass in the client Id we acquired.
            window.gapi.client.init({ clientId: '1022003441792-11fi6am556cisgd2bfnbg0cfot2erp8o.apps.googleusercontent.com', scope: 'email' });
        });

    }

    render() {
        return (
            <div>
                Google Auth
            </div>
        );
    };
}

export default GoogleAuth;