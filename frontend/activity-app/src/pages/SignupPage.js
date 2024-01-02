import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import axios from "axios";

const SignupPage = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [interests, setInterests] = useState([]);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/create-user", {
        fullname,
        email,
        password,
        interests,
      });
      console.log(response.data);
      // Handle signup success, perhaps navigate to login page or directly log in the user
    } catch (error) {
      setError("Signup failed. Please try again.");
      console.error("Signup error", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={fullname}
        onChangeText={setFullname}
        placeholder="Full Name"
      />
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
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
      />
      {/* Implement a way to select and set interests */}
      <Button title="Sign Up" onPress={handleSignup} />
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

export default SignupPage;
