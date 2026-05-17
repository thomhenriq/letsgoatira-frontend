import { api } from "@/lib/api";
import { Member } from "@/types";

export async function getMembers() {
    return api<Member[]>("/members")
}