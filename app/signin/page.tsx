import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignInClient from "../../src/pages/SignInClient";

// Серверный компонент для страницы входа
export default function SignInPage() {
  // Иначе рендерим клиентскую часть
  return <SignInClient />;
}
