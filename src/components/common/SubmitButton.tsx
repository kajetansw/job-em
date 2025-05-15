"use client";

import { Button } from "@mantine/core";
import type React from "react";
import { useFormStatus } from "react-dom";

interface Props {
  text: string;
}

export const SubmitButton: React.FC<Props> = ({ text }) => {
  const { pending } = useFormStatus();

  return (
    <Button fullWidth mt="xl" radius="md" type="submit" disabled={pending}>
      {pending ? "Loading..." : text}
    </Button>
  );
};
