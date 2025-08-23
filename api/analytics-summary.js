// THRIVE Analytics Summary API - Enterprise Dashboard Data
// Aggregates conversation logs into corporate-friendly metrics

import fs from 'fs';
import path from 'path';

const ANALYTICS_DIR = path.join(process.cwd(), 'analytics');

function parseLogFiles(days = 7) {
  const events = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const logFile = path.join(ANALYTICS_DIR, `conversations-${dateStr}.json`);
    
    if (fs.existsSync(logFile)) {
      try {
        const fileContent = fs.readFileSync(logFile, 'utf8');
        const lines = fileContent.trim().split('\n').filter(line => line.trim());
        
        for (const line of lines) {
          try {
            const event = JSON.parse(line);
            events.push(event);
          } catch (e) {
            console.warn('Failed to parse log line:', line);
          }
        }
      } catch (error) {
        console.warn(`Failed to read log file ${logFile}:`, error.message);
      }
    }
  }
  
  return events;
}

function calculateMetrics(events) {
  // Group events by session
  const sessions = {};
  
  events.forEach(event => {
    if (!sessions[event.session_id]) {
      sessions[event.session_id] = {
        id: event.session_id,
        coach: event.coach,
        events: [],
        messageCount: 0,
        topicIndicators: new Set(),
        startTime: null,
        endTime: null,
        completionStatus: 'ongoing'
      };
    }
    
    const session = sessions[event.session_id];
    session.events.push(event);
    session.messageCount = Math.max(session.messageCount, event.message_count || 0);
    
    if (event.topic_indicators) {
      event.topic_indicators.forEach(topic => session.topicIndicators.add(topic));
    }
    
    if (event.event_type === 'session_start' && !session.startTime) {
      session.startTime = new Date(event.timestamp);
    }
    
    if (event.event_type === 'session_end' || event.event_type === 'session_abandoned') {
      session.endTime = new Date(event.timestamp);
      session.completionStatus = event.completion_status || 'completed';
    }
  });
  
  const sessionList = Object.values(sessions);
  const totalSessions = sessionList.length;
  const activeUsers = new Set(sessionList.map(s => s.id.substring(0, 8))).size; // Rough estimate
  
  // Calculate average session duration
  const completedSessions = sessionList.filter(s => s.startTime && s.endTime);
  const avgSessionDuration = completedSessions.length > 0 
    ? completedSessions.reduce((sum, s) => sum + (s.endTime - s.startTime), 0) / completedSessions.length / (1000 * 60)
    : 0;
  
  // Completion rate
  const completedCount = sessionList.filter(s => s.completionStatus === 'completed').length;
  const completionRate = totalSessions > 0 ? Math.round((completedCount / totalSessions) * 100) : 0;
  
  // Coach performance
  const coachStats = {};
  sessionList.forEach(session => {
    if (!coachStats[session.coach]) {
      coachStats[session.coach] = { sessions: 0, engagement: 0 };
    }
    coachStats[session.coach].sessions++;
    
    // Simple engagement score based on message count and completion
    const engagementScore = session.completionStatus === 'completed' ? 90 : 
                          session.messageCount >= 3 ? 70 : 40;
    coachStats[session.coach].engagement += engagementScore;
  });
  
  const topCoaches = Object.entries(coachStats)
    .map(([name, stats]) => ({
      name,
      sessions: stats.sessions,
      engagement: Math.round(stats.engagement / stats.sessions)
    }))
    .sort((a, b) => b.sessions - a.sessions);
  
  // Top topics
  const topicCounts = {};
  sessionList.forEach(session => {
    session.topicIndicators.forEach(topic => {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });
  });
  
  const topTopics = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([topic]) => topic);
  
  // Response time average
  const responseEvents = events.filter(e => e.response_time_ms);
  const avgResponseTime = responseEvents.length > 0
    ? responseEvents.reduce((sum, e) => sum + e.response_time_ms, 0) / responseEvents.length / 1000
    : 0;
  
  // Daily usage (last 7 days)
  const dailyUsage = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const dayEvents = events.filter(e => e.timestamp.startsWith(dateStr));
    const uniqueSessions = new Set(dayEvents.map(e => e.session_id)).size;
    dailyUsage.push(uniqueSessions);
  }
  
  return {
    totalSessions,
    activeUsers,
    avgSessionDuration: Math.round(avgSessionDuration * 10) / 10,
    completionRate,
    topCoaches: topCoaches.slice(0, 4),
    topTopics,
    responseTime: Math.round(avgResponseTime * 10) / 10,
    dailyUsage
  };
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const events = parseLogFiles(7); // Last 7 days
    const metrics = calculateMetrics(events);
    
    res.status(200).json(metrics);
    
  } catch (error) {
    console.error('Analytics summary error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}