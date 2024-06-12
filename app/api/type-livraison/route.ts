import { NextResponse } from 'next/server'
import pool from '../../../utils/db'

export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM `TypeLivraison` LIMIT 1000')
        return NextResponse.json(rows)
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}
