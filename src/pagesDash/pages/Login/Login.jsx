import React, {  useState } from 'react'
import "./login.css"
// import { useNavigate } from 'react-router-dom'
import { login } from "../../config/firebase"
import { useUserContext } from '../../context/UserContext'
import { useRedirectActiveUser } from '../../hooks/useRedirectActiveUser'


const LoginPage = () => {
  const { user } = useUserContext();
  // const navigate = useNavigate()
  const [datos, setDatos] = useState({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
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
      console.log("user logged in");
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      setLoading(false)
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <div
    // className='container-login'
    >
      
      Login
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
    </div>
  );
}

export default LoginPage