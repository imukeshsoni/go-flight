import React from "react";

function UserProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan="2">User Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>User Name</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>User Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>User Phone</td>
            <td>{user.phone}</td>
          </tr>
          <tr>
            <td>User Gender</td>
            <td>{user.gender}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserProfile;
