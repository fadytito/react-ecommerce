import React, { useContext } from "react";
import useUpdateProduct from "../hooks/useUpdateProduct";

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const {
    data: updatedProduct,
    updateData: updateProduct,
    isLoading,
    error,
    setData: setProduct,
  } = useUpdateProduct();

  return (
    <ProductContext.Provider
      value={{ updatedProduct, updateProduct, isLoading, error, setProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(ProductContext);
};

export { ProductProvider, useProductContext };
