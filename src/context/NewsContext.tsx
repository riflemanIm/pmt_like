import React, { useReducer, useContext, createContext, ReactNode } from "react";

// Типы для состояния и действий
export interface NewsItem {
  id: number;
  title: string;
  content: string;
}

export interface NewsState {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
}

export type NewsAction =
  | { type: "SET_NEWS"; payload: NewsItem[] }
  | { type: "ADD_NEWS"; payload: NewsItem }
  | { type: "LOADING" }
  | { type: "SET_ERROR"; payload: string | null };

// Редьюсер
function newsReducer(state: NewsState, action: NewsAction): NewsState {
  switch (action.type) {
    case "SET_NEWS":
      return { ...state, news: action.payload, loading: false, error: null };
    case "ADD_NEWS":
      return { ...state, news: [...state.news, action.payload] };
    case "LOADING":
      return { ...state, loading: true };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      throw new Error(`Unhandled action type: ${(action as any).type}`);
  }
}

// Контекст
const NewsContext = createContext<{
  newsState: NewsState;
  newsDispatch: React.Dispatch<NewsAction>;
} | null>(null);

// Провайдер
export function NewsProvider({ children }: { children: ReactNode }) {
  const initialState: NewsState = {
    news: [],
    loading: false,
    error: null,
  };

  const [newsState, newsDispatch] = useReducer(newsReducer, initialState);

  return (
    <NewsContext.Provider value={{ newsState, newsDispatch }}>
      {children}
    </NewsContext.Provider>
  );
}

// Кастомный хук
export function useNewsStateDispatch() {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNewsStateDispatch must be used within a NewsProvider");
  }
  return context;
}
