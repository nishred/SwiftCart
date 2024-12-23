import { StatusCodes } from "http-status-codes";

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

      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if(!json.success)
    throw new Error(json.error)

  return json;
}

async function getUsers(token) {
  const response = await fetch("http://localhost:5000/api/v1/users", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!data.success)
    throw new ErrorResponse(data.error, StatusCodes.BAD_REQUEST);

  return data.data.users;
}

async function deleteUser(id, token) {
  const response = await fetch(`http://localhost:5000/api/v1/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();

  if (!json.success) {
    throw new Error(json.error);
  }
}

async function getUserById(id, token) {
  const response = await fetch(`http://localhost:5000/api/v1/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();

  if (!json.success) {
    throw new Error(json.error);
  }

  return json.data.user;
}

export { createUser, updateUser, getUsers, deleteUser,getUserById };
