import { env } from "./env";

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${env.API_URL}${path}`, options)

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}