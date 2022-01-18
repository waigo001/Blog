import { Container, VStack } from "@chakra-ui/react";
import React from "react";
import Footer from "./footer";
import Header from "./header";

type Props = {
  children?: React.ReactNode;
};

const CommonLayout: React.VFC<Props> = ({ children }) => {
  return (
    <VStack minH="100vh">
      <Header />
      <Container maxW="5xl" flex="1">
        {children}
      </Container>
      <Footer />
    </VStack>
  );
};

export default CommonLayout;
