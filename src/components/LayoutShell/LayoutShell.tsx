"use client";

import { signOutAction } from "@/app/actions";
import {
  AppShell,
  Burger,
  Container,
  Flex,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconGauge, IconHome2, IconLogout } from "@tabler/icons-react";
import type React from "react";
import "./LayoutShell.css";
import Image from "next/image";
import { redirect } from "next/navigation";
import { match } from "ts-pattern";

const menuItems = [
  { icon: IconHome2, label: "Home", href: "/" },
  { icon: IconGauge, label: "Companies", href: "/companies" },
];

interface Props {
  children: React.ReactNode;
}

export default function LayoutShell({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();

  const links = menuItems.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      onClick={() => {
        if (opened) {
          toggle();
        }
        redirect(link.href);
      }}
      variant={opened ? "mobile" : "full"}
    />
  ));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 80,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Flex align="center" justify="space-between">
          <Burger
            ml="md"
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <Image src="/logo.svg" alt="Logo" width={210} height={60} />
          <Container w={39} h={60} m={0} />
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <div className="navbarMain">
          <Stack justify="center" gap={0}>
            {links}
          </Stack>
        </div>

        <Stack justify="center" gap={0}>
          <NavbarLink
            icon={IconLogout}
            label="Logout"
            onClick={signOutAction}
            variant={opened ? "mobile" : "full"}
          />
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

/**
 * utils
 */

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  onClick: () => void;
  variant: "mobile" | "full";
}

function NavbarLink({ icon: Icon, label, onClick, variant }: NavbarLinkProps) {
  return (
    <>
      {match(variant)
        .with("mobile", () => (
          <Flex justify="start">
            <UnstyledButton onClick={onClick} className="link">
              <Icon size={20} stroke={1.5} />
              <Text ml="sm">{label}</Text>
            </UnstyledButton>
          </Flex>
        ))
        .with("full", () => (
          <Tooltip
            label={label}
            position="right"
            transitionProps={{ duration: 0 }}
          >
            <UnstyledButton onClick={onClick} className="link">
              <Icon size={20} stroke={1.5} />
            </UnstyledButton>
          </Tooltip>
        ))
        .exhaustive()}
    </>
  );
}
