import React, { useState } from 'react'
import "./login.css"
// import { useNavigate } from 'react-router-dom'
import { login } from "../../config/firebase"
import { useUserContext } from '../../context/UserContext'
import { useRedirectActiveUser } from '../../hooks/useRedirectActiveUser'
import { Link } from 'react-router-dom'


const LoginPage = () => {
  const { user } = useUserContext();
  // const navigate = useNavigate()
  const [datos, setDatos] = useState({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // useEffect(() => {
  //   if (user) navigate("/dashboard");
  // }, [user]);
  useRedirectActiveUser(user, "/dashboard");

  const handleChange = (e) => {
    const { name, value } = e.target
    setDatos({ ...datos, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await login({ ...datos });
    } catch (err) {
      // console.log(error.code);
      // console.log(error.message);
    setError(err.message)  
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <div
    // className='container-login'
    >

      <h2>
        Login
      </h2>
      <Link to="/register">Registrarme</Link>
      <form onSubmit={handleSubmit}>
        <input
          required
          name='email'
          type='email'
          placeholder='Email'
          onChange={handleChange}
        />
        <input
          required
          name='password'
          type='password'
          placeholder='Password'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type='submit'
        >
          {loading ? "...loading" : "Login"}

        </button>
      </form>
      {error && <p>{error}</p>}
      <Link to="/reset">Olvide contraseña</Link>
    </div>
  );
}

export default LoginPage