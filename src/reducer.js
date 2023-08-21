const redducer = (state ={card:[],user:[]}, action) => {

  switch (action.type) {
    case 'add_card_tickets':
      
      return state ={card:action.payload,user:state.user}
    case 'add_ses':
     
      return state ={card:state.card.card,user:action.payload}
      default:
        return state
  }



}
export default redducer