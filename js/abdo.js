//darkmood//
const body = document.querySelector("body");
const btn = document.querySelector(".btn");
const lcon = document.querySelector(".btn_lcon");
// addEventListener
btn.addEventListener("click", () => {
  body.classList.toggle("darkmode");
  lcon.classList.add("animated");
  if (body.classList.contains("darkmode")) {
    lcon.classList.remove("fa-sun");
    lcon.classList.add("fa-moon");
    $(".btn_lcon").css({ color: "#fff" });

    $(".darkmode .btn_indicator").css({ transition: "2s" });
  } else {
    lcon.classList.remove("fa-moon");
    lcon.classList.add("fa-sun");
  }
  setTimeout(() => {
    lcon.classList.remove("animated");
  }, 5000);
});
//darkmood//
//////////////////////////////////////////////////////
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let total = document.getElementById("total");
let mood = "create";
let tmp;
// //get total//
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}
// //create product//
let datepro;
if (localStorage.product != null) {
  datepro = JSON.parse(localStorage.product);
} else {
  datepro = [];
}
submit.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    category: category.value.toLowerCase(),
    count: count.value,
    total: total.innerHTML,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newpro.count < 1001
  ) {
    if (mood === "create") {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          datepro.push(newpro);
        }
      } else {
        datepro.push(newpro);
      }
    } else {
      datepro[tmp] = newpro;
      count.style.display = "block";
      mood = "create";
      submit.innerHTML = "create";
    }
    clearDate();
  }
  localStorage.setItem("product", JSON.stringify(datepro));
  showDate();
};
// //clear inputs//
function clearDate() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  category.value = "";
  count.value = "";
  total.innerHTML = "";
}
//read
function showDate() {
  getTotal();
  let table = "";
  for (let i = 0; i < datepro.length; i++) {
    table += `<tr>
<td>${i}</td>
<td style="color: black;" >${datepro[i].title}</td>
<td style="color: black;" >${datepro[i].price}</td>
<td style="color: black;" >${datepro[i].taxes}</td>
<td style="color: black;" >${datepro[i].ads}</td>
<td style="color: black;" >${datepro[i].discount}</td>
<td style="color: black;" >${datepro[i].total}</td>
<td style="color: black;" >${datepro[i].category}</td>
<td style="color: black;" ><button onclick="updateDate(${i})"  id="update">Update</button></td>
<td style="color: black;" ><button onclick="deleteDate(${i})" id="delete">Delete</button> </td>
</tr>
`;
  }
  document.getElementById("tbody").innerHTML = table;
  //deleteAll//
  let btnDelete = document.getElementById("deleteAll");
  if (datepro.length > 0) {
    btnDelete.innerHTML = `
<button   onclick="deleteAll()">Delete All =<span style=" font-weight: 600; color: #00ff55; ">${datepro.length}</span></button>
`;
  } else {
    btnDelete.innerHTML = "";
  }
  //deleteAll//
}
showDate();
//delete//
function deleteDate(i) {
  datepro.splice(i, 1);
  localStorage.product = JSON.stringify(datepro);
  showDate();
}
//delete All//
function deleteAll() {
  localStorage.clear();
  datepro.splice(0);
  showDate();
}
//update//
function updateDate(i) {
  title.value = datepro[i].title;
  price.value = datepro[i].price;
  taxes.value = datepro[i].taxes;
  ads.value = datepro[i].ads;
  discount.value = datepro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = datepro[i].category;
  submit.innerHTML = "update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//search//
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showDate();
}
function searchDate(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 1; i < datepro.length; i++) {
      if (datepro[i].title.includes(value.toLowerCase())) {
        table += `<tr>
      <td>${i}</td>
      <td>${datepro[i].title}</td>
      <td>${datepro[i].price}</td>
      <td>${datepro[i].taxes}</td>
      <td>${datepro[i].ads}</td>
      <td>${datepro[i].discount}</td>
      <td>${datepro[i].total}</td>
      <td>${datepro[i].category}</td>
      <td><button onclick="updateDate(${i})"  id="update">Update</button></td>
      <td><button onclick="deleteDate(${i})" id="delete">Delete</button> </td>
      </tr>
      `;
      }
    }
  } else {
    for (let i = 1; i < datepro.length; i++) {
      if (datepro[i].category.includes(value.toLowerCase())) {
        table += `<tr>
        <td>${i}</td>
        <td>${datepro[i].title}</td>
        <td>${datepro[i].price}</td>
        <td>${datepro[i].taxes}</td>
        <td>${datepro[i].ads}</td>
        <td>${datepro[i].discount}</td>
        <td>${datepro[i].total}</td>
        <td>${datepro[i].category}</td>
        <td><button onclick="updateDate(${i})"  id="update">Update</button></td>
        <td><button onclick="deleteDate(${i})" id="delete">Delete</button> </td>
        </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
