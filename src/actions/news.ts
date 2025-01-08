import axios from "axios";
import { NewsAction, NewsItem } from "../context/NewsContext";
import { getError } from "../helpers";

export async function fetchNews(
  dispatch: React.Dispatch<NewsAction>
): Promise<void> {
  dispatch({ type: "LOADING" });

  try {
    const { data } = await axios.get<NewsItem[]>("/api/news");
    dispatch({ type: "SET_NEWS", payload: data });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch({ type: "SET_ERROR", payload: getError(error) });
    } else {
      dispatch({ type: "SET_ERROR", payload: "An unexpected error occurred" });
    }
  }
}

export async function fetchNewsItem(
  id: number,
  dispatch: React.Dispatch<NewsAction>
): Promise<void> {
  dispatch({ type: "LOADING" });

  try {
    const { data } = await axios.get<NewsItem>(`/api/news?id=${id}`);
    //console.log("data", data);

    dispatch({ type: "SET_NEWS_ITEM", payload: data });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch({ type: "SET_ERROR", payload: getError(error) });
    } else {
      dispatch({ type: "SET_ERROR", payload: "An unexpected error occurred" });
    }
  }
}

export async function updateNewsItem(
  id: number,
  newsItem: NewsItem,
  dispatch: React.Dispatch<NewsAction>
): Promise<void> {
  dispatch({ type: "LOADING" });

  try {
    await axios.put(`/api/news`, newsItem);
    dispatch({ type: "SET_NEWS_ITEM", payload: newsItem });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch({ type: "SET_ERROR", payload: getError(error) });
    } else {
      dispatch({ type: "SET_ERROR", payload: "An unexpected error occurred" });
    }
  }
}

export async function deleteNewsItem(
  id: number,
  dispatch: React.Dispatch<NewsAction>
): Promise<boolean> {
  dispatch({ type: "LOADING" });

  try {
    await axios.delete(`/api/news?id=${id}`);
    dispatch({ type: "REMOVE_NEWS_ITEM", payload: id });
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch({ type: "SET_ERROR", payload: getError(error) });
    } else {
      dispatch({ type: "SET_ERROR", payload: "An unexpected error occurred" });
    }
    return false;
  }
}
