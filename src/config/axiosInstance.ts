import axios from "axios";

const axiosInstance = axios.create({
  // ベースURLは環境変数から取得
  // baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  // タイムアウト設定は10分（1000ミリ秒 * 60秒 * 10）
  timeout: 1000 * 60 * 10,
  // クロスドメインのリクエストであってもクレデンシャル（例: cookies）を送信する設定
  withCredentials: true,
});

// リクエストインターセプター
axiosInstance.interceptors.request.use((config) => {
  //   // リクエスト前に実行する処理（例：トークンの追加）
  //   const token = localStorage.getItem("token"); // トークンの取得方法は状況に応じて変更
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  return config;
  // },
  // (error) => {
  //   // リクエストエラーの処理
  //   return Promise.reject(error);
});

// レスポンスインターセプター
axiosInstance.interceptors.response.use(
  (response) => {
    // レスポンスデータを加工
    return response;
  },
  (error) => {
    // レスポンスエラーの処理
    // 例: ステータスコードに応じたエラーハンドリング
    if (error.response && error.response.status === 401) {
      // 未認証エラーの処理
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
