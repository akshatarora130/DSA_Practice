import dotenv from "dotenv"

dotenv.config();

export const GITHUB_ID = process.env.GITHUB_ID
export const GITHUB_SECRET = process.env.GITHUB_SECRET
export const GOOGLE_ID = process.env.GOOGLE_ID
export const GOOGLE_SECRET = process.env.GOOGLE_SECRET
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
export const JWT_SECRET = process.env.JWT_SECRET