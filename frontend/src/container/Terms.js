import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FileText, UserCheck, Ban, Gavel, Shield, Cookie, CheckCircle, ArrowRight, AlertTriangle, Scale, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
  const navigate = useNavigate();

  const termsStats = [
    { value: 'Last Updated', label: 'January 2024', icon: <Clock size={24} />, color: '#667eea' },
    { value: 'GDPR', label: 'Compliant', icon: <CheckCircle size={24} />, color: '#f093fb' },
    { value: 'CCPA', label: 'Ready', icon: <Shield size={24} />, color: '#4facfe' },
    { value: 'Legal', label: 'Verified', icon: <Scale size={24} />, color: '#43e97b' },
  ];

  const keyTerms = [
    { 
      icon: <UserCheck size={32} />, 
      title: 'Account Registration', 
      desc: 'You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials.',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    { 
      icon: <Ban size={32} />, 
      title: 'Acceptable Use', 
      desc: 'You agree not to use VocabLearn for any illegal purposes, to harass others, or to violate any intellectual property rights.',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    { 
      icon: <Gavel size={32} />, 
      title: 'Intellectual Property', 
      desc: 'All content on VocabLearn is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without permission.',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    { 
      icon: <Shield size={32} />, 
      title: 'Privacy Policy', 
      desc: 'Your use of VocabLearn is also governed by our Privacy Policy, which describes how we collect, use, and protect your personal information.',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    { 
      icon: <Cookie size={32} />, 
      title: 'Cookies and Tracking', 
      desc: 'We use cookies and similar technologies to improve your experience, analyze usage patterns, and personalize content.',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
  ];

  const serviceTerms = [
    { title: 'Subscription and Payment', desc: 'VocabLearn offers both free and premium subscription plans. Premium subscriptions are billed on a recurring basis (monthly or annually). You agree to provide accurate payment information and authorize us to charge your chosen payment method.', icon: '💳' },
    { title: 'Service Availability', desc: 'We strive to maintain high service availability but cannot guarantee uninterrupted access. We reserve the right to suspend or terminate the service for maintenance, updates, or other operational reasons.', icon: '🌐' },
    { title: 'User Content', desc: 'Any content you submit to VocabLearn, including forum posts, reviews, or learning progress, remains your property. However, you grant us a license to use, display, and distribute such content for the purpose of providing and improving our services.', icon: '📝' },
    { title: 'Termination', desc: 'We reserve the right to terminate or suspend your account at our discretion, with or without notice, for violation of these terms or for any other reason. Upon termination, your right to use the service will immediately cease.', icon: '⚠️' },
    { title: 'Limitation of Liability', desc: 'To the maximum extent permitted by law, VocabLearn shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.', icon: '🛡️' },
  ];

  const importantNotices = [
    { icon: <AlertTriangle size={32} />, title: 'Age Requirement', desc: 'You must be at least 13 years old to use VocabLearn. By using our service, you represent that you meet this age requirement.', color: '#e74c3c' },
    { icon: <FileText size={32} />, title: 'Agreement to Terms', desc: 'By accessing or using VocabLearn, you agree to be bound by these Terms of Service and all applicable laws and regulations.', color: '#f39c12' },
    { icon: <Clock size={32} />, title: 'Changes to Terms', desc: 'We may modify these terms at any time. Continued use of the service after changes constitutes acceptance of the updated terms.', color: '#3498db' },
  ];

  return (
    <div className="info-page terms-page">
      {/* Hero Section */}
      <section className="info-hero terms-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="hero-content">
              <div className="hero-badge">
                <FileText size={16} /> Terms of Service
              </div>
              <h1 className="hero-title">
                Please read these terms <span className="gradient-text">carefully</span>
              </h1>
              <p className="hero-desc">
                Welcome to VocabLearn. By accessing or using our language learning platform, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our service.
              </p>
              <div className="hero-actions">
                <Button className="btn-primary-custom" onClick={() => navigate('/signup')}>
                  Accept & Continue <ArrowRight className="ms-2" size={18} />
                </Button>
                <Button className="btn-outline-custom">
                  Download PDF
                </Button>
              </div>
            </Col>
            <Col lg={6} className="hero-visual">
              <div className="terms-document">
                <FileText size={120} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Terms Stats */}
      <section className="terms-stats">
        <Container>
          <Row className="g-4">
            {termsStats.map((stat, i) => (
              <Col xs={6} md={3} key={i}>
                <div className="terms-stat-card" style={{ '--stat-color': stat.color }}>
                  <div className="terms-stat-icon" style={{ background: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="terms-stat-value">{stat.value}</div>
                  <div className="terms-stat-label">{stat.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Key Terms */}
      <section className="terms-key">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Key Terms</h2>
            <p className="section-desc">Important terms you need to understand</p>
          </div>
          <Row className="g-4">
            {keyTerms.map((term, i) => (
              <Col xs={12} sm={6} lg={4} key={i}>
                <div className="terms-key-card" style={{ '--card-gradient': term.gradient }}>
                  <div className="terms-key-icon-wrapper" style={{ background: term.gradient }}>
                    {term.icon}
                  </div>
                  <h3 className="terms-key-title">{term.title}</h3>
                  <p className="terms-key-desc">{term.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Service Terms */}
      <section className="terms-service">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Service Terms</h2>
            <p className="section-desc">Detailed terms governing our services</p>
          </div>
          <Row className="g-4">
            {serviceTerms.map((term, i) => (
              <Col xs={12} sm={6} lg={6} key={i}>
                <div className="terms-service-card">
                  <div className="terms-service-icon">{term.icon}</div>
                  <h3 className="terms-service-title">{term.title}</h3>
                  <p className="terms-service-desc">{term.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Important Notices */}
      <section className="terms-notices">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Important Notices</h2>
            <p className="section-desc">Key information you should be aware of</p>
          </div>
          <Row className="g-4">
            {importantNotices.map((notice, i) => (
              <Col xs={12} sm={6} lg={4} key={i}>
                <div className="terms-notice-card" style={{ '--notice-color': notice.color }}>
                  <div className="terms-notice-icon" style={{ background: notice.color }}>
                    {notice.icon}
                  </div>
                  <h3 className="terms-notice-title">{notice.title}</h3>
                  <p className="terms-notice-desc">{notice.desc}</p>
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
                <p>If you have any questions about these Terms of Service, please contact us</p>
                <div className="contact-info">
                  <div className="contact-item">
                    <strong>Email:</strong> legal@vocab.com
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

export default Terms;
