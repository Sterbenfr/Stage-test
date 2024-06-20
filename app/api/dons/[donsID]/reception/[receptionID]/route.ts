import { NextResponse } from 'next/server'
import pool from '../../../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { donsID : string, receptionID: string } },
) {
    const receptionID = params.receptionID;
    const donsID = params.donsID;
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Reception WHERE Reception.numero_reception = ? AND code_Don = ?;',
            [receptionID,donsID],
        )
        return NextResponse.json(rows)
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}
