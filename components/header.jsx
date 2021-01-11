import React from 'react';
import {
  Box,
  Heading,
  Image,
  Flex,
  Text,
  Button,
  Avatar,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Link,
} from '@chakra-ui/react';
import { useCurrentUser } from '@/hooks/index';

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Header = ({ loggedIn }) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  const [user, { mutate }] = useCurrentUser();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={['1.75rem 2rem', '1.75rem 2rem', '1.75rem 4rem']}
      bg="white"
      color="gray.800"
      borderBottom="1px"
      borderBottomColor="gray.100"
      fontSize={['1rem', '1rem', '1rem', '1rem', '1.15rem']}
    >
      <Flex align="center" mr={10} as="a" href="/">
        <Heading as="h1" size="lg">
          Rep Spec
        </Heading>
      </Flex>

      <Box display={{ sm: 'block', md: 'none' }} onClick={handleToggle}>
        <svg
          fill="gray.800"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ xs: show ? 'block' : 'none', md: 'flex' }}
        width={{ xs: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={2}
      >
        <MenuItems>
          <Link>Docs</Link>
        </MenuItems>
        <MenuItems>
          <Link>Source Code</Link>
        </MenuItems>
        <MenuItems>
          <Link>About</Link>
        </MenuItems>
      </Box>

      <Box
        display={{ xs: show ? 'block' : 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        {user ? (
          <Menu>
            <MenuButton>
              <Avatar name={user.profilePicture} src="https://bit.ly/dan-abramov" />
            </MenuButton>
            <MenuList>
              <MenuItem>Dashboard</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Log Out</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button variantColor="gray.800" variant="outline">
            Log In
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
