import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  useToast,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
  Text,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

/* ✅ Validation helpers */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const getEmailError = (email) => {
  if (!email) return "Email is required";
  if (!isValidEmail(email)) return "Please enter a valid email";
  return null;
};

const getPasswordError = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
};

const getRegPasswordError = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
  if (!/\d/.test(password)) return "Password must contain at least one number";
  return null;
};

const getNameError = (name) => {
  if (!name) return "Name is required";
  if (name.length < 2) return "Name must be at least 2 characters";
  if (name.length > 50) return "Name must not exceed 50 characters";
  return null;
};

const LoginPage = () => {
  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  // Touched state for error display
  const [loginTouched, setLoginTouched] = useState({ email: false, password: false });
  const [regTouched, setRegTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const toast = useToast();
  const navigate = useNavigate();

  // Validation errors
  const loginEmailError = getEmailError(email);
  const loginPasswordError = getPasswordError(password);
  const regNameError = getNameError(regName);
  const regEmailError = getEmailError(regEmail);
  const regPasswordError = getRegPasswordError(regPassword);

  // Form validity
  const isLoginValid = !loginEmailError && !loginPasswordError;
  const isRegisterValid =
    !regNameError && !regEmailError && !regPasswordError;

  const handleLogin = async () => {
    setLoginTouched({ email: true, password: true });

    if (!isLoginValid) {
      toast({
        title: "Validation Error",
        description: "Please fix all errors",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast({
          title: "Login failed",
          description: data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // ✅ Store token & user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast({
        title: "Login successful",
        description: `Welcome back, ${data.user.role === "admin" ? "Admin" : "User"}!`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setRegTouched({ name: true, email: true, password: true });

    if (!isRegisterValid) {
      toast({
        title: "Validation Error",
        description: "Please fix all errors",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: regName.trim(),
          email: regEmail.trim().toLowerCase(),
          password: regPassword,
          role,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast({
          title: "Registration failed",
          description: data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // ✅ Store token & user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast({
        title: "Registration successful",
        description: `Welcome, ${role === "admin" ? "Admin" : "User"}!`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.sm">
      <VStack spacing={6} mt={10}>
        <Heading>Welcome to Product Store</Heading>

        <Box w="full" p={6} shadow="md" borderRadius="md">
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Register</Tab>
            </TabList>

            <TabPanels>
              {/* LOGIN TAB */}
              <TabPanel>
                <VStack spacing={4}>
                  {/* Email */}
                  <FormControl
                    isInvalid={loginTouched.email && !!loginEmailError}
                  >
                    <Input
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() =>
                        setLoginTouched({ ...loginTouched, email: true })
                      }
                      isInvalid={loginTouched.email && !!loginEmailError}
                    />
                    {loginTouched.email && loginEmailError && (
                      <FormErrorMessage>{loginEmailError}</FormErrorMessage>
                    )}
                    {loginTouched.email && !loginEmailError && (
                      <FormHelperText color="green.500">
                        ✓ Valid email
                      </FormHelperText>
                    )}
                  </FormControl>

                  {/* Password */}
                  <FormControl
                    isInvalid={loginTouched.password && !!loginPasswordError}
                  >
                    <Input
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() =>
                        setLoginTouched({ ...loginTouched, password: true })
                      }
                      isInvalid={loginTouched.password && !!loginPasswordError}
                    />
                    {loginTouched.password && loginPasswordError && (
                      <FormErrorMessage>{loginPasswordError}</FormErrorMessage>
                    )}
                    {loginTouched.password && !loginPasswordError && (
                      <FormHelperText color="green.500">
                        ✓ Valid password
                      </FormHelperText>
                    )}
                  </FormControl>

                  <Button
                    colorScheme="blue"
                    w="full"
                    onClick={handleLogin}
                    isLoading={loading}
                    isDisabled={
                      !isLoginValid &&
                      (loginTouched.email || loginTouched.password)
                    }
                  >
                    Login
                  </Button>
                </VStack>
              </TabPanel>

              {/* REGISTER TAB */}
              <TabPanel>
                <VStack spacing={4}>
                  {/* Name */}
                  <FormControl
                    isInvalid={regTouched.name && !!regNameError}
                  >
                    <Input
                      placeholder="Full Name"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      onBlur={() =>
                        setRegTouched({ ...regTouched, name: true })
                      }
                      isInvalid={regTouched.name && !!regNameError}
                    />
                    {regTouched.name && regNameError && (
                      <FormErrorMessage>{regNameError}</FormErrorMessage>
                    )}
                    {regTouched.name && !regNameError && (
                      <FormHelperText color="green.500">
                        ✓ Valid name
                      </FormHelperText>
                    )}
                  </FormControl>

                  {/* Email */}
                  <FormControl
                    isInvalid={regTouched.email && !!regEmailError}
                  >
                    <Input
                      placeholder="Email"
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      onBlur={() =>
                        setRegTouched({ ...regTouched, email: true })
                      }
                      isInvalid={regTouched.email && !!regEmailError}
                    />
                    {regTouched.email && regEmailError && (
                      <FormErrorMessage>{regEmailError}</FormErrorMessage>
                    )}
                    {regTouched.email && !regEmailError && (
                      <FormHelperText color="green.500">
                        ✓ Valid email
                      </FormHelperText>
                    )}
                  </FormControl>

                  {/* Password */}
                  <FormControl
                    isInvalid={regTouched.password && !!regPasswordError}
                  >
                    <Input
                      placeholder="Password (min 6 chars, 1 uppercase, 1 number)"
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      onBlur={() =>
                        setRegTouched({ ...regTouched, password: true })
                      }
                      isInvalid={regTouched.password && !!regPasswordError}
                    />
                    {regTouched.password && regPasswordError && (
                      <FormErrorMessage>{regPasswordError}</FormErrorMessage>
                    )}
                    {regTouched.password && !regPasswordError && (
                      <FormHelperText color="green.500">
                        ✓ Strong password
                      </FormHelperText>
                    )}
                  </FormControl>

                  {/* Role Selector */}
                  <Box w="full">
                    <Text fontSize="sm" mb={2} fontWeight="bold">
                      Select Role:
                    </Text>
                    <Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      colorScheme="blue"
                    >
                      <option value="user">User (Browse Products)</option>
                      <option value="admin">
                        Admin (Create/Edit/Delete)
                      </option>
                    </Select>
                  </Box>

                  <Button
                    colorScheme="green"
                    w="full"
                    onClick={handleRegister}
                    isLoading={loading}
                    isDisabled={
                      !isRegisterValid &&
                      (regTouched.name || regTouched.email || regTouched.password)
                    }
                  >
                    Register
                  </Button>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </Container>
  );
};

export default LoginPage;
