import { useRecoilValue } from "recoil";
import SignInCard from "../components/SignIn";
import SignupCard from "../components/SignUp";
import authScreen from "../atoms/authAtom";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreen);
  console.log(authScreenState);
  return <>{authScreenState === "signin" ? <SignInCard /> : <SignupCard />}</>;
};

export default AuthPage;
