import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Badge, Spinner } from 'react-bootstrap';
import {
  Heart, CheckCircle, XCircle, ArrowLeft, Star,
} from 'lucide-react';
import { getQuestionsByLesson, updateUser, updateLeaderboard } from '../api';

const LessonPage = ({ navigate, user, lessonId, refreshUser }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [hearts, setHearts] = useState(user?.hearts ?? 5);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  useEffect(() => {
    const id = lessonId || 1;
    getQuestionsByLesson(id)
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [lessonId]);

  const q = questions[current];
  const progress = questions.length > 0 ? Math.round((current / questions.length) * 100) : 0;

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
  };

  const handleCheck = () => {
    if (selected === null) return;
    const correct = selected === q.correct;
    setIsCorrect(correct);
    setAnswered(true);
    setShowFeedback(true);
    if (correct) {
      setScore(s => s + 1);
      setEarnedXP(xp => xp + 10);
    } else {
      setHearts(h => Math.max(0, h - 1));
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelected(null);
    setAnswered(false);
    if (current + 1 >= questions.length) {
      setShowResult(true);
      saveProgress();
    } else {
      setCurrent(c => c + 1);
    }
  };

  const saveProgress = async () => {
    if (!user?.id) return;
    const passed = score >= Math.ceil(questions.length * 0.6);
    if (!passed) return;

    const completedLessons = user.completedLessons || [];
    const alreadyDone = completedLessons.includes(lessonId);
    if (alreadyDone) return;

    const newCompleted = [...completedLessons, lessonId];
    const newXP = (user.xp || 0) + earnedXP + 10;
    const newStreak = (user.streak || 0) + (user.streak === 0 ? 1 : 0);
    const nextActive = lessonId + 1;

    const updates = {
      completedLessons: newCompleted,
      xp: newXP,
      streak: newStreak,
      hearts,
      activeLesson: nextActive,
    };

    try {
      const updatedUser = await updateUser(user.id, updates);
      await updateLeaderboard(user.id, newXP, newStreak);
      refreshUser(updatedUser);
    } catch (err) {
      console.error('Failed to save progress:', err);
    }
  };

  const resetLesson = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setEarnedXP(0);
    setShowResult(false);
    setHearts(5);
    setShowFeedback(false);
  };

  if (loading) {
    return (
      <div className="h_lesson_page d-flex align-items-center justify-content-center py-5">
        <div className="text-center">
          <Spinner animation="border" variant="success" />
          <p className="text-muted mt-2">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="h_lesson_page d-flex align-items-center justify-content-center py-5">
        <div className="text-center">
          <div style={{ fontSize: '4rem' }}>📭</div>
          <h4 className="fw-bold mt-3">No questions yet</h4>
          <p className="text-muted">This lesson doesn't have questions yet.</p>
          <Button className="h_btn_get_started fw-bold mt-2" onClick={() => navigate('dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Out of hearts
  if (hearts === 0 && !showResult) {
    return (
      <div className="h_lesson_page d-flex align-items-center justify-content-center py-5">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={7} lg={5} className="text-center">
              <div className="h_out_of_hearts">
                <div className="h_no_hearts_icon mb-3">💔</div>
                <h3 className="fw-bold mb-2">Out of Hearts!</h3>
                <p className="text-muted mb-4">You ran out of hearts. Try again to keep practicing!</p>
                <Button className="h_btn_get_started fw-bold me-3 mb-2" onClick={() => navigate('dashboard')}>
                  Back to Dashboard
                </Button>
                <Button variant="outline-success" className="mb-2" onClick={resetLesson}>
                  Try Again
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  // Results screen
  if (showResult) {
    const passed = score >= Math.ceil(questions.length * 0.6);
    return (
      <div className="h_lesson_page d-flex align-items-center justify-content-center py-5">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={7} lg={5}>
              <Card className="h_result_card text-center border-0 shadow-lg">
                <Card.Body className="p-5">
                  <div className="h_result_emoji mb-3">{passed ? '🎉' : '😔'}</div>
                  <h2 className="fw-bold mb-1">{passed ? 'Lesson Complete!' : 'Keep Practicing!'}</h2>
                  <p className="text-muted mb-4">
                    {passed ? "Great job! You've passed this lesson." : 'You need 60% to pass. Try again!'}
                  </p>
                  <Row className="g-3 mb-4">
                    <Col xs={4}>
                      <div className="h_result_stat">
                        <Star className="h_icon_xp mb-1" size={24} />
                        <div className="h_result_value">+{earnedXP}</div>
                        <div className="h_result_label small text-muted">XP Earned</div>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="h_result_stat">
                        <CheckCircle className="text-success mb-1" size={24} />
                        <div className="h_result_value">{score}/{questions.length}</div>
                        <div className="h_result_label small text-muted">Correct</div>
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="h_result_stat">
                        <Heart className="h_icon_heart mb-1" size={24} />
                        <div className="h_result_value">{hearts}</div>
                        <div className="h_result_label small text-muted">Hearts Left</div>
                      </div>
                    </Col>
                  </Row>
                  {passed && (
                    <div className="h_xp_animation mb-4">
                      <Badge className="h_xp_reward_badge">+{earnedXP} XP</Badge>
                      <Badge className="h_streak_reward_badge ms-2">🔥 Keep it up!</Badge>
                    </div>
                  )}
                  <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
                    <Button className="h_btn_get_started fw-bold" onClick={() => navigate('dashboard')}>
                      Continue Learning
                    </Button>
                    {!passed && (
                      <Button variant="outline-success" onClick={resetLesson}>
                        Try Again
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="h_lesson_page py-4">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8} xl={7}>
            {/* Header */}
            <div className="h_lesson_header d-flex align-items-center gap-3 mb-4">
              <Button variant="outline-secondary" size="sm" className="h_back_btn" onClick={() => navigate('dashboard')}>
                <ArrowLeft size={16} />
              </Button>
              <ProgressBar now={progress} className="h_lesson_progress flex-grow-1" />
              <div className="h_hearts_row d-flex gap-1">
                {Array(5).fill(0).map((_, i) => (
                  <Heart key={i} size={18} className={i < hearts ? 'h_icon_heart' : 'h_icon_heart_empty'} />
                ))}
              </div>
            </div>

            {/* Question Card */}
            <Card className="h_question_card border-0 shadow mb-4">
              <Card.Body className="p-4">
                <div className="h_question_meta d-flex align-items-center gap-2 mb-3">
                  <Badge className="h_type_badge text-capitalize">{q.type.replace('-', ' ')}</Badge>
                  <span className="text-muted small">Question {current + 1} of {questions.length}</span>
                </div>
                <h4 className="h_question_text mb-4">{q.question}</h4>
                <div className="h_options_grid">
                  {q.options.map((opt, i) => (
                    <button
                      key={i}
                      className={`h_option_btn w-100 mb-2
                        ${selected === i ? 'h_option_selected' : ''}
                        ${answered && i === q.correct ? 'h_option_correct' : ''}
                        ${answered && selected === i && i !== q.correct ? 'h_option_wrong' : ''}`}
                      onClick={() => handleSelect(i)}
                      disabled={answered}
                    >
                      <span className="h_option_letter">{String.fromCharCode(65 + i)}</span>
                      {opt}
                      {answered && i === q.correct && <CheckCircle className="ms-auto h_opt_icon text-success" size={20} />}
                      {answered && selected === i && i !== q.correct && <XCircle className="ms-auto h_opt_icon text-danger" size={20} />}
                    </button>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Feedback */}
            {showFeedback && (
              <div className={`h_feedback_bar mb-4 ${isCorrect ? 'h_feedback_correct' : 'h_feedback_wrong'}`}>
                <div className="d-flex align-items-center gap-2 mb-1">
                  {isCorrect
                    ? <><CheckCircle size={20} /> <strong>Correct! +10 XP</strong></>
                    : <><XCircle size={20} /> <strong>Incorrect</strong></>
                  }
                </div>
                <p className="mb-0 small">{q.explanation}</p>
              </div>
            )}

            {/* Action Button */}
            <div className="text-center">
              {!answered ? (
                <Button
                  className={`h_btn_check fw-bold px-5 py-2 ${selected === null ? 'h_btn_disabled' : ''}`}
                  onClick={handleCheck}
                  disabled={selected === null}
                >
                  Check Answer
                </Button>
              ) : (
                <Button className="h_btn_next fw-bold px-5 py-2" onClick={handleNext}>
                  {current + 1 >= questions.length ? 'See Results' : 'Next Question'}
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LessonPage;
