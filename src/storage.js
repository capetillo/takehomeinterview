
function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function getData(key) {
   const sValue = localStorage.getItem(key)
   return JSON.parse(sValue); 
}


export default {setData, getData}