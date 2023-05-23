import React, { useState } from 'react'
import { setDoc, doc } from "firebase/firestore";
import { useRedirectActiveUser } from '../../hooks/useRedirectActiveUser';
import { useUserContext } from '../../context/UserContext';
import { db, register } from '../../config/firebase';
import "./register.css"
import { Link } from 'react-router-dom';
import moment from 'moment';


const RegisterPage = () => {
  let now = moment().format();
  const [datos, setDatos] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    phone: '',
    rols: '{"admin":false,"secretary":false,"invited":true}'
  })
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false)
  useRedirectActiveUser(user, "/dashboard");

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }
  const resetForm = () => {
    setDatos(({
      name: '',
      surname: '',
      email: '',
      password: '',
      phone: '',
      rols: '{"admin":false,"secretary":false,"invited":true}'
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(datos)
        .then(response => {
          const id = response?.user?.auth?.currentUser?.uid
          let data = { ...datos,
          date: now }
          delete data.password
          setDoc(doc(db, "users", id), data);
        })
      console.log("user registered");
      resetForm();
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      // if (error.code === "auth/email-already-in-use") {
      //   setErrors({ email: "Email already in use" });
      // }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <h2>Register</h2>
     
      <form onSubmit={handleSubmit}>
        <input
          required
          type='text'
          name='name'
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type='text'
          name='surname'
          placeholder="Surname"
          onChange={handleChange}
        />
        <input
          required
          type='text'
          name='phone'
          placeholder='Phone Number'
          onChange={handleChange}
        />
        <input
          required
          type='email'
          name='email'
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          required
          type='password'
          name='password'
          placeholder="Password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type='submit'
        >{loading ? "...loading" : "Register"}</button>
      </form>
      
    </div>
  )
}

export default RegisterPage