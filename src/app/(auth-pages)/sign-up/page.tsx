import { signUpAction } from "@/app/actions";
import { FormMessage, type Message } from "@/components/common/FormMessage";
import { SubmitButton } from "@/components/common/SubmitButton";
import {
  Anchor,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import Form from "next/form";
import Link from "next/link";

import "./page.css";

export default async function SignUpPage(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <Container size={420} my={40}>
      <Title ta="center" className="title">
        Welcome to Job 'Em!
      </Title>

      <Text className="subtitle">
        Do you have an account already?{" "}
        <Anchor component={Link} href="/sign-in">
          Sign in
        </Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <Form action={signUpAction}>
          <TextInput
            name="email"
            label="Email"
            placeholder="you@yourmail.com"
            required
            radius="md"
          />
          <PasswordInput
            name="password"
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            radius="md"
          />

          <SubmitButton text="Sign up" />

          <FormMessage message={searchParams} />
        </Form>
      </Paper>
    </Container>
  );
}
