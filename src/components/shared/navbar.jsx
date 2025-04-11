import { Box, HStack, Icon, Text, Flex, Menu, Button } from "@chakra-ui/react";
import { LuPhoneCall, LuGrip, LuChevronDown } from "react-icons/lu";
import Link from "next/link";

export default function NavBar() {
  return (
    <Box px={24} position="sticky" top="0" bgColor={"white"} boxShadow={"xs"}>
      <Flex justifyContent={"space-between"}>
        <HStack gap={8}>
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button
                variant={"ghost"}
                borderRadius={0}
                outline={"false"}
                focusRingColor={"false"}
              >
                <LuGrip />
                All Categories
                <LuChevronDown />
              </Button>
            </Menu.Trigger>
          </Menu.Root>
          <HStack color="gray.500" gap={8}>
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/vendors">Vendors</Link>
            <Link href="/vendors">Contact Us</Link>
          </HStack>
        </HStack>
        <Box bgColor={"teal"} color="gray.50" py={4} px={4}>
          <Link href="/contact">
            <HStack>
              <Icon size="lg">
                <LuPhoneCall />
              </Icon>
              <Text>09123456789</Text>
            </HStack>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}
