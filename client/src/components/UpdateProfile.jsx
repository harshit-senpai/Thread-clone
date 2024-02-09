"use client";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/suerAtom";
import useImagePreview from "./../hooks/useProfilePreview";
import { Link } from "react-router-dom";

export default function UserProfileEdit() {
  const toast = useToast();
  const [user, setUser] = useRecoilState(userAtom);
  console.log(user);
  const [input, setInput] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
  });
  const [updating, setUpdating] = useState(false);
  const fileRef = useRef(null);
  const { handleImageChange, imgUrl } = useImagePreview();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updating) return;

    setUpdating(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/users/updateprofile/${user._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ ...input, profilePic: imgUrl }),
        }
      );

      const data = await res.json();
      console.log(data);
      if (data.error) {
        toast({
          title: "Error",
          description: data.error.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      toast({
        title: "Success",
        description: "Profile Updated Successfully",
        duration: 3000,
        isClosable: true,
      });
      setUser(data);
      localStorage.setItem("user-threads", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Flex align={"center"} justify={"center"} my={6}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.dark")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar
                  size="xl"
                  boxShadow={"md"}
                  src={imgUrl || user.profilePic}
                />
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>
                  Change Picture
                </Button>
                <Input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={handleImageChange}
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl>
            <FormLabel>Full name</FormLabel>
            <Input
              placeholder="UserName"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="UserName"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Your Bio</FormLabel>
            <Input
              placeholder="Bio"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={input.bio}
              onChange={(e) => setInput({ ...input, bio: e.target.value })}
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              bg={"green.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "green.500",
              }}
              type="submit"
              isLoading={updating}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}
