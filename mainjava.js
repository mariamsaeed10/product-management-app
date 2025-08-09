
let title = document.getElementById("title");
let prices = document.getElementById("prices");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let small = document.getElementById("small");
let count = document.getElementById("count");
let category = document.getElementById("category");
let creat = document.getElementById("creat");
let tbody = document.querySelector("tbody");

let mood = 'create';
let tmp;
let data = [];

if (localStorage.product != null) {
    data = JSON.parse(localStorage.product);
}

function gettotal() {
    if (prices.value !== '') {
        let result = (Number(prices.value) + Number(taxes.value) + Number(ads.value)) - Number(discount.value);
        small.innerHTML = result;
        small.style.backgroundColor = "rgba(4, 46, 50, 1)";
    } else {
        small.innerHTML = "";
        small.style.backgroundColor = "rgb(19, 154, 167)";
    }
}

creat.onclick = function () {
    let obj = {
        title: title.value.toLowerCase(),
        prices: prices.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: small.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    };

    if (title.value !== '' && prices.value !== '' && category.value !== "" && Number(obj.count) < 1000) {
        if (mood === 'create') {
            if (Number(obj.count) > 1) {
                for (let i = 0; i < Number(obj.count); i++) {
                    data.push(obj);
                }
            } else {
                data.push(obj);
            }
        } else {
            data[tmp] = obj;
            mood = 'create';
            creat.innerHTML = "Create";
            count.style.display = "block";
            count.style.marginLeft = '10%';
        }

        localStorage.setItem("product", JSON.stringify(data));
        cleardata();
        showdata();
    } else {
        alert("Please fill in the title, category, and price fields correctly.");
    }
};

function cleardata() {
    title.value = "";
    prices.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    small.innerHTML = "";
    small.style.backgroundColor = "rgb(19,154,167)";
    count.value = "";
    category.value = "";
}

function showdata() {
    gettotal();
    let table = '';
    for (let i = 0; i < data.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${data[i].title}</td>
                <td>${data[i].prices}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].category}</td>
                <td><button onclick="update(${i})">Update</button></td>
                <td><button onclick="deleteData(${i})">Delete</button></td>
            </tr>
        `;
    }
    tbody.innerHTML = table;

    let deleteAllBtn = document.getElementById("Deleteall");
    if (data.length > 0) {
        deleteAllBtn.innerHTML = `<button onclick="deleteall()">Delete All (${data.length})</button>`;
    } else {
        deleteAllBtn.innerHTML = "";
    }
}

function deleteData(i) {
    data.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(data));
    showdata();
}

function deleteall() {
    localStorage.clear();
    data.splice(0);
    showdata();
}

function update(i) {
    let item = data[i];
    title.value = item.title;
    prices.value = item.prices;
    taxes.value = item.taxes;
    ads.value = item.ads;
    discount.value = item.discount;
    category.value = item.category;
    gettotal();
    count.style.display = "none";
    creat.innerHTML = "Update";
    mood = 'update';
    tmp = i;
    scroll({ top: 0, behavior: 'smooth' });
}

// Search
let searchMood = 'title';
function getSearchMood(id) {
    let search = document.getElementById("search");
    if (id === 'sbt') {
        searchMood = 'title';
        search.placeholder = "Search by title";
    } else {
        searchMood = 'category';
        search.placeholder = "Search by category";
    }
    search.focus();
    search.value = '';
    showdata();
}

function searchDate(value) {
    let table = '';
    value = value.toLowerCase();
    for (let i = 0; i < data.length; i++) {
        if (
            (searchMood === 'title' && data[i].title.toLowerCase().includes(value)) ||
            (searchMood === 'category' && data[i].category.toLowerCase().includes(value))
        ) {
            table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].prices}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="update(${i})">Update</button></td>
                    <td><button onclick="deleteData(${i})">Delete</button></td>
                </tr>
            `;
        }
    }
    tbody.innerHTML = table;
}

showdata();
