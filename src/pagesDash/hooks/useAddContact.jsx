import { useState } from 'react'
import { db } from '../config/firebase'
import { addDoc, collection} from 'firebase/firestore'
import moment from 'moment';

export const useAddContact = (formulario) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     if (formulario) {
    //         addContact();
    //     }
    // }, [])
    const addContact = async () => {
        let now = moment().format();
        setLoading(true)
        try {
            // await addDoc(userRef, {
            //     ...formulario
            // }).then(response => setData(response))
            await addDoc(collection(db, "contacts"),{date:now,...formulario}).then((response)=>setData(response));
            // setTimeout(() =>{
            //     setData({success:"salio todo bien", ...formulario});
            // }, 4000)
        } catch (e) {
            setError(e.message)
        }
        finally {
            setLoading(false)
        }
    }
    return {
        addContact,
        error,
        loading,
        data
    }
}

