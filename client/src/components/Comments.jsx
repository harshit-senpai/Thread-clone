import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import ActionLogos from "./ActionLogos";

const Comments = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex gap={4} my={2} w={"full"}>
        <Avatar src="/zuck-avatar.png" size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
              markzuckerberg
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.light"}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text>This is my first comments</Text>
          <ActionLogos liked={liked} setLiked={setLiked} />
          <Text fontSize={"sm"} color={"gray.light"}>
            {100 + (liked ? 1 : 0)} like
          </Text>
        </Flex>
      </Flex>
      <Divider my={4} />
    </>
  );
};

export default Comments;
