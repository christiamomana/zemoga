import {Container, Icon, Text} from 'native-base';
import React, {useLayoutEffect} from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Profile, Comments, Post} from '../../commons/models';
import ListComments from '../components/ListComments';
import styles from './styles';

const PostContainer: React.FC<any> = ({route, navigation}) => {
  let post: Post = route.params?.post;
  const reloadPosts: () => any = route.params?.reloadPosts;
  const [comments, setComments] = useState<Comments[]>([]);
  const [profile, setProfile] = useState<Profile>();
  const [isFavorite, setIsFavorite] = useState(post.favorite);
  const realm = new Realm({path: 'ZemogaDatabase.realm'});

  const addFavorite = () => {
    let postFavorite: any = realm.objects('posts').filtered(`id = ${post.id}`);
    realm.write(() => {
      postFavorite[0].favorite = !post.favorite;
    });
    setIsFavorite(!isFavorite);
    reloadPosts();
  };

  const getData = () => {
    let profile: any = realm
      .objects('profiles')
      .find((item: any) => item.id === post.id);
    let comments: any = realm
      .objects('comments')
      .filtered(`postId = ${post.id}`);
    setComments(comments);
    setProfile(profile);
  };

  const setButtonNavitation = () => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => addFavorite()}>
          <Icon
            name={!isFavorite ? 'star-outline' : 'star'}
            style={styles.iconHeaderRight}
          />
        </TouchableOpacity>
      ),
    });
  };

  useLayoutEffect(() => {
    setButtonNavitation();
  }, [navigation]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setButtonNavitation();
  }, [isFavorite]);

  return (
    <Container style={styles.containerPost}>
      <View style={styles.contentPost}>
        <Text style={styles.title}>Description</Text>
        <Text>{post?.description}</Text>
        {profile && (
          <>
            <Text style={styles.title}>User</Text>
            <Text>Name: {profile?.name}</Text>
            <Text>Email: {profile?.email}</Text>
            <Text>Phone: {profile?.phone}</Text>
            <Text>Website: {profile?.website}</Text>
          </>
        )}
      </View>

      <Text style={styles.commentsHeader}>Comments</Text>
      <ListComments comments={comments} />
    </Container>
  );
};
export default PostContainer;
