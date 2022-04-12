import React, { useEffect } from 'react';
import { AppNavbar } from './components/AppNavbar/AppNavbar';
import { ShoppingList } from './components/ShoppingList/ShoppingList';
import { ItemModal } from './components/ItemModal/ItemModal';
import { Container } from 'reactstrap';

import { useDispatch } from 'react-redux';
import { fillAuthUserAsync } from './store/auth/fillAuthUser';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fillAuthUserAsync());
  }, [dispatch]);

  return (
    <div className='App'>
      <AppNavbar />
      <Container>
        <ItemModal />
        <ShoppingList />
      </Container>
    </div>
  );
};

export default App;
