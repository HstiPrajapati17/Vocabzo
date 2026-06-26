import React, { useState } from 'react';
import { Container, Row, Col, Card, Accordion, Button, Form, InputGroup } from 'react-bootstrap';
import { Search, Headset, Book, Video, ArrowRight, HelpCircle, ChevronDown, ChevronUp, MessageSquare, Phone, Mail, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Help = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const faqData = [
    {
      id: 1,
      question: 'How do I change my language?',
      answer: 'To change your language, go to the Courses page from the main menu. Select your desired language from the available options. Your progress will be saved for each language separately.'
    },
    {
      id: 2,
      question: 'What are XP and how do I earn them?',
      answer: 'XP (Experience Points) are earned by completing lessons, quizzes, and daily quests. The more you practice, the more XP you earn. XP helps you track your progress and unlock achievements.'
    },
    {
      id: 3,
      question: 'How does the streak system work?',
      answer: 'Your streak counts consecutive days of learning. Complete at least one lesson each day to maintain your streak. Longer streaks earn you bonus XP and special achievements!'
    },
    {
      id: 4,
      question: 'Can I learn multiple languages at once?',
      answer: 'Yes! You can switch between languages anytime. Each language has its own learning path and progress. Your XP and streak are shared across all languages.'
    },
    {
      id: 5,
      question: 'What happens if I run out of hearts?',
      answer: 'Hearts are used for lessons. If you run out, you can wait for them to regenerate (1 heart every 30 minutes), complete daily quests to earn more, or purchase additional hearts from the shop.'
    },
    {
      id: 6,
      question: 'How do I reset my progress?',
      answer: 'To reset your progress, go to Settings and select "Reset Progress". Warning: This will delete all your learning data and cannot be undone. Consider carefully before resetting.'
    },
    {
      id: 7,
      question: 'Is VocabLearn free to use?',
      answer: 'VocabLearn offers both free and premium plans. The free plan includes access to basic lessons and features. Premium plans offer unlimited hearts, advanced lessons, offline mode, and more.'
    },
    {
      id: 8,
      question: 'How do I contact support?',
      answer: 'You can reach our support team by clicking the "Contact Support" button below or emailing support@vocab.com. We typically respond within 24 hours.'
    }
  ];

  const helpCategories = [
    { icon: <Book size={32} />, title: 'Getting Started', desc: 'Learn the basics of using VocabLearn', color: '#667eea' },
    { icon: <Video size={32} />, title: 'Video Tutorials', desc: 'Watch step-by-step guides', color: '#f093fb' },
    { icon: <Headset size={32} />, title: 'Live Support', desc: 'Chat with our support team', color: '#4facfe' },
    { icon: <Mail size={32} />, title: 'Email Support', desc: 'Send us a detailed message', color: '#43e97b' },
  ];

  const supportOptions = [
    { icon: <MessageSquare size={28} />, title: 'Live Chat', desc: 'Instant support from our team', time: 'Available 24/7', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { icon: <Phone size={28} />, title: 'Phone Support', desc: 'Call our support hotline', time: 'Mon-Fri 9AM-6PM', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { icon: <Mail size={28} />, title: 'Email Us', desc: 'Send detailed inquiries', time: 'Response within 24h', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  ];

  const filteredFAQ = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="info-page help-page">
      {/* Hero Section */}
      <section className="info-hero help-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="hero-content">
              <div className="hero-badge">
                <HelpCircle size={16} /> Help Center
              </div>
              <h1 className="hero-title">
                Find answers to your <span className="gradient-text">questions</span>
              </h1>
              <p className="hero-desc">
                Get the help you need to make the most of your language learning journey. 
                Search our FAQs or contact our support team directly.
              </p>
            </Col>
            <Col lg={6} className="hero-visual">
              <div className="help-visual">
                <div className="help-circle help-circle-1">
                  <Headset size={40} />
                </div>
                <div className="help-circle help-circle-2">
                  <Clock size={32} />
                </div>
                <div className="help-circle help-circle-3">
                  <MessageSquare size={36} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Search Section */}
      <section className="help-search">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <div className="search-wrapper">
                <InputGroup>
                  <InputGroup.Text className="search-icon">
                    <Search />
                  </InputGroup.Text>
                  <Form.Control
                    className="search-input"
                    placeholder="Search for help..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </InputGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Help Categories */}
      <section className="help-categories">
        <Container>
          <div className="section-header">
            <h2 className="section-title">How Can We Help?</h2>
            <p className="section-desc">Choose the support option that works best for you</p>
          </div>
          <Row className="g-4">
            {helpCategories.map((category, index) => (
              <Col xs={12} sm={6} lg={3} key={index}>
                <div className="help-category-card" style={{ '--category-color': category.color }}>
                  <div className="help-category-icon" style={{ background: category.color }}>
                    {category.icon}
                  </div>
                  <h3 className="help-category-title">{category.title}</h3>
                  <p className="help-category-desc">{category.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="help-faq">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">Find quick answers to common questions</p>
          </div>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="faq-wrapper">
                {filteredFAQ.map((faq) => (
                  <div className="faq-item" key={faq.id}>
                    <Accordion>
                      <Accordion.Item eventKey={faq.id}>
                        <Accordion.Header className="faq-question">
                          {faq.question}
                        </Accordion.Header>
                        <Accordion.Body className="faq-answer">
                          {faq.answer}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                ))}
                {filteredFAQ.length === 0 && (
                  <div className="faq-empty">
                    <HelpCircle size={48} />
                    <p>No results found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Support Options */}
      <section className="help-support">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Contact Support</h2>
            <p className="section-desc">Can't find what you're looking for? Reach out to us</p>
          </div>
          <Row className="g-4">
            {supportOptions.map((option, index) => (
              <Col xs={12} sm={6} lg={4} key={index}>
                <div className="support-card" style={{ '--card-gradient': option.gradient }}>
                  <div className="support-icon-wrapper" style={{ background: option.gradient }}>
                    {option.icon}
                  </div>
                  <h3 className="support-title">{option.title}</h3>
                  <p className="support-desc">{option.desc}</p>
                  <div className="support-time">
                    <Clock size={14} /> {option.time}
                  </div>
                  <Button className="btn-light-custom mt-3">
                    {option.title}
                  </Button>
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
              <Headset size={50} />
            </div>
            <h2 className="cta-title">Still Need Help?</h2>
            <p className="cta-desc">Our support team is here to help you succeed in your language learning journey</p>
            <Button className="btn-primary-custom btn-lg">
              Start Live Chat <ArrowRight className="ms-2" size={18} />
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Help;
