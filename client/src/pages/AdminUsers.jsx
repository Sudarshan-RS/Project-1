import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import {Link}  from "react-router-dom";

export const AdminUsers = () => {
  const { authorizationToken, API } = useAuth();
  const [ users, setUsers ] = useState([]);

  // getAllUsersData();
  const getAllUsersData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  // delete the user on delete button

  const deleteUser = async(id)=>{
    const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if(response.ok){
        getAllUsersData();
      }
      const data = await response.json();
      console.log(`user after delete ${data}`);
  }

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Admin Users Data</h1>
      </div>
      <div className="container admin-users">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* map through the array of users and create a new row for each user */}
            {users.map((curUser, index) => {
              const {username, email, phone, _id} = curUser
                  return (
                    <tr key={index}>
                      <td>{username}</td>
                      <td>{email}</td>
                      <td>{phone}</td>
                      <td>
                        <Link to = {`/admin/users/${_id}/edit`}>Edit</Link>
                      </td>
                      <td>
                        <button onClick={() => deleteUser(_id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </>
  );
};
