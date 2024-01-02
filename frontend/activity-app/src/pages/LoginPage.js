import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { useAuth } from '../../AuthContext'
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/sign-in', {
        email,
        password,
      });
      console.log(response.data);
      await signIn(response.data.token);
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error', error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      width: '80%',
      padding: 10,
      marginVertical: 5,
    },
  });
  
export default LoginPage;
