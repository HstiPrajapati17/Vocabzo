import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Nav, Spinner } from 'react-bootstrap';
import { Trophy, Medal, Flame, Star, ArrowUp, ArrowDown, Minus, Crown } from 'lucide-react';
import { getLeaderboard } from '../api';

const leagues = ['Bronze', 'Silver', 'Gold', 'Diamond'];

const Leaderboard = ({ navigate, user }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLeague, setActiveLeague] = useState('Silver');
  const [activeTab, setActiveTab] = useState('weekly');

  useEffect(() => {
    getLeaderboard()
      .then(entries => {
        setData(entries);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Mark the current user's entry
  const enriched = data.map(entry => ({
    ...entry,
    isYou: entry.userId === user?.id,
  }));

  const getChangeIcon = (change) => {
    if (change === 'up') return <ArrowUp className="text-success" size={12} />;
    if (change === 'down') return <ArrowDown className="text-danger" size={12} />;
    return <Minus className="text-muted" size={12} />;
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return <Crown className="h_rank_gold" size={20} />;
    if (rank === 2) return <Medal className="h_rank_silver" size={20} />;
    if (rank === 3) return <Medal className="h_rank_bronze" size={20} />;
    return <span className="h_rank_num">{rank}</span>;
  };

  const top3 = enriched.slice(0, 3);
  const userEntry = enriched.find(e => e.isYou);
  const userRank = userEntry ? userEntry.rank : '—';

  return (
    <div className="h_leaderboard_page py-4">
      <Container>
        <div className="text-center mb-5">
          <Trophy size={48} className="text-warning mb-2" />
          <h2 className="fw-bold">Leaderboard</h2>
          <p className="text-muted">Compete with learners worldwide. Top 3 advance to the next league!</p>
        </div>

        <Row className="g-4">
          {/* League Selector */}
          <Col lg={3} className="d-none d-lg-block">
            <Card className="h_league_sidebar border-0 shadow-sm">
              <Card.Body className="p-3">
                <h6 className="fw-bold mb-3">Leagues</h6>
                {leagues.map((league) => (
                  <div
                    key={league}
                    className={`h_league_item d-flex align-items-center gap-2 p-2 mb-1 ${activeLeague === league ? 'h_league_active' : ''}`}
                    onClick={() => setActiveLeague(league)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="h_league_icon">
                      {league === 'Bronze' ? '🥉' : league === 'Silver' ? '🥈' : league === 'Gold' ? '🥇' : '💎'}
                    </span>
                    <span className="h_league_name fw-semibold">{league}</span>
                    {activeLeague === league && <Badge bg="success" className="ms-auto">Current</Badge>}
                  </div>
                ))}
              </Card.Body>
            </Card>

            <Card className="h_your_stats_card mt-3 border-0 shadow-sm">
              <Card.Body className="p-3 text-center">
                <div className="h_your_avatar mb-2">{user?.avatar || '🧑‍💻'}</div>
                <h6 className="fw-bold">{user?.name || 'You'}</h6>
                <div className="text-muted small mb-3">Rank #{userRank} this week</div>
                <Row className="g-2">
                  <Col xs={6}>
                    <div className="h_ys_stat">
                      <Star className="h_icon_xp" size={20} />
                      <div className="fw-bold">{user?.xp || 0}</div>
                      <small className="text-muted">XP</small>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="h_ys_stat">
                      <Flame className="h_icon_fire" size={20} />
                      <div className="fw-bold">{user?.streak || 0}</div>
                      <small className="text-muted">Streak</small>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Main Board */}
          <Col lg={9}>
            <Nav variant="tabs" className="h_lb_tabs mb-4">
              {['weekly', 'monthly', 'alltime'].map((tab) => (
                <Nav.Item key={tab}>
                  <Nav.Link
                    className={`h_lb_tab ${activeTab === tab ? 'h_lb_tab_active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'weekly' ? 'This Week' : tab === 'monthly' ? 'Monthly' : 'All Time'}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="warning" />
                <p className="text-muted mt-2">Loading leaderboard...</p>
              </div>
            ) : (
              <>
                {/* Podium */}
                {top3.length >= 3 && (
                  <Row className="g-2 mb-4 justify-content-center">
                    {[top3[1], top3[0], top3[2]].map((entry, i) => {
                      const heights = ['h_pod_2nd', 'h_pod_1st', 'h_pod_3rd'];
                      return (
                        <Col xs={4} key={i}>
                          <div className={`h_podium_item text-center ${heights[i]} ${entry.isYou ? 'h_podium_you' : ''}`}>
                            <div className="h_pod_avatar mb-1">{entry.avatar}</div>
                            <div className="h_pod_name fw-bold small">{entry.name.split(' ')[0]}</div>
                            <div className="h_pod_xp text-muted small">{entry.xp} XP</div>
                            <div className="h_pod_rank_badge">{getRankBadge(entry.rank)}</div>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                )}

                {/* Full List */}
                <Card className="h_lb_list_card border-0 shadow-sm">
                  <Card.Body className="p-0">
                    {enriched.map((entry) => (
                      <div
                        key={entry.id}
                        className={`h_lb_entry d-flex align-items-center gap-3 p-3
                          ${entry.isYou ? 'h_lb_you_row' : ''}
                          ${entry.rank <= 3 ? 'h_lb_top3' : ''}`}
                      >
                        <div className="h_lb_rank_cell text-center" style={{ minWidth: 32 }}>
                          {getRankBadge(entry.rank)}
                        </div>
                        <div className="h_lb_avatar">{entry.avatar}</div>
                        <div className="flex-grow-1">
                          <div className="h_lb_name fw-semibold">
                            {entry.name}
                            {entry.isYou && <Badge bg="success" className="ms-2 small">You</Badge>}
                          </div>
                          <div className="d-flex align-items-center gap-2 mt-1">
                            <span className="h_lb_lang small">{entry.language}</span>
                            <span className="text-muted small">
                              <Flame className="h_icon_fire_sm" size={14} /> {entry.streak} day streak
                            </span>
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="h_lb_xp_count fw-bold">{entry.xp} <Star className="h_icon_xp_sm" size={14} /></div>
                          <div className="h_change_icon">{getChangeIcon(entry.change)}</div>
                        </div>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Leaderboard;
