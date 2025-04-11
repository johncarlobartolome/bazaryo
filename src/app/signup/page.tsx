"use client";
import API from "@/lib/axios";
import {
  Box,
  Heading,
  VStack,
  Fieldset,
  Field,
  Input,
  NativeSelect,
  For,
  Button,
  Text,
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface FormState {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function SignUpPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  });

  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async () => {
    try {
      const { data } = await API.post("/api/auth/signup", form);
      console.log(data);
      toaster.create({
        title: "Signup successful!",
        description:
          form.role === "VENDOR"
            ? "Your vendor account will be reviewed by an admin."
            : "You can now log in.",
        type: "success",
        duration: 4000,
      });

      setTimeout(() => {
        router.push(form.role === "CUSTOMER" ? "/" : "/login");
      }, 1500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error;
      toaster.create({
        title: "Signup failed",
        description: errorMessage,
        type: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={20}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <VStack>
        <Fieldset.Root>
          <Heading>Create an Account</Heading>
          <Fieldset.Content>
            <Field.Root>
              <Field.Label>Full Name</Field.Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Email address</Field.Label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder=""
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Register as</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field name="role">
                  <For each={["Customer", "Vendor"]}>
                    {(item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )}
                  </For>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>
          </Fieldset.Content>
          <Button colorPalette={"teal"} size="lg" onClick={handleSignup}>
            Sign Up
          </Button>
          <Text fontSize="sm" color="gray.500" textAlign="center">
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#319795" }}>
              Log in
            </Link>
          </Text>
        </Fieldset.Root>
      </VStack>
      <Toaster />
    </Box>
  );
}
