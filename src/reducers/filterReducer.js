const initialState = {
    archivedFilters:[

    ],
    filter:[
    ]
}
export default(state= initialState,action) =>{
    
    switch(action.type){
        case "SET_FILTER_VALUE":
            console.log("filter value is in the reducer",action.payload);
            
            return{
                archivedFilters:[...state.archivedFilters,action.payload ],
                filter:[action.payload  ]

            }
    }
    return state;
}