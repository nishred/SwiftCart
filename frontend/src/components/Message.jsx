import styled from "styled-components";
import { css } from "styled-components";

const Message = styled.div`
  padding: 16px;
  ${(props) => {
    if (props.variant === "success") {
      return css`
        background-color: #86efac;
      `;
    } else if (props.variant === "danger") {
      return css`
        background-color: #fb7185;
      `;
    }
  }}
`;

export default Message
