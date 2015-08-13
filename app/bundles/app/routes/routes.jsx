import React                from 'react';
import { Route }            from 'react-router';

import App                  from '../layouts/App';
import Dummy                from '../components/Dummy/DummyContainer';
import Login                from '../components/Login/LoginContainer';
import Logout               from '../components/Logout/Logout';
import NotFound             from '../components/NotFound/NotFound';
import People               from '../components/People/PeopleContainer'
import Person               from '../components/People/PersonContainer'


export default (context) => (

  <Route name="app" component={App}>

    <Route name="dummy"       path="/"        component={Dummy} />

    <Route name="login"       path="/login"   component={Login}   context={context}   onEnter={Login.DecoratedComponent.checkAuth} />
    <Route name="logout"      path="/logout"  component={Logout} />

    <Route name="people"      path="/people"  component={People} />
    <Route name="person"      path="/people/:id"  component={Person} context={context} onEnter={Person.DecoratedComponent.DecoratedComponent.checkAuth}/>

    <Route name="not-found"   path="*"        component={NotFound} />
  </Route>

);
