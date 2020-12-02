import * as AV from "leancloud-storage";

//正式库 npm build 时请使用这个
const APP_ID = "4bcfE8WCNyU8lsTNwgFJcOAw-gzGzoHsz";
const APP_KEY = "Ijc4Mqc9Hb3P5zikjSbvtOnM";

AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
  serverURL: "https://4bcfe8wc.lc-cn-n1-shared.com",
});
// AV.debug.enable()
AV.debug.disable();
export default AV;
