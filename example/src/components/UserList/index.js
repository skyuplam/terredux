import React from 'react';

const UserList = (props) => {
  const { users } = props;
  return (
    <div>
      <h1>A list of users from Github.</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {!users ? null :
            users.map((u) =>
              (<tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.login}</td>
                <td><a href={u.html_url}>Github Address</a></td>
              </tr>)
            )
          }
        </tbody>
      </table>
    </div>
  );
};

UserList.propsType = {
  users: React.PropTypes.array,
}

export default UserList;
