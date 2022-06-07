import {
  Flex,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Text,
  useBreakpointValue,
  Image as ChakraImage,
  Input,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import InputMask from "react-input-mask";
import React, { useEffect, useRef, useState } from "react";
import {
  RiCheckboxCircleLine,
  RiMailSendFill,
  RiSendPlaneFill,
  RiWhatsappLine,
} from "react-icons/ri";
import Header from "./components/Header";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const [cookies, setCookies] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappLabel, setWhatsappLabel] = useState("Enviar");

  const { isOpen, onOpen, onClose } = useDisclosure();

  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: 0,
      height: 0,
    });

    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    useEffect(() => {
      // only execute all the code below in client side
      if (typeof window !== "undefined") {
        // Handler to call on window resize

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

  const size = useWindowSize();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  function Cookies() {
    return (
      <Flex zIndex={2} w="100vw" bottom={0} position="fixed" justify="center">
        <Flex
          zIndex={2}
          flexDir="column"
          position="fixed"
          boxShadow="rgba(0,0,0,0.1) 0 0 10px"
          w="100%"
          maxW={1000}
          mx="auto"
          bottom={0}
          bg="#FFF"
          p="6"
        >
          <Text color="#333" fontSize={isWideVersion ? "xl" : "md"}>
            By clicking “Accept All Cookies”, you agree to the storing of
            cookies on your device to enhance site navigation, analyze site
            usage, and assist in our marketing efforts
          </Text>
          <Flex mt="4">
            <Flex
              w="50%"
              cursor="pointer"
              px="6"
              py="4"
              justify="center"
              align="center"
              borderRadius="5"
              bg="#FFF"
              border="1px solid #333"
            >
              <Text color="#333" fontSize={isWideVersion ? "lg" : "sm"}>
                Cookies Settings
              </Text>
            </Flex>
            <Flex
              onClick={() =>
                setTimeout(() => {
                  setCookies(!cookies);
                }, 100)
              }
              w="50%"
              ml="4"
              cursor="pointer"
              px="6"
              py="4"
              justify="center"
              align="center"
              borderRadius="5"
              bg="#3404fb"
            >
              <Text
                color="#FFF"
                fontWeight="bold"
                fontSize={isWideVersion ? "lg" : "sm"}
              >
                Accept Cookies
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  function TopBanner() {
    return (
      <Flex
        _hover={{
          textDecorationLine: "underline",
        }}
        w="100vw"
        bg="#fafafa"
        style={{
          marginTop: 70,
          height: 60,
        }}
        p="5"
        justify="center"
        align="center"
      >
        <Text cursor="pointer" color="#333" fontSize="md">
          Já possui um site? Ganhe R$500 ou mais trazendo ele pra gente.
        </Text>
      </Flex>
    );
  }

  return (
    <>
      <Header text />

      <Flex
        boxShadow="rgba(0,0,0,0.1) 0 0 2px"
        flexDir="column"
        bg="#FFF"
        pb="10"
        flex="1"
      >
        <Flex
          style={{
            marginTop: size.width > 700 ? 120 : 90,
            paddingLeft: 20,
            paddingRight: 20,
          }}
          justify="center"
          w="100%"
          mx="auto"
          maxW={1200}
          flexDir={size.width > 700 ? "row" : "column"}
          p={size.width < 700 ? "4" : 0}
        >
          <Flex
            flexDir="column"
            maxW={size.width > 700 ? "45%" : "100%"}
            w="100%"
            justify={size.width > 600 ? "center" : "space-around"}
            p="10"
            bg="#F0F0F0"
            borderRadius="40"
          >
            <Text fontSize="xl" maxW={600} color="#333">
              Conecte com a gente.
            </Text>
            <Text fontSize="xl" maxW={600} color="#333">
              Queremos saber mais
            </Text>
            <Flex mb="4">
              <Text fontSize="xl" maxW={600} color="#333">
                como ajudar
              </Text>
              <Text
                ml="1.5"
                fontSize="xl"
                maxW={600}
                fontWeight="bold"
                color="#333"
              >
                você!
              </Text>
            </Flex>
            <Text m="1" fontSize="md" maxW={600} color="#333">
              Nome
            </Text>
            <Input
              style={{
                borderRadius: 5,
                padding: 10,
                color: "#777",
                height: 50,
                border: "1px solid #e0e0e0",
              }}
              bg="#FFF"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setWhatsapp(e.target.value)
              }
            />
            <Text
              style={{
                marginTop: 10,
              }}
              m="1"
              fontSize="md"
              maxW={600}
              color="#333"
            >
              Celular
            </Text>
            <InputMask
              style={{
                borderRadius: 5,
                padding: 10,
                color: "#777",
                height: 50,
                border: "1px solid #e0e0e0",
              }}
              mask="+55 (99) 999999999"
              value={whatsapp}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setWhatsapp(e.target.value)
              }
            />
            <Flex
              mt="4"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setWhatsappLabel("Enviado");
                  setWhatsapp("");
                  setLoading(false);
                }, 1000);
              }}
              cursor="pointer"
              style={{
                marginTop: 30,
                height: 50,
                width: "100%",
              }}
              borderRadius="5"
              justify="center"
              align="center"
              bg="#3404fb"
            >
              {loading ? (
                <Spinner color="#EEE" size="sm" />
              ) : (
                <Flex align="center">
                  <Text color="#FFF" fontWeight="semibold">
                    {whatsappLabel}
                  </Text>
                  {whatsappLabel === "Enviado" && (
                    <Icon
                      as={RiCheckboxCircleLine}
                      fontSize="md"
                      color="#EEE"
                      ml="1"
                    />
                  )}
                </Flex>
              )}
            </Flex>
          </Flex>
          <Flex
            flexDir="column"
            justify="space-between"
            style={{
              paddingLeft: 20,
              paddingTop: size.width < 700 ? 20 : 0,
            }}
          >
            <Flex flexDir="column">
              <Flex>
                <Text fontSize={size.width < 700 ? "2xl" : "3xl"} color="#333">
                  Soluções que fazem a diferença.
                </Text>
              </Flex>
              <Text
                fontSize={size.width < 700 ? "md" : "lg"}
                color="#333"
                fontWeight="light"
              >
                Para você, para seu público, para todos nós!
              </Text>
            </Flex>
            <Flex>
              <Flex flexDir="column">
                <ChakraImage
                  zIndex={2}
                  mt="4"
                  borderRadius="12"
                  height={140}
                  maxW={140}
                  src="/u0.png"
                />
                <ChakraImage
                  zIndex={1}
                  mt="4"
                  borderRadius="12"
                  height={140}
                  maxW={140}
                  src="/u1.jpeg"
                />
              </Flex>
              <Flex flexDir="column" ml="4">
                <ChakraImage
                  zIndex={2}
                  borderRadius="12"
                  mt="4"
                  height={140}
                  maxW={140}
                  src="/u2.jpeg"
                />
                <ChakraImage
                  zIndex={1}
                  borderRadius="12"
                  mt="4"
                  height={140}
                  maxW={140}
                  src="/u3.jpg"
                />
              </Flex>
              {(size.width < 700 || size.width > 900) && (
                <Flex flexDir="column" ml="4">
                  <ChakraImage
                    zIndex={2}
                    borderRadius="12"
                    mt="4"
                    height={140}
                    maxW={140}
                    src="/u4.png"
                  />
                  <ChakraImage
                    zIndex={1}
                    borderRadius="12"
                    mt="4"
                    height={140}
                    maxW={140}
                    src="/u5.png"
                  />
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody></DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {cookies && <Cookies />}
    </>
  );
};

export default Home;
