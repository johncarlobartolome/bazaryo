"use client";
import { ColorModeProvider } from "@/components/ui/color-mode";
import {
  Box,
  Heading,
  VStack,
  Fieldset,
  Field,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const { data } = await API.post("/api/auth/login", { email, password });
      console.log(data);
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error;
      toaster.create({
        title: "Login failed",
        description: errorMessage,
        type: "error",
        duration: 3000,
      });
    }
  };

  return (
    <ColorModeProvider forcedTheme="light">
      <Box
        maxW="md"
        mx="auto"
        mt={20}
        p={6}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading mb={6}>Login</Heading>
        <VStack>
          <Fieldset.Root>
            <Fieldset.Content>
              <Field.Root>
                <Field.Label>Email address</Field.Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Password</Field.Label>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field.Root>
            </Fieldset.Content>
            <Button colorPalette={"teal"} size="lg" onClick={handleLogin}>
              Login
            </Button>
            <Text fontSize={"sm"} color="gray.500" textAlign="center">
              Don&apos;t have an account?{" "}
              <Link href="/signup" style={{ color: "#319795" }}>
                Sign up
              </Link>
            </Text>
          </Fieldset.Root>
        </VStack>
      </Box>
      <Toaster />
    </ColorModeProvider>
  );
}
