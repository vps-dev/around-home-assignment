import React, { FC } from "react";
import styled from "@emotion/styled";

export const LoadingSpinner: FC = () => (
  <Container>
    <LoadingIcon />
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const LoadingIcon = styled.div`
  animation: spin 1s linear infinite;
  width: ${({ theme }) => theme.spacing(6)};
  height: ${({ theme }) => theme.spacing(6)};
  border: 4px solid ${({ theme }) => theme.colors.gray};
  border-top: 4px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
