// src/components/layout/Header.tsx
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  margin-bottom: 2rem;
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  
  &:hover {
    color: #ddd;
  }

  &::after {
    content: "what?!";
  }

  @media (min-width: 600px) {
    &::after {
      content: "what r u talking about?!";
    }
  }
`

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  
  &:hover {
    color: #ddd;
  }
`

export function Header() {
    return (
      <HeaderContainer>
        <Nav>
          <Logo to="/" />
          <NavLinks>
            <NavLink to="/">Feed</NavLink>
            <NavLink to="/about">About</NavLink>
          </NavLinks>
        </Nav>
      </HeaderContainer>
    )
  }