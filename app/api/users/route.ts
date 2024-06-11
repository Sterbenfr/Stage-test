import { NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import pool from '../../../utils/db'

export async function GET(req: NextRequest, res: NextApiResponse) {
    try {
        const [rows] = await pool.query('SELECT * FROM `user` LIMIT 1000')
        res.json(rows)
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}
