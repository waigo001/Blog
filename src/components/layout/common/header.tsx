import React from "react";

import {
  Button,
  chakra,
  Flex,
  HStack,
  IconButton,
  Spacer,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HTMLChakraProps } from "@chakra-ui/system";
import { FaBars, FaCalendarDay, FaInfoCircle } from "react-icons/fa";
import Link from "next/link";
import { Logo } from "src/components/uiParts";
import MobileNavContent from "./mobileNav";
import { useRouter } from "next/router";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactElement;
};

const NavLink: React.FC<NavLinkProps> = ({ href, children, icon }) => {
  const { pathname } = useRouter();
  const [, group] = href.split("/");
  const isActive = pathname.includes(group);
  return (
    <li>
      <Link href={href} passHref>
        <Button
          as="a"
          aria-current={isActive ? "page" : undefined}
          leftIcon={icon}
          variant="ghost"
          colorScheme={isActive ? "cyan" : "gray"}
          _activeLink={{
            bg: useColorModeValue("cyan.50", "rgba(48, 140, 122, 0.3)"),
          }}
        >
          {children}
        </Button>
      </Link>
    </li>
  );
};

const HeaderContent: React.FC = () => {
  const mobileNav = useDisclosure();

  return (
    <>
      <Flex
        w="100%"
        h="100%"
        px={{ base: "3", md: "6" }}
        align="center"
        justify="space-between"
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          aria-label="メニューを開く"
          variant="ghost"
          isRound
          onClick={mobileNav.onOpen}
          icon={<FaBars />}
          mr="3"
        />
        <Flex align="center">
          <Link href="/" passHref>
            <chakra.a aria-label="ホームに戻る">
              <Logo height="6" />
            </chakra.a>
          </Link>
        </Flex>

        <Spacer />
        <chakra.nav display={{ base: "none", md: "flex" }}>
          <HStack align="center " spacing={4} as="ul" listStyleType="none">
            <NavLink href="/blog" icon={<FaCalendarDay />}>
              Blog
            </NavLink>
            <NavLink href="/about" icon={<FaInfoCircle />}>
              About
            </NavLink>
          </HStack>
        </chakra.nav>
      </Flex>
      <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
    </>
  );
};

const Header: React.FC<HTMLChakraProps<"header">> = ({ ...props }) => {
  const bg = useColorModeValue("white", "gray.800");
  const shadow = useColorModeValue("md", "2xl");

  return (
    <chakra.header
      pos="sticky"
      width="full"
      top="0"
      left="0"
      right="0"
      boxShadow={shadow}
      bg={bg}
      zIndex={3}
      {...props}
    >
      <chakra.div height="4rem" mx="auto" maxW="8xl">
        <HeaderContent />
      </chakra.div>
    </chakra.header>
  );
};

export default Header;
