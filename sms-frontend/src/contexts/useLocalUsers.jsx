import { useState, useEffect } from "react";

export default function useLocalUsers() {
    const [user, setUser] = useState(() => {
        try {
            const savedUsers = localStorage.getItem("signUpUsers");
            return savedUsers ? JSON.parse(savedUsers) : [];
        } catch (error) {
            console.error("Failed to fetch data from local storage", error);
            return [];
        }
    });

    useEffect(() => {
        const handleUsersLocalStorage = (e) => {
            try {
                if(e.key == 'signUpUsers'){
                    const newUser = JSON.parse(e.newValue || '[]');
                    setUser(newUser);
                }
            } catch (error) {
                console.error("Failed to store data to local storage", error);
            }
        };
        window.addEventListener("storage", handleUsersLocalStorage);
    }, []);

    return [user,setUser];
}
