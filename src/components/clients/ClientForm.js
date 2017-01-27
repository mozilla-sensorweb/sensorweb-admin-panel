import React from 'react';
import Select from 'react-select';

class ClientForm extends React.Component {
  constructor(props) {
    super(props);

    this.props.getPermissionsRequest();
    this.initialState = {
      clientName: '',
      authRedirectUrls: [],
      authRedirectUrlsInputCount: 1,
      authFailureRedirectUrls: [],
      authFailureRedirectUrlsInputCount: 1,
      permissions: [],
      error: '',
      isLoading: false
    };
    this.state = this.initialState;
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onRedirectUrlChange = this.onRedirectUrlChange.bind(this);
    this.onPermissionsChange = this.onPermissionsChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onPermissionsChange(permissions) {
    this.setState({
      'permissions': permissions.map(permission => permission.value)
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
      this.setState(this.initialState);
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

    const permissions = this.props.permissions.map(permission => {
      return { value: permission, label: permission };
    });

    const selectedPermissions = this.state.permissions.map(permission => {
      return { value: permission, label: permission };
    });

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
          <fieldset>
            <label className="control-label">Permissions</label>
            <Select name="permissions"
                    options={permissions}
                    value={selectedPermissions}
                    placeholder="Select permissions"
                    onChange={this.onPermissionsChange}
                    multi/>
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
  permissions: React.PropTypes.array.isRequired,
  getPermissionsRequest: React.PropTypes.func.isRequired,
  registerClientRequest: React.PropTypes.func.isRequired
};

export default ClientForm;
