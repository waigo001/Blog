import React from "react";
import {
  chakra,
  Flex,
  HTMLChakraProps,
  useColorModeValue,
  Text,
  Box,
} from "@chakra-ui/react";
import { format } from "date-fns";

const FooterContent = () => {
  return (
    <Flex
      w="100%"
      h="100%"
      px={{ base: "4", md: "6" }}
      align="center"
      justify="start"
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
    </Flex>
  );
};

const Footer = (props: HTMLChakraProps<"footer">) => {
  const bg = useColorModeValue("white", "gray.800");
  return (
    <chakra.footer width="full" bg={bg} {...props}>
      <chakra.div height="3rem" mx="auto" maxW="8xl">
        <FooterContent />
      </chakra.div>
    </chakra.footer>
  );
};

export default Footer;
