// export let StartAddToCart=()=>{
//     return{
//         type: 'START_ADD_TO_CART'
//     }
// }

export let AddToCart=(item)=>{
    console.log(item.id)
    return{
        type: "ADD_TO_CART",
        payload: item
    }
}

export let ResetCart=()=>{
    return{
        type: "RESET_CART"
    }
}

export let DeleteCart=(item)=>{
    return{
        type: 'DELETE_CART',
        payload: item
    }
}

export let Increment=(item)=>{
    return{
        type: 'INCREMENT',
        payload: item
    }
}

export let Decrement=(item)=>{
    return{
        type: 'DECREMENT',
        payload: item
    }
}

// export let AsnycAddToCart=(items)=>{
//     return (dispatch)=>{
//         dispatch(StartAddToCart())
//         setTimeout(()=>{
//             dispatch(AddToCart({...items, quantity: 1}))
//         },2000)
//     }
// }