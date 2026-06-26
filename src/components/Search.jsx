import { useEffect, useState } from "react";
import styles from "./search.module.css";

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "f7ef97b3279345abb5f15562dae30245";

export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("Pizza");

  useEffect(() => {
    async function fetchFood() {
      try {
        const res = await fetch(
          `${URL}?query=${query}&apiKey=${API_KEY}`
        );

        if (!res.ok) {
          console.error("API Error:", res.status);
          return;
        }

        const data = await res.json();
        setFoodData(data.results);
      } catch (err) {
        console.error(err);
      }
    }

    fetchFood();
  }, [query]);

  return (
    <div className={styles.searchContainer}>
      <span className={styles.icon}>🔍</span>

      <input
        className={styles.input}
        value={query}
        type="text"
        placeholder="Search recipes..."
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}