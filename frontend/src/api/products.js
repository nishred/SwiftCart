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
