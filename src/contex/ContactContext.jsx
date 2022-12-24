import { createContext } from "react";

export const ContactContext = createContext({
    loading: false,
    setLoading: () => { },
    forceRender: true,
    setForceRender: () => { },
    contact: {},
    setContact: () => { },
    contacts: [],
    filteredContacts: [],
    setFilteredContact: [],
    contactQuery: {},
    errors: [],
    groups: [],
    onContactChange: () => { },
    deleteContact: () => { },
    updateContact: () => { },
    createContact: () => { },
    contactSearch: () => { },

});
