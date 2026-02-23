import {
  Box,
  Heading,
  Container,
  VStack,
  Button,
  Input,
  useColorModeValue,
  useToast,
  Text,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProductStore } from '../store/product';

/* ✅ URL validation */
const isValidURL = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

/* ✅ Validation helper functions */
const getNameError = (name) => {
  if (!name) return 'Product name is required';
  if (name.length < 3) return 'Name must be at least 3 characters';
  if (name.length > 100) return 'Name must not exceed 100 characters';
  if (isValidURL(name)) return 'Name should be text, not a URL';
  return null;
};

const getPriceError = (price) => {
  if (!price) return 'Price is required';
  const numPrice = Number(price);
  if (isNaN(numPrice)) return 'Price must be a valid number';
  if (numPrice <= 0) return 'Price must be greater than 0';
  if (numPrice > 1000000) return 'Price is too high';
  return null;
};

const getImageError = (image) => {
  if (!image) return 'Image URL is required';
  if (!isValidURL(image)) return 'Please enter a valid image URL';
  return null;
};

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    price: false,
    image: false,
  });

  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.700');
  const { createproduct, actionLoading } = useProductStore();

  // Get error messages
  const nameError = getNameError(newProduct.name);
  const priceError = getPriceError(newProduct.price);
  const imageError = getImageError(newProduct.image);

  // Check if form is valid
  const isFormValid = !nameError && !priceError && !imageError;

  const handleInputChange = (field, value) => {
    setNewProduct({ ...newProduct, [field]: value });
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleAddProduct = async () => {
    // Mark all fields as touched
    setTouched({ name: true, price: true, image: true });

    // Check if form is valid
    if (!isFormValid) {
      toast({
        title: 'Validation Error',
        description: 'Please fix all errors before submitting',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    const productToSend = {
      name: newProduct.name.trim(),
      image: newProduct.image.trim(),
      price: Number(newProduct.price),
    };

    const { success, message } = await createproduct(productToSend);

    if (success) {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });

      setNewProduct({ name: '', price: '', image: '' });
      setTouched({ name: false, price: false, image: false });
    } else {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Container maxW="container.sm">
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center">
          Create Product
        </Heading>

        <Box w="full" bg={bgColor} p={6} rounded="lg" shadow="md">
          <VStack spacing={6}>
            {/* Product Name */}
            <FormControl isInvalid={touched.name && !!nameError}>
              <Input
                placeholder="Product name (3-100 characters)"
                value={newProduct.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                isInvalid={touched.name && !!nameError}
              />
              {touched.name && nameError && (
                <FormErrorMessage>{nameError}</FormErrorMessage>
              )}
              {touched.name && !nameError && (
                <FormHelperText color="green.500">✓ Valid name</FormHelperText>
              )}
            </FormControl>

            {/* Price */}
            <FormControl isInvalid={touched.price && !!priceError}>
              <Input
                type="number"
                placeholder="Product price"
                value={newProduct.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                onBlur={() => handleBlur('price')}
                isInvalid={touched.price && !!priceError}
              />
              {touched.price && priceError && (
                <FormErrorMessage>{priceError}</FormErrorMessage>
              )}
              {touched.price && !priceError && (
                <FormHelperText color="green.500">✓ Valid price</FormHelperText>
              )}
            </FormControl>

            {/* Image URL */}
            <FormControl isInvalid={touched.image && !!imageError}>
              <Input
                placeholder="Image URL (e.g., https://example.com/image.jpg)"
                value={newProduct.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                onBlur={() => handleBlur('image')}
                isInvalid={touched.image && !!imageError}
              />
              {touched.image && imageError && (
                <FormErrorMessage>{imageError}</FormErrorMessage>
              )}
              {touched.image && !imageError && (
                <FormHelperText color="green.500">✓ Valid URL</FormHelperText>
              )}
            </FormControl>

            <Button
              colorScheme="blue"
              w="full"
              onClick={handleAddProduct}
              isLoading={actionLoading}
              loadingText="Creating..."
              isDisabled={!isFormValid && (touched.name || touched.price || touched.image)}
            >
              Create Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
