import React, { useEffect, useState } from 'react'
import "./contacts.css"
import { useAddContact } from '../../hooks/useAddContact'
import { useReadContact } from '../../hooks/useReadContact'
import useDeleteContact from '../../hooks/useDeleteContact'
import useUpdateContact from '../../hooks/useUpdateContact'
const Contacts = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [dataEdit, setDataEdit] = useState({
    name: "",
    email: "",
    message: "",
  })

  const { error: listError,
    loading: listLoading,
    data: listData } = useReadContact()

  const { addContact,
    error: addError,
    loading: addLoading
  } = useAddContact(data)
  const { deleteContact,
    error: deleteError,
    loading: deleteLoading
  } = useDeleteContact()
  const {
    updateContact,
    error: updateError,
    loading: updateLoading,
    data: updateData
  } = useUpdateContact()
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }
  // console.log(listData)
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(data)
    addContact(data)
  }
  const handleDelete = (e, idContanct) => {
    e.preventDefault()
    console.log(idContanct)
    deleteContact(idContanct)
  }
  // editContact
  const handleChangeEdit = (e) => {
    setDataEdit({
      ...dataEdit,
      [e.target.name]: e.target.value
    })
  }
  const handleEdit = (e, contact) => {
    e.preventDefault()
    setDataEdit(contact)
  }
  const handleSubmitEdit = (e) => {
    e.preventDefault()
    const id = dataEdit.id
    const conta = { ...dataEdit }
    delete conta.id
    updateContact(id, conta)
  }
  return (
    <div>
      <h2>
        Contacts
      </h2>
      <form onSubmit={handleSubmit}>
        <input required type="text" name="name" placeholder="Names and surnames" onChange={handleChange} />
        <input required type="email" name="email" placeholder="Email" onChange={handleChange} />
        <textarea required name="message" placeholder="Write your message" onChange={handleChange} />
        <button type="submit">{addLoading ? "...add" : "Add"}</button>
      </form>
      {addError && <p>{addError}</p>}

      <h3>Edit contact</h3>
      <form onSubmit={handleSubmitEdit}>
        <input required type="text" value={dataEdit.name} name="name" placeholder="Names and surnames" onChange={handleChangeEdit} />
        <input required type="email" value={dataEdit.email} name="email" placeholder="Email" onChange={handleChangeEdit} />
        <textarea required value={dataEdit.message} name="message" placeholder="Write your message" onChange={handleChangeEdit} />
        <button type="submit">{updateLoading ? "...update" : "Update"}</button>
      </form>
      {updateError && <p>{updateError}</p>}


      <h3>List contacts</h3>
      {listLoading && <p>..loading list </p>}
      {listError && <p>{listError}</p>}

      {deleteError && <p>{deleteError}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listData.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.message}</td>
              <td>
                <button
                  disabled={deleteLoading}
                  onClick={(e) => handleDelete(e, contact.id)}>
                  {deleteLoading ? "...deleting" : "Delete"}
                </button>
                <button
                  onClick={(e) => handleEdit(e, contact)}>
                  edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  )
}

export default Contacts