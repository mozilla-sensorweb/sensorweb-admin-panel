import { connect }                from 'react-redux';
import ClientDetails              from './ClientDetails';
import ClientForm                 from './ClientForm';
import ClientList                 from './ClientList';
import React                      from 'react';
import {
  getClientsRequest,
  getPermissionsRequest,
  registerClientRequest,
  removeClientRequest
}  from '../../actions/clientActions';

class Clients extends React.Component {
  render() {
    const {
      getClientsRequest,
      getPermissionsRequest,
      registerClientRequest,
      removeClientRequest
    } = this.props;
    const {
      lastRegisteredClient,
      clientList,
      permissions
    } = this.props.clients;

    return (
      <div className="jumbotron">
        <ClientForm registerClientRequest={registerClientRequest}
                    getPermissionsRequest={getPermissionsRequest}
                    permissions={permissions}/>
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
  getPermissionsRequest,
  registerClientRequest,
  removeClientRequest
})(Clients);
