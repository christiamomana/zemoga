import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {PostsContainer, PostContainer} from './src/posts/containers';
import {LogBox, Platform} from 'react-native';
import {colors} from './src/commons/colors';
const Stack = createStackNavigator();
import Realm from 'realm';
import {commentsSchema, postsSchema, profilesSchema} from './src/commons/schemas';

export default function App() {
  let realm = new Realm({
    path: 'ZemogaDatabase.realm',
    schema: [postsSchema, commentsSchema, profilesSchema],
  });

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const isIOS: boolean = Platform.OS === 'ios';

  const optionsStack: StackNavigationOptions = {
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerTintColor: colors.white,
    headerTitleStyle: {
      alignSelf: isIOS ? 'center' : 'flex-start',
    },
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Posts"
            component={PostsContainer}
            options={optionsStack}
          />
          <Stack.Screen
            name="Post"
            component={PostContainer}
            options={{title: isIOS ? 'Post' : '', ...optionsStack}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
