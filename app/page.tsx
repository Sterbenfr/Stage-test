import { getServerSession } from 'next-auth'
import { authOptions } from '../app/api/auth/[...nextauth]/route' // Adjust the path as necessary

export default async function Home() {
    const session = await getServerSession(authOptions)

    console.log(session ? session.user : 'No session')
    return (
        <div>
            <h1>Welcome to My App</h1>
            {session && session.user ? (
                <p>Signed in as {session.user.email}</p>
            ) : (
                <p>You are not signed in</p>
            )}
        </div>
    )
}
