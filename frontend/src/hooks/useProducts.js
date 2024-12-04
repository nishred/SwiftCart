import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../api/products";

export function useProducts() {
  const [products, setProducts] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function getProducts() {
      try {
        setIsLoading(true)
        const data = await fetchProducts();
        console.log("use Products",data)    
        setProducts(data.data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false)
      }
    }

   getProducts()

  }, []);


   return {products,isLoading,error}

}
