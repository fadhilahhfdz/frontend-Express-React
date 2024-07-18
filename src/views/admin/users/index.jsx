import { Link } from "react-router-dom";
import SidebarMenu from "../../../components/SidebarMenu";
import Cookies from "js-cookie";
import Api from "../../../services/api";
import { useEffect, useState } from "react";

export default function UsersIndex() {
  // init state "user"
  const [users, setUsers] = useState([]);

  // define method "fetchDataUsers"
  const fetchDataUsers = async () => {
    // get token from cookies inside the function to ensure it up to date
    const token = Cookies.get("token");

    if (token) {
      // set authorization header with token
      Api.defaults.headers.common["Authorization"] = token;

      // fetch data from API with Axios
      try {
        const response = await Api.get("api/admin/users");
        // assign response to state "users"
        setUsers(response.data.data);
      } catch (error) {
        console.error("There was an error fetching the users!", error);
      }
    } else {
      console.error("Token is not available!");
    }
  };
  // run hook useEffect
  useEffect(() => {
    // cal method "fetchDataUsers"
    fetchDataUsers();
  }, []);

  // define method deleteUser
  const deleteUser = async (id) => {
    // get token from cookies
    const token = Cookies.get("token");

    if (token) {
      // set authorization header with token
      Api.defaults.headers.common["Authorization"] = token;

      try {
        // fetch data from api with axios
        await Api.delete(`api/admin/users/${id}`);

        // call method fetchdataUsers
        fetchDataUsers();
      } catch (error) {
        console.error("There was an error deleting the user!", error);
      }
    } else {
      console.error("Token is not available");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-3">
          <SidebarMenu />
        </div>
        <div className="col-md-9">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>Users</span>
              <Link
                to="/admin/users/create"
                className="btn btn-sm btn-success rounded shadow-sm border-0"
              >
                Add User
              </Link>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="bg-primary text-white">
                  <tr>
                    <th scope="col">Nama Lengkap</th>
                    <th scope="col">Alamat Email</th>
                    <th scope="col" style={{ width: "17%" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className="text-center">
                          <Link
                            to={`/admin/users/edit/${user.id}`}
                            className="btn btn-sm btn-warning text-white rounded-sm shadow border-0 me-2"
                          >
                            Edit
                          </Link>
                          <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger rounded-sm shadow border-0">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        <div className="alert alert-danger mb-0">
                          Data Belum Tersedia!
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
