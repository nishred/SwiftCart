import styled from "styled-components";

const CartButton = styled.button`
  display: inline-block;
  width: 100%;
  padding: 8px;
  background-color: #0f172a;
  color: #f8fafc;
  border: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;

export default CartButton