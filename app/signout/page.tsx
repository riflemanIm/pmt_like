import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutClient from "./LogoutClient";

// Серверный компонент страницы выхода
export default function LogoutPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  // Если пользователь всё ещё залогинен — редирект в личный кабинет
  if (token) {
    redirect("/lk");
  }

  // Иначе показываем уведомление и кнопки через клиентский компонент
  return <LogoutClient />;
}
