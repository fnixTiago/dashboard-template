import { doc, updateDoc } from 'firebase/firestore';
import  { useState } from 'react'
import { db } from '../config/firebase';

export const useUpdateContact = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const updateContact = async (id, formulario) => {
        const q = doc(db, "contacts", id);
        setLoading(true);
        try {
            await updateDoc(q, {
                ...formulario
            }).then((response) => setData(response));
        } catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }
    return {
        error,
        loading,
        data,
        updateContact,
    }
}

export default useUpdateContact