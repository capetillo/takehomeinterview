// exporting functions for utility and reusability purposes

export function storeDowntimeData(key, value) {
    // store updated data
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  export function retrieveDowntimeData(key) {
    // getting data from localStorage (R of CRUD)
    const sValue = localStorage.getItem(key);
    // parsing because sValue is an object
    return JSON.parse(sValue);
  }