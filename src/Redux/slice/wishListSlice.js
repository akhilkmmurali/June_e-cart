import { createSlice } from "@reduxjs/toolkit";



const wishListSLice = createSlice({
    name : "wishlist",
    initialState:{
        wishlist:[]
    },
    reducers:{
        addToWishList:(state,action)=>{
            state.wishlist.push(action.payload)
        },
        removeFromWishlist:(state,action)=>{
            state.wishlist=state.wishlist.filter(item=>item.id!=action.payload)
        }

    }
})


export const{addToWishList,removeFromWishlist}=wishListSLice.actions
export default wishListSLice.reducer