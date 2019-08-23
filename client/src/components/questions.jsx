import React from "react";
import { useSelector } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import ScrollingQuestions from "components/scrolling-questions";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#1B6A9C" },
  },
  typography: { useNextVariants: true },
});

const Questions = ({ height, onSelected }) => {
  const mentor = useSelector(
    state => state.mentors_by_id[state.current_mentor]
  );
  const current_topic = useSelector(state => state.current_topic);
  const questions_asked = useSelector(state => state.questions_asked);

  if (!(mentor && current_topic && mentor.topic_questions)) {
    return <div />;
  }

  const questions = mentor.topic_questions[current_topic] || [];
  const recommended = mentor.topic_questions.Recommended || [];

  const ordered_questions = questions.slice();
  if (current_topic === "History") {
    ordered_questions.reverse();
  } else {
    ordered_questions.sort((a, b) => {
      if (recommended.includes(a) && recommended.includes(b)) {
        return ordered_questions.indexOf(a) - ordered_questions.indexOf(b);
      }
      if (recommended.includes(a)) {
        return -1;
      }
      if (recommended.includes(b)) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <MuiThemeProvider theme={theme}>
      <ScrollingQuestions
        height={height}
        questions={ordered_questions}
        questions_asked={questions_asked}
        recommended={recommended}
        onQuestionSelected={onSelected}
      />
    </MuiThemeProvider>
  );
};

export default Questions;
