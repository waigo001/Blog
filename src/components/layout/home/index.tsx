import React from "react";

import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import {
  FaCalendarDay,
  FaGithub,
  FaInfoCircle,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { SocialLink, Logo } from "src/components/uiParts";
import { format } from "date-fns";
import Link from "next/link";

type Props = {
  children?: React.ReactNode;
};

const HomeLayout: React.VFC<Props> = ({ children }) => {
  return (
    <VStack minH={"100vh"} justify="center">
      <header>
        <Logo height="12" />
      </header>
      <nav>
        <HStack mt="8">
          <Link href="/blog" passHref>
            <Button leftIcon={<FaCalendarDay />} variant="ghost">
              Blog
            </Button>
          </Link>
          <Link href="/about" passHref>
            <Button leftIcon={<FaInfoCircle />} variant="ghost">
              About
            </Button>
          </Link>
        </HStack>
      </nav>
      <main>{children}</main>
      <footer>
        <VStack spacing={4} mt="4">
          <HStack spacing={4}>
            <SocialLink
              href={"https://github.com/" + process.env.ID_GITHUB}
              aria-label="Github"
              isRound
              size="lg"
              variant="ghost"
              icon={<FaGithub size="1.5em" />}
            />

            <SocialLink
              href={"https://twitter.com/" + process.env.ID_TWITTER}
              aria-label="Twitter"
              isRound
              size="lg"
              variant="ghost"
              icon={<FaTwitter size="1.5em" />}
            />

            <SocialLink
              href={"https://www.instagram.com/" + process.env.ID_INSTAGRAM}
              aria-label="Instagram"
              isRound
              size="lg"
              variant="ghost"
              icon={<FaInstagram size="1.5em" />}
            />
          </HStack>
          <Text
            fontSize="sm"
            letterSpacing={1.5}
            align="center"
            fontWeight="bold"
          >
            Copyright &copy; {format(new Date(), "yyyy")} K.W.
          </Text>
          <Text
            fontSize="sm"
            letterSpacing={1.5}
            align="center"
            fontWeight="bold"
          >
            All rights reserved.
          </Text>
        </VStack>
      </footer>
    </VStack>
  );
};

export default HomeLayout;
