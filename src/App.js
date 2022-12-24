import { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { AddContact, Contact, Contacts, Navbar, EditContact, contactSearch, ViewContact } from "./components";
import { createContact, getAllContacts, getAllGroups, deleteContact } from "./services/contactServices"
import { PURPLE, YELLOW, FOREGROUND, COMMENT, CURRENTLINE } from './helpers/colors';
import { getSuggestedcontactQuery } from "@testing-library/react";
import { ContactContext } from "./contex/ContactContext";
import { contactSchema } from './validation/contactValidation';
import { ToastContainer, toast } from "react-toastify";
const App = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [forceRender, setForceRender] = useState(true);
  const [errors, setErrors] = useState([])
  const [contact, setContact] = useState({
    fullname: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
    group: "",
  });
  // const [contactQuery, setContactQuery] = useState({ text: "" });
  const [filteredContacts, setFilteredContacts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();


        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setFilteredContacts(contactsData)
        setGroups(groupsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();


        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [forceRender])
  const onContactChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value

    })

  }

  const createContactForm = async (values) => {
    // event.preventDefault();
    try {
      setLoading((prevLoading) => !prevLoading);

      // await contactSchema.validate(contact, { abortEarly: false });

      const { status, data } = await createContact(values);


      if (status === 201) {
        const allContacts = [...contacts, data];

        setContacts(allContacts);
        setFilteredContacts(allContacts);
        toast.success("مخاطب با موفقیت ساخته شد")
        // setContact({});
        // setErrors([]);
        setLoading((prevLoading) => !prevLoading);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      // console.log(err.inner);
      // setErrors(err.inner);
      setLoading((prevLoading) => !prevLoading);
    }
  };

  const removeContact = async (contactId) => {
    try {

      setLoading(true);
      const response = await deleteContact(contactId);

      const updatedContacts = contacts.filter((c) => (c.id !== contactId))

      if (response) {
        // const { data: contactsData } = await getAllContacts();
        setFilteredContacts(updatedContacts);

        setLoading(false)
        toast.error("مخاطب با موفقیت حذف شد")


      }
    } catch (err) {

      console.log(err.message);
      setLoading(false)
    }
  }
  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };
  var timeout;
  const contactSearch = (query) => {
    // setContactQuery({ ...contactQuery, text: event.target.value });
    // setContactQuery({ text: event.target.value });



    // const allContacts = contacts.filter((contact) => {
    //   return contact.fullname.toLowerCase().includes(event.target.value.toLowerCase())
    // });
    // setFilteredContacts(allContacts)  ////////////////chon filter karesh ke tamoom mishe akharsar araye return mikone

    clearTimeout(timeout)
    timeout = setTimeout(() => {
      console.log(query);
      setFilteredContacts(contacts.filter((contact) => {
        return contact.fullname.toLowerCase().includes(query.toLowerCase())
      }));
    }, 1000);

  }

  return (
    <ContactContext.Provider value={{
      loading,
      setLoading,
      contact,
      setContact,
      // contactQuery,
      errors,
      contacts,
      setContacts,
      forceRender,
      setForceRender,
      filteredContacts,
      setFilteredContacts,
      groups,
      onContactChange,
      deleteContact: confirmDelete,
      createContactForm,
      contactSearch,
    }}>

      <div className="App">
        <ToastContainer rtl={true} theme="colored" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact forceRender={forceRender} setForceRender={setForceRender} />} />
          <Route path="/contacts/:contactId" element={<Contact contact={contact} deleteContact={confirmDelete} />} />
          <Route path="/contacts/view/:contactId" element={<ViewContact />} />
        </Routes>

      </div>
    </ContactContext.Provider>
  );
};

export default App;
