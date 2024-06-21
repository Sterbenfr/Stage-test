import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'
import pool from './db'

interface User {
    id: string
    email: string
    password: string
    role: string
}

// Find user by email and include their role
export async function findUser(email: string): Promise<User | null> {
    try {
        const [rows] = await pool.execute<mysql.RowDataPacket[]>(
            'SELECT code_utilisateur, mail_restos_du_coeur AS email, password, code_type_utilisateur AS role FROM Utilisateurs WHERE mail_restos_du_coeur = ?',
            [email],
        )

        if (Array.isArray(rows) && rows.length > 0) {
            const user = rows[0]
            return {
                id: user.id,
                email: user.email,
                password: user.password,
                role: user.role,
            }
        } else {
            return null
        }
    } catch (error) {
        console.error('Database query error:', error)
        throw new Error('Error finding user in the database')
    }
}

// Verify password against the hashed password in the database
export async function verifyPassword(
    password: string,
    hash: string,
): Promise<boolean> {
    try {
        return await bcrypt.compare(password, hash)
    } catch (error) {
        console.error('Password verification error:', error)
        throw new Error('Error verifying password')
    }
}
