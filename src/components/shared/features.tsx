import { Flex, HStack, Box, Heading, Text } from "@chakra-ui/react";
import {
  LuCar,
  LuCreditCard,
  LuPackageCheck,
  LuMessagesSquare,
} from "react-icons/lu";

export default function Features() {
  return (
    <Flex justifyContent={"space-between"} px={24}>
      {[
        {
          icon: <LuCar size={40} />,
          title: "Free Shipping",
          description: "Free shipping all over the PH",
        },
        {
          icon: <LuMessagesSquare size={40} />,
          title: "24/7 Support",
          description: "We are here to help anytime",
        },
        {
          icon: <LuCreditCard size={40} />,
          title: "Secure Payment",
          description: "Your payment is safe with us",
        },
        {
          icon: <LuPackageCheck size={40} />,
          title: "Quality Guarantee",
          description: "We ensure the best quality",
        },
      ].map((feature, index) => (
        <HStack
          key={index}
          bgColor={"teal.100"}
          py="8"
          px="14"
          borderRadius={"lg"}
          gap={4}
        >
          <Box bgColor={"teal"} borderRadius={"full"} color="gray.100" p={2}>
            {feature.icon}
          </Box>
          <Flex flexDirection={"column"} alignItems={"start"} justify="center">
            <Heading size="md">{feature.title}</Heading>
            <Text>{feature.description}</Text>
          </Flex>
        </HStack>
      ))}
    </Flex>
  );
}
