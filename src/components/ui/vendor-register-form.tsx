"use client";

import {
  Button,
  Field,
  Fieldset,
  FileUpload,
  Flex,
  Float,
  Heading,
  Input,
  Stack,
  useFileUploadContext,
} from "@chakra-ui/react";
import { LuArrowUpFromLine, LuX } from "react-icons/lu";
import { useState } from "react";
import { setupVendor } from "@/lib/services/auth";
import { useAuth } from "@/contexts/AuthContext";
import getFlatDetailsFromErrors from "@/utils/getFlatDetailsFromErrors";

export default function VendorRegisterForm() {
  const [form, setForm] = useState({
    storeName: "",
    storeDescription: "",
    storeLogo: "",
    storeBanner: "",
    storeLocation: "",
    storePhone: "",
  });
  const [errors, setErrors] = useState({
    storeName: "",
    storeDescription: "",
    storeLogo: "",
    storeBanner: "",
    storeLocation: "",
    storePhone: "",
  });
  const { token } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  // @ts-expect-error eeeeeeeeee
  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("storeName", form.storeName);
      formData.append("storeDescription", form.storeDescription);
      formData.append("storeLogo", form.storeLogo);
      formData.append("storeBanner", form.storeBanner);
      formData.append("storeLocation", form.storeLocation);
      formData.append("storePhone", form.storePhone);

      const response = await setupVendor(formData, token);
      console.log(response);
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

  const FileUploadList = () => {
    const fileUpload = useFileUploadContext();
    const files = fileUpload.acceptedFiles;
    if (files.length === 0) return null;
    return (
      <FileUpload.ItemGroup>
        {files.map((file) => (
          <FileUpload.Item
            w="auto"
            boxSize="20"
            p="2"
            file={file}
            key={file.name}
          >
            <FileUpload.ItemPreviewImage />
            <Float placement="top-end">
              <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
                <LuX />
              </FileUpload.ItemDeleteTrigger>
            </Float>
          </FileUpload.Item>
        ))}
      </FileUpload.ItemGroup>
    );
  };
  return (
    <Flex justify={"center"}>
      <Fieldset.Root
        maxW={"lg"}
        borderWidth="1px"
        borderRadius="2xl"
        boxShadow="md"
        bg="white"
        p={4}
        marginTop={10}
        marginBottom={20}
      >
        <Stack>
          <Fieldset.Legend>
            <Heading>Register your Shop</Heading>
          </Fieldset.Legend>
        </Stack>
        <Fieldset.Content>
          <Field.Root required invalid={!!errors.storeName}>
            <Field.Label>
              Store Name <Field.RequiredIndicator />
            </Field.Label>
            <Input
              name="storeName"
              value={form.storeName}
              onChange={handleInputChange}
            />
            <Field.ErrorText>{errors.storeName}</Field.ErrorText>
          </Field.Root>
          <Field.Root required invalid={!!errors.storeDescription}>
            <Field.Label>
              Store Description <Field.RequiredIndicator />
            </Field.Label>
            <Input
              name="storeDescription"
              value={form.storeDescription}
              onChange={handleInputChange}
            />
            <Field.ErrorText>{errors.storeDescription}</Field.ErrorText>
          </Field.Root>
          <Field.Root>
            <Field.Label>Store Logo</Field.Label>
            <FileUpload.Root accept={["image/*"]}>
              <FileUpload.HiddenInput
                name="storeLogo"
                onChange={handleFileChange}
              />
              <FileUpload.Trigger asChild>
                <Button variant="outline" size="sm">
                  <LuArrowUpFromLine /> Upload image
                </Button>
              </FileUpload.Trigger>
              <FileUploadList />
            </FileUpload.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label>Store Banner</Field.Label>
            <FileUpload.Root accept={["image/*"]}>
              <FileUpload.HiddenInput
                name="storeBanner"
                onChange={handleFileChange}
              />
              <FileUpload.Trigger asChild>
                <Button variant="outline" size="sm">
                  <LuArrowUpFromLine /> Upload image
                </Button>
              </FileUpload.Trigger>
              <FileUploadList />
            </FileUpload.Root>
          </Field.Root>
          <Field.Root required invalid={!!errors.storeLocation}>
            <Field.Label>
              Store Location <Field.RequiredIndicator />
            </Field.Label>
            <Input
              name="storeLocation"
              value={form.storeLocation}
              onChange={handleInputChange}
            />
            <Field.ErrorText>{errors.storeLocation}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.storePhone}>
            <Field.Label>Store Phone</Field.Label>
            <Input
              name="storePhone"
              value={form.storePhone}
              onChange={handleInputChange}
            />
            <Field.ErrorText>{errors.storePhone}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>
        <Button
          colorPalette={"teal"}
          alignSelf={"start"}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Fieldset.Root>
    </Flex>
  );
}
