import {
  Avatar,
  Box,
  Flex,
  Text,
  Link,
  VStack,
  MenuButton,
  Menu,
  Portal,
  MenuList,
  MenuItem,
  useToast,
  Button,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import "./../index.css";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/suerAtom";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

function UserHeader({ user }) {
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom);
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser._id)
  );
  console.log(user, currentUser)
  const [updateing, setUpdating] = useState(false);

  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        title: "URL copied!",
        description: "The current URL has been copied to your clipboard.",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  const handleFollow = async () => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "Please Login",
        isClosable: true,
      });
      return;
    }
    if (updateing) return;
    setUpdating(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/users/follow/${user._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.error) {
        toast({
          title: "Error",
          isClosable: true,
        });
      }

      if (following) {
        toast({
          title: "Success",
          description: `${user.name} Unfollowed Successfully`,
          isClosable: true,
        });
        user.followers.pop();
      } else {
        toast({
          title: "Success",
          description: `${user.name} followed Successfully`,
          isClosable: true,
        });
        user.followers.push(currentUser.user._id);
      }

      setFollowing(!following);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.name}
          </Text>

          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user.username}</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              threads.next
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <Avatar name={user.name} src={user.profilePic} size={"xl"} />
          )}
          {!user.profilePic && (
            <Avatar
              name={user.name}
              src="https://bit.ly/broken-link"
              size={"xl"}
            />
          )}
        </Box>
      </Flex>

      <Text>{user.bio}</Text>

      {currentUser._id === user._id && (
        <Link as={RouterLink} to={"/update"}>
          <Button size={"md"}>Update Profile</Button>
        </Link>
      )}
      {currentUser._id !== user._id && (
        <Button size={"md"} onClick={handleFollow} isLoading={updateing}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length} followers</Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>
                    Copy Link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          fontWeight={"bold"}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb={3}
          cursor={"pointer"}
        >
          <Text>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          fontWeight={"bold"}
          borderBottom={"1.5px solid gray"}
          color={"gray.light"}
          justifyContent={"center"}
          pb={3}
          cursor={"pointer"}
        >
          <Text>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
}

export default UserHeader;
