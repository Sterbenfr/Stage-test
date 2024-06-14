import React from 'react'
import Link from 'next/link'
import styles from '../styles/components.module.css'

interface NavBarProps {
    children?: React.ReactNode
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
    return (
        <main>
            <nav className={styles.navbar}>
                <Link href='/' className={styles.links}>
                    <img src='/logo.png' alt='Logo' />
                </Link>
                <Link href='/dons' className={styles.links}>
                    Dons
                </Link>
                <Link href='/interactions' className={styles.links}>
                    Interactions
                </Link>
                <Link href='/societe' className={styles.links}>
                    Société
                </Link>
                <Link href='/sites' className={styles.links}>
                    Sites
                </Link>
                <Link href='/prestataires' className={styles.links}>
                    Prestataires
                </Link>
                <Link href='/Cerfa' className={styles.links}>
                    Cerfa
                </Link>
            </nav>
            {children}
        </main>
    )
}

export default NavBar
