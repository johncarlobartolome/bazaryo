"use client";

import {
  Flex,
  Button,
  Field,
  Fieldset,
  Input,
  Stack,
  Text,
  NativeSelect,
  For,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { signup } from "@/lib/services/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "CUSTOMER",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const router = useRouter();
  const { login } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };
  const handleRegister = async () => {
    try {
      const response = await signup(form);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      login(token, user);
      if (form.role === "CUSTOMER") {
        router.push("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      const details = error.response.data.error.details;
      const flatDetails = Object.fromEntries(
        Object.entries(details).map(([key, value]) => [
          key,
          (value as string[])[0],
        ])
      );
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
          <Fieldset.Legend>Register</Fieldset.Legend>
        </Stack>
        <Fieldset.Content>
          <Field.Root invalid={!!errors.fullName}>
            <Field.Label>Full Name</Field.Label>
            <Input
              name="fullName"
              value={form.fullName}
              onChange={handleInputChange}
            />
            <Field.ErrorText>{errors.fullName}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.email}>
            <Field.Label>Email Address</Field.Label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleInputChange}
            />
            <Field.ErrorText>{errors.email}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
            />
            <Field.ErrorText>{errors.password}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.confirmPassword}>
            <Field.Label>Confirm Password</Field.Label>
            <Input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleInputChange}
            />
            <Field.ErrorText>{errors.confirmPassword}</Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <Field.Label>Register As</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field
                name="role"
                value={form.role}
                onChange={handleInputChange}
              >
                <For each={["CUSTOMER", "VENDOR"]}>
                  {(item) => (
                    <option key={item} value={item}>
                      {item.charAt(0).toUpperCase() +
                        item.slice(1).toLocaleLowerCase()}
                    </option>
                  )}
                </For>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>
        </Fieldset.Content>
        <Text>
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our <Link href="/privacy-policy">privacy policy.</Link>
        </Text>
        <Button
          size={"lg"}
          colorPalette={"teal"}
          alignSelf={"start"}
          onClick={handleRegister}
        >
          Register
        </Button>
      </Fieldset.Root>
    </Flex>
  );
}
