import { redirect } from "next/navigation";

export default function Home() {
  // Otomatis melempar user ke halaman /login saat membuka web
  redirect("/login");
}