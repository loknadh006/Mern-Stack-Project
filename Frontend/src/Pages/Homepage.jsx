import { Container, SimpleGrid, Text, VStack, Spinner, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {useEffect} from 'react';
import { useProductStore} from '../store/product';
import ProductCard from '../components/productCard';

const Homepage = () => {
  const {fetchProducts,products,loading}= useProductStore();
  
  useEffect(() =>{
    fetchProducts();

  },[fetchProducts]); 
  console.log("products",products);
  
  if (loading) {
    return (
      <Center h="60vh">
        <Spinner size="xl" thickness="4px" color="blue.500" />
      </Center>
    );
  }
  
  return (
    <Container maxW={"container.xl"} py={{ base: 8, md: 12 }}>
 <VStack spacing={{ base: 6, md: 8 }}>
  <Text
    fontSize={{ base: "22", md: "30" }}
    fontWeight={"bold"}
    bgGradient={"linear(to-r, cyan.400, blue.500)"}
    bgClip={"text"}
    textAlign={"center"}
  >
    current products🚀
  </Text>

  {products.length > 0 ? (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3 }}
      spacing={{ base: 6, md: 10 }}
      w={"full"}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </SimpleGrid>
  ) : (
    <Text
      fontSize={{ base: "lg", md: "xl" }}
      textAlign={"center"}
      fontWeight="bold"
      color="gray.500"
    >
      no product found😢{" "}
      <Link to={"/create"}>
        <Text
          as="span"
          color="blue.500"
          _hover={{ textDecoration: "underline" }}
        >
          create now
        </Text>
      </Link>
    </Text>
  )}
</VStack>

    </Container>
  )
};

export default Homepage;