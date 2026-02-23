import React, { useState } from 'react';
import {Box,Heading,HStack,IconButton,Image,Text,useColorMode,useToast,Button,VStack,Input,Modal, ModalBody,ModalCloseButton,ModalContent, ModalHeader,ModalOverlay,ModalFooter, useDisclosure,} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product';

/* URL validation helper */
const isValidURL = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const ProductCard = ({ product }) => {
  /* ✅ FIX: Define user properly */
  const user = JSON.parse(localStorage.getItem('user'));

  const { colorMode } = useColorMode();
  const bg = colorMode === 'light' ? 'white' : 'gray.800';

  const { deleteProduct, updateProduct, actionLoading } = useProductStore();
  const toast = useToast();

  /* Edit modal */
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  /* Delete modal */
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const [imageError, setImageError] = useState(false);

  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  /* DELETE */
  const handleDeleteConfirm = async () => {
    const { success, message } = await deleteProduct(product._id);

    toast({
      title: success ? 'Deleted' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });

    if (success) onDeleteClose();
  };

  /* UPDATE */
  const handleUpdateProduct = async () => {
    const { name, price, image } = updatedProduct;

    if (!name || !price || !image) {
      toast({
        title: 'Missing fields',
        description: 'Please fill all fields',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (isValidURL(name)) {
      toast({
        title: 'Invalid product name',
        description: 'Product name should not be a URL',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!isValidURL(image)) {
      toast({
        title: 'Invalid image URL',
        description: 'Please enter a valid URL',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const { success, message } = await updateProduct(product._id, {
      name,
      price: Number(price),
      image,
    });

    toast({
      title: success ? 'Success' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });

    if (success) onEditClose();
  };

  return (
    <Box
      bg={bg}
      w="full"
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
    >
      {/* IMAGE SECTION */}
      <Box
        w="full"
        h={{ base: '200px', md: '240px' }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="white"
      >
        <Image
          src={
            imageError
              ? 'https://via.placeholder.com/300x300?text=No+Image'
              : product.image
          }
          alt={product.name}
          maxH="100%"
          maxW="100%"
          objectFit="contain"
          onError={() => setImageError(true)}
        />
      </Box>

      <Box p={{ base: 3, md: 4 }}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text
          fontWeight="bold"
          fontSize={{ base: 'md', md: 'lg' }}
          color="blue.500"
          mb={4}
        >
          ${product.price}
        </Text>

        {/* ✅ SHOW BUTTONS ONLY FOR ADMIN */}
        {user?.role === 'admin' && (
          <HStack spacing={2}>
            <IconButton
              icon={<EditIcon />}
              onClick={onEditOpen}
              colorScheme="blue"
              aria-label="Edit product"
              isLoading={actionLoading}
            />
            <IconButton
              icon={<DeleteIcon />}
              onClick={onDeleteOpen}
              colorScheme="red"
              aria-label="Delete product"
              isLoading={actionLoading}
            />
          </HStack>
        )}
      </Box>

      {/* EDIT MODAL */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  })
                }
              />
              <Input
                type="number"
                placeholder="Price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleUpdateProduct}
              isLoading={actionLoading}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onEditClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* DELETE MODAL */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete{' '}
              <Text as="span" fontWeight="bold">
                {product.name}
              </Text>
              ?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={handleDeleteConfirm}
              isLoading={actionLoading}
              loadingText="Deleting..."
            >
              Delete
            </Button>
            <Button
              variant="ghost"
              onClick={onDeleteClose}
              isDisabled={actionLoading}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
