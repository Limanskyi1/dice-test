import styles from "./page.module.scss";
import { Dice } from "./components/Dice/Dice";
import { Container } from "@mui/material";

const Home = () => {
  return (
    <main className={styles.main}>
      <Container maxWidth="sm" className={styles.container}>
        <Dice />
      </Container>
    </main>
  );
};

export default Home;
