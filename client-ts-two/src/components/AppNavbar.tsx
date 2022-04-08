import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Container,
} from 'reactstrap';
import { useSelector } from 'react-redux';
import { selectAuth } from '../store/auth/selectors';
import { AccessСonfirmedUser } from './AccessСonfirmedUser';
import { Guest } from './Guest';

export const AppNavbar: React.FC = () => {
  const auth = useSelector(selectAuth);
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='dark' dark expand='sm' className='mb-5'>
        <Container>
          <NavbarBrand href='/'>ShoppingList</NavbarBrand>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {auth && auth.isAuthenticated ? AccessСonfirmedUser({auth}) : Guest}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

