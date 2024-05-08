import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const defaultFormData = {
  username:"",
  email:"",
  message: "",
};

export const Contact = () => {
  const [contact, setContact] = useState(defaultFormData);
  const [ userData, setUserData ] = useState(true);
  const { user, API } = useAuth();
  
  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });

    setUserData(false);
  }

  // Handling the input values
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  // handling the button submit

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/api/form/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact(defaultFormData);
        toast.success("Message sent successfully");
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <main>
        <section className="section-contact">
          <div className="container contact-content">
            <h1>Contact Us</h1>
          </div>
          <div className="container grid grid-two-cols">
            <div className="contact-image">
              <img
                src="/images/support.png"
                alt="We are always ready to help"
              />
            </div>
            <section className="section-form">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={contact.username}
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
                    value={contact.email}
                    id="email"
                    placeholder="Enter your email..."
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="message">Message</label>
                  <textarea
                    type="text"
                    name="message"
                    value={contact.message}
                    id="message"
                    cols={30}
                    rows={7}
                    placeholder="Drop message here"
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <button type="submit" className="btn-submit">
                    Submit
                  </button>
                </div>
              </form>
            </section>
          </div>
          <section>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278914!2d73.91411937496402!3d18.56225398253934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20Pune!5e0!3m2!1sen!2sin!4v1701433944281!5m2!1sen!2sin"
              width="100%"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </section>
        </section>
      </main>
    </>
  );
};
