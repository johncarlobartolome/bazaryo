import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { LuHeart, LuShoppingCart } from "react-icons/lu";
import SearchBar from "../ui/search-bar";

export default function Header() {
  return (
    <Box px={24} py={8} bgColor={"teal.50"}>
      <HStack justifyContent={"space-between"}>
        <Link href="/">
          <Heading>Bazaryo</Heading>
        </Link>
        <SearchBar />
        <HStack>
          <Link href="/wishlist">
            <HStack>
              <LuHeart />
              <Text>Wishlist</Text>
            </HStack>
          </Link>
          <Link href="/cart">
            <HStack>
              <LuShoppingCart />
              <Text>Cart</Text>
            </HStack>
          </Link>
        </HStack>
      </HStack>
    </Box>
  );
}
