"use client";

import Features from "@/components/shared/features";
import LoginForm from "@/components/ui/login-form";
import RegisterForm from "@/components/ui/register-form";
import { Box, Breadcrumb, Text, Heading, Flex, HStack } from "@chakra-ui/react";
import { useAuth } from "@/contexts/AuthContext";
import { LuHouse } from "react-icons/lu";

export default function AccountPage() {
  const { isLoggedIn, isLoading } = useAuth();
  return (
    <Box>
      <HStack justifyContent={"space-between"} bgColor={"orange.50"} px={24}>
        <Heading py={6}>Account</Heading>
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="/">
                <LuHouse />
                <Text>Home</Text>
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.CurrentLink>Account</Breadcrumb.CurrentLink>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </HStack>
      {isLoading ? (
        <Flex justifyContent="center" alignItems="center" py={8}>
          <Text>Loading...</Text>
        </Flex>
      ) : isLoggedIn ? (
        <h1>Your Profile</h1>
      ) : (
        <Flex wrap="wrap" gap="24" py={8} px={24}>
          <LoginForm />
          <RegisterForm />
        </Flex>
      )}
      <Features />
    </Box>
  );
}
