<<<<<<< HEAD
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
=======
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
import {
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CCard,
  CCardBody,
  CAlert,
  CContainer,
<<<<<<< HEAD
} from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../api/actions/authActions';
import styles from './Login.module.scss';
=======
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { login } from '../../api/actions/authActions'
import backgroundImage from '../../assets/images/hero-bg-abstract.jpg'
import { FaLongArrowAltRight } from 'react-icons/fa'
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth) || {}
  const { loading, error } = auth

  const handleSubmit = async (e) => {
<<<<<<< HEAD
    e.preventDefault();
    const errors = {};
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';
=======
    e.preventDefault()
    const errors = {}
    if (!email) errors.email = 'Email is required'
    if (!password) errors.password = 'Password is required'
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3

    if (Object.keys(errors).length > 0) {
      setErrors(errors)
    } else {
      setErrors({})
      try {
<<<<<<< HEAD
        const result = await dispatch(login({ email, password })).unwrap();
        toast.success('Login successful!', { autoClose: 2000, position: 'top-right' });
=======
        const result = await dispatch(login({ email, password })).unwrap()
        toast.success('Login successful!', { autoClose: 2000, position: 'top-right' })
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3

        if (result.token) {
          navigate('/dashboard', { replace: true })
        } else {
          throw new Error('Login failed: No token returned')
        }
      } catch (error) {
<<<<<<< HEAD
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
=======
        const errorMessage = error.response?.data?.message || 'An error occurred during login'
        setErrors({ general: errorMessage })
        toast.error(errorMessage, { autoClose: 3000, position: 'top-right' })
      }
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Background with blur effect */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)',
          zIndex: -1,
        }}
      />

      {/* Foreground content */}
      <CContainer
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          position: 'relative',
          padding: '2rem',
          zIndex: 1,
        }}
      >
        <CCard
          style={{
            width: '100%',
            maxWidth: '500px',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(8px)',
            background: 'rgba(255, 255, 255, 0.85)',
            padding: '2rem',
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '1rem',
              fontSize: '3rem',
            }}
          >
            Login
          </motion.h1>
          <CCardBody style={{ padding: '2rem' }}>
            <CForm onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  invalid={!!errors.email}
                />
<<<<<<< HEAD
                {errors.email && <CAlert color="danger" className={styles.alertDanger}>{errors.email}</CAlert>}
              </div>

              <div className={styles.formInput}>
=======
                {errors.email && (
                  <CAlert
                    color="danger"
                    style={{
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      textAlign: 'center',
                    }}
                  >
                    {errors.email}
                  </CAlert>
                )}
              </div>

              <div style={{ marginBottom: '1rem' }}>
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
                <CFormLabel htmlFor="password">Password</CFormLabel>
                <CFormInput
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  invalid={!!errors.password}
                />
<<<<<<< HEAD
                {errors.password && <CAlert color="danger" className={styles.alertDanger}>{errors.password}</CAlert>}
              </div>

              {errors.general && (
                <CAlert color="danger" className={styles.alertDanger}>
=======
                {errors.password && (
                  <CAlert
                    color="danger"
                    style={{
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      textAlign: 'center',
                    }}
                  >
                    {errors.password}
                  </CAlert>
                )}
              </div>

              {errors.general && (
                <CAlert
                  color="danger"
                  style={{
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    textAlign: 'center',
                  }}
                >
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
                  {errors.general}
                </CAlert>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
<<<<<<< HEAD
                <CButton type="submit" color="primary" className={styles.button} disabled={loading}>
=======
                <CButton
                  type="submit"
                  color="primary"
                  style={{
                    width: '100%',
                    marginTop: '1.5rem',
                    marginBottom: '1rem',
                    backgroundColor: '#007bff',
                  }}
                  disabled={loading}
                >
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
                  {loading ? 'Logging in...' : 'Login'}
                </CButton>
              </motion.div>
            </CForm>
            <p className="mt-4 text-center">
<<<<<<< HEAD
              Don&apos;t have an account?{' '}
              <a href="/register" className={styles.link}>
                Register
=======
              <a
                href="/"
                style={{
                  color: '#007bff',
                  textDecoration: 'none',
                }}
              >
                Return to Home
                <FaLongArrowAltRight style={{ marginLeft: 5 }} />
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
              </a>
            </p>
          </CCardBody>
        </CCard>
      </CContainer>
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
  )
}

<<<<<<< HEAD
export default Login;
=======
export default Login
>>>>>>> acfa61701d3d2d693a4c8429268beedde686e0a3
