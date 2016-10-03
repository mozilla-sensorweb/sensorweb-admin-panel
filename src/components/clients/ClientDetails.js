import React from 'react';

class ClientDetails extends React.Component {
  render() {
    const client = this.props.client;
    return (
      <div className={(client ? "" : "hidden") + " bg-success container"}>
        <p>New API client registered</p>
        <dl className="text-overflow">
          <dt>Client name</dt>
          <dd>{(client && client.name)}</dd>
          <dt>Client key</dt>
          <dd>{(client && client.key)}</dd>
          <dt>Client secret</dt>
          <dd>{(client && client.secret)}</dd>
        </dl>
      </div>
    );
  }
}

ClientDetails.propTypes = {
  client: React.PropTypes.object
};

export default ClientDetails;
