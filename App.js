import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="ModalScreen"
          component={ModalScreen}
          options={{
            presentation: 'transparentModal',
            cardOverlayEnabled: true,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const HomeScreen = () => {
  const {navigate} = useNavigation();
  return (
    <View style={styles.conatainer}>
      <Pressable onPress={() => navigate('ModalScreen')}>
        <Text>press here to open modal</Text>
      </Pressable>
      <Text>
        Notice that this screen will be blank when navigating from the
        ModalScreen to the Profile Screen
      </Text>
    </View>
  );
};

const ModalScreen = () => {
  const {navigate, goBack} = useNavigation();
  const nextScreen = () => navigate('Profile');
  return (
    <View style={styles.modal}>
      <Pressable onPress={nextScreen}>
        <Text>open profile screen</Text>
      </Pressable>
      <Pressable onPress={goBack}>
        <Text>close modal</Text>
      </Pressable>
    </View>
  );
};

const ProfileScreen = () => {
  const {goBack} = useNavigation();
  return (
    <View style={styles.conatainer}>
      <Pressable onPress={goBack}>
        <Text>
          Click here to go back to modal and notice blank HomeScreen in the
          background during animation again
        </Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
  },
  conatainer: {
    flex: 1,
  },
});
