import * as actionTypes  from '../constants/PeopleConstants';

const initialState = {
  type        : null,
  person      : {},
  destroyed   : null,
  errors      : null,
  isLoading   : false,
  isPosting   : false,
  isDestroying: false
};

export default function person(state = initialState, action) {
  const { type, person, errors } = action;

  switch (type) {
    case actionTypes.PERSON_LOAD_REQUESTED:
      return {
        ...state,
        type,
        person: {},
        isLoading: true
      };

    case actionTypes.PERSON_LOAD_SUCCEED:
      return {
        ...state,
        type,
        person,
        errors    : null,
        isLoading : false
      };

    case actionTypes.PERSON_LOAD_FAILED:
      return {
        ...state,
        type,
        errors,
        person : {},
        isLoading: false
      };

    default:
      return state;
  }
}
