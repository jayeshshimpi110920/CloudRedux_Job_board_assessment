function loadData(key) {
    let data = window.localStorage.getItem(key);
    data = JSON.parse(data);
    return data;
}


function saveData(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
}


export { loadData, saveData };  