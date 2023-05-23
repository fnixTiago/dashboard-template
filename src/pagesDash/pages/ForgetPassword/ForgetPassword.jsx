import React, { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useUserContext } from '../../context/UserContext';
import { useRedirectActiveUser } from "../../hooks/useRedirectActiveUser"
import "./forgetPassword.css"
import { Link } from 'react-router-dom';

const ForgetPasswordPage = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("")
  const { user } = useUserContext();
  const [error, setError] = useState("")

  useRedirectActiveUser(user, "/dashboard");
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await sendPasswordResetEmail(auth, email)
      setError("Review your email")
    }
    catch (err) {
      // console.log(err.code);
      // console.log(err.message);
      setError(err.message)
      // ..}
    }
  }
  return (
    <div>
      <h2>
        ForgetPassword
      </h2>
      <Link to ="/login">Inciar sesión</Link>
      <form onSubmit={handleSubmit}>
        <input
          required
          name='email'
          type='email'
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <button type='submit'> Send</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default ForgetPasswordPage