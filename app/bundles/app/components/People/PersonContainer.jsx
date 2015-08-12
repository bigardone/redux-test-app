import React                    from 'react';
import { PropTypes as Type }    from 'react';
import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';

import Person                   from './Person';

import fetchData                from '../../decorators/fetchData';

import * as PeopleActions       from '../../actions/PeopleActions';

@fetchData(({ apiHost, auth, dispatch, params }) => {
  return dispatch(PeopleActions.loadPerson({ apiHost }, params.id));
})

@connect(state => ({
  auth    : state.auth,
  person  : state.person
}))

export default class PersonContainer extends React.Component {
  static propTypes = {
    auth    : Type.object.isRequired,
    person  : Type.object.isRequired,
    dispatch: Type.func.isRequired
  }

  static contextTypes = {
    router: Type.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { auth, person, dispatch, loader, setTitle } = this.props;

    return (
      <Person
        auth={auth}
        person={person.person}
        peopleActions={bindActionCreators(PeopleActions, dispatch)}
        loader={loader}
      />
    );
  }
}
