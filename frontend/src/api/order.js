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

async function fetchOrder(id, token) {
  const response = await fetch(`http://localhost:5000/api/v1/orders/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();

  if (!json.success) throw new Error(json.error);

  return json;
}

async function payOrder(id, token, paymentDetails) {

  const response = await fetch(
    `http://localhost:5000/api/v1/orders/${id}/pay`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(paymentDetails),
    }
  );

  const json = await response.json();

  return json;
}

export { createOrder, fetchOrder, payOrder };
