import { useEffect, useState, useContext, createContext } from "react";

// pertenece a config de firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, logout } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(false);
    const [profile, setProfile] = useState(null)
    // const []
    useEffect(() => {
        // console.log("useEffect en acción");
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            // console.log("user", user);
            // setUser(user);
            if (user)
                getProfile(user)
            else {
                setUser(null);
                logout();
            }
            //     setUser(null);
        });

        return unsuscribe;
    }, []);
    const getProfile = async (user) => {
        // if (!user) return;
        const docRef = doc(db, "users", user.uid);
        try {
            await getDoc(docRef).then((response) => {
                // console.log("response", response.data())
                setProfile(response.data());
            });
        } catch (error) {
            console.log("error", error)
        }
        finally {
            setUser(user);
        }
    }
    if (user === false) return <p>Loading app...</p>;

    return (
        <UserContext.Provider value={{ user, profile }}>{children}</UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);