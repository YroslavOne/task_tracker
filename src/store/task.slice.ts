const defaultState = {
  customers: [],
};

// interface taskArray {
//     title: string;
//     description: string;
//     priority: string;
//     status: string;
//     date: string;
//     image: string;
// }

// const default: taskArray = {
//   {
//     title: "",
//     description: "",
//     priority: "",
//     status: "",
//     date: "",
//     image: "",
//   },
// };
export const task = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, customers: state.customers + action.payload };
    case "GET_TASK":
      return { ...state, customers: state.customers + action.payload };
    default:
      return state;
  }
};
