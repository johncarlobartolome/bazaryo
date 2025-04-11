import { Box, HStack, Separator } from "@chakra-ui/react";
import Link from "next/link";

export default function RightTopBar() {
  return (
    <Box>
      <HStack gap={4}>
        <Link href="/help">Help Center</Link>
        <Separator orientation={"vertical"} height={4} />
        <Link href="/login">My Account</Link>
      </HStack>
    </Box>
  );
}
