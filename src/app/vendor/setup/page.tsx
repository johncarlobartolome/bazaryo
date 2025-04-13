"use client";

import VendorPendingMessage from "@/components/ui/vendor-pending";
import VendorRegisterForm from "@/components/ui/vendor-register-form";
import { Heading, HStack, Box } from "@chakra-ui/react";

export default function VendorSetupPage() {
  return (
    <Box>
      <HStack justifyContent={"space-between"} bgColor={"orange.50"} px={24}>
        <Heading py={6}>Vendor Setup</Heading>
      </HStack>
      <VendorRegisterForm />
      <VendorPendingMessage />
    </Box>
  );
}
