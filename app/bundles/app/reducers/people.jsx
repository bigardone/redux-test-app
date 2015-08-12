import * as actionTypes  from '../constants/PeopleConstants';

const initialState = {
  type        : null,
  people    : [],
  destroyed   : null,
  errors      : null,
  isLoading   : false,
  isPosting   : false,
  isDestroying: false
};

export default function people(state = initialState, action) {
  const { type, people, errors } = action;

  switch (type) {
    case actionTypes.PEOPLE_LOAD_REQUESTED:
      return {
        ...state,
        type,
        people: [],
        isLoading: true
      };

    case actionTypes.PEOPLE_LOAD_SUCCEED:
      return {
        ...state,
        type,
        people,
        errors   : null,
        isLoading: false
      };

    case actionTypes.PEOPLE_LOAD_FAILED:
      return {
        ...state,
        type,
        errors,
        people : [],
        isLoading: false
      };

    default:
      return state;
  }
}
