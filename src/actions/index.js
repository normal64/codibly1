export const setFilterValue = (value) => (dispatch) =>{
    console.log(`set filter value dispatch action creator`,value);
    dispatch({
        type:"SET_FILTER_VALUE",
        payload:value
    })
}