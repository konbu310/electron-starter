import { GlobalApi } from "../common/preload";

declare global {
  namespace NodeJS {
    interface Global {}
  }

  interface Window {
    api: GlobalApi;
  }
}
