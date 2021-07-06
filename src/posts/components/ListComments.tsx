import {List, ListItem, Text} from 'native-base';
import React from 'react';
import {Comments} from '../../commons/models';

const Item: React.FC<{item: Comments}> = ({item}) => {
  return (
    <ListItem last>
      <Text style={{paddingRight: 30}}>{item.body}</Text>
    </ListItem>
  );
};

const ListComments: React.FC<{comments: Comments[]}> = ({comments}) => {
  return (
    <List>
      {comments.map((item, key) => (
        <Item key={key} item={item} />
      ))}
    </List>
  );
};

export default ListComments;
