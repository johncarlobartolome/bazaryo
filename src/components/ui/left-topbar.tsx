import { Box, Separator, HStack } from "@chakra-ui/react";
import Link from "next/link";

export default function LeftTopBar() {
  return (
    <Box>
      <HStack gap={5}>
        <Link href="/signup">Become a Seller</Link>
        <Separator orientation={"vertical"} height={4} />
        <Link href="/about">About Us</Link>
        <Separator orientation={"vertical"} height={4} />
        <Link href="/free-delivery">Free Delivery</Link>
        <Separator orientation={"vertical"} height={4} />
        <Link href="/returns-policy">Returns Policy</Link>
      </HStack>
    </Box>
  );
}
