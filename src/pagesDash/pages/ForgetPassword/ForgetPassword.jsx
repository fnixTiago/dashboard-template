import React, { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useUserContext } from '../../context/UserContext';
import { useRedirectActiveUser } from "../../hooks/useRedirectActiveUser"
import "./forgetPassword.css"

const ForgetPasswordPage = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("")
  const { user } = useUserContext();
  const [message, setMessage] = useState("")

  useRedirectActiveUser(user, "/dashboard");
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await sendPasswordResetEmail(auth, email)
      setMessage("Review your email")
    }
    catch (error) {
      console.log(error.code);
      console.log(error.message);
      setMessage(error.message)
      // ..}
    }
  }
  return (
    <div>
      <h2>
        ForgetPassword
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          required
          name='email'
          type='email'
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <button type='submit'> Send</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default ForgetPasswordPage