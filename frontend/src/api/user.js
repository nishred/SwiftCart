async function createUser(user) {
  const response = await fetch("http://localhost:5000/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  });

  const json = await response.json();
  return json;
}

async function updateUser(id, data, token) {


  const response = await fetch(`http://localhost:5000/api/v1/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",

      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();
  return json;
}

export { createUser, updateUser };
