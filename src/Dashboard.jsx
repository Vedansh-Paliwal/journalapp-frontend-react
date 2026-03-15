import { useState } from 'react';
import { Navbar } from './Navbar.jsx'
import { Home } from './Home.jsx'
import { Entries } from './Entries.jsx';
import styles from "./Background.module.css"
import { NewEntry } from './NewEntry.jsx';
import { EditProfile } from './EditProfile.jsx';

export const Dashboard = ({ onLogout }) => {

    const [activeSection, setActiveSection] = useState("home");
    const [editingEntry, setEditingEntry] = useState(null);

    return(
        <>
            <Navbar
                onNavigate={(section) => {
                    if (section === "new") {
                        setEditingEntry(null);
                    }
                    setActiveSection(section);
                }}
                onLogout={onLogout}
            />
            <div className={styles.main}>
                {activeSection === "home" && 
                    <Home />
                }
                {activeSection === "entries" && (
                    <Entries 
                        onLogout = {onLogout}
                        onEdit = {(entry) => {
                            setEditingEntry(entry);
                            setActiveSection("new");
                        }}
                    />
                )}
                {activeSection === "new" && (
                    <NewEntry 
                        onSuccess = {() => {
                            setEditingEntry(null);
                            setActiveSection("entries");
                        }}
                        onLogout = {onLogout}
                        initialData={editingEntry}
                    />
                )}
                {activeSection === "editProfile" && 
                    <EditProfile 
                        onLogout = {onLogout}
                    />
                }
            </div>
        </>
    );
};