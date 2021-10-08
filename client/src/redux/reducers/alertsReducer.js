const initialState ={
    loading : false,
    likeOrUnlikeLoading : false,
    addCommentLoading : false,
    followLoading : false,
    unfollowLoading : false,
    editPostLoading : false,
    deletePostLoading : false,
}

export const alertsReducer = (state=initialState , action)=>{

    switch(action.type){

          
        case 'LOADING' : return {
            ...state ,
            loading : action.payload
        }
        case 'LIKE_UNLIKE_LOADING' : return {
            ...state ,
            likeOrUnlikeLoading : action.payload
        }
        case 'ADD_COMMENT_LOADING' : return {
            ...state,
            addCommentLoading : action.payload
        }
        case 'FOLLOW_LOADING' : return {
            ...state,
            followLoading : action.payload
        }
        case 'UNFOLLOW_LOADING' : return {
            ...state,
            unfollowLoading : action.payload
        }
        case 'EDIT_POST_LOADING' : return {
            ...state ,
            editPostLoading : action.payload
        }
        case 'DELETE_POST_LOADING' : return {
            ...state,
            deletePostLoading : action.payload
        }

        default : return state


    }

}