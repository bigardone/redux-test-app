
import apiCall            from 'app/libs/apiCall';

import * as actionTypes   from '../constants/PeopleConstants';

export function loadPeople({apiHost}) {
  return dispatch => {
    dispatch({
      type: actionTypes.PEOPLE_LOAD_REQUESTED
    });

    return apiCall({
      method: 'GET',
      path: '/people',
      host: apiHost
    })
      .then(res => {
        dispatch({
          type:     actionTypes.PEOPLE_LOAD_SUCCEED,
          people:   res.data.people
        });
      })
      .catch(res => {
        dispatch({
          type  : actionTypes.PEOPLE_LOAD_FAILED,
          errors: {
            code: res.status,
            data: res.data
          }
        });
      });
  };
}

export function loadPerson({apiHost}, id) {
  return dispatch => {
    dispatch({
      type: actionTypes.PERSON_LOAD_REQUESTED
    });

    return apiCall({
      method: 'GET',
      path: `/people/${id}`,
      host: apiHost
    })
    .then(res => {
      dispatch({
        type:     actionTypes.PERSON_LOAD_SUCCEED,
        person:   res.data.person
      });
    })
    .catch(res => {
      dispatch({
        type  : actionTypes.PERSON_LOAD_FAILED,
        errors: {
          code: res.status,
          data: res.data
        }
      });
    });
  };
}
