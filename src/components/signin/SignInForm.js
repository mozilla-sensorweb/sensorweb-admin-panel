import React from 'react';
import classnames from 'classnames';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      error: '',
      isLoading: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      error: '',
      isLoading: true
    });
    this.props.userSignInRequest(this.state).then(
      () => {
        this.setState({ isLoading: false });
        this.context.router.push('/');
      },
      (error) => {
        console.error(error);
        this.setState({
          error: error,
          isLoading: false
        });
      }
    );
  }

  render() {
    const error = this.state.error;
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Admin login</h2>

        <div className={classnames("form-group", {'has-error': error})}>
          <label className="control-label">Password</label>
          <input
            value={this.state.password}
            onChange={this.onChange}
            type="password"
            name="password"
            className="form-control"
          />
          {error && <span className="help-block">{error}</span>}
        </div>

        <div className="form-group">
          <button disabled={this.state.isLoading}
                  className="btn btn-primary btn-lg">
            Sign In
          </button>
        </div>

      </form>
    );
  }
}

SignInForm.propTypes = {
  userSignInRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

SignInForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SignInForm;
