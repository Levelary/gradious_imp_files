let status = {
	1: "one",
	2: "two",
	3: "three",
	4: "four",
};



async function fetchList() {
    try {
        const response = await fetch('http://localhost:8080/buddylist');

        // check if response is good
		if(!response.ok)
		{
			throw new Error("Failed to fetch buddy list");
		}

        const data = await response.json(); // object to JSON
        localStorage.setItem('buddyList', data);

        display(data);
    }
    catch(error)
    {
        console.error("Error: ", error);
    }
}


// document.addEventListener('DOMContentLoaded', fetchList);

document.addEventListener("DOMContentLoaded", function () 
{
	localStorage.clear();
	// if(!localStorage.getItem("buddyList"))
	fetchList();
	display();
	// localData();
});

// function localData()
// {
// 	if(!localStorage.getItem("buddyList"))
// 	{
// 		localStorage.setItem("buddyList", JSON.parse(users));
// 	}
// 	display();
// }

function display() 
{
	var buddy = document.getElementById("root");
	buddy.innerHTML = "";

	const buddyList = JSON.parse(localStorage.getItem("buddyList")); // JSON to object
	// console.log(typeof(buddyList));
	buddyList?.forEach(user => {   // '?' is used to check the availability of the async buddyList
	// localStorage.forEach(user => {
		buddy.innerHTML += 
		`<div class="user">
			<div class="img-container">
				<img src="${user.profilePicture}" class='user-image ${status[user.presence]}' alt="user image" />
			</div>
			<div class="user-detail">
				<p class="user-name">${user.name}</p>
				<p class="user-message">${user.statusMessage}</p>
			</div>
			<div class='three-btn'>
				<div class="dropdown">
					<a class="" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots-vertical"></i></a>
					<ul class="dropdown-menu">
						<li><button id='${user.userId}' onclick='deleteUser("${user.userId}")' class="dropdown-item">Delete</button></li>
						<li><button id='update-${user.userId}' onclick='updateUser("${user.userId}")' class="dropdown-item">Update</button></li>
					</ul>
				</div>
			</div>
		</div>`;

	});
}

function deleteUser(id) {
	let buddyList = JSON.parse(localStorage.getItem("buddyList")); // JSON to object
	buddyList = buddyList.filter(user => user.userId !== id);
	localStorage.setItem('buddyList', JSON.stringify(buddyList)); // object to string(JSON)
	display();
}

function addUser(event)
{
	event.preventDefault();
	const userForm = document.getElementById("addUserForm");

	const nameInput = document.getElementById("name").value;
	const msgInput = document.getElementById("statusMessage").value;
	const imgInput = document.getElementById("profilePicLink").value;
	const statusInput = document.getElementById("presence").value;
	

	let buddyList = JSON.parse(localStorage.getItem("buddyList")); // string to JSON
    const id = `USR${String(buddyList.length + 1).padStart(4,'0')}`;
	let newUser = { 	
		"userId": id,
		"name": nameInput,
		"profilePicture": imgInput,
		"statusMessage": msgInput,
		"presence": statusInput}
	buddyList.unshift(newUser);
	localStorage.setItem('buddyList', JSON.stringify(buddyList));
	display();
	userForm.reset();
}

function updateUser(id) 
{
	let buddyList = JSON.parse(localStorage.getItem("buddyList"));
	const useridx = buddyList.findIndex(user => user.userId === id);
	if(useridx === -1) 
		return;

	const user = buddyList[useridx];
	const addBtn = document.getElementById("add_button");
	addBtn.textContent = "Update User";
	
	document.getElementById("name").value = user.name;
	document.getElementById("statusMessage").value = user.statusMessage;
	document.getElementById("profilePicLink").value = user.profilePicture;
	document.getElementById("presence").value = user.presence;



	addBtn.onclick = function(event)
	{
		event.preventDefault();
		// let buddyList = JSON.parse(localStorage.getItem("buddyList"));

		user.name = document.getElementById("name").value;
		user.statusMessage = document.getElementById("statusMessage").value;
		user.profilePicture = document.getElementById("profilePicLink").value;
		user.presence = document.getElementById("presence").value;

		localStorage.setItem("buddyList", JSON.stringify(buddyList));
		display();
		addBtn.textContent = "Add User";
		addBtn.onclick = addUser;
		document.getElementById("addUserForm").reset();
	}
}
	