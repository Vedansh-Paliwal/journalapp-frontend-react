import styles from './EditProfile.module.css'
import { useState, useEffect} from 'react';

const URL = "https://journal-app-backend-soa3.onrender.com/user"

export const EditProfile = ({onLogout}) => {
    const [username,setUsername] = useState("");
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                
                const response = await fetch(URL, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (response.status === 401) {
                    onLogout();
                    return;
                }
                if (!response.ok) {
                    console.log("Failed to fetch user");
                    return;
                }
                const data = await response.json();
                setUsername(data.username);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, []);
    
    
    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        const confirmDelete = confirm("Are you sure you want to delete your account? This will erase all your entries and account information we have with us?");
        if(!confirmDelete) {
            return;
        }
        const response = await fetch(URL, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if(response.status === 401) {
            onLogout();
            return;
        }
        if(!response.ok) {
            alert("Failed to delete account.");
        }
        if(response.status === 204) {
            alert("Account Deleted Successfully!");
            onLogout();
            return;
        }
    };

    const handleSubmit = async () => {
        if(showPasswordFields) {
            if(!oldPassword || !newPassword || !retypePassword) {
                alert("Please fill all password fields");
                return;
            }
            if(newPassword !== retypePassword) {
                alert("New Passwords do not match");
                return;
            }
        }
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(URL, {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify({
                    username,
                    oldPassword: showPasswordFields ? oldPassword : null,
                    newPassword: showPasswordFields ? newPassword : null
                })
            });
            if(response.status == 401) {
                onLogout();
                return;
            }
            if(!response.ok) {
                alert("Failed to update profile");
                return;
            }
            alert("Profile updated successfully");
            setOldPassword("");
            setNewPassword("");
            setRetypePassword("");
            setShowPasswordFields(false);
        }
        catch(error) {
            console.log(error);
        }
    };

    return(
        <div className={styles.editProfile}>
            <form className={styles.form}>
                <div className={styles.row}>
                    <label>Username</label>
                    <input 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={styles.row}>
                    <label>Password</label>
                    <span 
                        className={styles.changePassLink}
                        onClick={() => setShowPasswordFields(true)}
                    >
                        Change Password
                    </span>
                </div>
                {showPasswordFields && (
                    <div className={styles.passwordFields}>
                        <div className={styles.row}>
                            <label>Old Password</label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles.row}>
                            <label>New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles.row}>
                            <label>Retype New Password</label>
                            <input
                                type="password"
                                value={retypePassword}
                                onChange={(e) => setRetypePassword(e.target.value)}
                            />
                        </div>
                    </div>
                )}
                <div className={styles.buttonRow}>
                    <button type="submit" className={styles.saveBtn} onClick={handleSubmit}>
                        Save Changes
                    </button>
                    <button type="button" className={styles.deleteBtn} onClick={handleDelete}>
                        Delete Account
                    </button>
                </div>
            </form>
        </div>
    );
};