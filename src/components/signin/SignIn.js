import React from 'react';
import SignInForm from './SignInForm';
import { connect } from 'react-redux';
import { userSignInRequest } from '../../actions/authActions'
import { addFlashMessage } from '../../actions/flashMessages'

class SignIn extends React.Component {
  render() {
    const { userSignInRequest, addFlashMessage } = this.props;
    return (
      <div className="jumbotron">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <SignInForm userSignInRequest={userSignInRequest}
                        addFlashMessage={addFlashMessage}/>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  userSignInRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

export default connect(null, { userSignInRequest, addFlashMessage })(SignIn);
