function fetchRow() 
{
    var http = new XMLHttpRequest();

    http.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            loadUsers(this.responseText);
        }
    };
    http.open("GET","https://66668351a2f8516ff7a3a6da.mockapi.io/api/v1/:endpoint", true); // https://61dc785d591c3a0017e1a96d.mockapi.io/api/v1/users
    http.send();
}
// Appointment Scheduler
// Fields: Appointment ID, Date, Time, Client Name



function addRow() 
{
    var table = document.createElement("main_table"); //Appointment
    var rowCount = table.rows.length + 1;
    var row = table.insertRow();

    var http = new XMLHttpRequest();
    http.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            row.innerHTML = 
                `<td class="cell" id="aid_${rowCount}">NewID</td>
                <td class="cell" id="date_${rowCount}">Date</td>
                <td class="cell" id="time_${rowCount}">Time</td>
                <td class="cell" id="aid_${rowCount}">Client Name</td>
                <td class="cell" id="action_${rowCount}">
                    <button class="button update_btn" onclick="updateRow(${rowCount})">Update</button>
                    <button class="button delete_btn" onclick="deleteRow(${rowCount})">Delete</button>
                </td>`;
        }
    };
    http.open("POST","https://66668351a2f8516ff7a3a6da.mockapi.io/api/v1/:endpoint", true); // https://61dc785d591c3a0017e1a96d.mockapi.io/api/v1/users
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify({"id":"U00001"," userName":"Sridharan", "age":21,"state":"Maharashtra"}));
}

function updateRow(id) 
{   
    var row = btn.closest("tr");
    var cells = row.getElementsByTagName("td");

    var http = new XMLHttpRequest();
    http.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            for(var i=0; i<cells.length-1;i++) 
            {        
                var input = document.createElement("input");
                input.type = "text";
                input.value = cells[i].innerHTML;
                cells[i].innerHTML = "";
                cells[i].appendChild(input);

            }

            // var updateBtn = document.getElementsByClassName("update_btn");
            updateBtn.innerHTML = "save";
            updateBtn.clasList.remove("update_btn")
            updateBtn.clasList.add("save_btn");

            updateBtn.setAttribute("onclick","saveRow(this)");
        }

    };
    http.open("PUT","https://66668351a2f8516ff7a3a6da.mockapi.io/api/v1/:endpoint", true); // https://61dc785d591c3a0017e1a96d.mockapi.io/api/v1/users/78
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify({"state":"Tamilnadu"}));
}

function saveRow(btn)
{
    var row = btn.closest("tr");
    var inputs = row.getElementsByTagName("input");

    for(var i=0; i<cells.length-1;i++) 
    {        
        inputs[i].parentElement.innerHTML = input[i].value;

    }
    var saveBtn = document.getElementsByClassName("save_btn");
    saveBtn.style.display = "none";
}


function deleteRow() 
{
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            var row = btn.closest("tr");
            row.parentElement.removeChild(row);
        }
    };
    http.open("DELETE","https://66668351a2f8516ff7a3a6da.mockapi.io/api/v1/:endpoint", true); // https://61dc785d591c3a0017e1a96d.mockapi.io/api/v1/users/77
    http.setRequestHeader("Content-type", "application/json");
    http.send();
}
















// from html


// function updateEmployee(btn) {
//     // Logic to update an employee
//     var row = btn.parentNode.parentNode;
//     var firstName = row.cells[0].innerText;
//     var lastName = row.cells[1].innerText;
//     var email = row.cells[2].innerText;
//     alert("Update Employee: " + firstName + " " + lastName + " (" + email + ")");
// }

// function deleteEmployee(btn) {
//     // Logic to delete an employee
//     var row = btn.parentNode.parentNode;
//     var table = row.parentNode;
//     table.removeChild(row);
//     alert("Employee deleted");
// }









// from main.js version-1

// <!-- <tbody id="Appointment">
//                 <tr class="row" id="row_1">
//                     <td class="cell" id="aid_1">19062401</td>
//                     <td class="cell" id="date_1">19/06/24</td>
//                     <td class="cell" id="time_1">14:00</td>
//                     <td class="cell" id="name_1">Ramesh</td>
//                     <td class="cell" id="action_1">
//                         <button class="button update_btn" onclick="updateRow(row_1)">Update</button>
//                         <button class="button delete_btn" onclick="deleteRow(this)">Delete</button>
//                     </td>
//                 </tr>
//                 <tr class="row" id="row_2">
//                     <td class="cell" id="aid_2">20062405</td>
//                     <td class="cell" id="date_2">20/06/24</td>
//                     <td class="cell" id="time_2">10:00</td>
//                     <td class="cell" id="name_2">John</td>
//                     <td class="cell" id="action_2">
//                         <button class="button update_btn" onclick="updateRow(this)">Update</button>
//                         <button class="button delete_btn" onclick="deleteRow(this)">Delete</button>
//                     </td>
//                 </tr>
//                 <tr class="row" id="row_3">
//                     <td class="cell" id="aid_3">21062403</td>
//                     <td class="cell" id="date_3">21/06/24</td>
//                     <td class="cell" id="time_3">09:00</td>
//                     <td class="cell" id="name_3">Tom</td>
//                     <td class="cell" id="action_3">
//                         <button class="button update_btn" onclick="updateRow(this)">Update</button>
//                         <button class="button delete_btn" onclick="deleteRow(this)">Delete</button>
//                     </td>
//                 </tr>

//                 <tr class="row" id="row_4">
//                     <td class="cell" id="aid_4">22062420</td>
//                     <td class="cell" id="date_4">22/06/24</td>
//                     <td class="cell" id="time_4">11:30</td>
//                     <td class="cell" id="name_4">Admin</td>
//                     <td class="cell" id="action_4">
//                         <button class="button update_btn" onclick="updateRow(this)">Update</button>
//                         <button class="button delete_btn" onclick="deleteRow(this)">Delete</button>
//                     </td>
//                 </tr>
//             </tbody> -->

