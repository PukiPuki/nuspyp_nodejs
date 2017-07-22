import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const ThreadItem = ({ thread }) => {
  console.log("thread");
  console.log(thread._id);
  return (
    <div>
      <Card>
        <CardTitle title={thread.Title} subtitle={thread.Author} />
      </Card>
    </div>
  );
};

export default ThreadItem
