"use client";

import TopBar from "@/components/topbar";
import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Button,
  Image,
  SimpleGrid,
  InputGroup,
  Input,
  Spacer,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { LuSearch, LuShoppingCart, LuCircleUserRound } from "react-icons/lu";

export default function Home() {
  return (
    <Box>
      <TopBar />
      <Box
        bg="white"
        px={40}
        py={4}
        boxShadow={"md"}
        position="sticky"
        top={0}
        zIndex={100}
      >
        <Flex align="center">
          <Link href="/">
            <Heading size="lg" color="teal.500">
              Bazaryo
            </Heading>
          </Link>
          <InputGroup mx={6} maxW="500px" flex="1" startElement={<LuSearch />}>
            <Input type="text" placeholder="Search products..." />
          </InputGroup>
          <Spacer />
          <HStack gap={4}>
            <Link href="/marketplace">Marketplace</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/cart">
              <IconButton aria-label="Cart" variant={"ghost"}>
                <LuShoppingCart />
              </IconButton>
            </Link>
            <Link href="/login">
              <IconButton aria-label="Login" variant={"ghost"}>
                <LuCircleUserRound />
              </IconButton>
            </Link>
          </HStack>
        </Flex>
      </Box>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        bg="gray.50"
        py={8}
        px={40}
      >
        <VStack align="start" flex={1}>
          <Heading as="h1" size="2xl">
            Welcome to Bazaryo
          </Heading>
          <Text fontSize="lg">
            Discover your next favorite product from trusted local vendors.
          </Text>
          <Link href="/marketplace">
            <Button colorPalette={"teal"} size={"lg"}>
              Shop Now
            </Button>
          </Link>
        </VStack>
        <Box flex={1} mt={{ base: 8, md: 0 }}>
          <Image
            src="/images/hero-banner.png"
            alt="Bazaryo Marketplace"
            borderRadius={"xl"}
            objectFit="cover"
            width={"100%"}
            height={{ base: "200px", md: "300px" }}
          />
        </Box>
      </Flex>
      <Box py={10} px={40}>
        <Heading size="lg" mb={6}>
          Shop by Category
        </Heading>
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
          {["Clothing", "Handicrafts", "Electronics", "Home Goods"].map(
            (cat) => (
              <Link key={cat} href={`/category/${cat.toLowerCase()}`}>
                <Box
                  p={6}
                  bg="white"
                  borderRadius="lg"
                  boxShadow={"md"}
                  _hover={{ boxShadow: "xl" }}
                >
                  <Text>{cat}</Text>
                </Box>
              </Link>
            )
          )}
        </SimpleGrid>
      </Box>
      <Box py={10} px={40} bg="gray.100">
        <Heading size="lg" mb={6}>
          Featured Products
        </Heading>
        <Text>Comming Soon...</Text>
      </Box>
      <Box py={10} px={40}>
        <Heading size="lg" mb={6}>
          Top Vendors
        </Heading>
        <Text>Highlight the best-performing vendors here</Text>
      </Box>
      <Box py={10} px={4} bg="teal.50" textAlign="center">
        <Heading size="lg" mb={4}>
          Stay Updated!
        </Heading>
        <Text mb={4}>
          Subscribe to our newsletter for updates, promos and more.
        </Text>
        <Button colorPalette="teal">Subscribe</Button>
      </Box>
    </Box>
  );
}
