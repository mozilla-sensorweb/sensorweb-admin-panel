import React              from 'react';
import FlashMessagesList  from './flash/FlashMessagesList';
import NavigationBar      from './NavigationBar';
import SignIn             from './signin/SignIn';
import { connect }        from 'react-redux';

class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        <NavigationBar />
        <FlashMessagesList />
        {(isAuthenticated ? this.props.children : <SignIn/>)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {})(App);
