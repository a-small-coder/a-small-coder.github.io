let startBtn = document.getElementById("start"),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    dayBudgetValueOptional = document.getElementsByClassName('daybudget-value')[1],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],


	expensesItem = document.getElementsByClassName('expenses-item'),
	expensesBtn = document.getElementsByTagName('button')[1],
	optionalExpensesBtn = document.getElementsByTagName('button')[2],
    countBtn = document.getElementsByTagName('button')[3],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

expensesBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBtn.disabled = true;

startBtn.addEventListener('click', () => {
    expensesValue.textContent = '';
    optionalExpensesValue.textContent = '';
    incomeValue.textContent = '';
    monthSavingsValue.textContent = '';
    budgetValue.textContent = '';
    dayBudgetValue.textContent = '';
    dayBudgetValueOptional.textContent = '';
    levelValue.textContent = '';
    yearSavingsValue.textContent = '';

    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    money = +prompt("Ваш бюджет на месяц?", '');

    while (isNaN(money) || money == '' || money == null) {
        money = prompt("Ваш бюджет?", "");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();

    expensesBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    countBtn.disabled = false;
});

expensesBtn.addEventListener('click', () => {
    let sum = 0;
    for (let i = 0; i < expensesItem.length - 1; i+=2) {
        let a = expensesItem[i].value,
            b = expensesItem[i+1].value;
        expensesItem[i].value = '';
        expensesItem[i+1].value = '';
        if ((typeof (a)) != null && (typeof (b)) != null && b != '' && a.length < 50) {
            if (a == ''){
                a = "unknown" + i.toString();
            }
            appData.expenses[a] = b;
            sum += +b;
        }
        expensesValue.textContent = sum;
    }
});

optionalExpensesBtn.addEventListener('click', () => {
    let sum = 0;
    for (let i = 0; i < optionalExpensesItem.length; i++) {
		let opt = optionalExpensesItem[i].value;
        optionalExpensesItem[i].value = '';
        if (!isNaN(opt)){
            appData.optionalExpenses[i] = opt;
            sum += +appData.optionalExpenses[i];
        }
        
	}
    optionalExpensesValue.textContent = sum;
});

countBtn.addEventListener('click', () => {
    if (appData.budget != undefined) {
        if (isNaN(expensesValue.textContent) || expensesValue.textContent == 0){           
            expensesValue.textContent = "0";
        }
        if (isNaN(appData.monthIncome)){
            monthSavingsValue.textContent = "0";
            yearSavingsValue.textContent = "0";
            appData.monthIncome = 0;
            appData.yearIncome = 0;
        }
        if (isNaN(optionalExpensesValue.textContent) || expensesValue.textContent == 0){
            optionalExpensesValue.textContent = "0";
        }

        let optionalIncome = 0;
        for (let i = 0; i < appData.income.length; i++){
            let income = appData.income[i].split(' ');
            for (let j=0; j < income.length; j++){
                if (!isNaN(income[j])){
                    optionalIncome += +income[j];
                }
            }
        }
        incomeValue.textContent = optionalIncome;
        appData.moneyPerDay = ((appData.budget - +expensesValue.textContent + appData.monthIncome) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;
        dayBudgetValueOptional.textContent = ((appData.moneyPerDay * 30 + optionalIncome - +optionalExpensesValue.textContent) / 30).toFixed();
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = 'Средний уровень достатка';
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = 'Высокий уровень достатка';
        } else {
            levelValue.textContent = 'Произошла ошибка';
        }
    } else {
        dayBudgetValue.textContent = 'Произошла ошибка';
    }
});

incomeItem.addEventListener('input', () => {
    let items = incomeItem.value;
    if (isNaN(items) || items != '') {
        appData.income = items.split(',');
        incomeValue.textContent = appData.income;
    } 
});

checkSavings.addEventListener("click", () => {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', () => {
    if (appData.savings == true) {
        let sum = +sumValue.value;
        let percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', () => {
    if (appData.savings == true) {
        let sum = +sumValue.value;
        let percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

const appData = {
	budget: money,
	expenses: {},
	optionalExpenses: {},
    income: [],
	timeData: time,
    savings: false
};
