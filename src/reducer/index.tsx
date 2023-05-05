export const dateTimeReducer = (state: any, action: any) => {
  switch(action.type) {
    case "date":
      return { ...state, date: action.date };

    case "time":
      return { ...state, time: action.time };
    
    default:
      return state;
  }
}
  