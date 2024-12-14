async function createOrder(orderDetais, token) {
  const response = await fetch("http://localhost:5000/api/v1/orders", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(orderDetais),
  });

  const json = await response.json();

  if (!json.success) throw new Error(json.error);

  return json;
}

export { createOrder };
