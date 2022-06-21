import React, { FC } from "react";
import { ReactComponent as Logo } from "../resources/logo.svg";
import styled from "@emotion/styled";

export const Header: FC = () => (
  <Container>
    <Logo />
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(2)};
  box-shadow: rgb(0 0 0 / 40%) 0px 0px 10px 0px;
`;
