function random_int(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function random_key(obj){
    let arrayKeys = Object.keys(obj);
    return arrayKeys[random_int(0, arrayKeys.length - 1)];
}

function random_element(array){
    return array[random_int(0, array.length - 1)];
}

function random_elements(array, size){
    let arrayResult = [];

    for (let iteration = 0; iteration < size; iteration++){
        arrayResult.push(random_element(array));
    }

    return arrayResult;
}

function unique(value, index, array) {
    return array.indexOf(value) === index;
}
function select(selector, flag) {
    return (flag=='all') ? document.querySelectorAll(selector) : document.querySelector(selector);
}