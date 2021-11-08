import React from "react";
import styled from "styled-components";
import ProductModel from "../../models/ProductModel";
import Productitem from "./ProductItem";

const Productslist = ({ products, isList }) => {
  const formattedProducts = products.map((item) => {
    const { id, name, image, price } = item;
    return new ProductModel(id, name, image, price);
  });
  return (
    <StyledWrapper>
      <div className="grid-view">
        <div className="products-container">
          {formattedProducts.map((product) => (
            <Productitem key={product.id} {...product} />
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.section`
  .grid-view {
    img {
      height: 175px;
    }

    .products-container {
      display: grid;
      gap: 2rem 1.5rem;
    }

    @media (min-width: 992px) {
      .products-container {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (min-width: 1170px) {
      .products-container {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }

  .list-view {
    display: grid;
    row-gap: 3rem;

    img {
      width: 100%;
      display: block;
      width: 300px;
      height: 200px;
      object-fit: cover;
      border-radius: var(--radius);
      margin-bottom: 1rem;
    }
    h4 {
      margin-bottom: 0.5rem;
    }
    .price {
      color: var(--clr-primary-6);
      margin-bottom: 0.75rem;
    }
    p {
      max-width: 45em;
      margin-bottom: 1rem;
    }
    .btn {
      font-size: 0.5rem;
      padding: 0.25rem 0.5rem;
    }
    @media (min-width: 992px) {
      article {
        display: grid;
        grid-template-columns: auto 1fr;
        column-gap: 2rem;
        align-items: center;
      }
    }
  }
`;
export default Productslist;
