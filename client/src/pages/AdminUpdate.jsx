import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const params = useParams();
  const { authorizationToken, API } = useAuth();
  const updateUser = async () => {
    try {
      const response = await fetch(
        `${API}/api/admin/users/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log(`user single data ${data}`);

      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    updateUser();
  }, []);
  
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]:value,
    });
  };
  const handleSubmit = async(e) =>{
    e.preventDefault();
    //console.log("handle submit");
    try {
      const response = await fetch(`${API}/api/admin/users/update/${params.id}`,{
        method:"PATCH",
        headers:{
          'Content-Type':'application/json',
          Authorization : authorizationToken,
          },
          body:JSON.stringify(data),
        });
        if (response.ok) {
          toast.success("updated successfully"); 
        } else {
          toast.error("Not updated");
        }
      } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
        <section className="section-contact">
          <div className="container contact-content">
            <h1 className="main-heading">Update user data</h1>
          </div>
          <div className="container grid grid-two-cols">
            <section className="section-form">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={data.username}
                    id="username"
                    placeholder="Enter your name..."
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    id="email"
                    placeholder="Enter your email..."
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="phone">Mobile</label>
                  <input
                    type="number"
                    name="phone"
                    value={data.phone}
                    id="phone"
                    placeholder="Enter your number..."
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <button type="submit" className="btn-submit">
                    Update
                  </button>
                </div>
              </form>
            </section>
          </div>
        </section>
    </>
  );
};
