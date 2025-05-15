"use client";

import { Button } from "@mantine/core";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button fullWidth mt="xl" radius="md" type="submit" disabled={pending}>
      {pending ? "Loading..." : "Sign in"}
    </Button>
  );
};
