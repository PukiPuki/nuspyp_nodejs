import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const ThreadItem = ({ thread, router, routeParams }) => {
  console.log("thread");
  console.log(thread._id);

  const handleClick = () => {
    const { moduleCode, yearSem } = routeParams;
    router.push(`/modules/${moduleCode}/${yearSem}/${thread._id}`)
  }

  return (
    <div>
      <Card>
        <CardTitle title={thread.Title} subtitle={thread.Author} onClick={handleClick}/>
      </Card>
    </div>
  );
};

export default ThreadItem
