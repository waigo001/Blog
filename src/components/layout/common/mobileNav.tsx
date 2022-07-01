import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  ListItem,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaCalendarDay,
  FaInfoCircle,
} from "react-icons/fa";
import { Logo, SocialLink } from "src/components/uiParts";

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
    <ListItem>
      <Link href={href} passHref>
        <Button
          as="a"
          aria-current={isActive ? "page" : undefined}
          leftIcon={icon}
          isFullWidth
          justifyContent="left"
          variant={"ghost"}
          colorScheme={isActive ? "cyan" : "gray"}
          _activeLink={{
            bg: useColorModeValue("cyan.50", "rgba(48, 140, 122, 0.3)"),
          }}
        >
          {children}
        </Button>
      </Link>
    </ListItem>
  );
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileNavContent: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Drawer placement="left" isOpen={isOpen} onClose={onClose} size="xs">
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton size="lg" />

        <DrawerHeader pt="6">
          <Logo height="6" />
        </DrawerHeader>
        <DrawerBody>
          <nav>
            <UnorderedList spacing="4" listStyleType="none" mt="4" ml="0">
              <NavLink href="/blog" icon={<FaCalendarDay />}>
                Blog
              </NavLink>

              <NavLink href="/about" icon={<FaInfoCircle />}>
                About
              </NavLink>
            </UnorderedList>
          </nav>
        </DrawerBody>
        <DrawerFooter justifyContent="flex-start">
          <HStack spacing={4}>
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
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavContent;
