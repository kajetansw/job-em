import {
  Anchor,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import "./page.css";
import { FormMessage, Message } from '@/components/common/FormMessage';
import { SubmitButton } from '@/components/sign-in/SubmitButton';
import { signInAction } from '@/app/actions';
import Form from 'next/form'

export default async function SignInPage(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <Container size={420} my={40}>
      <Title ta="center" className="title">
        Welcome back!
      </Title>

      <Text className="subtitle">
        Do not have an account yet? <Anchor>Create account</Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <Form action={signInAction}>
          <TextInput name="email" label="Email" placeholder="you@mantine.dev" required radius="md" />
          <PasswordInput name="password" label="Password" placeholder="Your password" required mt="md" radius="md" />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          
          <SubmitButton />

          <FormMessage message={searchParams} />
        </Form>
      </Paper>
    </Container>
  );
}

