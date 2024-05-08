import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminContacts = () => {
  const { authorizationToken, API } = useAuth();
  const [contactData, setContactData] = useState([]);
  const getAllContactData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete message
  const deleteContact = async(id)=>{
    const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if(response.ok){
        getAllContactData();
      }
      const data = await response.json();
      console.log(`contact after delete ${data}`);
  }


  useEffect(() => {
    getAllContactData();
  }, []);

  return (
    <>
      <section className="Admin-contacts-section">
        <h1>Admin contact panel</h1>
        <div className="container admin-user">
          {contactData.map((currContactData, index) => {
            const { username, email, message, _id } = currContactData;
            return (
              <div key={index}>
                <p>{username}</p>
                <p>{email}</p>
                <p>{message}</p>
                <button onClick={() => deleteContact(_id)}>Delete</button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
