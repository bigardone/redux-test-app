import React                  from 'react';
import { PropTypes as Type }  from 'react';

import animate                from 'app/libs/animate';
import PersonCard                from './PersonCard';

import * as actionTypes       from '../../constants/PeopleConstants';

export default class PeopleList extends React.Component {


  static propTypes = {

    people: Type.shape({
      type        : Type.string,
      people      : Type.arrayOf(Type.shape({ id: Type.number.isRequired })).isRequired,
      destroyed   : Type.number,
      isDestroying: Type.bool
    }).isRequired,

    peopleActions: Type.shape({
      destroyPerson         : Type.func.isRequired,
      destroyPersonFromStore: Type.func.isRequired
    }).isRequired,

    auth: Type.shape({
      isLoggedIn: Type.bool.isRequired
    }).isRequired,

    authAgent: Type.shape({
      getAuthHeaders: Type.func.isRequired
    }),

    loader  : Type.object,
    setTitle: Type.func

  }


  constructor(props, context) {
    super(props, context);
  }


  componentDidMount() {

    this.props.loader.done();
    this.props.setTitle();

  }


  componentWillReceiveProps(newProps) {

    const { type, destroyed } = newProps.people;

    if (type === actionTypes.COMMENT_DESTROY_SUCCEED && destroyed) {
      animate(`people__list__person-${destroyed}`, 'flipOutX', () => {
        newProps.peopleActions.destroyPersonFromStore(destroyed);
      });
    } else {
      newProps.loader.done();
    }

  }


  componentDidUpdate() {

    const { type, people } = this.props.people;

    if (type === actionTypes.COMMENT_ADD_SUCCEED) {
      const newPerson = people[0];
      animate(`people__list__person-${newPerson.id}`, 'flipInX');
    }

  }


  _handleDestroy(person) {

    const { peopleActions, authAgent } = this.props;
    peopleActions.destroyPerson({
      person: person,
      auth   : authAgent.getAuthHeaders()
    });

  }


  render() {

    const { people } = this.props.people;
    const { isLoggedIn } = this.props.auth;

    const peopleList = people.map(person => (
      <li key={person.id} id={`people__list__person-${person.id}`} className="people__person">
        <PersonCard person={person} />
        {isLoggedIn && <div className="destroy" onClick={this._handleDestroy.bind(this, person.id)} />}
        {/* It's fast, don't need loader */}
        {/* isDestroying && destroyed === person.id && <div className="loader-wrapper"><Loader /></div> */}
      </li>
    ));

    return (
        <div>
          <ul id="people__list">
            {peopleList}
          </ul>
        </div>
    );

  }


}
