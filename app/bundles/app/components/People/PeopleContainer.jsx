import React                    from 'react';
import { PropTypes as Type }    from 'react';
import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';

import People                   from './People'

import fetchData                from '../../decorators/fetchData';

import * as AuthActions         from '../../actions/AuthActions';
import * as PeopleActions       from '../../actions/PeopleActions';

@fetchData(({ apiHost, auth, dispatch, params }) => {
  return dispatch(PeopleActions.loadPeople({ apiHost }));
})

@connect(state => ({
  auth    : state.auth,
  people  : state.people
}))

export default class PeopleContainer extends React.Component {
  static propTypes = {
    auth    : Type.object.isRequired,
    people  : Type.object.isRequired,
    dispatch: Type.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { auth, people, dispatch } = this.props;

    return (
      <People
        auth={auth}
        authActions={bindActionCreators(AuthActions, dispatch)}
        people={people}
        peopleActions={bindActionCreators(PeopleActions, dispatch)}
        {...this.props}
      />
    );
  }
}
