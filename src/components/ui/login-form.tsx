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
import Link from "next/link";

export default function LoginForm() {
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
          <Field.Root>
            <Field.Label>Username</Field.Label>
            <Input name="username" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input type="password" name="password" />
          </Field.Root>
        </Fieldset.Content>
        <HStack justify={"start"} gapX={12}>
          <Button size={"lg"} colorPalette={"teal"}>
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
