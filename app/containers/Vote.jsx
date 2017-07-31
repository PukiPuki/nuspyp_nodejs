import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { browserHistory } from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const cardArray = [
  {
    author: "Mirana Arrow",
    module: "MA1234",
    title: "What does this mean?",
    yearSem: "1213SEM1",
    question: "Find the area bounded by  x4+y4=4(x2+y2)  x4+y4=4(x2+y2)",
  },
  {
    author: "Mirana Arrow",
    module: "MA1234",
    title: "What does this mean?",
    yearSem: "1213SEM1",
    question: "Find the area bounded by  x4+y4=4(x2+y2)  x4+y4=4(x2+y2)",
  },
  {
    author: "Mirana Arrow",
    module: "MA1234",
    title: "What does this mean?",
    yearSem: "1213SEM1",
    question: "Find the area bounded by  x4+y4=4(x2+y2)  x4+y4=4(x2+y2)",
  },
  {
    author: "Mirana Arrow",
    module: "MA1234",
    title: "What does this mean?",
    yearSem: "1213SEM1",
    question: "Find the area bounded by  x4+y4=4(x2+y2)  x4+y4=4(x2+y2)",
  },
]

class Vote extends Component {

  jump = () => {
    browserHistory.push("/modules/ACC1002/12131/597d928961671e6ce820dec7")
  }

  render() {
    
    const Cards = (cardArray) => {
      return cardArray.map((each) => {
        return (
          <Card>
            <CardHeader
              title={each.author}
              subtitle={each.module}
              onTouchTap={this.jump}
            />
            <CardMedia
              overlay={<CardTitle title={each.title} subtitle={each.yearSem} />}
              onTouchTap={this.jump}
            >
              <img src="https://image.slidesharecdn.com/modeltestpaperofjurisprudence-130613153937-phpapp01/95/model-test-paper-of-jurisprudence-1-638.jpg?cb=1371138004" alt="" height="100"/>
            </CardMedia>
            <CardText>
              {each.question}
            </CardText>
            <CardActions>
              <FlatButton label="Comment" />
              <FlatButton label="Like" />
            </CardActions>
          </Card>
        )
      })
    }

    return (
      <div>
        {Cards(cardArray)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    topics: state.topic.topics,
    newTopic: state.topic.newTopic
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Vote);
