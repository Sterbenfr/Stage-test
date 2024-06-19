import { NextResponse } from 'next/server'
import pool from '../../../../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { entiteID : string } }
  ) {
    try {
        const [rows] = await pool.query('SELECT * FROM `Contacts` LIMIT 1000')
        return NextResponse.json(rows)
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}
