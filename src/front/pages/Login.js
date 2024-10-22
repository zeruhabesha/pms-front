import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
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
import { loginRequest, loginSuccess, loginFailure } from '../../store/authSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import ToastContainer and toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

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
      dispatch(loginRequest());

      try {
        const response = await axios.post('http://localhost:4000/api/v1/auth/login', { email, password });
        console.log("API Response:", response.data);
        const { token, user } = response.data.data;

        if (user && user.status === 'active') {
          dispatch(loginSuccess({ token, user }));
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          toast.success('Login successful!', { autoClose: 2000, position: "top-right" }); // Success toast
          navigate('/dashboard', { replace: true }); // Use replace to prevent back navigation to login
        } else {
          toast.error('Your account is not active. Please contact your admin.', { autoClose: 3000, position: "top-right" }); // Error toast
        }
        
      } catch (error) {
        console.error("Login error:", error);
        const errorMessage = error.response ? error.response.data.errors : 'An error occurred';
        dispatch(loginFailure(errorMessage));
        setErrors({ general: errorMessage });
        toast.error(errorMessage, { autoClose: 3000, position: "top-right" }); // Error toast
      }
    }
  };

  return (
    <div>
      <Navbar />
      <CContainer className="d-flex justify-content-center align-items-center min-vh-100">
        <CCard className="w-100" style={{ maxWidth: '400px' }}>
          <CCardHeader>
            <motion.h1 className="text-center" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              Login
            </motion.h1>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  invalid={!!errors.email}
                />
                {errors.email && <CAlert color="danger">{errors.email}</CAlert>}
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="password">Password</CFormLabel>
                <CFormInput
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  invalid={!!errors.password}
                />
                {errors.password && <CAlert color="danger">{errors.password}</CAlert>}
              </div>

              {errors.general && <CAlert color="danger" className="text-center">{errors.general}</CAlert>}

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <CButton type="submit" color="primary" block className="mt-3" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </CButton>
              </motion.div>
            </CForm>
            <p className="mt-4 text-center">
              Don't have an account? <a href="/register" className="text-primary">Register</a>
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
