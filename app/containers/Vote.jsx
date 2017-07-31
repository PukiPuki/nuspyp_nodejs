import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { browserHistory } from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const cardArray = [
  {
    author: "Wong Ding Feng",
    module: "ACC1002",
    title: "12/13 Sem 1 Q10",
    yearSem: "1213SEM1",
    question: "Hi, can someone else help me with this question?",
  },
  {
    author: "E0031263",
    module: "MA1101R",
    title: "15/16 Sem 2 Q5",
    yearSem: "1516Sem2",
    question: "Determine if the following matrices are orthogonal",
  },
  {
    author: "E0031263",
    module: "CS2020",
    title: "14/15SEM2",
    yearSem: "1415SEM2",
    question: "What is the time complexity of the following programs",
  }
]

class Vote extends Component {

  jump = () => {
    browserHistory.push("/modules/ACC1002/12131/597d928961671e6ce820dec7")
  }

  render() {
    
    const style = {
      marginTop: 20,
    }
    
    const Cards = (cardArray) => {
      return cardArray.map((each) => {
        return (
          <Card style={style}>
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
				<h1> Latest Threads</h1>
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
