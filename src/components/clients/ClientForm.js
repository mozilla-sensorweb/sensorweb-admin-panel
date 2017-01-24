import React from 'react';

class ClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: '',
      authRedirectUrls: [],
      authRedirectUrlsInputCount: 1,
      authFailureRedirectUrls: [],
      authFailureRedirectUrlsInputCount: 1,
      error: '',
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onRedirectUrlChange = this.onRedirectUrlChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onRedirectUrlChange(e) {
    const urls = this.state[e.target.name].slice();
    urls[e.target.id] = e.target.value;
    this.setState({
      [e.target.name]: urls
    });
  }

  onClick(e) {
    this.setState({
      [e.target.name]: this.state[e.target.name] + 1
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      error: '',
      isLoading: true
    });
    this.props.registerClientRequest(this.state).then(() => {
      this.setState({ isLoading: false });
    }, error => {
      console.error(error);
      this.setState({
        error,
        isLoading: false
      });
    });
  }

  render() {
    let authRedirectUrls = [];
    for (let i = 0; i < this.state.authRedirectUrlsInputCount; i++) {
      authRedirectUrls.push(
        <input value={this.state.authRedirectUrls[i]}
               id={i} key={i}
               name="authRedirectUrls" className="form-control"/>
      );
    }

    let authFailureRedirectUrls = [];
    for (let i = 0; i < this.state.authFailureRedirectUrlsInputCount; i++) {
      authFailureRedirectUrls.push(
        <input value={this.state.authFailureRedirectUrls[i]}
               id={i} key={i}
               name="authFailureRedirectUrls" className="form-control"/>
      );
    }

    return (
      <form className="container" onSubmit={this.onSubmit}>
        <div className="form-group">
          <fieldset onChange={this.onChange}>
            <label className="control-label">Client name</label>
            <input value={this.state.clientName}
                   name="clientName" className="form-control"/>
          </fieldset>
          <fieldset onChange={this.onRedirectUrlChange}>
            <label className="control-label">Auth redirect URLs</label>
            <button type="button"
                    onClick={this.onClick} name="authRedirectUrlsInputCount"
                    className="btn">
              <span className="glyphicon glyphicon-plus"></span>
            </button>
            {authRedirectUrls}
            <label className="control-label">Auth failure redirect URLs</label>
            <button type="button"
                    onClick={this.onClick} name="authFailureRedirectUrlsInputCount"
                    className="btn">
              <span className="glyphicon glyphicon-plus"></span>
            </button>
            {authFailureRedirectUrls}
          </fieldset>
        </div>
        <div className="form-group">
          <button disabled={this.state.isLoading}
                  className="btn btn-primary btn-lg">
            Register
          </button>
        </div>
      </form>
    );
  }
}

ClientForm.propTypes = {
  registerClientRequest: React.PropTypes.func.isRequired
};

export default ClientForm;
