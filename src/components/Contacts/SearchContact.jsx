import { COMMENT } from "../../helpers/colors";

import { PURPLE } from './../../helpers/colors';
import { ContactContext } from "../../contex/ContactContext";
import { useContext } from "react";
const SearchContact = () => {
  const { contactSearch, contactQuery } = useContext(ContactContext)
  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{ backgroundColor: PURPLE }}
      >
        <i className="fa fa-search" />
      </span>
      <input
        dir="rtl"
        type="text"
        // value={contactQuery.text}
        onChange={event => contactSearch(event.target.value)}
        style={{ backgroundColor: COMMENT, borderColor: PURPLE }}
        className="form-control"
        placeholder="جستجوی مخاطب"
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
    </div>
  );
};

export default SearchContact;
