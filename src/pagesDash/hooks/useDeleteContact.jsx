import { collection, deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../config/firebase';

const useDeleteContact = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const deleteContact = async (id) => {
        try {
            setError(null);
            setLoading(true);
            await deleteDoc(doc(db, "contacts", id)).then((response) => setData(response));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        deleteContact,
        loading,
        error,
        data
    }
}

export default useDeleteContact