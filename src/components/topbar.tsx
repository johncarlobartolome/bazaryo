"use client";

import { Box, Flex } from "@chakra-ui/react";
import LeftTopBar from "./left-topbar";
import RightTopBar from "./right-topbar";

export default function TopBar() {
  return (
    <Box bgColor={"teal"} color={"gray.50"} px={24} py={2}>
      <Flex justifyContent={"space-between"}>
        <LeftTopBar />
        <RightTopBar />
      </Flex>
    </Box>
  );
}
