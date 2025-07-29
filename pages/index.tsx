import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Добро пожаловать в VKID Demo</h1>
      <p>
        Перейти к <Link href="/login">авторизации через VKID</Link>
      </p>
    </div>
  );
}
