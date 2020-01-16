import React from 'react';
import Header from './misc/Header';
import users from './../data/users.json'
import UsersList from './users/UsersList';
import UserForm from './users/UserForm';

class App extends React.Component {
  state = {
    users
  }

  handleAddUser = (user) => {
    
    this.setState({
      users: [...this.state.users, user]
    })
  }

  render() {
    return (
      <div className="App">
        <Header/>

        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <UserForm onAddUser={this.handleAddUser} />
            </div>

            <div className="col">
              <UsersList users={this.state.users}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
