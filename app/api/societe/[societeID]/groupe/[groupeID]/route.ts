import { NextResponse } from 'next/server'
import pool from '../../../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { groupeID: string } },
) {
    const groupeID = params.groupeID
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Groupe WHERE code_Groupe = ?;',
            [groupeID],
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
