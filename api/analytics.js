// THRIVE Analytics API - Anonymous Conversation Logging
// Tracks engagement patterns for enterprise insights and coach optimization

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// Simple file-based storage (upgrade to database when needed)
const ANALYTICS_DIR = path.join(process.cwd(), 'analytics');
const DAILY_LOG_FILE = () => path.join(ANALYTICS_DIR, `conversations-${new Date().toISOString().split('T')[0]}.json`);

// Ensure analytics directory exists
if (!fs.existsSync(ANALYTICS_DIR)) {
  fs.mkdirSync(ANALYTICS_DIR, { recursive: true });
}

function generateSessionId(userAgent, timestamp) {
  // Anonymous session ID based on user agent + timestamp (no personal data)
  const hash = crypto.createHash('sha256');
  hash.update(userAgent + Math.floor(timestamp / (1000 * 60 * 60))); // Hour-based grouping
  return hash.digest('hex').substring(0, 16);
}

function logEvent(eventData) {
  const logFile = DAILY_LOG_FILE();
  const timestamp = new Date().toISOString();
  
  const logEntry = {
    timestamp,
    ...eventData
  };
  
  try {
    // Append to daily log file
    fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n', 'utf8');
  } catch (error) {
    console.error('Analytics logging failed:', error);
  }
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const {
      event_type,
      coach,
      message_count,
      response_time_ms,
      topic_indicators,
      session_duration_ms,
      device_info
    } = req.body;
    
    const sessionId = generateSessionId(
      req.headers['user-agent'] || 'unknown', 
      Date.now()
    );
    
    // Log the event with corporate-relevant metrics
    const eventData = {
      session_id: sessionId,
      event_type, // session_start, message_sent, message_received, session_end, session_abandoned
      coach,
      message_count: message_count || 0,
      response_time_ms: response_time_ms || null,
      session_duration_ms: session_duration_ms || null,
      topic_indicators: topic_indicators || [], // Keywords without personal content
      device_info: {
        mobile: device_info?.mobile || false,
        browser: device_info?.browser || 'unknown'
      },
      // Enterprise metrics
      engagement_score: calculateEngagementScore(message_count, session_duration_ms),
      completion_status: determineCompletionStatus(event_type, message_count)
    };
    
    logEvent(eventData);
    
    res.status(200).json({ 
      success: true, 
      session_id: sessionId,
      message: 'Event logged successfully' 
    });
    
  } catch (error) {
    console.error('Analytics API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function calculateEngagementScore(messageCount, sessionDuration) {
  // Simple engagement scoring for corporate dashboards
  if (!messageCount || !sessionDuration) return 0;
  
  const avgTimePerMessage = sessionDuration / messageCount;
  const messageWeight = Math.min(messageCount / 10, 1); // Max weight at 10 messages
  const timeWeight = Math.min(avgTimePerMessage / 30000, 1); // Max weight at 30s per message
  
  return Math.round((messageWeight + timeWeight) * 50); // Score 0-100
}

function determineCompletionStatus(eventType, messageCount) {
  if (eventType === 'session_end' && messageCount >= 5) return 'completed';
  if (eventType === 'session_end' && messageCount >= 2) return 'partial';
  if (eventType === 'session_abandoned') return 'abandoned';
  return 'ongoing';
}