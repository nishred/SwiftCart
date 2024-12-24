import React from "react";
import styled, { css } from "styled-components";

const TableContext = React.createContext();

const Table = ({ columns, children }) => {
  return (
    <TableContext.Provider value={columns}>{children}</TableContext.Provider>
  );
};

const StyledRow = styled.div`
  display: grid;
  ${(props) =>
    props.columns &&
    css`
      grid-template-columns: ${props.columns};
    `}

  padding : 16px 32px;
  column-gap: 16px;
`;

const StyledHeader = styled(StyledRow)`
  border: 2px solid #475569;
`;

const StyledTableRow = styled(StyledRow)`
  &:nth-child(2n + 1) {
    background-color: #e5e7eb;
  }
`;

const StyledFooter = styled(StyledRow)`
  border-left: 2px solid #475569;
  border-right: 2px solid #475569;
  border-bottom: 2px solid #475569;
`;

const StyledBody = styled.div`
  border-left: 2px solid #475569;
  border-right: 2px solid #475569;
  border-bottom: 2px solid #475569;
`;

const Header = ({ children }) => {
  const columns = React.useContext(TableContext);

  return <StyledHeader columns={columns}>{children}</StyledHeader>;
};

const Body = ({ children }) => {
  return <StyledBody>{children}</StyledBody>;
};

const TableRow = ({ children }) => {
  const columns = React.useContext(TableContext);

  return <StyledTableRow columns={columns}>{children}</StyledTableRow>;
};

const Footer = ({ children }) => {
  const columns = React.useContext(TableContext);

  return <StyledFooter columns={columns}>{children}</StyledFooter>;
};

Table.Header = Header;
Table.Body = Body;
Table.TableRow = TableRow;
Table.Footer = Footer;

export default Table;
