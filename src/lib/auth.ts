import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { hash, compare } from 'bcryptjs'
import { getServerSession } from 'next-auth';

export async function HashPassword(password: string) {
    try {
        return await hash(password, 12)
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

export async function VerifyPassword(password: string, hashedPassword: string) {
    try {
        return await compare(password, hashedPassword);
    } catch (error) {
        throw new Error('Error Comparies Passwords');
    }
}

export const getUserSession = async (context) => await getServerSession(context.req, context.res, authOptions);
export const RedirectToLogin = { props: {}, redirect: { destination: '/login', permanent: false } };
export const RedirectToDashboard = { props: {}, redirect: { destination: '/dashboard', permanent: false } };