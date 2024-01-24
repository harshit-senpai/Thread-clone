import { Avatar, Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import ActionLogos from "./ActionLogos";
import { useState } from "react";

function UserPost() {
  const [liked, setLiked] = useState(false);

  return (
    <Link to={"/markzukerberg/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size={"md"} name="Mark Zukerberg" src="/zuck-avatar.png" />
          <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size={"xs"}
              name="Ken"
              src="https://bit.ly/dan-abramov"
              position={"absolute"}
              top={0}
              left={"15px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="Ken"
              src="https://bit.ly/kent-c-dodds"
              position={"absolute"}
              bottom={0}
              right={"-5px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="Ken"
              src="https://bit.ly/ryan-florence"
              position={"absolute"}
              bottom={0}
              left={"4px"}
              padding={"2px"}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                Mark Zuckerberg
              </Text>
              <Image src="/verified.png" w={4} h={4} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontStyle={"sm"} color={"gray.light"}>
                id
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>

          <Text fontSize={"sm"}>This is my first post</Text>
          <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"gray.light"}
          >
            <Image src="/post1.png" w={"full"} />
          </Box>
          <Flex gap={3} my={1}>
            <ActionLogos liked={liked} setLiked={setLiked} />
          </Flex>
          <Flex gap={3} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              123 replies
            </Text>
            <Box h={0.5} w={0.5} borderRadius={"full"} bg={"gray.light"}>
            </Box>
            <Text color={"gray.light"} fontSize={"sm"}>
                456 likes
              </Text>
          </Flex>
        </Flex>
      </Flex>
      <Divider my={4} />
    </Link>
  );
}

export default UserPost;
