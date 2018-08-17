export const saveToLocalStorage = (key, data) => {
   return dispatch => {
     localStorage.setItem(key, data)
   }
}
export const getFromLocalStorage = (key) => {
   return dispatch => {

     let data = localStorage.getItem(key);
     return JSON.parse(data);
   }
}
export const removeLocalStorage = (key) => {
   return dispatch => {
     localStorage.removeItem(key)
     
   }
}