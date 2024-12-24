export async function fetchProducts() {
  const response = await fetch("http://localhost:5000/api/v1/products");

  const json = await response.json();

  if (!json.success) {
    throw new Error(json.message || "Something went wrong");
  } else return json.data.products;
}

export async function fetchProduct(id) {
  const response = await fetch(`http://localhost:5000/api/v1/products/${id}`);

  const json = await response.json();

  if (!json.success) throw new Error(json.message || "Something went wrong");

  return json.data.product;
}

export async function deleteProduct(id, token) {
  const response = await fetch(`http://localhost:5000/api/v1/products/${id}`, {
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

  return json;
}

export async function createProduct(data, token) {
  const response = await fetch("http://localhost:5000/api/v1/products", {
    method: "POST",

    headers: {
      Authorization: `Bearer ${token}`,
    },

    body: data,
  });

  const json = await response.json();

  return json;
}

export async function updateProduct(id, data, token) {
  const response = await fetch(`http://localhost:5000/api/v1/products/${id}`, {
    method: "PUT",

    headers: {
      Authorization: `Bearer ${token}`,
    },

    body: data,
  });

  const json = await response.json();

  if (!json.success) throw new Error(json.error);

  return json;
}
