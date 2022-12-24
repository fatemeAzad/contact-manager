import Contact from "./Contact";
import { CURRENTLINE, PINK } from "../../helpers/colors";
// import NotFound from '../../assets/no-found.gif';
import { ORANGE } from './../../helpers/colors';
import Spinner from "../Spinner";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ContactContext } from './../../contex/ContactContext';

const Contacts = () => {
  const { filteredContacts, loading, deleteContact } = useContext(ContactContext)
  return (
    <>


      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3">
                <Link to="/contacts/add" className="btn mx-2" style={{ backgroundColor: PINK }}>
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-2" />
                </Link >
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? <Spinner /> : (
        <section className="container">

          <div className="row">
            {/* Contact */}
            {filteredContacts.length > 0 ? (filteredContacts.map((c) => (<Contact contact={c} key={c.id}
              deleteContact={() => deleteContact(c.id, c.fullname)} />))) :

              (
                <div
                  className="text-center py-5"
                  style={{ backgroundColor: CURRENTLINE }}
                >
                  <p className="h3" style={{ color: ORANGE }}>
                    مخاطب یافت نشد ...
                  </p>
                  <img
                    // src={NotFound}
                    src={require("../../assets/no-found.gif")}
                    alt="پیدا نشد"
                    className="w-25"
                  />
                </div>

              )}

          </div>
        </section>
      )}


    </>
  );
};

export default Contacts;
