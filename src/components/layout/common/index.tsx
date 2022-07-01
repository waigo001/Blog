import { Container, Flex } from "@chakra-ui/react";
import React from "react";
import Footer from "./footer";
import Header from "./header";

type Props = {
  children?: React.ReactNode;
};

const CommonLayout: React.FC<Props> = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Container as="main" maxW="5xl" flexGrow="1" my="4">
        {children}
      </Container>
      <Footer />
    </Flex>
  );
};

export default CommonLayout;
