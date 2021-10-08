const initialState = {
    posts : [] 
}

export const postsReducer=(state=initialState , action)=>{

    switch(action.type){


        case 'GET_ALL_POSTS' : {
            return {
                ...state,
                posts : action.payload
            }
        }

        default : return state

    }

}