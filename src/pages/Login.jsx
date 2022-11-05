import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useLoginMutation } from "../api/auth";
import useInitPage from "../hooks/useInitPage";

const Login = () => {
  const toast = useToast();
  const [userLogin, { isLoading, error, data }] = useLoginMutation();
  const [show, setShow] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  useInitPage({ logoutRequered: true });

  const handleClick = () => setShow(!show);
  const login = async ({ email, password }) => {
    try {
      await userLogin({
        email,
        password,
      }).unwrap();
    } catch (error) {
      toast.closeAll();
      toast({
        position: "top",
        title: error.data.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="100%" minH="100vh" bgGradient="linear(to-br, brand.500, brand.600)">
      <Box m="0 auto" w="80%" h="310px">
        <Image w="100%" src="/img/images.svg"></Image>
      </Box>

      <form onSubmit={handleSubmit(login)}>
        <Flex px="15px" direction="column">
          <FormControl isInvalid={errors.email} mb="10px">
            <FormLabel htmlFor="email" color="#fff">
              Correo electrónico
            </FormLabel>
            <Input
              id="email"
              borderRadius="25px"
              type="email"
              bg="#fff"
              {...register("email", {
                value: "andares@qemal.co",
                required: "Falta correo electrónico",
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <FormLabel htmlFor="password" color="#fff">
              Contraseña
            </FormLabel>
            <InputGroup>
              <Input
                id="password"
                borderRadius="25px"
                pr="4.5rem"
                type={show ? "text" : "password"}
                bg="#fff"
                {...register("password", {
                  value: "123456",
                  required: "Falta la constraseña",
                })}
              />
              <InputRightElement width="4.5rem">
                <Icon
                  onClick={handleClick}
                  color="gray"
                  fontSize="30px"
                  as={show ? HiEyeOff : HiEye}
                ></Icon>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex justifyContent="center" mt="70px">
          <Button
            w="50%"
            h="50px"
            color="#fff"
            colorScheme="brand"
            bg="rgba(255,255,255, 0.2)"
            isLoading={isSubmitting}
            loadingText="Ingresando..."
            type="submit"
          >
            Ingresar
          </Button>
        </Flex>
        <Flex justify="center" alignItems="center" fontSize={20} mt="10px">
          <Link as={NavLink} color="white" to={`/signup`}>
            <Text>¿No tienes cuenta?</Text>
          </Link>
        </Flex>
      </form>
    </Box>
  );
};

export default Login;
