export const INITIAL_STATE = {
    userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
    gigTitle:"" ,
    category:"",
    cover:"",
    gigImages:[],
    gigDescription:"",
    shortTitle:"",
    shortDescription:"",
    deliveryTime:0,
    revisionNumber:0,
    Features:[],
    price:0,
}
export const gigReducer = (state,action) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            }
            case "ADD_IMAGES":
                return {
                    ...state,
                   cover:action.payload.cover,
                   gigImages:action.payload.gigImages,
                }
                 case "ADD_FEATURE":
                return {
                    ...state,
                   Features :[...state.Features, action.payload],
                   
                }
                case "REMOVE_FEATURE":
                return {
                    ...state,
                     Features: state.Features.filter(
                        (feature)=>feature!==action.payload),
                };
        default:
            return state;
    }
}