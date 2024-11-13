"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../store/useAuthStore.js";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    const button = document.querySelector(`.${styles.burger}`);
    const nav = document.querySelector(`.${styles.nav}`);
    const burger = document.querySelector("#burger");

    const toggleMenu = () => {
      nav.classList.toggle(styles.active);
      burger.classList.toggle("active");
    };
  
    button.addEventListener("click", toggleMenu);
  
    // Cleanup event listeners on component unmount
    return () => {
      button.removeEventListener("click", toggleMenu);
    };
  }, []);
  return (
    <header className={styles.header}>
      <button className={styles.burger}>
        <div id="burger">
          <span id="top-bar" className={`${styles.topBar} ${styles.bar}`}></span>
          <span id="bar" className={styles.bar}></span>
          <span id="bottom-bar" className={`${styles.bottomBar} ${styles.bar}`}></span>
        </div>
      </button>
      <nav className={styles.nav}>
        <h1
          className="text-2xl font-bold cursor-pointer text-violet-900"
          onClick={() => router.push("/home")}>
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
          {/* <li className={styles.li}>
            <a href="/user" className={styles.a}>
              <button className={`${styles.customBtn} ${styles.btn6}`}>
                <span className={styles.btn6span}>Usuario</span>
              </button>
            </a>
          </li> */}
          <li className={styles.li}>
            <a className={styles.a}>
            <button
              onClick={handleLogout}
              className={`${styles.customBtn} ${styles.btn6}`}>
                <span className={styles.btn6span}>Logout</span>
            </button>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
