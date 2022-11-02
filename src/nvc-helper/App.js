import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Button, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const  MyApp = () => {
  
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getFeelings = async () => {
     try {
      const response = await fetch('http://localhost:3000/feelings?language=en-US');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFeelings();
  }, []);

  return (
    <NavigationContainer>
      <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (

    //           <Text> {item.feeling} </Text>
              <Button
    title={item.feeling}
    onPress={() => Alert.alert('Left button pressed')}
    color="#841584"
    accessibilityLabel={item.description}
  />
            )}
          />
        )}
      </View>
    </NavigationContainer>
  );
};

export default MyApp;