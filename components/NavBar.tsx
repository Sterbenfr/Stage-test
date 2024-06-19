import React from 'react'
import Link from 'next/link'
import styles from '../styles/components.module.css'
import Image from 'next/image'

interface NavBarProps {
    children?: React.ReactNode
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
    return (
        <main>
            <nav className={styles.navbar}>
                <Link href='/' className={styles.img_nav}>
                    <Image
                        src='/IMG/logo_bl.png'
                        alt='logo'
                        width={180}
                        height={80}
                    />
                </Link>
                <Link href='/dons' className={styles.links}>
                    Dons
                </Link>
                <Link href='/interaction' className={styles.links}>
                    Interactions
                </Link>
                <Link href='/societe' className={styles.links}>
                    Société
                </Link>
                <Link href='/sites' className={styles.links}>
                    Sites
                </Link>
                <Link href='/prestataire' className={styles.links}>
                    Prestataires
                </Link>
                <Link href='/cerfa' className={styles.links}>
                    Cerfa
                </Link>
            </nav>
            {children}
        </main>
    )
}

export default NavBar
