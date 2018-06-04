export const saveToLocalStorage = (key, data) => {
   return dispatch => {
     console.log('hihihih')
     localStorage.setItem(key, data)
   }
}

export const getFromLocalStorage = (key) => {
   return dispatch => {

     let data = localStorage.getItem(key);
     return JSON.parse(data);
   }
}