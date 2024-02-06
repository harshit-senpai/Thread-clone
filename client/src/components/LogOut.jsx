import { Button, useToast } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/suerAtom";
import axios from "axios";
import { LuLogOut } from "react-icons/lu";

const LogOut = () => {
  const toast = useToast();
  const setUser = useSetRecoilState(userAtom);
  const handleLogOut = async () => {
    await axios
      .post("http://localhost:3000/api/v1/users/signout")
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        if (error.response.data.message) {
          toast({
            title: "Error",
            description: error.response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return;
        }
      });
    localStorage.removeItem("user-threads");
    setUser(null);
  };

  return (
    <Button
      position={"fixed"}
      top={"30px"}
      right={"30px"}
      size={"sm"}
      onClick={handleLogOut}
    >
      <LuLogOut size={22}/>
    </Button>
  );
};

export default LogOut;
