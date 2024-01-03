import React, { useState } from "react";
import { StyleSheet, View, Button, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");

  const handleCategoryChange = () => {
    // Handle the category change here
    // You can add navigation logic or other actions based on the selected category
    // For simplicity, let's just log the selected category for now
    console.log("Selected category:", selectedCategory);
  };

  return (
    <View style={styles.container}>
      <Text>I'm feeling...</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedCategory(value)}
        items={[
          { label: 'shopping', value: 'shopping' },
          { label: 'hungry', value: 'restaurants' },
          { label: 'bored', value: 'recreation' },
        ]}
      />
      <Button title="Select Category" onPress={handleCategoryChange} />
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

export default HomeScreen;