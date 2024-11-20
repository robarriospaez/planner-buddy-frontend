"use client";

import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../store/useAuthStore";
import styles from "../styles/Navbar.module.css";

const Navbar: React.FC = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = useCallback(() => {
    logout();
    router.push("/login");
  }, [logout, router]);

  useEffect(() => {
    // Verificación de renderizado del lado del cliente
    if (typeof window !== "undefined") {
      const button = document.querySelector(
        `.${styles.burger}`
      ) as HTMLButtonElement;
      const nav = document.querySelector(`.${styles.nav}`) as HTMLElement;
      const burger = document.querySelector("#burger") as HTMLElement;

      const toggleMenu = () => {
        nav.classList.toggle(styles.active);
        burger.classList.toggle("active");
      };

      button.addEventListener("click", toggleMenu);

      // Limpiar listeners de eventos al desmontar
      return () => {
        button.removeEventListener("click", toggleMenu);
      };
    }
  }, []);

  return (
    <header className={styles.header}>
      <button className={styles.burger} aria-label="Toggle menu">
        <div id="burger">
          <span
            id="top-bar"
            className={`${styles.topBar} ${styles.bar}`}
          ></span>
          <span id="bar" className={styles.bar}></span>
          <span
            id="bottom-bar"
            className={`${styles.bottomBar} ${styles.bar}`}
          ></span>
        </div>
      </button>
      <nav className={styles.nav}>
        <h1
          className="text-2xl font-bold cursor-pointer text-violet-900"
          onClick={() => router.push("/home")}
        >
          Planner Buddy
        </h1>
        <ul className={styles.navList}>
          <li className={styles.li}>
            <a href="/home" className={styles.a}>
              <button className={`${styles.customBtn} ${styles.btn6}`}>
                <span className={styles.btn6span}>Inicio</span>
              </button>
            </a>
          </li>
          <li className={styles.li}>
            <a href="/events" className={styles.a}>
              <button className={`${styles.customBtn} ${styles.btn6}`}>
                <span className={styles.btn6span}>Eventos</span>
              </button>
            </a>
          </li>
          <li className={styles.li}>
            <button
              onClick={handleLogout}
              className={`${styles.customBtn} ${styles.btn6}`}
            >
              <span className={styles.btn6span}>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
