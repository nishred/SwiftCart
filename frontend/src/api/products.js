export async function fetchProducts() {
  const response = await fetch("http://localhost:5000/products");

  const json = await response.json();

  return json;
}

export async function fetchProduct(id) {
  const response = await fetch(`http://localhost:5000/products/${id}`);

  const json = await response.json();

  return json;
}
