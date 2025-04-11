import { Box, HStack, VStack, Image, Text } from "@chakra-ui/react";

export default function CategorySlider() {
  return (
    <Box py={16}>
      <HStack justify={"center"}>
        <VStack>
          <Box bgColor={"teal.50"} borderRadius={"full"}>
            <Image
              src="/images/cat-vegetables.png"
              alt="Vegetables"
              width={"150px"}
            />
          </Box>
          <Text fontWeight={600} fontSize={"xl"}>
            Vegetables
          </Text>
          <Text>125+ Products</Text>
        </VStack>
      </HStack>
    </Box>
  );
}
