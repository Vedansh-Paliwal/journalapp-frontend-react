import { useState } from "react";
import { useEffect } from "react";
import styles from "./Navbar.module.css"


export const Navbar = ({onLogout, onNavigate}) => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMenuOpen]);

    return(
        <div className={styles.navbar}>
            <div className={styles.navLogo}>
                <h2>Journal App</h2>
            </div>
            <div 
                className={styles.hamburgerBtn}
                onClick={() => setMenuOpen(prev => !prev)}
            >
                ☰
            </div>
            <div className={styles.navOptions}>
                <ul>
                    <li onClick={() => onNavigate("home")}>HOME</li>
                    <li className={styles.dropdownParent}>
                        PROFILE
                        <div className={styles.dropdown}>
                            <p onClick={() => onNavigate("editProfile")}>Edit Profile</p>
                            <p onClick={onLogout}>Logout</p>
                        </div>
                    </li>
                    <li className={styles.dropdownParent}>
                        SERVICES
                        <div className={styles.dropdown}>
                            <p onClick={() => onNavigate("entries")}>My Journals</p>
                            <p onClick={() => onNavigate("new")}>Create New Entry</p>
                        </div>
                    </li>
                    <li>CONTACT</li>
                </ul>
            </div>
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.show : ""}`}>
                <ul>
                    <li onClick={() => onNavigate("entries")}>My Journals</li>
                    <li onClick={() => onNavigate("new")}>Create New Entry</li>
                    <li onClick={() => onNavigate("editProfile")}>Edit Profile</li>
                    <li onClick={onLogout}>Logout</li>
                </ul>
            </div>
            {isMenuOpen && (
                <div 
                    className={styles.overlay}
                    onClick={() => setMenuOpen(false)}
                />
            )}
        </div>
    );
};