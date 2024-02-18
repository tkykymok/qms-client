import axios, { AxiosError, HttpStatusCode } from "axios";
import { ApiErrorResponse } from "@/types/response/baseResponse";
import { ERROR, INFO, MessageType } from "@/types/constant/messageType";
import messageStore from "@/store/messageStore";

const axiosInstance = axios.create({
  // ベースURLは環境変数から取得
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
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
  (error: AxiosError<ApiErrorResponse, any>) => {
    // レスポンスエラーの処理
    switch (error.response?.status) {
      case HttpStatusCode.BadRequest:
        // 業務エラーの処理
        setErrorMessages(error);
        break;
      case HttpStatusCode.Unauthorized:
        // 未認証エラーの処理
        break;
      case HttpStatusCode.Forbidden:
        // 権限エラーの処理
        break;
      case HttpStatusCode.NotFound:
        // リソースが見つからないエラーの処理
        break;
      case HttpStatusCode.InternalServerError:
        // サーバーエラーの処理
        break;
      default:
        // その他のエラーの処理
        break;
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

/**
 * エラーからメッセージを取得し、メッセージストアに追加します。
 *
 * @param {AxiosError<ApiErrorResponse, any>} error - Axiosから受け取ったエラー情報
 */
const setErrorMessages = (error: AxiosError<ApiErrorResponse, any>) => {
  // エラーからレスポンスデータを取得
  const response = error.response?.data;
  // レスポンスデータからメッセージを取得
  const message = response?.message;
  if (message) {
    // メッセージが存在する場合、それをメッセージストアに追加
    addMessage(ERROR, message);
  }
};

/**
 * メッセージをメッセージストアに追加するメソッド。
 *
 * @param {MessageType | null} type - メッセージのタイプ
 * @param {string[]} message - 追加するメッセージ
 */
const addMessage = (type: MessageType | null, message: string) => {
  // メッセージタイプとテキストを持つオブジェクトの配列を生成
  const newMessage = {
    id: generateRandomString(),
    type: type,
    text: message,
  };

  // メッセージストアの状態を更新
  messageStore.setState((prev) => {
    // 既存のメッセージから、新しいメッセージに含まれるテキストを持つメッセージを除外
    const filteredMessages = prev.messages.filter(
      (prevMessage) => newMessage.text === prevMessage.text,
    );

    // 除外したメッセージと新しいメッセージを結合
    return {
      ...prev,
      messages: [...filteredMessages, newMessage],
    };
  });
};

const generateRandomString = (length: number = 10): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
