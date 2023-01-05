import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem.js';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please add a contact...</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map(eachContact => (
              <CSSTransition
                key={eachContact.id}
                timeout={500}
                classNames='item'
              >
                <ContactItem contactprop={eachContact} />
              </CSSTransition>
            ))
          : contacts.map(eachContact => (
              <CSSTransition
                key={eachContact.id}
                timeout={500}
                classNames='item'
              >
                <ContactItem contactprop={eachContact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
