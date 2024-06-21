'use client'
import { signIn } from 'next-auth/react'

const LoginPage = () => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            email: { value: string }
            password: { value: string }
        }
        const email = target.email.value
        const password = target.password.value

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })

        if (result && !result.error) {
            // Redirect to a protected page
            window.location.href = '/prestataire'
        } else if (result) {
            // Show error to user
            console.error(result.error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name='email' type='text' required />
            <input name='password' type='password' required />
            <button type='submit'>Sign in</button>
        </form>
    )
}

export default LoginPage
