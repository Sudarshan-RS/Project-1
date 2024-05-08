import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";


export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  
  const navigate = useNavigate();
  const { storeTokenInLS, API } = useAuth();
  const URL = `${API}/api/auth/register`;
  // Handling the input values
  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handling form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert("Registration Successful");

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log("res form server", res_data);
      if (response.ok) {
        // console.log("token", res_data.token);
        // localStorage.setItem('token', res_data.token)
        storeTokenInLS(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration successful");
        navigate("/");
      }else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main>
        <section>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="reg-img">
                <img
                  src="/images/register.png"
                  alt="a girl is trying to do register"
                  width="500"
                  height="500"
                />
              </div>
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <br />
                <form action="" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Enter your name..."
                      autoComplete="off"
                      required
                      value={user.username}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email..."
                      autoComplete="off"
                      required
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      placeholder="Enter your phone..."
                      autoComplete="off"
                      required
                      value={user.phone}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password..."
                      autoComplete="off"
                      required
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <button type="submit" className="btn-submit">
                    Register Now!
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
