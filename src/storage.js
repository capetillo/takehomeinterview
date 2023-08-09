// exporting setData function for utility and reusability purposes
export function setData(key, value) {
    // posts data in localStorage and it only takes strings (C of CRUD)
    localStorage.setItem(key, JSON.stringify(value))
}

// exporting getData function for utility and reusability purposes
export function getData(key) {
    // getting data from localStorage (R of CRUD)
   const sValue = localStorage.getItem(key)
   // parsing because sValue is an object 
   return JSON.parse(sValue); 
}