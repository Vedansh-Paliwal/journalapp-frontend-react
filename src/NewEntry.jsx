import { useState, useEffect } from "react";
import styles from './NewEntry.module.css'

const URL = "https://journal-app-backend-soa3.onrender.com/journal";

export const NewEntry = ({ onSuccess, onLogout, initialData }) => {
    const isEditMode = !!initialData;
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        title: initialData ? initialData.title : "",
        content: initialData ? initialData.content : ""
    });
    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                content: initialData.content
            });
        } else {
            setFormData({
                title: "",
                content: ""
            });
        }
    }, [initialData]);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(prev => ({
            ...prev,
            [name]:value
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(isEditMode) {
            try {
                const response = await fetch(`${URL}/id/${initialData.id}`,{
                    method: "PUT",
                    headers: {
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: formData.title,
                        content: formData.content
                    })
                });
                if(response.status === 401) {
                    onLogout();
                    return;
                }
                if(response.ok) {
                    onSuccess();
                }
            }
            catch(error) {
                console.log(error);
            }
        } 
        else {
            try {
                const response = await fetch(URL,{
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: formData.title,
                        content: formData.content
                    })
                });
                if (response.status === 401) {
                    onLogout();
                }
                if(!response.ok) {
                    console.log("Failer to create entry");
                    return;
                }
                if(response.status === 201) {
                    onSuccess();
                }
            }
            catch(error) {
                console.log(error);
            }
        }
    };
    return(
        <div className={styles.newEntry}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>{isEditMode ? "Update Entry" : "Create New Entry"}</h2>
                <input 
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <textarea 
                    name="content" 
                    placeholder="Write your journal..."
                    value={formData.content}
                    onChange={handleChange}
                />
                <button type="submit">
                    {isEditMode ? "Update Entry" : "Save Entry"}
                </button>
            </form>
        </div>
    );
};