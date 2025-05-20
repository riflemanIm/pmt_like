import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignInClient from "../../src/pages/SignInClient";

// Серверный компонент для страницы входа
export default function SignInPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  // Если пользователь уже аутентифицирован — редирект в ЛК
  if (token && typeof window === "undefined") {
    redirect("/lk");
  }

  // Иначе рендерим клиентскую часть
  return <SignInClient />;
}
