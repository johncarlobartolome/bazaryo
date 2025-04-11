import {
  Flex,
  Button,
  Field,
  Fieldset,
  Input,
  Stack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";

export default function RegisterForm() {
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
          <Fieldset.Legend>Register</Fieldset.Legend>
        </Stack>
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Username</Field.Label>
            <Input name="username" size={"lg"} />
          </Field.Root>
          <Field.Root>
            <Field.Label>Email Address</Field.Label>
            <Input name="email" size={"lg"} />
          </Field.Root>
          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input type="password" name="password" />
          </Field.Root>
        </Fieldset.Content>
        <Text>
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our{" "}
          <ChakraLink color={"teal"} textDecoration={"underline"}>
            <Link href="/privacy-policy">privacy policy.</Link>
          </ChakraLink>
        </Text>
        <Button size={"lg"} colorPalette={"teal"} alignSelf={"start"}>
          Register
        </Button>
      </Fieldset.Root>
    </Flex>
  );
}
