"use client";

import {
  Flex,
  Field,
  Fieldset,
  Stack,
  Input,
  Button,
  Checkbox,
  HStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { login } from "@/lib/services/auth";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import Link from "next/link";
import getFlatDetailsFromErrors from "@/utils/getFlatDetailsFromErrors";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
  });
  const router = useRouter();
  const { login: loginContext } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: { target: { name: any; value: any } }) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
      setErrors((prev) => ({ ...prev, username: "" }));
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async () => {
    const form = { username, password };
    try {
      const response = await login(form);
      const { token, user } = response.data;
      if (user.role === "CUSTOMER") {
        router.push("/");
      } else if (user.role === "VENDOR") {
        router.push("/vendor/setup");
      }
      loginContext(token, user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const details = error.response.data.error.details;
      const flatDetails = getFlatDetailsFromErrors(details);

      setErrors((prev) => ({
        ...prev,
        ...flatDetails,
      }));
    }
  };
  return (
    <Flex
      direction="column"
      justify="space-between"
      flex="1 1 300px"
      p={4}
      borderWidth="1px"
      borderRadius="2xl"
      boxShadow="md"
      bg="white"
      minH="300px"
    >
      <Fieldset.Root size={"lg"}>
        <Stack>
          <Fieldset.Legend>Login</Fieldset.Legend>
        </Stack>
        <Fieldset.Content>
          <Field.Root invalid={!!errors.username}>
            <Field.Label>Username</Field.Label>
            <Input name="username" value={username} onChange={handleChange} />
            <Field.ErrorText>{errors.username}</Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Field.Root>
        </Fieldset.Content>
        <HStack justify={"start"} gapX={12}>
          <Button size={"lg"} colorPalette={"teal"} onClick={handleSubmit}>
            Log In
          </Button>
          <Checkbox.Root colorPalette={"teal"}>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Remember me</Checkbox.Label>
          </Checkbox.Root>
        </HStack>
        <ChakraLink asChild color={"red"}>
          <Link href="/forgot-password">Forgot your password?</Link>
        </ChakraLink>
      </Fieldset.Root>
    </Flex>
  );
}
