import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import UserModel, { User } from '@/models/User.models';

interface AuthUser {
  _id: string;
  email: string;
  username: string;
  isVerified: boolean;
  isAcceptingMessages?: boolean;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<AuthUser | null> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials.email }, // Using "email" instead of "identifier" for consistency with credentials
            ],
          });

          if (!user) {
            throw new Error('No user found with this email');
          }
          if (!user.isVerified) {
            throw new Error('Please verify your account before logging in');
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user.toObject() as AuthUser; // Convert to plain object and cast to AuthUser
          } else {
            throw new Error('Incorrect password');
          }
        } catch (err: any) {
          throw new Error(err.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token._id = user._id;
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
};
