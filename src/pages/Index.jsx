import React, { useState, useEffect } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, List, ListItem, Text, useToast, VStack } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoContent, setNewTodoContent] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (isLoggedIn) {
      fetchTodos();
    }
  }, [isLoggedIn]);

  const fetchTodos = async () => {
    try {
      const response = await fetch("https://backengine-zq2g.fly.dev/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization should include the token retrieved from the login API
          // Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-zq2g.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        setIsLoggedIn(true);
        toast({
          title: "Login successful.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // Here you would normally handle and store the token you receive
      } else {
        toast({
          title: "Login failed.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch("https://backengine-zq2g.fly.dev/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        toast({
          title: "Signup successful.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // Here you would normally handle and store the token you receive
      } else {
        toast({
          title: "Signup failed.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleCreateTodo = async () => {
    try {
      const response = await fetch("https://backengine-zq2g.fly.dev/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization should include the token retrieved from the login API
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTodoTitle, content: newTodoContent }),
      });
      if (response.ok) {
        fetchTodos();
        setNewTodoTitle("");
        setNewTodoContent("");
        toast({
          title: "Todo created.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Failed to create todo.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <Container maxW="container.md" centerContent>
      <Box p={4}>
        <VStack spacing={4}>
          {!isLoggedIn && (
            <VStack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Button colorScheme="blue" onClick={handleLogin}>
                Login
              </Button>
              <Button colorScheme="teal" onClick={handleSignup}>
                Signup
              </Button>
            </VStack>
          )}
          {isLoggedIn && (
            <>
              <Text fontSize="2xl" fontWeight="bold">
                Your Todos
              </Text>
              <List spacing={3}>
                {todos.map((todo, index) => (
                  <ListItem key={index} p={2} shadow="md" borderWidth="1px">
                    {todo.title}
                  </ListItem>
                ))}
              </List>
              <FormControl>
                <FormLabel htmlFor="new-todo-title">Todo Title</FormLabel>
                <Input id="new-todo-title" type="text" value={newTodoTitle} onChange={(e) => setNewTodoTitle(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="new-todo-content">Content</FormLabel>
                <Input id="new-todo-content" type="text" value={newTodoContent} onChange={(e) => setNewTodoContent(e.target.value)} />
              </FormControl>
              <Button leftIcon={<FaPlus />} colorScheme="green" onClick={handleCreateTodo}>
                Add Todo
              </Button>
            </>
          )}
        </VStack>
      </Box>
    </Container>
  );
};

export default Index;
