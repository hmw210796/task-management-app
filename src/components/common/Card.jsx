import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const CardStyles = styled.div`
  background: #fff;
  border: none;
  box-shadow: 0px 3px 6px #0000000a;
  padding: 1.5rem;
  font-size: 14px;
  line-height: 26px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    border-radius: 0.75rem;
  }
`;

export const CardTitle = styled.p`
  font-size: 1.25rem;
  line-height: 26px;
  color: #537178;
`;

const Card = (props) => {
  return props.isLoading ? (
    <Skeleton count={3} height={50} style={{ marginBottom: 8 }} />
  ) : (
    <CardStyles {...props}>{props.children}</CardStyles>
  );
};

export default Card;
