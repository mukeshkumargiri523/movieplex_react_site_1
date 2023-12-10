import {
  Button,
  Text,
  ChakraProvider,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import theme from "./Theme.js";

function PaymentSuccess() {
  const navigate = useNavigate();
  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get("reference");
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <VStack h="100vh" justifyContent={"center"}>
          <Heading color={"whitesmoke"} textTransform={"uppercase"}>
            Order Successfull
          </Heading>
          <Text color={"whitesmoke"}>Reference no ({referenceNum})</Text>
          <Button
            color={"whitesmoke"}
            onClick={() => navigate("/")}
            backgroundColor={"red"}
          >
            Go To Home
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default PaymentSuccess;
