"use client";

import React from "react";
import styles from "@/styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Planner Buddy </p>
      </div>
    </footer>
  );
};

export default Footer;
