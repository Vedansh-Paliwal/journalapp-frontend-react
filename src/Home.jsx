import styles from "./Home.module.css"

export const Home = () => {
    const token = localStorage.getItem("token");
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Welcome to Your Journal</h1>
            <p className={styles.subText}>You can check all your entries here...</p>
        </div>
    );
};