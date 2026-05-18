import { api } from "@/lib/api";
import { Member } from "@/types";

export async function getMembers() {
    return api<Member[]>("/members")
}

export async function createMember(formData: FormData) {
    return api<Member>("/members", {
        method: "POST",
        body: formData,
    })
}