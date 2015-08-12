import React                  from 'react';
import { PropTypes as Type }  from 'react';
import { Link }               from 'react-router';

import classNames                from 'classnames';


export default class Person extends React.Component {


  static propTypes = {
    person: Type.shape({
      id           : Type.number.isRequired,
      first_name   : Type.string.isRequired,
      last_name    : Type.string.isRequired,
      email        : Type.string.isRequired,
      birth_date   : Type.string.isRequired,
      location     : Type.string.isRequired,
      headline     : Type.string.isRequired,
      gender       : Type.string.isRequired,
      phone_number : Type.string.isRequired,
      picture      : Type.string.isRequired
    }).isRequired,
    loader  : Type.object,
    setTitle: Type.func
  }


  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.loader.done();
  }

  render() {
    const { person } = this.props;

    const cardClasses = classNames({
      card: true,
      female: person.gender === 'female',
      male: person.gender === 'male'
    });

    return (
      <div className={cardClasses}>
        <header>
          <div className="avatar-wrapper">
            <img className="avatar" src={person.picture} />
          </div>
          <div className="info-wrapper">
            <h4>{person.first_name} {person.last_name}</h4>
            <ul className="meta">
              <li><i className="fa fa-map-marker"></i> {person.location}</li>
              <li><i className="fa fa-birthday-cake"></i> {person.birth_date}</li>
            </ul>
          </div>
        </header>
        <div className="card-body">
          <div className="headline">
            <p>{person.headline}</p>
          </div>
          <ul className="contact-info">
            <li><i className="fa fa-phone"></i> {person.phone_number}</li>
            <li><i className="fa fa-envelope"></i> {person.email}</li>
          </ul>
        </div>
      </div>
    );
  }
}
