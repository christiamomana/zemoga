import {
  Content,
  List,
  ListItem,
  Icon,
  Text,
  Left,
  Right,
  View,
} from 'native-base';
import React from 'react';
import {Platform} from 'react-native';
import {colors} from '../../commons/colors';
import {Post} from '../../commons/models';

const Item: React.FC<{item: Post; goToPost: (post: any) => any}> = ({
  item,
  goToPost,
}) => {
  return (
    <ListItem onPress={() => goToPost(item)}>
      <Left>
        <View style={{width: '10%'}}>
          {!item.read && !item.favorite && (
            <Icon name="ellipse" style={{color: colors.blue}} />
          )}
          {item.favorite && <Icon name="star" style={{color: colors.yellow}} />}
        </View>
        <View>
          <Text style={{paddingRight: 30}}>{item.description}</Text>
        </View>
      </Left>
      {Platform.OS === 'ios' && (
        <Right>
          <Icon name="arrow-forward" style={{color: colors.blue}} />
        </Right>
      )}
    </ListItem>
  );
};

const ListPosts: React.FC<{data: Post[]; goToPost: (post: Post) => any}> = ({
  data,
  goToPost,
}) => {
  return (
    <Content>
      <List>
        {data.map((item, key) => (
          <Item key={key} item={item} goToPost={goToPost} />
        ))}
      </List>
    </Content>
  );
};

export default ListPosts;
