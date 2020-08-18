import MainLayout from "../layouts/main";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <MainLayout>
      <h1 className={styles.title}>My Trello</h1>
    </MainLayout>
  );
}
