import {
  Box,
  HStack,
  Separator,
  Link as ChakraLink,
  Text,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { LuCircleUserRound, LuLogOut } from "react-icons/lu";
import { useAuth } from "@/contexts/AuthContext";
import NextLink from "next/link";

export default function RightTopBar() {
  const { isLoggedIn, user, logout, isLoading } = useAuth();
  const handleSelect = () => {
    logout();
  };
  return (
    <Box>
      <HStack gap={4}>
        <NextLink href="/help">Help Center</NextLink>
        <Separator orientation={"vertical"} height={4} />
        {isLoading ? (
          <Text>...</Text>
        ) : isLoggedIn ? (
          <Menu.Root>
            <Menu.Trigger asChild>
              <Text>{user?.email}</Text>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="logout" onSelect={handleSelect}>
                    <Box flex="1">Logout</Box>{" "}
                    <Menu.ItemCommand>
                      <LuLogOut />
                    </Menu.ItemCommand>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        ) : (
          <ChakraLink asChild color={"gray.50"}>
            <HStack>
              <LuCircleUserRound />
              <NextLink href="/account">My Account</NextLink>
            </HStack>
          </ChakraLink>
        )}
      </HStack>
    </Box>
  );
}
