"use client";

import Header from "@/components/shared/header";
import TopBar from "@/components/shared/topbar";
import NavBar from "@/components/shared/navbar";
import HeroSection from "@/components/ui/hero-section";
import CategorySlider from "@/components/ui/category-slider";
import { Box, Heading, Text, Button, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Box>
      <TopBar />
      <Header />
      <NavBar />
      <HeroSection />
      <CategorySlider />
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
