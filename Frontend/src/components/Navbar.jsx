import React from "react";
import { Container,Flex, HStack,Text,Button,} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";

const Navbar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Container maxW="100%" p={4} fontWeight="bold">
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          bgGradient="linear(to-l, #bc4b1bff, #8e275bff)"
          bgClip="text"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="extrabold"
          textAlign="center"
          textTransform="uppercase"
        >
          <RouterLink to="/">Product Store</RouterLink>
        </Text>

        <HStack spacing={3} alignItems="center">
          {/* ✅ Show Create only if admin */}
          {user?.role === "admin" && (
            <Button as={RouterLink} to="/create" colorScheme="green">
              <AddIcon fontSize="20" mr={2} />
              Create
            </Button>
          )}

          {/* ✅ If NOT logged in */}
          {!user ? (
            <Button as={RouterLink} to="/login" colorScheme="blue">
              Login
            </Button>
          ) : (
            <Button colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
          )}

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? "🌙" : "☀️"}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
