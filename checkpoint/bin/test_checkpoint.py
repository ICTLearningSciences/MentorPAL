#!/usr/bin/env python
import os
from mentorpal.mentor import Mentor
from mentorpal.metrics import Metrics
from mentorpal.classifiers.lstm_v1.train import TrainLSTMClassifier

CHECKPOINT = os.getenv('CHECKPOINT')
MENTOR = os.getenv('MENTOR')
TEST_SET = os.getenv("TEST_SET")

classifier = TrainLSTMClassifier(MENTOR, CHECKPOINT)

metrics = Metrics()
accuracy = metrics.test_accuracy(classifier, TEST_SET)

print('CHECKPOINT {0}'.format(CHECKPOINT))
print('MENTOR {0}'.format(MENTOR))
print('ACCURACY: {0}'.format(accuracy))