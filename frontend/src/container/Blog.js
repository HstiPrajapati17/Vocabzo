import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Calendar, User, Tag, Heart, MessageCircle, Share2, ArrowRight, BookOpen, Clock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const navigate = useNavigate();

  const featuredPost = {
    id: 1,
    title: '10 Tips to Master Spanish Vocabulary',
    excerpt: 'Discover effective strategies to expand your Spanish vocabulary and remember words for longer. Learn from native speakers and cultural insights.',
    author: 'Maria Garcia',
    date: 'June 15, 2024',
    category: 'Learning Tips',
    image: '🇪🇸',
    likes: 234,
    comments: 45,
    readTime: '8 min read',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };

  const blogPosts = [
    {
      id: 2,
      title: 'The Science Behind Language Learning',
      excerpt: 'Learn how your brain processes new languages and how to optimize your learning routine.',
      author: 'Dr. James Wilson',
      date: 'June 10, 2024',
      category: 'Research',
      image: '🧠',
      likes: 189,
      comments: 32,
      readTime: '12 min read',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 3,
      title: 'German Grammar Made Simple',
      excerpt: 'Break down complex German grammar rules into easy-to-understand concepts.',
      author: 'Hans Mueller',
      date: 'June 5, 2024',
      category: 'German',
      image: '🇩🇪',
      likes: 156,
      comments: 28,
      readTime: '10 min read',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 4,
      title: 'French Pronunciation Guide',
      excerpt: 'Master the tricky sounds of French with our comprehensive pronunciation guide.',
      author: 'Sophie Martin',
      date: 'May 28, 2024',
      category: 'French',
      image: '🇫🇷',
      likes: 201,
      comments: 41,
      readTime: '15 min read',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      id: 5,
      title: 'Stay Motivated: Building a Language Learning Habit',
      excerpt: 'How to create sustainable habits that keep you motivated throughout your language journey.',
      author: 'Alex Chen',
      date: 'May 20, 2024',
      category: 'Motivation',
      image: '🎯',
      likes: 312,
      comments: 67,
      readTime: '7 min read',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      id: 6,
      title: 'Polish for Beginners: Getting Started',
      excerpt: 'A comprehensive guide to start your Polish language learning journey.',
      author: 'Anna Kowalski',
      date: 'May 15, 2024',
      category: 'Polish',
      image: '🇵🇱',
      likes: 145,
      comments: 23,
      readTime: '11 min read',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  const categories = [
    { name: 'Learning Tips', count: 24, color: '#667eea' },
    { name: 'Research', count: 18, color: '#f093fb' },
    { name: 'German', count: 15, color: '#4facfe' },
    { name: 'French', count: 21, color: '#43e97b' },
    { name: 'Spanish', count: 19, color: '#fa709a' },
    { name: 'Motivation', count: 12, color: '#a8edea' },
  ];

  return (
    <div className="info-page blog-page">
      {/* Hero Section */}
      <section className="info-hero blog-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="hero-content">
              <div className="hero-badge">
                <BookOpen size={16} /> VocabLearn Blog
              </div>
              <h1 className="hero-title">
                Tips, tricks, and insights for <span className="gradient-text">language learners</span>
              </h1>
              <p className="hero-desc">
                Discover the latest language learning strategies, success stories, and expert advice 
                to help you on your journey to fluency.
              </p>
              <div className="hero-actions">
                <Button className="btn-primary-custom" onClick={() => navigate('/signup')}>
                  Start Learning Now <ArrowRight className="ms-2" size={18} />
                </Button>
                <Button className="btn-outline-custom">
                  Subscribe
                </Button>
              </div>
            </Col>
            <Col lg={6} className="hero-visual">
              <div className="blog-stats">
                <div className="blog-stat-item">
                  <div className="blog-stat-icon">
                    <BookOpen size={32} />
                  </div>
                  <div className="blog-stat-value">50+</div>
                  <div className="blog-stat-label">Articles</div>
                </div>
                <div className="blog-stat-item">
                  <div className="blog-stat-icon">
                    <TrendingUp size={32} />
                  </div>
                  <div className="blog-stat-value">10K+</div>
                  <div className="blog-stat-label">Readers</div>
                </div>
                <div className="blog-stat-item">
                  <div className="blog-stat-icon">
                    <Clock size={32} />
                  </div>
                  <div className="blog-stat-value">Weekly</div>
                  <div className="blog-stat-label">Updates</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="blog-categories">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-desc">Find articles that match your interests</p>
          </div>
          <Row className="g-3">
            {categories.map((cat, i) => (
              <Col xs={6} sm={4} md={2} key={i}>
                <div className="category-pill" style={{ '--category-color': cat.color }}>
                  <span className="category-name">{cat.name}</span>
                  <span className="category-count">{cat.count}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Post */}
      <section className="blog-featured">
        <Container>
          <div className="featured-post" style={{ '--post-gradient': featuredPost.gradient }}>
            <div className="featured-image">
              <span style={{ fontSize: '4rem' }}>{featuredPost.image}</span>
            </div>
            <div className="featured-content">
              <div className="featured-meta">
                <span className="featured-category">{featuredPost.category}</span>
                <span className="featured-read-time">
                  <Clock size={14} /> {featuredPost.readTime}
                </span>
              </div>
              <h2 className="featured-title">{featuredPost.title}</h2>
              <p className="featured-excerpt">{featuredPost.excerpt}</p>
              <div className="featured-footer">
                <div className="featured-author">
                  <User size={16} /> {featuredPost.author}
                </div>
                <div className="featured-date">
                  <Calendar size={16} /> {featuredPost.date}
                </div>
                <div className="featured-stats">
                  <span><Heart size={16} /> {featuredPost.likes}</span>
                  <span><MessageCircle size={16} /> {featuredPost.comments}</span>
                </div>
              </div>
              <Button className="btn-light-custom mt-3">
                Read Article <ArrowRight className="ms-2" size={16} />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Blog Posts Grid */}
      <section className="blog-posts">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Latest Articles</h2>
            <p className="section-desc">Expert tips and insights for your language journey</p>
          </div>
          <Row className="g-4">
            {blogPosts.map((post) => (
              <Col md={6} key={post.id}>
                <div className="blog-post-card" style={{ '--card-gradient': post.gradient }}>
                  <div className="blog-post-header">
                    <span className="blog-post-emoji">{post.image}</span>
                    <span className="blog-post-category">{post.category}</span>
                  </div>
                  <h3 className="blog-post-title">{post.title}</h3>
                  <p className="blog-post-excerpt">{post.excerpt}</p>
                  <div className="blog-post-meta">
                    <span className="blog-post-author">
                      <User size={14} /> {post.author}
                    </span>
                    <span className="blog-post-date">
                      <Calendar size={14} /> {post.date}
                    </span>
                    <span className="blog-post-read-time">
                      <Clock size={14} /> {post.readTime}
                    </span>
                  </div>
                  <div className="blog-post-footer">
                    <div className="blog-post-stats">
                      <span><Heart size={14} /> {post.likes}</span>
                      <span><MessageCircle size={14} /> {post.comments}</span>
                    </div>
                    <Button className="btn-sm-custom">
                      Read More
                    </Button>
                  </div>
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
              <Share2 size={50} />
            </div>
            <h2 className="cta-title">Want to Contribute?</h2>
            <p className="cta-desc">Share your language learning journey and tips with our community</p>
            <Button className="btn-primary-custom btn-lg">
              Submit an Article <ArrowRight className="ms-2" size={18} />
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Blog;
