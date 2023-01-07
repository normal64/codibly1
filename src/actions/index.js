export const setFilterValue = (value) => (dispatch) =>{
   
    dispatch({
        type:"SET_FILTER_VALUE",
        payload:value
    })
}