// Appointment Scheduler
// Fields: Appointment ID, Date, Time, Client Name
let eventData = []

window.onload = function() { fetchRow(); };

function openForm()
{
    document.getElementById("main_table").style.display = "none";
    document.getElementById("open_form").style.display = "none";
    document.getElementById("input_form").style.display = "block";
}

function addRow() 
{

    const aidAdd = document.getElementById("aid_add").value;
    const dateAdd = document.getElementById("date_add").value;
    const timeAdd = document.getElementById("time_add").value;
    const nameAdd = document.getElementById("name_add").value;
    
    document.getElementById("input_form").style.display = "none";
   
            

    var http = new XMLHttpRequest();
    http.onreadystatechange = function() 
    {
        document.getElementById("main_table").style.display = "block";
        document.getElementById("open_form").style.display = "block";    
        fetchRow();
        // if (this.readyState == 4 && this.status == 200) 
        // {
        // }
    };
    http.open("POST","https://66668351a2f8516ff7a3a6da.mockapi.io/api/v1/appointment", true); // https://61dc785d591c3a0017e1a96d.mockapi.io/api/v1/users
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify({"Appointment ID":aidAdd,
        "Date":dateAdd,
        "Time":timeAdd,
        "Client Name":nameAdd}));
}

function fetchRow() 
{
    var http = new XMLHttpRequest();

    http.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            // loadUsers(this.responseText); //here
            eventData = JSON.parse(this.responseText);

            const tableBody = document.querySelector('.table_container');
            while(tableBody.children.length > 1)
                tableBody.removeChild(tableBody.lastChild); // Clear existing rows
            eventData.forEach(event => loadData(event));
        }
    };
    http.open("GET","https://66668351a2f8516ff7a3a6da.mockapi.io/api/v1/appointment/", true); // https://61dc785d591c3a0017e1a96d.mockapi.io/api/v1/users
    http.send();
}

function loadData(event) 
{
    const tableBody = document.querySelector('.table_container');
    const row = document.createElement('div');

    row.className = 'row_container row';
    row.id = `row_${event.id}`;

    const aidDiv = document.createElement('div');
    const dateDiv = document.createElement('div');
    const timeDiv = document.createElement('div');
    const nameDiv = document.createElement('div');
    const update_delete = document.createElement('div');

    aidDiv.className = dateDiv.className = timeDiv.className = nameDiv.className = update_delete.className = 'cell';

    aidDiv.id = `aid_${event.id}`;
    // aidDiv.innerHTML = `${event.aid}`; // error
    aidDiv.innerHTML = `${event["Appointment ID"]}`;
    row.appendChild(aidDiv);

    dateDiv.id = `date_${event.id}`;
    dateDiv.innerHTML = `${event.Date}`;
    row.appendChild(dateDiv);

    timeDiv.id = `time_${event.id}`;
    timeDiv.innerHTML = `${event.Time}`;
    row.appendChild(timeDiv);

    nameDiv.id = `name_${event.id}`;
    nameDiv.innerHTML = `${event["Client Name"]}`;
    row.appendChild(nameDiv);

    update_delete.id = `action_${event.id}`;
    // update_delete.innerHTML = `${event.aid}`;
    row.appendChild(update_delete);

    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update';
    updateBtn.className = 'button update_btn';
    updateBtn.id = `updateBtn_${event.id}`;
    update_delete.appendChild(updateBtn);
    updateBtn.addEventListener('click', () => updateRow(event.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'button delete_btn';
    deleteBtn.id = `deleteBtn_${event.id}`; 
    update_delete.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => deleteRow(event.id));

    row.appendChild(update_delete);
    tableBody.appendChild(row);
}

function updateRow(row_id) 
{   
    const row = document.getElementById('row_' + row_id);
    const aidDiv = document.getElementById('aid_' + row_id);
    const dateDiv = document.getElementById('date_' + row_id);
    const timeDiv = document.getElementById('time_' + row_id);
    const nameDiv = document.getElementById('name_' + row_id);

    const eventAid = aidDiv.innerText;
    const eventDate = dateDiv.innerText;
    const eventTime = timeDiv.innerText;
    const eventName = nameDiv.innerText;

    aidDiv.innerText = "";
    dateDiv.innerText = "";
    timeDiv.innerText = "";
    nameDiv.innerText = "";

    const aidInput = document.createElement('input');
    aidInput.value = eventAid;
    aidDiv.appendChild(aidInput);

    const dateInput = document.createElement('input');
    dateInput.value = eventDate;
    dateDiv.appendChild(dateInput);

    const timeInput = document.createElement('input');
    timeInput.value = eventTime;
    timeDiv.appendChild(timeInput);

    const nameInput = document.createElement('input');
    nameInput.value = eventName;
    nameDiv.appendChild(nameInput);

    const saveBtn = document.createElement('button');
    saveBtn.className = "button save_btn";
    saveBtn.textContent = 'Save';

    saveBtn.onclick = function () 
    {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                fetchRow();
            }

        };
        http.open("PUT","https://66668351a2f8516ff7a3a6da.mockapi.io/api/v1/appointment/" + row_id, true); // https://61dc785d591c3a0017e1a96d.mockapi.io/api/v1/users/78
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify({
            "Appointment ID": aidInput.value,
            "Date":dateInput.value, 
            "Time":timeInput.value,
            "Client Name":nameInput.value}));
    }
    const update_delete = document.getElementById('action_' + row_id);
    const updateBtn = document.getElementById('updateBtn_' + row_id);
    update_delete.replaceChild(saveBtn, updateBtn);
}

// function saveRow(btn)
// {
//     var row = btn.closest("tr");
//     var inputs = row.getElementsByTagName("input");

//     for(var i=0; i<cells.length-1;i++) 
//     {        
//         inputs[i].parentElement.innerHTML = input[i].value;

//     }
//     var saveBtn = document.getElementsByClassName("save_btn");
//     saveBtn.style.display = "none";
// }


function deleteRow(row_id) 
{
      
    var confirmation = confirm(`Do you really wish to delete the Event ID: ${row_id}?`);

    if (confirmation) 
    {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                fetchRow();
            }
        };
        http.open("DELETE","https://66668351a2f8516ff7a3a6da.mockapi.io/api/v1/appointment/" + row_id, true); // https://61dc785d591c3a0017e1a96d.mockapi.io/api/v1/users/77
        http.setRequestHeader("Content-type", "application/json");
        http.send();
    }
}
