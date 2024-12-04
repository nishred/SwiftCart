export async function fetchProducts() {
  const response = await fetch("http://localhost:5000/api/v1/products");
  
  const json = await response.json();

  console.log("api",json)

  return json;
}

export async function fetchProduct(id) {
  const response = await fetch(`http://localhost:5000/api/v1/products/${id}`);

  const json = await response.json();

  return json;
}
