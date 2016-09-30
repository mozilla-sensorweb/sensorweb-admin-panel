import React from 'react';

class ClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: '',
      error: '',
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
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
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label className="control-label">Client name</label>
          <input
            value={this.state.clientName}
            onChange={this.onChange}
            type="text"
            name="clientName"
            className="form-control"/>
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
