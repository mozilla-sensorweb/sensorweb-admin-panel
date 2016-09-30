import { connect }                from 'react-redux';
import ClientDetails              from './ClientDetails';
import ClientForm                 from './ClientForm';
import React                      from 'react';
import { registerClientRequest }  from '../../actions/clientActions';

class Clients extends React.Component {
  render() {
    const { lastRegisteredClient } = this.props.clients;
    return (
      <div className="jumbotron">
        <ClientForm registerClientRequest={this.props.registerClientRequest} />
        <ClientDetails client={lastRegisteredClient}/>
      </div>
    );
  }
}

Clients.propTypes = {
  lastRegisteredClient: React.PropTypes.object,
  registerClientRequest: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    clients: state.clients
  }
}

export default connect(mapStateToProps, { registerClientRequest })(Clients);
