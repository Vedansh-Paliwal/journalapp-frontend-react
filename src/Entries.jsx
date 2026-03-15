import styles from './Entries.module.css'
import { useEffect, useState } from 'react';

const URL = "http://localhost:8080/journal";

export const Entries = ({ onLogout, onEdit }) => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(URL, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if(response.status === 401) {
                    onLogout();
                    return;
                }
                if(!response.ok) {
                    console.log("Failed to fetch entries");
                    return;
                }
                const entries = await response.json();
                console.log("Inside fetch entries",entries);
                if(Array.isArray(entries)) {
                    setEntries(entries);
                }
                else {
                    console.log("Backend did not return array", entries);
                    setEntries([]);
                }
            }
            catch(error) {
                console.log(error);
            }
            finally{
                setLoading(false);
            }
        };
        fetchEntries();
    },[]);
    const handleDelete = async (id) => {
        const confirmDelete = confirm("Are you sure you want to delete this entry?");
        if(!confirmDelete) {
            return;
        }
        const token = localStorage.getItem("token");
        const response = await fetch(`${URL}/id/${id}`,{
            method: "DELETE",
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        if(response.status === 401) {
            onLogout();
            return;
        }
        if(response.status === 204) {
            setEntries(prev => prev.filter(entry=>entry.id !== id));
        }
    };
    return(
        <div className={styles.entries}>
            <h2 className={styles.heading}>My Journals</h2>
            {loading ? (
                <p className={styles.emptyMessage}>Loading...</p>
            ) : entries.length === 0 ? (
                <p className={styles.emptyMessage}>
                    No journal entries yet.
                </p>
            ) : (
                entries.map((entry) => (
                    <div key={entry.id} className={styles.entry}>
                        <h3>
                            {entry.title}
                            <span className={styles.date}>
                                {" "}
                                ({new Date(entry.date).toLocaleString()})
                            </span>
                        </h3>
                        <p>{entry.content}</p>
                        <div className={styles.buttonRow}>
                            <button onClick={() => onEdit(entry)} className={styles.updateBtn}>Update</button>
                            <button onClick={() => handleDelete(entry.id)} className={styles.deleteBtn}>Delete</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};