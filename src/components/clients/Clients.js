import { connect }                from 'react-redux';
import ClientDetails              from './ClientDetails';
import ClientForm                 from './ClientForm';
import ClientList                 from './ClientList';
import React                      from 'react';
import {
  getClientsRequest,
  registerClientRequest,
  removeClientRequest
}  from '../../actions/clientActions';

class Clients extends React.Component {
  render() {
    const {
      getClientsRequest,
      registerClientRequest,
      removeClientRequest } = this.props;
    const { lastRegisteredClient, clientList } = this.props.clients;
    return (
      <div className="jumbotron">
        <ClientForm registerClientRequest={registerClientRequest} />
        <ClientDetails client={lastRegisteredClient}/>
        <ClientList clients={clientList}
                    getClientsRequest={getClientsRequest}
                    removeClientRequest={removeClientRequest}/>
      </div>
    );
  }
}

Clients.propTypes = {
  lastRegisteredClient: React.PropTypes.object,
  registerClientRequest: React.PropTypes.func.isRequired,
  removeClientRequest: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    clients: state.clients
  }
}

export default connect(mapStateToProps, {
  getClientsRequest,
  registerClientRequest,
  removeClientRequest
})(Clients);
