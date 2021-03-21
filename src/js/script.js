let button = document.getElementById('start');
let divCollection = document.querySelectorAll('div');
let classValue = [];
divCollection.forEach(function(item, i, divCollection) {
    let className = item.getAttribute('class');
    if (className.indexOf('-value') != -1) {
        classValue.push(item);
    }
});

let inputCollection = document.querySelectorAll('.expenses-item');

let buttons = document.querySelectorAll('button');
let confirmButtons = [];
let countButton;
buttons.forEach(function(item, i, buttons) {
    let className = item.getAttribute('class');
    if (className == 'optionalexpenses-btn' || className == 'expenses-item-btn'){
        confirmButtons.push(item);
    }
    if (className == 'count-budget-btn'){
        countButton = item;
    }
});

let optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item')


console.log(inputCollection);
console.log(classValue);
console.log(countButton);
console.log(confirmButtons);
console.log(optionalExpensesItem);