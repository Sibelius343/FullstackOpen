const filterReducer = (state = '', action) => {
  if (action.type === 'FILTER') {
    return action.data.filter
  }
  return state
}

export const setFilter = filter => {
  return {
    type: 'FILTER',
    data: { filter }
  }
}

export default filterReducer