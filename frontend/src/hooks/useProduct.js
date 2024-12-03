import { useEffect, useState } from "react";
import { fetchProduct } from "../api/products";

export function useProduct(id) {
  const [product, setProduct] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function getProduct() {
      try {
        setIsLoading(true);

        const data = await fetchProduct(id);

        setProduct(data.data.product);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getProduct();
  }, [id]);


   return {product,isLoading,error}

}
