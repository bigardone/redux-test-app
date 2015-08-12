import React                  from 'react';
import { PropTypes as Type }  from 'react';

import Loader                 from 'app/libs/components/Loader/Loader';

import PeopleList             from './PeopleList';

export default class People extends React.Component {
  static propTypes = {
    people: Type.object.isRequired,
    params: Type.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { isLoading } = this.props.people;

    return (
      <section id="people">
        {isLoading ? <Loader /> : <PeopleList {...this.props} />}
      </section>
    );
  }
}
