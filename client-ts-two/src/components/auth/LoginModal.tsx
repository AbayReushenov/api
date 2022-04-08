import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { actions as actionsError } from '../../store/error/error';
import { ITarget } from '../../types/interfaces';
import { selectIsAuthenticated } from '../../store/auth/selectors';
import { selectError } from '../../store/error/selectors';
import { loginUserAsync } from '../../store/auth/loginUser';

export const LoginModal: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const error = useSelector(selectError);

  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const dispatch = useDispatch();

  const handleToggle = useCallback(() => {
    dispatch(actionsError.clearErrors());
    setModal(!modal);
  }, [dispatch, modal]);

  const handleChangeEmail = (e: ITarget) => setEmail(e.target.value);
  const handleChangePassword = (e: ITarget) => setPassword(e.target.value);

  const handleOnSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(loginUserAsync(user));
  };

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
    if (modal) {
      if (isAuthenticated) {
        handleToggle();
      }
    }
  }, [error, handleToggle, isAuthenticated, modal]);

  return (
    <div>
      <NavLink onClick={handleToggle} href='#'>
        Login
      </NavLink>

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color='danger'>{msg}</Alert> : null}
          <Form>
            <FormGroup>
              <Label for='email'>Email</Label>
              <Input
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                className='mb-3'
                onChange={handleChangeEmail}
              />

              <Label for='password'>Password</Label>
              <Input
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                className='mb-3'
                onChange={handleChangePassword}
              />
              <Button
                color='dark'
                style={{ marginTop: '2rem' }}
                block
                onClick={handleOnSubmit}
              >
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};
