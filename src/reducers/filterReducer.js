const initialState = {
  archivedFilters: [],
  filter: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER_VALUE":
      return {
        archivedFilters: [...state.archivedFilters, action.payload],
        filter: [action.payload],
      };
  }
  return state;
};
