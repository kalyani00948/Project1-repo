
let users = [];
let editingId = null;

document.getElementById("submitBtn").addEventListener("click", function () {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = document.getElementById("age").value.trim();

  if (!name || !email || !age) {
    alert("Please fill in all fields.");
    return;
  }

  if (editingId !== null) {
    users = users.map(user =>
      user.id === editingId ? { ...user, name, email, age: Number(age) } : user
    );
    editingId = null;
    document.getElementById("submitBtn").innerText = "Add User";
  } else {
    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      name,
      email,
      age: Number(age),
    };
    users.push(newUser);
  }

  clearForm();
  renderTable();
});

function renderTable() {
  const tbody = document.getElementById("userTableBody");
  tbody.innerHTML = "";

  users.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.age}</td>
      <td>
        <button class="edit-btn" onclick="editUser(${user.id})">Edit</button>
        <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editUser(id) {
  const user = users.find(u => u.id === id);
  if (!user) return;

  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("age").value = user.age;

  editingId = id;
  document.getElementById("submitBtn").innerText = "Update User";
}

function deleteUser(id) {
  users = users.filter(user => user.id !== id);
  renderTable();
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("age").value = "";
}
