import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CAlert,
  CContainer,
} from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../api/actions/authActions';
import styles from './Login.module.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth) || {};
  const { loading, error } = auth;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setErrors({});
      try {
        const result = await dispatch(login({ email, password })).unwrap();
        toast.success('Login successful!', { autoClose: 2000, position: 'top-right' });

        if (result.token) {
          navigate('/dashboard', { replace: true });
        } else {
          throw new Error('Login failed: No token returned');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during login';
        setErrors({ general: errorMessage });
        toast.error(errorMessage, { autoClose: 3000, position: 'top-right' });
      }
    }
  };

  return (
    <div>
      <Navbar />
      <CContainer className={styles.container}>
        <CCard className={styles.card}>
          <CCardHeader className={styles.cardHeader}>
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Login
            </motion.h1>
          </CCardHeader>
          <CCardBody className={styles.cardBody}>
            <CForm onSubmit={handleSubmit}>
              <div className={styles.formInput}>
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  invalid={!!errors.email}
                />
                {errors.email && <CAlert color="danger" className={styles.alertDanger}>{errors.email}</CAlert>}
              </div>

              <div className={styles.formInput}>
                <CFormLabel htmlFor="password">Password</CFormLabel>
                <CFormInput
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  invalid={!!errors.password}
                />
                {errors.password && <CAlert color="danger" className={styles.alertDanger}>{errors.password}</CAlert>}
              </div>

              {errors.general && (
                <CAlert color="danger" className={styles.alertDanger}>
                  {errors.general}
                </CAlert>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CButton type="submit" color="primary" className={styles.button} disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </CButton>
              </motion.div>
            </CForm>
            <p className="mt-4 text-center">
              Don&apos;t have an account?{' '}
              <a href="/register" className={styles.link}>
                Register
              </a>
            </p>
          </CCardBody>
        </CCard>
      </CContainer>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;