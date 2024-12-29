import axios from "axios";
import { NewsAction, NewsItem } from "../context/NewsContext";

export async function fetchNews(
  dispatch: React.Dispatch<NewsAction>
): Promise<void> {
  dispatch({ type: "LOADING" });

  try {
    const { data } = await axios.get<NewsItem[]>("/api/news"); // Типизированный запрос
    console.log("--data--", data);
    dispatch({ type: "SET_NEWS", payload: data });
  } catch (error: any) {
    dispatch({ type: "SET_ERROR", payload: error.message });
  }
}
