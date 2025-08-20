import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext.jsx"
import axiosInstance from '../utils/axiosInstance.js';
import { API_PATHS } from '../utils/apiPath';
import { authStyles as styles } from "../assets/dummystyle.js"
import { Input } from './Input.jsx';
import { validateEmail } from '../utils/helper.js';


const Login = ({ setCurrentPage }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Please enter password")
      return
    }
    setError(null)

    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      })

      const { token } = res.data

      if (token) {
        localStorage.setItem("token", token)
        updateUser(res.data)
        navigate("/dashboard")
      }

    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong. Please try again..")
    }

  }

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.title}>Welcome Back</h3>
        <p className={styles.subtitle}>
          Sign in to continue building amazing resumes
        </p>
      </div>

      {/* form */}
      <form onSubmit={handleLogin} className={styles.form}>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="johndoe@gmail.com"
          type='email'
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Min. 8 characters"
          type='password'
        />

        {error && <div className={styles.errorMessage}>{error}</div>}
        <button type='submit' className={styles.submitButton}>
          Sign In
        </button>

        <p className={styles.switchText}>
          Don't have an account{" "}
          <button type="button" className={styles.switchButton} onClick={() => setCurrentPage("signup")}>
            Sign Up
          </button>
        </p>

      </form>
    </div>
  )
}

export default Login