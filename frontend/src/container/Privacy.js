import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Shield, Database, Eye, Lock, UserCog, CheckCircle, ArrowRight, Globe, Server, Cookie } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FaUserSecret } from 'react-icons/fa6';

const Privacy = () => {
  const navigate = useNavigate();

  const privacyStats = [
    { value: 'AES-256', label: 'Encryption', icon: <Lock size={24} />, color: '#11998e' },
    { value: 'GDPR', label: 'Compliant', icon: <CheckCircle size={24} />, color: '#38ef7d' },
    { value: '100%', label: 'Data Control', icon: <UserCog size={24} />, color: '#00b894' },
    { value: '24/7', label: 'Monitoring', icon: <Shield size={24} />, color: '#00cec9' },
  ];

  const infoSections = [
    { 
      icon: <FaUserSecret size={32} />, 
      title: 'Personal Information', 
      desc: 'We collect information you provide directly, such as your name, email address, and profile picture when you create an account.',
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
    },
    { 
      icon: <Database size={32} />, 
      title: 'Learning Data', 
      desc: 'We collect data about your learning progress, including completed lessons, quiz scores, practice time, and language preferences.',
      gradient: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)'
    },
    { 
      icon: <Eye size={32} />, 
      title: 'Usage Information', 
      desc: 'We automatically collect information about how you use our service, including pages visited, features used, time spent, and device information.',
      gradient: 'linear-gradient(135deg, #0984e3 0%, #74b9ff 100%)'
    },
    { 
      icon: <Cookie size={32} />, 
      title: 'Cookies and Tracking', 
      desc: 'We use cookies and similar technologies to enhance your experience, remember your preferences, and analyze usage patterns.',
      gradient: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)'
    },
  ];

  const usageSections = [
    { title: 'Service Provision', desc: 'We use your information to provide, maintain, and improve our language learning services. This includes personalizing lessons, tracking progress, and delivering content tailored to your learning level and preferences.', icon: '🎯' },
    { title: 'Communication', desc: 'We may use your contact information to send you important updates about your account, service changes, learning tips, and promotional materials. You can opt out of marketing communications at any time.', icon: '📧' },
    { title: 'Analytics and Improvement', desc: 'We analyze usage data to understand how users interact with our platform, identify popular features, and areas for improvement. This helps us enhance the overall user experience and develop new features.', icon: '📊' },
    { title: 'Security and Fraud Prevention', desc: 'We use your information to detect and prevent fraudulent activity, protect against unauthorized access, and ensure the security of our platform and all users.', icon: '🔒' },
  ];

  const protectionSections = [
    { icon: <Shield size={32} />, title: 'Security Measures', desc: 'We implement industry-standard security measures to protect your information, including encryption, secure servers, regular security audits, and access controls.', color: '#11998e' },
    { icon: <UserCog size={32} />, title: 'Your Rights', desc: 'You have the right to access, correct, or delete your personal information. You can also object to processing of your data and request data portability.', color: '#38ef7d' },
    { icon: <Lock size={32} />, title: 'Data Retention', desc: 'We retain your information only as long as necessary to provide our services and comply with legal obligations. When you delete your account, we will delete or anonymize your personal information.', color: '#00b894' },
  ];

  const thirdPartyServices = [
    { name: 'Cloud Hosting', desc: 'Secure data storage and processing', icon: <Server size={24} />, color: '#0984e3' },
    { name: 'Analytics', desc: 'Usage tracking and insights', icon: <Database size={24} />, color: '#6c5ce7' },
    { name: 'Payment Processing', desc: 'Secure payment transactions', icon: <Lock size={24} />, color: '#00b894' },
    { name: 'Email Services', desc: 'Communication delivery', icon: <Globe size={24} />, color: '#e17055' },
  ];

  return (
    <div className="info-page privacy-page">
      {/* Hero Section */}
      <section className="info-hero privacy-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="hero-content">
              <div className="hero-badge">
                <Shield size={16} /> Privacy Policy
              </div>
              <h1 className="hero-title">
                Your privacy is our <span className="gradient-text">priority</span>
              </h1>
              <p className="hero-desc">
                At VocabLearn, we are committed to protecting your personal information and respecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our language learning platform.
              </p>
              <div className="hero-actions">
                <Button className="btn-primary-custom" onClick={() => navigate('/signup')}>
                  Start Learning Now <ArrowRight className="ms-2" size={18} />
                </Button>
                <Button className="btn-outline-custom">
                  Download Policy
                </Button>
              </div>
            </Col>
            <Col lg={6} className="hero-visual">
              <div className="privacy-shield">
                <Shield size={120} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Privacy Stats */}
      <section className="privacy-stats">
        <Container>
          <Row className="g-4">
            {privacyStats.map((stat, i) => (
              <Col xs={6} md={3} key={i}>
                <div className="privacy-stat-card" style={{ '--stat-color': stat.color }}>
                  <div className="privacy-stat-icon" style={{ background: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="privacy-stat-value">{stat.value}</div>
                  <div className="privacy-stat-label">{stat.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Information We Collect */}
      <section className="privacy-info">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Information We Collect</h2>
            <p className="section-desc">Types of data we gather to provide our services</p>
          </div>
          <Row className="g-4">
            {infoSections.map((section, i) => (
              <Col xs={12} sm={6} lg={3} key={i}>
                <div className="privacy-info-card" style={{ '--card-gradient': section.gradient }}>
                  <div className="privacy-info-icon-wrapper" style={{ background: section.gradient }}>
                    {section.icon}
                  </div>
                  <h3 className="privacy-info-title">{section.title}</h3>
                  <p className="privacy-info-desc">{section.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How We Use Your Information */}
      <section className="privacy-usage">
        <Container>
          <div className="section-header">
            <h2 className="section-title">How We Use Your Information</h2>
            <p className="section-desc">Purpose of data collection and usage</p>
          </div>
          <Row className="g-4">
            {usageSections.map((section, i) => (
              <Col xs={12} sm={6} lg={6} key={i}>
                <div className="privacy-usage-card">
                  <div className="privacy-usage-icon">{section.icon}</div>
                  <h3 className="privacy-usage-title">{section.title}</h3>
                  <p className="privacy-usage-desc">{section.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Data Protection */}
      <section className="privacy-protection">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Data Protection</h2>
            <p className="section-desc">How we safeguard your information</p>
          </div>
          <Row className="g-4">
            {protectionSections.map((section, i) => (
              <Col xs={12} sm={6} lg={4} key={i}>
                <div className="privacy-protection-card" style={{ '--protection-color': section.color }}>
                  <div className="privacy-protection-icon" style={{ background: section.color }}>
                    {section.icon}
                  </div>
                  <h3 className="privacy-protection-title">{section.title}</h3>
                  <p className="privacy-protection-desc">{section.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Third-Party Services */}
      <section className="privacy-third-party">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Third-Party Services</h2>
            <p className="section-desc">Services we use to operate our platform</p>
          </div>
          <Row className="g-4">
            {thirdPartyServices.map((service, i) => (
              <Col xs={12} sm={6} lg={3} key={i}>
                <div className="third-party-card" style={{ '--service-color': service.color }}>
                  <div className="third-party-icon" style={{ background: service.color }}>
                    {service.icon}
                  </div>
                  <h3 className="third-party-title">{service.name}</h3>
                  <p className="third-party-desc">{service.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact */}
      <section className="info-contact">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="contact-card">
                <h3>Contact Us</h3>
                <p>If you have any questions about this Privacy Policy or our data practices, please contact us</p>
                <div className="contact-info">
                  <div className="contact-item">
                    <strong>Email:</strong> privacy@vocab.com
                  </div>
                  <div className="contact-item">
                    <strong>Address:</strong> 123 Learning Street, Education City, EC 12345
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

export default Privacy;
