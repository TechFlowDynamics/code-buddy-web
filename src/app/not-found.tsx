"use client";

import {
  Button,
  Container,
  Image,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";

import React from "react";

import useNavigate from "@/hooks/useNavigation";

import image from "../assets/images/svgs/not-found.svg";
import classes from "../styles/NotFoundImage.module.css";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image
          src={image.src}
          className={classes.mobileImage}
          alt="Not Found"
        />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
            onClick={() => navigate("/")}>
            Get back to home page
          </Button>
        </div>
        <Image
          src={image.src}
          className={classes.desktopImage}
          alt="Not Found"
        />
      </SimpleGrid>
    </Container>
  );
}
