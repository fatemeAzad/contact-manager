
import { getAllGroups, getContact, updateContact } from "../../services/contactServices";
import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";


import { Contacts, Spinner } from "../";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";
import { ErrorMessage, Formik, Form, Field } from "formik";
import { contactSchema } from './../../validation/contactValidation';
import { toast } from 'react-toastify';
import { ContactContext } from './../../contex/ContactContext';
import { useContext } from "react"

const EditContact = () => {
  const { setContacts, setFilteredContacts, contacts } = useContext(ContactContext)
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [forceRender, setForceRender] = useState(true)
  const [state, setState] = useState({
    loading: false,
    contact: {
      fullname: "",
      photo: "",
      mobile: "",
      email: "",
      job: "",
      group: "",
    },
    groups: [],
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        const { data: contactData } = await getContact(contactId);
        const { data: groupsData } = await getAllGroups();
        setState({
          ...state,
          loading: false,
          contact: contactData,
          groups: groupsData,
        });
      } catch (err) {
        console.log(err);
        setState({ ...state, loading: false });
      }
    };

    fetchData();
  }, []);

  const setContactInfo = (event) => {

    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: [event.target.value]
      },
    });
  };

  const submitForm = async (values) => {

    /*
       * NOTE
       * 1- forceRender -> setForceRender(true)
       * 2- Send request server
       * 3- Update local state
       * 4- Update local state before sending request to server
       */



    // const allContacts = [...contacts];
    //     const contactIndex = allContacts.findIndex(
    //       (c) => c.id === parseInt(contactId)
    //     );
    //     allContacts[contactIndex] = { ...data };

    //     setContacts(allContacts);
    //     setFilteredContacts(allContacts);
    try {
      setState({ ...state, loading: true });
      const { data, status } = await updateContact(values, contactId);

      if (status == 200) {
        const allContacts = [...contacts];
        const contactIndex = allContacts.findIndex(
          (c) => c.id === parseInt(contactId)
        );
        allContacts[contactIndex] = values;

        setFilteredContacts(allContacts);
        setState({ ...state, loading: false });

        toast.info("مخاطب با موفقیت ویرایش شد")
        navigate("/contacts");

      }
    } catch (err) {
      console.log(err);
      setState({ ...state, loading: false });
    }
  };

  const { loading, contact, groups } = state;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                  <Formik initialValues={{
                    fullname: contact.fullname,
                    photo: contact.photo,
                    mobile: contact.mobile,
                    email: contact.email,
                    job: contact.job,
                    group: contact.group,
                  }}
                    validationSchema={contactSchema}
                    onSubmit={

                      (values) => {
                        console.log(values);
                        submitForm(values);
                      }
                    }>
                    {

                      <Form>

                        <div className="mb-2">
                          <Field
                            name="fullname"
                            type="text"
                            className="form-control"
                            placeholder="نام و نام خانوادگی"
                          />
                          <ErrorMessage name="fullname"
                            render={(msg) => (<div className="text-danger">{msg}</div>)} />
                        </div>
                        <div className="mb-2">
                          <Field
                            name="photo"
                            type="text"
                            className="form-control"
                            placeholder="آدرس تصویر"
                          />
                          <ErrorMessage name="photo"
                            render={(msg) => (<div className="text-danger">{msg}</div>)} />
                        </div>
                        <div className="mb-2">
                          <Field
                            name="mobile"
                            type="number"
                            className="form-control"
                            placeholder="شماره موبایل"
                          />
                          <ErrorMessage name="mobile"
                            render={(msg) => (<div className="text-danger">{msg}</div>)} />
                        </div>
                        <div className="mb-2">
                          <Field
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="آدرس ایمیل"
                          />
                          <ErrorMessage name="email"
                            render={(msg) => (<div className="text-danger">{msg}</div>)} />
                        </div>
                        <div className="mb-2">
                          <Field
                            name="job"
                            type="text"
                            className="form-control"

                            placeholder="شغل"
                          />
                          <ErrorMessage name="job"
                            render={(msg) => (<div className="text-danger">{msg}</div>)} />
                        </div>
                        <div className="mb-2">
                          <Field
                            name="group"
                            as="select"
                            className="form-control"
                          >
                            <option value="">انتخاب گروه</option>
                            {groups.length > 0 &&
                              groups.map((group) => (
                                <option key={group.id} value={group.id}>
                                  {group.name}
                                </option>
                              ))}
                          </Field>
                          <ErrorMessage name="group"
                            render={(msg) => (<div className="text-danger">{msg}</div>)} />
                        </div>
                        <div className="mx-2">
                          <input
                            type="submit"
                            className="btn"
                            style={{ backgroundColor: PURPLE }}
                            value="ویرایش مخاطب"
                          />
                          <Link
                            to={"/contacts"}
                            className="btn mx-2"
                            style={{ backgroundColor: COMMENT }}
                          >
                            انصراف
                          </Link>
                        </div>
                      </Form>


                    }



                  </Formik>
                </div>
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;

