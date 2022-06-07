import {
  Flex,
  Icon,
  Image,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiCloseFill, RiMenuFill } from "react-icons/ri";

export default function Header({ text = false }) {
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

  return (
    <>
      <Flex
      zIndex={10}
        position="fixed"
        bg="#FFF"
        style={{
          height: 90,
          width: "100%",
          paddingLeft: 10,
          paddingRight: 10,
        }}
        justify="space-between"
        align="center"
      >
        <Link href="/" passHref>
          <a rel="noopener noreferrer">
            <Flex>
              <Image
                cursor="pointer"
                src="/logo.jpg"
                height="50"
                width="50"
                borderRadius="5"
              />

              {text && (
                <Flex
                  style={{
                    marginLeft: 10,
                  }}
                  flexDir="column"
                >
                  <Text fontSize="xl">Uppernodes</Text>
                  <Text fontSize="sm" mt={-1} fontWeight="thin">
                    A solução digital para o seu negócio
                  </Text>
                </Flex>
              )}
            </Flex>
          </a>
        </Link>
        <Flex
          cursor="pointer"
          onClick={() => onOpen()}
          borderRadius="5"
          justify="center"
          align="center"
          style={{
            height: 50,
            width: 50,
          }}
          border="1px solid #e0e0e0"
        >
          <Icon as={RiMenuFill} fontSize="lg" color="#333" />
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            style={{
              display: "flex",
              flexDirection: "row",
              height: 70,
              margin: 0,
              padding: 10,
              justifyContent: "space-between",
            }}
          >
            {size.width < 500 ? (
              <Flex flexDir="column">
                <Text fontSize="xl" fontWeight="normal">
                  Uppernodes.com
                </Text>
                <Text fontSize="xs" fontWeight="thin">
                  A solução digital para o seu negócio
                </Text>
              </Flex>
            ) : (
              <Flex />
            )}
            <Flex
              cursor="pointer"
              onClick={() => onClose()}
              borderRadius="5"
              justify="center"
              align="center"
              style={{
                height: 50,
                width: 50,
              }}
              border="1px solid #e0e0e0"
            >
              <Icon as={RiCloseFill} fontSize="xl" color="#333" />
            </Flex>
          </DrawerHeader>
          <DrawerBody boxShadow="rgba(0,0,0,0.1) 0 0 2px"></DrawerBody>

          <DrawerFooter>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      //
    },
  };
}
