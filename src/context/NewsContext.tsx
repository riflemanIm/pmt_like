import React, { useReducer, useContext, createContext, ReactNode } from "react";

// Типы для состояния и действий
export interface NewsItem {
  id?: number;
  title: string;
  content: string;
  status: 0 | 1;
  created_at: string;
  updated_at: string;
}

export interface NewsState {
  news: NewsItem[];
  newsItem: NewsItem | null;
  loading: boolean;
  error: string | null;
}

export type NewsAction =
  | { type: "SET_NEWS"; payload: NewsItem[] }
  | { type: "ADD_NEWS"; payload: NewsItem }
  | { type: "SET_NEWS_ITEM"; payload: NewsItem }
  | { type: "REMOVE_NEWS_ITEM"; payload: number }
  | { type: "UPDATE_NEWS_STATUS"; payload: { id: number; status: 0 | 1 } }
  | { type: "LOADING" }
  | { type: "SET_ERROR"; payload: string | null };

// Редьюсер
const newsReducer = (state: NewsState, action: NewsAction): NewsState => {
  switch (action.type) {
    case "SET_NEWS":
      return { ...state, news: action.payload, loading: false, error: null };
    case "ADD_NEWS":
      return {
        ...state,
        news: [...state.news, action.payload],
        loading: false,
        error: null,
      };
    case "SET_NEWS_ITEM":
      return {
        ...state,
        newsItem: action.payload,
        loading: false,
        error: null,
      };
    case "REMOVE_NEWS_ITEM":
      return {
        ...state,
        news: state.news.filter((item) => item.id !== action.payload),
        loading: false,
        error: null,
      };
    case "UPDATE_NEWS_STATUS":
      return {
        ...state,
        news: state.news.map((item) =>
          item.id === action.payload.id
            ? { ...item, status: action.payload.status }
            : item
        ),
        loading: false,
        error: null,
      };
    case "LOADING":
      return { ...state, loading: true };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

// Начальное состояние
const initialState: NewsState = {
  news: [],
  newsItem: null,
  loading: false,
  error: null,
};

// Контексты
const NewsStateContext = createContext<NewsState | undefined>(undefined);
const NewsDispatchContext = createContext<
  React.Dispatch<NewsAction> | undefined
>(undefined);

// Провайдер
export const NewsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(newsReducer, initialState);

  return (
    <NewsStateContext.Provider value={state}>
      <NewsDispatchContext.Provider value={dispatch}>
        {children}
      </NewsDispatchContext.Provider>
    </NewsStateContext.Provider>
  );
};

// Хуки для использования контекста
export const useNewsState = (): NewsState => {
  const context = useContext(NewsStateContext);
  if (context === undefined) {
    throw new Error("useNewsState must be used within a NewsProvider");
  }
  return context;
};

export const useNewsStateDispatch = (): React.Dispatch<NewsAction> => {
  const context = useContext(NewsDispatchContext);
  if (context === undefined) {
    throw new Error("useNewsStateDispatch must be used within a NewsProvider");
  }
  return context;
};
