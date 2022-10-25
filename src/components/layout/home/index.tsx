import Link from "next/link";

import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import {
  FaCalendarDay,
  FaGithub,
  FaInfoCircle,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

import { SocialLink, Logo } from "src/components/uiParts";

type Props = {
  children?: React.ReactNode;
};

const HomeLayout: React.FC<Props> = ({ children }) => {
  return (
    <VStack
      //@ts-ignore
      minH={[["100vh", "100dvh"]]}
      justify="center"
    >
      <header>
        <Logo height="12" />
      </header>
      <nav>
        <HStack mt="12" spacing={4} as="ul" listStyleType="none">
          <li>
            <Link href="/blog" passHref legacyBehavior>
              <Button as="a" leftIcon={<FaCalendarDay />} variant="ghost">
                Blog
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/about" passHref legacyBehavior>
              <Button as="a" leftIcon={<FaInfoCircle />} variant="ghost">
                About
              </Button>
            </Link>
          </li>
        </HStack>
      </nav>
      <main>{children}</main>
      <footer>
        <Box mt="8">
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
            letterSpacing={1}
            align="center"
            fontWeight="bold"
            mt="8"
          >
            Copyright &copy; {format(new Date(), "yyyy")} K.W.
          </Text>
          <Text
            fontSize="sm"
            letterSpacing={1}
            align="center"
            fontWeight="bold"
            mt="4"
          >
            All rights reserved.
          </Text>
        </Box>
      </footer>
    </VStack>
  );
};

export default HomeLayout;
