import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function DELETE() {
  const cookieStore = cookies();
  cookieStore.delete("token");
  console.log("🚀 ~ DELETE ~ cookieStore:", cookieStore);

  redirect("/login");

  return new Response("Token deleted", { status: 200 });
}
