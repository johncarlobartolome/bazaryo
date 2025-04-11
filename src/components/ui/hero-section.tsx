import { Box, Image, HStack, VStack, Heading, Button } from "@chakra-ui/react";

export default function HeroSection() {
  return (
    <Box px={24} py={12} bgColor={"teal.100"}>
      <HStack justifyContent={"space-between"}>
        <VStack align={"start"} gapY={8}>
          <Heading as="h1" size={"4xl"}>
            Discover top-rated products loved by our community.
          </Heading>
          <Button colorPalette={"teal"}>Explore Bestsellers</Button>
        </VStack>
        <Image
          src="/images/top-rated-products.png"
          alt="Top Rated Products"
          width={"md"}
        />
      </HStack>
    </Box>
  );
}
