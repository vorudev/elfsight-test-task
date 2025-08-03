import styled from 'styled-components';
import { Logo } from './Logo';
import { FilterPanel } from './filter';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <FilterPanel />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 530px) and (max-width: 950px) {
    flex-direction: column;
    gap: 30px;
  }
  @media (max-width: 530px) {
    flex-direction: column;
    gap: 30px;
  }
`;
