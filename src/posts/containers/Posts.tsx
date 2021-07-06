import {Icon, Tabs, Tab, Fab, Button, Spinner, Text} from 'native-base';
import React, {useState, useLayoutEffect, useEffect} from 'react';
import {Alert, TouchableOpacity, Platform} from 'react-native';
import {Post} from '../../commons/models';
import ListPosts from '../components/ListPosts';
import Realm from 'realm';
import axios from 'axios';
import {configService} from '../../config/config';
import styles from './styles';

const FabIcon: React.FC<{onPress: () => any}> = ({onPress}) => {
  const render =
    Platform.OS !== 'ios' ? (
      <Fab
        active={true}
        direction="up"
        containerStyle={{}}
        style={styles.fabIcon}
        position="bottomRight"
        onPress={onPress}>
        <Icon name="trash" />
      </Fab>
    ) : (
      <Button full danger onPress={onPress}>
        <Text>Delete All</Text>
      </Button>
    );

  return render;
};

const PostsContainer: React.FC<any> = ({navigation}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsFavorites, setPostFavorites] = useState<Post[]>([]);
  const [loading, setLoaging] = useState(true);
  const realm = new Realm({path: 'ZemogaDatabase.realm'});

  const setData = (data: any) => {
    realm.write(() => {
      realm.deleteAll();
      data.posts.map((item: any) => realm.create('posts', item));
      data.comments.map((item: any) => realm.create('comments', item));
      data.profiles.map((item: any) => realm.create('profiles', item));
    });
    setPosts(data.posts);
  };

  const removeData = () => {
    realm.write(() => {
      realm.deleteAll();
    });
    setPosts([]);
  };

  const onPressRemove = () => {
    Alert.alert('Delete data', 'are you sure to delete the data', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: removeData},
    ]);
  };

  const getPosts = async () => {
    try {
      const data: any = await axios.get(configService.url);
      setData(data.data);
    } catch (error) {
      Alert.alert('An error occurred when obtaining the data, try again');
    } finally {
      setLoaging(false);
    }
  };

  const reloadPosts = () => {
    let postsAux: any = realm.objects('posts');
    if (postsAux.length <= 0) {
      getPosts();
    } else {
      setPosts(postsAux);
    }
  };

  const goToPost = (post: Post) => {
    navigation.navigate('Post', {post, reloadPosts: reloadPosts});
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={reloadPosts}>
          <Icon name="reload-outline" style={styles.iconHeaderRight} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    const favorites: Post[] = posts.filter((item: Post) => item.favorite);
    setPostFavorites(favorites);
  }, [posts]);

  return (
    <>
      <Tabs>
        <Tab
          heading="All"
          tabStyle={[styles.tabStyle]}
          activeTabStyle={styles.activeTabStyle}>
          {loading && <Spinner />}
          <ListPosts data={posts} goToPost={goToPost} />
          <FabIcon onPress={onPressRemove} />
        </Tab>
        <Tab
          heading="Favorites"
          tabStyle={[styles.tabStyle]}
          activeTabStyle={styles.activeTabStyle}>
          {loading && <Spinner />}
          <ListPosts data={postsFavorites} goToPost={goToPost} />
          <FabIcon onPress={onPressRemove} />
        </Tab>
      </Tabs>
    </>
  );
};

export default PostsContainer;
