import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Globe, Users, Lightbulb, Heart, Rocket, Award, ArrowRight, Star, Handshake, Target, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  const stats = [
    { value: '500M+', label: 'Learners Worldwide', icon: <Globe size={24} />, color: '#667eea' },
    { value: '30+', label: 'Languages Available', icon: <Users size={24} />, color: '#f093fb' },
    { value: '4.9', label: 'App Rating', icon: <Star size={24} />, color: '#f5576c' },
    { value: '100M', label: 'Lessons Completed', icon: <Zap size={24} />, color: '#4facfe' },
  ];

  const features = [
    {
      icon: <Globe size={32} />,
      title: '12+ Languages',
      desc: 'Learn from a diverse selection of world languages with native speaker audio and cultural insights.',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: <Users size={32} />,
      title: 'Community Driven',
      desc: 'Connect with fellow learners and native speakers through our global community features.',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: <Lightbulb size={32} />,
      title: 'Smart Learning',
      desc: 'AI-powered lessons that adapt to your progress and learning style for optimal results.',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: <Heart size={32} />,
      title: 'Gamified Experience',
      desc: 'Earn points, streaks, and achievements as you learn to keep you motivated.',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      icon: <Rocket size={32} />,
      title: 'Quick Progress',
      desc: 'See measurable improvement in weeks, not years with our proven methodology.',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      icon: <Award size={32} />,
      title: 'Certified Courses',
      desc: 'Industry-recognized curriculum and assessments to validate your skills.',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
  ];

  const values = [
    { title: 'Accessibility', desc: 'Language learning should be available to everyone, regardless of background or budget.', icon: '♿', color: '#667eea' },
    { title: 'Quality', desc: 'We maintain the highest standards in content creation and educational methodology.', icon: '✓', color: '#f093fb' },
    { title: 'Innovation', desc: 'Continuously improving our platform with the latest in educational technology.', icon: '💡', color: '#4facfe' },
    { title: 'Community', desc: 'Building a supportive global network of language enthusiasts.', icon: '🤝', color: '#43e97b' },
  ];

  const timeline = [
    { year: '2024', title: 'Founded', desc: 'VocabLearn was born with a mission to make language learning accessible to all.' },
    { year: '2024', title: '1M Users', desc: 'Reached our first million users milestone within months of launch.' },
    { year: '2025', title: '30 Languages', desc: 'Expanded our language offerings to 30+ languages with native content.' },
    { year: '2025', title: '500M Learners', desc: 'Crossed half a billion learners worldwide, becoming a global leader.' },
  ];

  return (
    <div className="info-page about-page">
      {/* Hero Section */}
      <section className="info-hero about-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="hero-content">
              <div className="hero-badge">
                <Globe size={16} /> About VocabLearn
              </div>
              <h1 className="hero-title">
                Empowering <span className="gradient-text">language learners</span> worldwide
              </h1>
              <p className="hero-desc">
                At VocabLearn, we believe that language learning should be a joyful journey, not a tedious task. 
                Our platform combines cutting-edge technology with proven pedagogical methods to create 
                an immersive learning experience that adapts to your unique learning style and pace.
              </p>
              <div className="hero-actions">
                <Button className="btn-primary-custom" onClick={() => navigate('/signup')}>
                  Start Learning Now <ArrowRight className="ms-2" size={18} />
                </Button>
                <Button className="btn-outline-custom" onClick={() => navigate('/help')}>
                  Learn More
                </Button>
              </div>
            </Col>
            <Col lg={6} className="hero-visual">
              <div className="hero-card-stack">
                <div className="hero-card hero-card-1">
                  <div className="hero-card-icon">
                    <Target size={40} />
                  </div>
                  <h3>Our Mission</h3>
                  <p>Make language learning accessible, enjoyable, and effective for everyone.</p>
                </div>
                <div className="hero-card hero-card-2">
                  <div className="hero-card-icon">
                    <Rocket size={40} />
                  </div>
                  <h3>Our Vision</h3>
                  <p>A world where language barriers no longer limit human connection.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="info-stats">
        <Container>
          <Row className="g-4">
            {stats.map((stat, i) => (
              <Col xs={6} md={3} key={i}>
                <div className="stat-card" style={{ '--accent-color': stat.color }}>
                  <div className="stat-icon" style={{ background: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="info-features">
        <Container>
          <div className="section-header">
            <h2 className="section-title">What We Offer</h2>
            <p className="section-desc">Comprehensive language learning solutions designed for success</p>
          </div>
          <Row className="g-4">
            {features.map((feature, i) => (
              <Col xs={12} sm={6} lg={4} key={i}>
                <div className="feature-card" style={{ '--card-gradient': feature.gradient }}>
                  <div className="feature-icon-wrapper" style={{ background: feature.gradient }}>
                    {feature.icon}
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-desc">{feature.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="info-timeline">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-desc">Key milestones in our growth story</p>
          </div>
          <div className="timeline-wrapper">
            {timeline.map((item, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="info-values">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Our Values</h2>
            <p className="section-desc">The principles that guide everything we do</p>
          </div>
          <Row className="g-4">
            {values.map((value, i) => (
              <Col xs={12} sm={6} lg={6} key={i}>
                <div className="value-card" style={{ '--value-color': value.color }}>
                  <div className="value-icon" style={{ background: value.color }}>
                    {value.icon}
                  </div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-desc">{value.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="info-cta">
        <Container>
          <div className="cta-content">
            <div className="cta-icon">
              <Handshake size={50} />
            </div>
            <h2 className="cta-title">Ready to Start Your Journey?</h2>
            <p className="cta-desc">Join millions of learners and unlock new opportunities through language mastery.</p>
            <Button className="btn-primary-custom btn-lg" onClick={() => navigate('/signup')}>
              Get Started for Free <ArrowRight className="ms-2" size={18} />
            </Button>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="info-contact">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="contact-card">
                <h3>Contact Us</h3>
                <p>Have questions, suggestions, or just want to say hello? Reach out to our team!</p>
                <div className="contact-info">
                  <div className="contact-item">
                    <strong>Email:</strong> support@vocab.com
                  </div>
                  <div className="contact-item">
                    <strong>Address:</strong> 123 Learning Street, Education City, EC 12345
                  </div>
                  <div className="contact-item">
                    <strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AboutUs;
