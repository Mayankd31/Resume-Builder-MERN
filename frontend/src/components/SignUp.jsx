import React, { useContext, useState } from 'react'
import { authStyles as styles } from "../assets/dummystyle.js"
import { UserContext } from "../context/UserContext.jsx"
import { useNavigate } from "react-router-dom"
import { validateEmail } from '../utils/helper.js'
import axiosInstance from '../utils/axiosInstance.js'
import { API_PATHS } from '../utils/apiPath.js'
import { Input } from './Input.jsx'

const SignUp = ({ setCurrentPage }) => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault()
    if (!fullName) {
      setError("Please enter FullName")
      return
    }

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
      const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
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
      setError(error.res?.data?.message || "Something went wrong. Please try again..")
    }
  }

  return (
    <div className={styles.signupContainer}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.signupTitle}>Create Account</h3>
        <p className={styles.signupSubtitle}>Join thousands of professional today</p>
      </div>

      {/* form */}
      <form onSubmit={handleSignup} className={styles.signupForm}>
        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          label="Full Name"
          placeholder="John Doe"
          type='text'
        />
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
        <button type='submit' className={styles.signupSubmit}>
          Create Account
        </button>

        {/* footer */}
        <p className={styles.switchText}>
          Already have an account?{" "}
          <button onClick={() => setCurrentPage("login")}
            type='button'
            className={styles.signupSwitchButton}>
            Sign In
          </button>
        </p>
      </form>
    </div>
  )
}

export default SignUp