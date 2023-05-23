import  { useEffect, useState } from 'react'
import { collection,  onSnapshot, query } from "firebase/firestore";
import { db } from '../config/firebase';

export const useReadContact = () => {
    let lista = []
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState([])
    
    useEffect(() => {
        getContacts()
    }, [])
    
    const getContacts = async () => {
        const q = query(collection(db, "contacts"));
        setLoading(true)
        try {
            // setData([])
            onSnapshot(q, (snapshot) => {
                lista = []
                snapshot.forEach((snap) => {
                    // console.log(snap.id)
                    lista.push({id:snap.id, ...snap.data()});
                });
                setData(lista);
            });

        } catch (e) {
            setError(e.message)
        }
        finally {
            setLoading(false)
        }
    }
    return {
        getContacts,
        data,
        error,
        loading
    }
}
