import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar, Badge, Spinner } from 'react-bootstrap';
import {
  Flame, Heart, Star, Trophy, Lock,
  CheckCircle, PlayCircle, Globe, Medal
} from 'lucide-react';
import { getLessons } from '../api';

const unitMeta = [
  { id: 1, title: 'Unit 1: Basics', color: '#58cc02' },
  { id: 2, title: 'Unit 2: Phrases', color: '#1cb0f6' },
  { id: 3, title: 'Unit 3: Conversations', color: '#ff9600' },
];

const achievements = [
  { icon: '🔥', label: '7-Day Streak', earned: true },
  { icon: '⭐', label: 'First Lesson', earned: true },
  { icon: '🏆', label: 'Top 10', earned: false },
  { icon: '💎', label: '100 XP', earned: true },
];

const Dashboard = ({ navigate, user, refreshUser }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLessons(user?.language || 'Spanish')
      .then(data => {
        setLessons(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.language]);

  const completedLessons = user?.completedLessons || [];
  const activeLesson = user?.activeLesson || 1;

  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;
  const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const handleLessonClick = (lesson) => {
    const isCompleted = completedLessons.includes(lesson.id);
    const isActive = lesson.id === activeLesson;
    const isLocked = !isCompleted && !isActive;
    if (isLocked) return;
    navigate('lesson', { lessonId: lesson.id });
  };

  // Group lessons by unit
  const unitGroups = unitMeta.map(unit => ({
    ...unit,
    lessons: lessons.filter(l => l.unitId === unit.id),
  }));

  const dailyGoalXP = { Casual: 10, Regular: 20, Serious: 30, Intense: 50 };
  const goalMax = dailyGoalXP[user?.dailyGoal] || 20;
  const todayXP = Math.min(user?.xp % 100 || 0, goalMax);

  return (
    <div className="h_dashboard_page py-4">
      <Container fluid="xl">
        <Row className="g-4">
          {/* Left Sidebar */}
          <Col lg={3} className="d-none d-lg-block">
            <div className="h_sidebar_sticky">
              <Card className="h_user_card mb-3 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="h_user_avatar mb-2">{user?.avatar || '🧑‍💻'}</div>
                  <h6 className="fw-bold mb-1">{user?.name || 'Learner'}</h6>
                  <Badge className="h_lang_badge mb-3">
                    <Globe className="me-1" size={16} /> {user?.language || 'Spanish'}
                  </Badge>
                  <div className="h_user_stats d-flex justify-content-around">
                    <div className="text-center">
                      <Flame className="h_icon_fire" size={20} />
                      <div className="h_mini_stat">{user?.streak || 0}</div>
                      <div className="h_mini_label">Streak</div>
                    </div>
                    <div className="text-center">
                      <Star className="h_icon_xp" size={20} />
                      <div className="h_mini_stat">{user?.xp || 0}</div>
                      <div className="h_mini_label">XP</div>
                    </div>
                    <div className="text-center">
                      <Heart className="h_icon_heart" size={20} />
                      <div className="h_mini_stat">{user?.hearts ?? 5}</div>
                      <div className="h_mini_label">Hearts</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              <Card className="h_goal_card_widget mb-3 border-0 shadow-sm">
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold small">Daily Goal</span>
                    <span className="text-muted small">{todayXP} / {goalMax} XP</span>
                  </div>
                  <ProgressBar now={goalMax > 0 ? (todayXP / goalMax) * 100 : 0} className="h_goal_bar" />
                </Card.Body>
              </Card>

              <Card className="h_achievements_widget border-0 shadow-sm">
                <Card.Body className="p-3">
                  <h6 className="fw-bold mb-3">Achievements</h6>
                  <Row className="g-2">
                    {achievements.map((a, i) => (
                      <Col xs={6} key={i}>
                        <div className={`h_achievement_item text-center p-2 ${!a.earned ? 'h_achievement_locked' : ''}`}>
                          <div className="h_achievement_icon">{a.icon}</div>
                          <div className="h_achievement_label small">{a.label}</div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </Col>

          {/* Main Learning Path */}
          <Col lg={6}>
            {/* Mobile Stats */}
            <Row className="d-lg-none g-2 mb-4">
              {[
                { icon: <Flame className="h_icon_fire" size={20} />, val: user?.streak || 0, lbl: 'Streak' },
                { icon: <Star className="h_icon_xp" size={20} />, val: user?.xp || 0, lbl: 'XP' },
                { icon: <Heart className="h_icon_heart" size={20} />, val: user?.hearts ?? 5, lbl: 'Hearts' },
                { icon: <Medal className="text-warning" size={20} />, val: `${progress}%`, lbl: 'Done' },
              ].map((s, i) => (
                <Col xs={3} key={i}>
                  <div className="h_mobile_stat_card text-center">
                    {s.icon}
                    <div className="fw-bold">{s.val}</div>
                    <small className="text-muted">{s.lbl}</small>
                  </div>
                </Col>
              ))}
            </Row>

            {/* Course Progress */}
            <Card className="h_progress_card mb-4 border-0 shadow-sm">
              <Card.Body className="p-3 p-md-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold mb-0">{user?.language || 'Spanish'} — {user?.level || 'Beginner'}</h6>
                  <span className="text-muted small">{completedCount}/{totalLessons} lessons</span>
                </div>
                <ProgressBar now={progress} className="h_course_bar" label={`${progress}%`} />
              </Card.Body>
            </Card>

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="success" />
                <p className="text-muted mt-2 small">Loading lessons...</p>
              </div>
            ) : (
              unitGroups.map((unit) => (
                <div key={unit.id} className="h_unit_block mb-4">
                  <div className="h_unit_header d-flex align-items-center gap-2 mb-3">
                    <div className="h_unit_dot" style={{ background: unit.color }}></div>
                    <h6 className="fw-bold mb-0">{unit.title}</h6>
                  </div>
                  <Row className="g-2">
                    {unit.lessons.map((lesson) => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      const isActive = lesson.id === activeLesson;
                      const isLocked = !isCompleted && !isActive;
                      return (
                        <Col xs={12} sm={6} key={lesson.id}>
                          <Card
                            className={`h_lesson_card border-0 shadow-sm
                              ${isCompleted ? 'h_lesson_done' : ''}
                              ${isActive ? 'h_lesson_active' : ''}
                              ${isLocked ? 'h_lesson_locked' : ''}`}
                            onClick={() => handleLessonClick(lesson)}
                            style={{ cursor: isLocked ? 'not-allowed' : 'pointer' }}
                          >
                            <Card.Body className="d-flex align-items-center gap-3 p-3">
                              <div className="h_lesson_icon_wrap">
                                {isLocked ? (
                                  <Lock className="text-muted" size={20} />
                                ) : isCompleted ? (
                                  <CheckCircle className="text-success" size={20} />
                                ) : isActive ? (
                                  <PlayCircle className="text-primary" size={20} />
                                ) : (
                                  <span className="h_lesson_emoji">{lesson.icon}</span>
                                )}
                              </div>
                              <div className="flex-grow-1">
                                <div className="h_lesson_title fw-semibold">{lesson.title}</div>
                                <div className="h_lesson_type text-muted small text-capitalize">{lesson.type}</div>
                              </div>
                              <Badge className={`h_xp_badge ${isCompleted ? 'h_xp_earned' : isLocked ? 'h_xp_locked' : 'h_xp_pending'}`}>
                                +{lesson.xp} XP
                              </Badge>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              ))
            )}
          </Col>

          {/* Right Sidebar */}
          <Col lg={3} className="d-none d-lg-block">
            <div className="h_sidebar_sticky">
              <Card className="h_leaderboard_preview mb-3 border-0 shadow-sm">
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold mb-0"><Trophy className="text-warning me-1" size={16} /> League</h6>
                    <span className="text-success small fw-semibold" style={{ cursor: 'pointer' }} onClick={() => navigate('leaderboard')}>
                      View All
                    </span>
                  </div>
                  {[
                    { rank: 1, name: 'Maria S.', xp: 1240, you: false },
                    { rank: 2, name: user?.name?.split(' ')[0] || 'You', xp: user?.xp || 0, you: true },
                    { rank: 3, name: 'James K.', xp: 290, you: false },
                    { rank: 4, name: 'Priya R.', xp: 250, you: false },
                  ].map((entry) => (
                    <div key={entry.rank} className={`h_lb_row d-flex align-items-center gap-2 py-2 ${entry.you ? 'h_lb_you' : ''}`}>
                      <span className="h_lb_rank fw-bold">{entry.rank}</span>
                      <span className="h_lb_name flex-grow-1">{entry.name}</span>
                      <span className="h_lb_xp text-muted small">{entry.xp} XP</span>
                    </div>
                  ))}
                </Card.Body>
              </Card>

              <Card className="h_streak_card text-center border-0 shadow-sm mb-3">
                <Card.Body className="p-4">
                  <Flame size={40} className="h_big_fire mb-2" />
                  <h4 className="fw-bold">{user?.streak || 0} Day Streak</h4>
                  <p className="text-muted small mb-0">
                    {user?.streak > 0
                      ? 'Keep going! Come back tomorrow to keep your streak alive.'
                      : 'Complete a lesson today to start your streak!'}
                  </p>
                </Card.Body>
              </Card>

              <Card className="h_hearts_card text-center border-0 shadow-sm">
                <Card.Body className="p-3">
                  <h6 className="fw-bold mb-2">Hearts</h6>
                  <div className="h_hearts_display mb-2">
                    {Array(5).fill(0).map((_, i) => (
                      <Heart key={i} className={i < (user?.hearts ?? 5) ? 'h_icon_heart' : 'h_icon_heart_empty'} size={22} />
                    ))}
                  </div>
                  <p className="text-muted small mb-0">Wrong answers cost a heart. Practice to restore them.</p>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
