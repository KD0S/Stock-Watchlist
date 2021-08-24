showstock();
let addstockinput = document.getElementById("addstockinput");
let addstockbtn = document.getElementById("addstockbtn");

addstockbtn.addEventListener("click", function () {
    addstockinputval = addstockinput.value;
    if (addstockinputval.trim() != 0) {
        let webstock = localStorage.getItem("localstock");
        if (webstock == null) {
            stockObj = [];
        }
        else {
            stockObj = JSON.parse(webstock);
        }
        stockObj.push({ 'stock_name': addstockinputval, 'completeStatus': false });

        localStorage.setItem("localstock", JSON.stringify(stockObj));
        addstockinput.value = '';
    }
    showstock();
})


function showstock() {
    let webstock = localStorage.getItem("localstock");
    if (webstock == null) {
        stockObj = [];
    }
    else {
        stockObj = JSON.parse(webstock);
    }
    let html = '';
    let addedstocklist = document.getElementById("addedstocklist");
    stockObj.forEach((item, index) => {

        if (item.completeStatus == true) {
            stockCompleteValue = `<td class="completed">${item.stock_name}</td>`;
        } else {
            stockCompleteValue = `<td>${item.stock_name}</td>`;
        }
        html += `<tr>
                    <th scope="row">${index + 1}</th>
                    ${stockCompleteValue}
                    <td><button type="button" onclick="editstock(${index})" class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
                    <td><button type="button" class="text-success" id=${index}><i class="fa fa-check-square-o"></i>Complete</button></td>
                    <td><button type="button" onclick="deleteitem(${index})" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
                </tr>`;
    });
    addedstocklist.innerHTML = html;
}


function editstock(index) {
    let saveindex = document.getElementById("saveindex");
    let addstockbtn = document.getElementById("addstockbtn");
    let savestockbtn = document.getElementById("savestockbtn");
    saveindex.value = index;
    let webstock = localStorage.getItem("localstock");
    let stockObj = JSON.parse(webstock);

    addstockinput.value = stockObj[index]['stock_name'];
    addstockbtn.style.display = "none";
    savestockbtn.style.display = "block";
}


let savestockbtn = document.getElementById("savestockbtn");
savestockbtn.addEventListener("click", function () {
    let addstockbtn = document.getElementById("addstockbtn");
    let webstock = localStorage.getItem("localstock");
    let stockObj = JSON.parse(webstock);
    let saveindex = document.getElementById("saveindex").value;

    for (keys in stockObj[saveindex]) {
        if (keys == 'stock_name') {
            stockObj[saveindex].stock_name = addstockinput.value;
        }
    }

    savestockbtn.style.display = "none";
    addstockbtn.style.display = "block";
    localStorage.setItem("localstock", JSON.stringify(stockObj));
    addstockinput.value = '';
    showstock();
})
// deleteitem
function deleteitem(index) {
    let webstock = localStorage.getItem("localstock");
    let stockObj = JSON.parse(webstock);
    stockObj.splice(index, 1);
    localStorage.setItem("localstock", JSON.stringify(stockObj));
    showstock();
}






















