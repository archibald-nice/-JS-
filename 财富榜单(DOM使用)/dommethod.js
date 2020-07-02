const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// 获取随机3个用户并添加金额
async function getRandomUser() {
    /* randomuser.me 会返回一个JSON化的对象，包含多种常用User数据 */
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name: user.name.first + ' ' + user.name.last,
        money: Math.floor(Math.random() * 10000000)
    };
    addData(newUser);
}

// 在数据组中添加新对象
function addData(obj) {
    data.push(obj);
    updateDOM();
}

// 所有人金额翻倍
function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2};
    });
    updateDOM();
}

// 按富有级别降序
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}

// 展示百万富翁
function showMillionaires() {
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

// 计算财富总值
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    const wealthEL = document.createElement('div');
    wealthEL.innerHTML = '<h3>Total: <strong>' + formatMoney(wealth) + '</strong></h3>';
    main.appendChild(wealthEL);
}

// 更新DOM
function updateDOM(providedData = data) {
    // 清除main div
    main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = '<strong>' + item.name + '</strong>' + formatMoney(item.money);
        main.appendChild(element);
    });
}

// 将数组转化为金额
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// 监听每个按钮点击事件
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);