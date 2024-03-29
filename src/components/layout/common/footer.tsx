import { chakra, Flex, Text, Box } from "@chakra-ui/react";
import { format } from "date-fns";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

import { SocialLink } from "src/components/uiParts";

import type { HTMLChakraProps } from "@chakra-ui/react";

const FooterContent = () => {
  return (
    <Flex
      w="100%"
      h="100%"
      px={{ base: "4", md: "6" }}
      align="center"
      justify="space-between"
    >
      <Text fontSize="xs" letterSpacing="1.5px" fontWeight="700" align="center">
        <Box as="span" display={{ base: "none", sm: "inline" }}>
          Copyright&nbsp;
        </Box>
        &copy; {format(new Date(), "yyyy")}&nbsp;K.W.
        <Box as="span" display={{ base: "none", md: "inline" }}>
          &nbsp;&nbsp;All rights reserved.
        </Box>
      </Text>
      <Flex gridGap={4} display={{ base: "none", md: "flex" }}>
        <SocialLink
          href="https://github.com/waigo001"
          aria-label="Github"
          isRound
          size="md"
          variant="ghost"
          icon={<FaGithub size="1.5em" />}
        />

        <SocialLink
          href="https://twitter.com/waigo001"
          aria-label="Twitter"
          isRound
          size="md"
          variant="ghost"
          icon={<FaTwitter size="1.5em" />}
        />

        <SocialLink
          href="https://www.instagram.com/waigo001/"
          aria-label="Instagram"
          isRound
          size="md"
          variant="ghost"
          icon={<FaInstagram size="1.5em" />}
        />
      </Flex>
    </Flex>
  );
};

const Footer = (props: HTMLChakraProps<"footer">) => {
  return (
    <chakra.footer width="full" {...props}>
      <chakra.div height="3rem" mx="auto" maxW="8xl">
        <FooterContent />
      </chakra.div>
    </chakra.footer>
  );
};

export default Footer;
