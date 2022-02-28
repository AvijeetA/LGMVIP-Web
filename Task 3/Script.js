var selectedRow = null

function onFormSubmit(e) {
    event.preventDefault();
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
        }else{
            updateRecord(formData);
        }
        resetForm();
    }

    function readFormData() {
        var formData = {};
        formData["Name"] = document.getElementById("Name").value;
        formData["Email"] = document.getElementById("Email").value;
        formData["Number"] = document.getElementById("Number").value;
        formData["Address"] = document.getElementById("Address").value;
        formData["gender"] = document.getElementById("gender").value;
        formData["Education"] = document.getElementById("Education").value;
        formData["Skills"] = document.getElementById("Skills").value;
        formData["Day"] = document.getElementById("Day").value;
        formData["Month"] = document.getElementById("Month").value;
        formData["Year"] = document.getElementById("Year").value;
        return formData;
    }
    function insertNewRecord(data) {
        var table = document.getElementById("studentList").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.length);
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.Name;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.Email;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.Number;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.Address;
        cell5 = newRow.insertCell(4);
        cell5.innerHTML = data.gender;
        cell6 = newRow.insertCell(5);
        cell6.innerHTML = data.Education;
        cell7 = newRow.insertCell(6);
        cell7.innerHTML = data.Skills;
        cell8 = newRow.insertCell(7);
        cell8.innerHTML = data.Day;
        cell9 = newRow.insertCell(8);
        cell9.innerHTML = data.Month;
        cell10 = newRow.insertCell(9);
        cell10.innerHTML = data.Year;
        cell11 = newRow.insertCell(10);
        cell11.innerHTML = `<button onClick="onEdit(this)">Edit</button>
                        <button onClick="onDelete(this)">Delete</button>`;
    }



    function resetForm() {
        document.getElementById("Name").value = "";
        document.getElementById("Email").value = "";
        document.getElementById("Number").value = "";
        document.getElementById("Address").value = "";
        document.getElementById("gender").value = "";
        document.getElementById("Education").value = "";
        document.getElementById("Skills").value = "";
        document.getElementById("Day").value = "";
        document.getElementById("Month").value = "";
        document.getElementById("Year").value = "";
        selectedRow = null;
    }

    function onEdit(td) {
        selectedRow = td.parentElement.parentElement;
        document.getElementById("Name").value = selectedRow.cells[0].innerHTML;
        document.getElementById("Email").value = selectedRow.cells[1].innerHTML;
        document.getElementById("Number").value = selectedRow.cells[2].innerHTML;
        document.getElementById("Address").value = selectedRow.cells[3].innerHTML;
        document.getElementById("gender").value = selectedRow.cells[4].innerHTML;
        document.getElementById("Education").value = selectedRow.cells[5].innerHTML;
        document.getElementById("Skills").value = selectedRow.cells[6].innerHTML;
        document.getElementById("Day").value = selectedRow.cells[7].innerHTML;
        document.getElementById("Month").value = selectedRow.cells[8].innerHTML;
        document.getElementById("Year").value = selectedRow.cells[9].innerHTML;
    }

    function updateRecord(formData) {
        selectedRow.cells[0].innerHTML = formData.Name;
        selectedRow.cells[1].innerHTML = formData.Email;
        selectedRow.cells[2].innerHTML = formData.Number;
        selectedRow.cells[3].innerHTML = formData.Address;
        selectedRow.cells[4].innerHTML = formData.gender;
        selectedRow.cells[5].innerHTML = formData.Skills;
        selectedRow.cells[6].innerHTML = formData.Education;
        selectedRow.cells[7].innerHTML = formData.Day;
        selectedRow.cells[8].innerHTML = formData.Month;
        selectedRow.cells[9].innerHTML = formData.Year;
    }

    function onDelete(td) {
        if (confirm('Are you sure want to delete ?')) {
            row = td.parentElement.parentElement;
            document.getElementById("studentList").deleteRow(row.rowIndex);
            resetForm();
        }
    }

    function isNumber(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
const yearSelect = document.getElementById("Year");
const monthSelect = document.getElementById("Month");
const daySelect = document.getElementById("Day");

const months = ['January', 'February', 'March', 'April', 
'May', 'June', 'July', 'August', 'September', 'October',
'November', 'December'];

(function populateMonths(){
    for(let i = 0; i < months.length; i++){
        const option = document.createElement('option');
        option.textContent = months[i];
        monthSelect.appendChild(option);
    }
    monthSelect.value = "January";
})();

let previousDay;
function populateDays(month){
    while(daySelect.firstChild){
        daySelect.removeChild(daySelect.firstChild);
    }
    let dayNum;
    let Year = yearSelect.value;
    if(month === 'January' || month === 'March' || 
    month === 'May' || month === 'July' || month === 'August' 
    || month === 'October' || month === 'December') {
        dayNum = 31;
    } else if(month === 'April' || month === 'June' 
    || month === 'September' || month === 'November') {
        dayNum = 30;
    }else{
        dayNum = 28;
    }


    for(let i = 1; i <= dayNum; i++){
        const option = document.createElement("option");
        option.textContent = i;
        daySelect.appendChild(option);
    }
    if(previousDay){
        daySelect.value = previousDay;
        if(daySelect.value === ""){
            daySelect.value = previousDay - 1;
        }
        if(daySelect.value === ""){
            daySelect.value = previousDay - 2;
        }
        if(daySelect.value === ""){
            daySelect.value = previousDay - 3;
        }
    }
}

function populateYears(){
    let year = new Date().getFullYear();
    for(let i = 0; i < 101; i++){
        const option = document.createElement("option");
        option.textContent = year - i;
        yearSelect.appendChild(option);
    }
}

populateDays(monthSelect.value);
populateYears();

yearSelect.onchange = function() {
    populateDays(monthSelect.value);
}
monthSelect.onchange = function() {
    populateDays(monthSelect.value);
}
daySelect.onchange = function() {
    previousDay = daySelect.value;
}