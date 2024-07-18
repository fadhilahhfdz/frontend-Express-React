import SidebarMenu from "../../../components/SidebarMenu";
import Cookies from "js-cookie";
import Api from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// get token from cookies
const token = Cookies.get("token");

export default function UsersEdit() {
  // useNavigate
  const navigate = useNavigate();

  // destruct ID
  const { id } = useParams();

  // define store
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // state validation
  const [validation, setValidation] = useState([]);

  // method fetchDetailUser
  const fetchDetailUser = async () => {
    // fetch data
    await Api.get(`/api/admin/users/${id}`).then((response) => {
      // assign to state
      setName(response.data.data.name);
      setEmail(response.data.data.email);
    });
  };

  // hook useEffect
  useEffect(() => {
    // call fetchDetailUser
    fetchDetailUser();
  }, []);

  // method updateUser
  const updateUser = async (e) => {
    e.preventDefault();

    // call api
    Api.defaults.headers.common["Authorization"] = token;
    await Api.put(`/api/admin/users/${id}`, {
      name: name,
      email: email,
      password: password,
    })
      .then(() => {
        // redirect ke halaman users
        navigate("/admin/users");
      })
      .catch((error) => {
        // assign error to state validation
        setValidation(error.response.data);
      });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-3">
          <SidebarMenu />
        </div>
        <div className="col-md-9">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-header">Edit User</div>
            <div className="card-body">
              {validation.errors && (
                <div className="alert alert-danger mt-2 pb-0">
                  {validation.errors.map((error, index) => (
                    <p key={index}>
                      {error.path} : {error.msg}
                    </p>
                  ))}
                </div>
              )}
              <form onSubmit={updateUser}>
                <div className="form-group mb-3">
                  <label className="mb-1 fw-bold">Nama Lengkap</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Nama Lengkap"
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="mb-1 fw-bold">Alamat Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Alamat Email"
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="mb-1 fw-bold">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Password"
                  />
                </div>

                <button type="submit" className="btn btn-sm btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
