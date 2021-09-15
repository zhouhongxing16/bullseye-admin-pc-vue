import * as axios from "axios" // 不能删

// axios response以对象处理，比如 response.success
declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}
