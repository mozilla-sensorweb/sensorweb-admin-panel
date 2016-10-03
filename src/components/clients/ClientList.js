import React  from 'react';
import Client from './Client';

class ClientList extends React.Component {
  constructor(props) {
    super(props);
    this.props.getClientsRequest();
  }

  render() {
    return (
      <div className="container">
        <h3>API Clients</h3>
        <table className="table">
          <thead>
            <tr>
              {['Name', 'API key'].map(title => {
                return <th key={title}>{title}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.clients.map(client => {
              return <Client key={client.key}
                             name={client.name}
                             apikey={client.key}
                             removeClientRequest={this.props.removeClientRequest}/>
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

ClientList.propTypes = {
  clients: React.PropTypes.array.isRequired,
  getClientsRequest: React.PropTypes.func.isRequired,
  removeClientRequest: React.PropTypes.func.isRequired
};

export default ClientList;
