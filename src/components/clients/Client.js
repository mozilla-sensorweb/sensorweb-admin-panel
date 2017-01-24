import React from 'react';

class Client extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.removeClientRequest(this.props.apikey);
  }

  render() {
    const authRedirectUrls =
      this.props.authRedirectUrls ? this.props.authRedirectUrls.map(url => {
        return (
          <p className="table-redirect-url" key={url}>
            <a href={url}>
              {url}
            </a>
          </p>
        );
      }) : [];

    const authFailureRedirectUrls =
      this.props.authFailureRedirectUrls ?
      this.props.authFailureRedirectUrls.map(url => {
        return (
          <p className="table-redirect-url" key={url}>
            <a href={url}>
              {url}
            </a>
          </p>
        );
      }) : [];

    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.apikey}</td>
        <td>{authRedirectUrls}</td>
        <td>{authFailureRedirectUrls}</td>
        <td><button onClick={this.onClick}>Remove</button></td>
      </tr>
    );
  }
}

Client.propTypes = {
  apikey: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  removeClientRequest: React.PropTypes.func.isRequired
};

export default Client;
