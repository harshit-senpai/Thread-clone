import { atom } from "recoil";

const userAtom = atom({
  key: "userAtom",
  default: JSON.parse(localStorage.getItem("user-threads")),
});

console.log(JSON.parse(localStorage.getItem("user-threads")))
export default userAtom;
