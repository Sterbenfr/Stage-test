import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Session } from 'next-auth'
import { User } from 'next-auth'

interface ExtendedUser extends User {
    role: Role
}

type ExtendedSession = Session & {
    user: ExtendedUser
}

type Role = 'AD' | 'PR' | 'RR' | 'AP' | 'RE' | 'RC' | 'RS' | 'RA' | 'RN'
const withAuthorization = (
    WrappedComponent: React.ComponentType,
    allowedRoles: Role[],
) => {
    const WithAuthorization = () => {
        const { data: session, status: loading } = useSession() as {
            data: ExtendedSession | null
            status: string
        }
        const router = useRouter() // Move this line inside the component

        useEffect(() => {
            if (!loading && !session) {
                signIn()
            } else if (
                !loading &&
                session &&
                !allowedRoles.includes(session.user.role)
            ) {
                router.push('/')
            }
        }, [session, loading, router])

        if (session && allowedRoles.includes(session.user.role)) {
            return <WrappedComponent />
        }

        return null
    }

    WithAuthorization.displayName = `WithAuthorization(${getDisplayName(
        WrappedComponent,
    )})`

    return WithAuthorization
}

function getDisplayName(WrappedComponent: React.ComponentType) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default withAuthorization

/**import withAuthorization from '../path/to/withAuthorization'

const MyProtectedPage = () => {
    // Page content here
}

export default withAuthorization(MyProtectedPage, ['AD', 'PR', 'RR']) */
