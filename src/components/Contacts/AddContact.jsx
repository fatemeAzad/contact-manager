import { Link } from "react-router-dom";
// import { useFormik } from "formik"
import { Formik } from 'formik'
import { Spinner } from "../";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";
import { useContext } from 'react';
import { ContactContext } from './../../contex/ContactContext';
import { contactSchema } from './../../validation/contactValidation';

const AddContact = () => {

  const { loading, contact, onContactChange, groups, createContactForm, errors } = useContext(ContactContext)
  // const formik = useFormik({
  //   initialValues: {
  //     fullname: "",
  //     photo: "",
  //     mobile: "",
  //     email: "",
  //     job: "",
  //     group: "",
  //   },
  //   validationSchema: contactSchema,
  //   onSubmit: (values) => {
  //     console.log(values);
  //     createContactForm(values);
  //   },
  // });


  //bejash az component Formik estafade mikonim

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <img
              src={require("../../assets/man-taking-note.png")}
              height="400px"
              style={{
                position: "absolute",
                zIndex: "-1",
                top: "130px",

                left: "100px",
                opacity: "50%",
              }}
            />
            <div className="container">
              <div className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                    style={{ color: GREEN }}
                  >
                    ساخت مخاطب جدید
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: GREEN }} />
              <div className="row mt-5">
                <div className="col-md-4">

                  {errors.map((error, index) => (
                    <p key={index} className="text-danger">{error.message}</p>
                  ))}

                  <Formik initialValues={{
                    fullname: "",
                    photo: "",
                    mobile: "",
                    email: "",
                    job: "",
                    group: "",
                  }}
                    validationSchema={contactSchema}
                    onSubmit={

                      (values) => {
                        console.log(values);
                        createContactForm(values);
                      }
                    }>
                    {
                      (formik) => (
                        <form onSubmit={formik.handleSubmit}>

                          <div className="mb-2">
                            <input
                              type="text"
                              // onChange={onContactChange}


                              // value={formik.values.fullname}
                              // name="fullname"
                              // onChange={formik.handleChange}
                              // onBlur={formik.handleBlur}

                              //beja in char khat az paiini mirim

                              {...formik.getFieldProps("fullname")}



                              //baraye inke vaghti avalio por kardi zood baraye baghie error nade va vaghti submit kardi error bede
                              className="form-control"
                              placeholder="نام و نام خانوادگی"
                            // required={true}
                            />
                            {formik.touched.fullname && formik.errors.fullname ? (
                              <p className="text-danger">{formik.errors.fullname}</p>
                            ) : null}
                          </div>
                          <div className="mb-2">
                            <input
                              type="text"

                              // name="photo"
                              // value={formik.values.photo}
                              // onChange={formik.handleChange}
                              // onBlur={formik.handleBlur}

                              {...formik.getFieldProps('photo')}

                              className="form-control"
                              // required={true}
                              placeholder="آدرس تصویر"
                            />
                            {formik.touched.photo && formik.errors.photo ? (
                              <p className="text-danger">{formik.errors.photo}</p>
                            ) : null}
                          </div>
                          <div className="mb-2">
                            <input
                              type="number"


                              // name="mobile"
                              // value={formik.values.mobile}
                              // onChange={formik.handleChange}
                              // onBlur={formik.handleBlur} 

                              {...formik.getFieldProps('mobile')}


                              className="form-control"
                              // required={true}
                              placeholder="شماره موبایل"
                            />
                            {formik.touched.mobile && formik.errors.mobile ? (
                              <p className="text-danger">{formik.errors.mobile}</p>
                            ) : null}
                          </div>
                          <div className="mb-2">
                            <input
                              type="email"


                              // name="email"
                              // value={formik.values.email}
                              // onChange={formik.handleChange}
                              // onBlur={formik.handleBlur}

                              {...formik.getFieldProps('email')}

                              className="form-control"
                              // required={true}
                              placeholder="آدرس ایمیل"
                            />
                            {formik.touched.email && formik.errors.email ? (
                              <p className="text-danger">{formik.errors.email}</p>
                            ) : null}
                          </div>
                          <div className="mb-2">
                            <input
                              type="text"

                              // name="job"
                              // value={formik.values.job}
                              // onChange={formik.handleChange}
                              // onBlur={formik.handleBlur}

                              {...formik.getFieldProps("job")}
                              className="form-control"
                              // required={true}
                              placeholder="شغل"
                            />
                            {formik.touched.job && formik.errors.job ? (
                              <p className="text-danger">{formik.errors.job}</p>
                            ) : null}
                          </div>
                          <div className="mb-2">
                            <select
                              // name="group"
                              // value={formik.values.group}
                              // onChange={formik.handleChange}
                              // onBlur={formik.handleBlur}

                              {...formik.getFieldProps('group')}
                              // required={true}
                              className="form-control"
                            >
                              <option value="">انتخاب گروه</option>
                              {groups.length > 0 &&
                                groups.map((group) => (
                                  <option key={group.id} value={group.id}>
                                    {group.name}
                                  </option>
                                ))}
                            </select>
                            {formik.touched.group && formik.errors.group ? (
                              <p className="text-danger">{formik.errors.group}</p>
                            ) : null}
                          </div>
                          <div className="mx-2">
                            <input
                              type="submit"
                              className="btn"
                              style={{ backgroundColor: PURPLE }}
                              value="ساخت مخاطب"
                            />
                            <Link
                              to={"/contacts"}
                              className="btn mx-2"
                              style={{ backgroundColor: COMMENT }}
                            >
                              انصراف
                            </Link>
                          </div>
                        </form>

                      )
                    }



                  </Formik>
                </div>
              </div>
            </div>
          </section>
        </>
      )
      }
    </>
  );
};

export default AddContact;

