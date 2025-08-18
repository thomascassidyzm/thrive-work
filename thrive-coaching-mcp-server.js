#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

/**
 * THRIVE Coaching MCP Orchestrator
 * 
 * Provides coaching tools and methodology for Tom Cassidy's THRIVE system
 * Including multiple coaches: Tom, Liz, Dom, Alastair, Kainne, Edward
 * 
 * Core Principle: "What WOULD you choose?"
 */
class THRIVECoachingOrchestrator {
  constructor() {
    this.server = new Server({
      name: 'thrive-coaching-orchestrator',
      version: '1.0.0',
    }, {
      capabilities: {
        tools: {},
      },
    });
    
    // Initialize coaching styles and methodologies
    this.initializeCoachingStyles();
    this.setupToolHandlers();
  }
  
  initializeCoachingStyles() {
    // Tom's core coaching methodology
    this.tomCoachingStyle = {
      procrastination_example: {
        opening: "There is no such thing as procrastination",
        explanation: "Procrastination doesn't exist. What's going on is that you just don't know what you really want.",
        framework: "Once you know exactly what you want in life, everything either gets you closer to your vision or further away.",
        socratic: "Will this get me closer to where I want to go? Yes or no?",
        reframe: "Doing really well in corporate might be exactly perfect for you right now because it is getting you closer to your vision.",
        simple_rule: "If it's closer... Do it! If it's further away... Don't do it.",
        conclusion: "Then you have a framework for all your moment to moment decisions."
      },
      
      signature_phrases: [
        "What are you noticing about that pattern?",
        "Would you consciously choose that response?",
        "What's the Script running there?",
        "If you could pause and choose consciously, what would you do differently?",
        "That sounds like an inherited response rather than a conscious choice",
        "What would authentic you do in that situation?",
        "I'm curious about the gap between what you value and what you're actually doing",
        "What pattern do you notice repeating there?",
        "That's interesting - tell me more about that automatic response"
      ],
      
      gateway_questions: {
        primary: "What WOULD you choose?",
        secondary: "What are you putting in?"
      },
      
      core_concepts: {
        script: "Everything you do that you wouldn't consciously choose",
        sausage_machine: "You get out what you put in",
        marginal_gains: "1% better at 100 things rather than 100% better at one",
        thirteen_four: "Ben Franklin's 13 virtues, one per week, four cycles per year"
      }
    };
    
    // Other coaches' specialties
    this.coaches = {
      tom: {
        name: "Tom Cassidy",
        specialty: "Relationships, personal mastery, life purpose",
        approach: "Direct, challenging, pattern-focused",
        key_tools: ["Script awareness", "Gateway questions", "13x4 system"]
      },
      liz: {
        name: "Liz",
        specialty: "Identity work, self-worth, feeling good about being YOU",
        approach: "Compassionate, empowering, identity-focused",
        key_tools: ["Self-acceptance", "Worth building", "Identity alignment"]
      },
      dom: {
        name: "Dom",
        specialty: "Sports psychology, performance, winning mindset",
        approach: "Athletic metaphors, competitive edge, tactical thinking",
        key_tools: ["Performance patterns", "Winning psychology", "Mental game"]
      },
      alastair: {
        name: "Alastair",
        specialty: "Addictions, compulsive patterns, OCD",
        approach: "Understanding triggers, breaking cycles, conscious alternatives",
        key_tools: ["Pattern interruption", "Trigger awareness", "Replacement strategies"]
      },
      kainne: {
        name: "Kainne",
        specialty: "Business, getting things done, ADHD",
        approach: "Practical, action-oriented, focus strategies",
        key_tools: ["Implementation over information", "Focus techniques", "Productivity patterns"]
      },
      edward: {
        name: "Edward",
        specialty: "Foundations, self-acceptance, limiting beliefs",
        approach: "Building from basics, gentle challenging, belief examination",
        key_tools: ["Belief investigation", "Foundation building", "Self-compassion"]
      }
    };
  }
  
  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'thrive_coaching_response',
            description: 'Generate a coaching response using THRIVE methodology',
            inputSchema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  description: 'The user\'s message or situation to respond to'
                },
                coach: {
                  type: 'string',
                  description: 'Which coach to use (tom, liz, dom, alastair, kainne, edward)',
                  default: 'tom'
                },
                context: {
                  type: 'string',
                  description: 'Additional context about the conversation or user\'s situation'
                }
              },
              required: ['message']
            }
          },
          {
            name: 'thrive_pattern_analysis',
            description: 'Analyze patterns in user\'s behavior using THRIVE framework',
            inputSchema: {
              type: 'object',
              properties: {
                situation: {
                  type: 'string',
                  description: 'Description of the situation or behavior pattern'
                },
                recurring: {
                  type: 'boolean',
                  description: 'Is this a recurring pattern?'
                }
              },
              required: ['situation']
            }
          },
          {
            name: 'thrive_script_identification',
            description: 'Identify Scripts (unconscious patterns) vs conscious choices',
            inputSchema: {
              type: 'object',
              properties: {
                behavior: {
                  type: 'string',
                  description: 'The behavior or response to analyze'
                },
                trigger: {
                  type: 'string',
                  description: 'What triggered this behavior'
                }
              },
              required: ['behavior']
            }
          },
          {
            name: 'thrive_gateway_questions',
            description: 'Apply Tom\'s two gateway questions to any situation',
            inputSchema: {
              type: 'object',
              properties: {
                situation: {
                  type: 'string',
                  description: 'The situation to apply gateway questions to'
                },
                current_choice: {
                  type: 'string',
                  description: 'What the person is currently doing/choosing'
                }
              },
              required: ['situation']
            }
          },
          {
            name: 'thrive_13x4_planning',
            description: 'Create a 13x4 improvement plan (Ben Franklin system)',
            inputSchema: {
              type: 'object',
              properties: {
                areas: {
                  type: 'array',
                  description: 'Areas of life to improve',
                  items: { type: 'string' }
                },
                current_week: {
                  type: 'number',
                  description: 'Current week in the cycle (1-13)'
                }
              },
              required: ['areas']
            }
          },
          {
            name: 'thrive_coach_selection',
            description: 'Select the best coach for a specific situation',
            inputSchema: {
              type: 'object',
              properties: {
                issue: {
                  type: 'string',
                  description: 'The issue or challenge the user is facing'
                },
                preferences: {
                  type: 'string',
                  description: 'Any preferences for coaching style'
                }
              },
              required: ['issue']
            }
          },
          {
            name: 'thrive_methodology_glossary',
            description: 'Get THRIVE methodology terms and concepts',
            inputSchema: {
              type: 'object',
              properties: {
                term: {
                  type: 'string',
                  description: 'Specific term to look up (e.g., "Script", "Sausage Machine", "13x4")'
                }
              }
            }
          },
          {
            name: 'thrive_send_response',
            description: 'Send coaching response back to the web chat interface',
            inputSchema: {
              type: 'object',
              properties: {
                requestId: {
                  type: 'string',
                  description: 'The request ID to respond to'
                },
                response: {
                  type: 'string',
                  description: 'The coaching response to send'
                },
                coach: {
                  type: 'string',
                  description: 'The coach persona (tom, liz, dom, etc.)'
                }
              },
              required: ['requestId', 'response']
            }
          }
        ]
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      
      try {
        switch (name) {
          case 'thrive_coaching_response':
            return await this.handleCoachingResponse(args);
          case 'thrive_pattern_analysis':
            return await this.handlePatternAnalysis(args);
          case 'thrive_script_identification':
            return await this.handleScriptIdentification(args);
          case 'thrive_gateway_questions':
            return await this.handleGatewayQuestions(args);
          case 'thrive_13x4_planning':
            return await this.handle13x4Planning(args);
          case 'thrive_coach_selection':
            return await this.handleCoachSelection(args);
          case 'thrive_methodology_glossary':
            return await this.handleMethodologyGlossary(args);
          case 'thrive_send_response':
            return await this.handleSendResponse(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: `Error in ${name}: ${error.message}`
          }],
          isError: true,
        };
      }
    });
  }
  
  async handleCoachingResponse(args) {
    const { message, coach = 'tom', context = '' } = args;
    
    console.error(`THRIVE: Generating ${coach} coaching response`);
    
    const coachInfo = this.coaches[coach] || this.coaches.tom;
    
    // Build coaching prompt based on selected coach
    let coachingGuidance = `# ${coachInfo.name} Coaching Response

**User Message**: "${message}"
${context ? `**Context**: ${context}` : ''}

**Coach Profile**:
- Specialty: ${coachInfo.specialty}
- Approach: ${coachInfo.approach}
- Key Tools: ${coachInfo.key_tools.join(', ')}

**Core THRIVE Principles to Apply**:
1. The Two Gateway Questions: "What WOULD you choose?" and "What are you putting in?"
2. Script vs Authentic Self: Help identify unconscious patterns vs conscious choices
3. Focus on noticing patterns, not giving advice
4. Use Socratic questioning to guide discovery
`;

    if (coach === 'tom') {
      coachingGuidance += `
**Tom's Specific Approach**:
- ${this.tomCoachingStyle.signature_phrases[Math.floor(Math.random() * this.tomCoachingStyle.signature_phrases.length)]}
- Remember: ${this.tomCoachingStyle.procrastination_example.explanation}
- Framework: ${this.tomCoachingStyle.procrastination_example.framework}
`;
    } else if (coach === 'dom') {
      coachingGuidance += `
**Dom's Sports Psychology Lens**:
- Frame challenges as games to win
- Use sports metaphors naturally
- Focus on performance patterns and winning mindset
- "What's your game plan here?"
`;
    } else if (coach === 'liz') {
      coachingGuidance += `
**Liz's Identity Focus**:
- Center on self-worth and identity alignment
- Help them feel good about being themselves
- Compassionate but still challenging
- "Who would you be if you fully accepted yourself?"
`;
    }

    coachingGuidance += `
**Response Style**:
- Warm but challenging
- Use questions more than statements
- Help them discover their own answers
- Keep it conversational and real`;

    return {
      content: [{
        type: 'text',
        text: coachingGuidance
      }]
    };
  }
  
  async handlePatternAnalysis(args) {
    const { situation, recurring = false } = args;
    
    console.error('THRIVE: Analyzing patterns');
    
    const analysis = `# THRIVE Pattern Analysis

**Situation**: ${situation}
**Recurring**: ${recurring ? 'Yes - this is a pattern' : 'First occurrence'}

**Key Questions to Explore**:

1. **Script or Choice?**
   - Would you consciously choose this response?
   - If not, it's your Script running

2. **The Pattern**:
   - When does this pattern show up?
   - What triggers it?
   - What's the payoff (even if negative)?

3. **The Gap**:
   - What would authentic you do?
   - What's the gap between that and what's happening?

4. **Historical Origin**:
   - When did you first learn this response?
   - Who modeled this for you?
   - What was it protecting you from?

5. **Conscious Alternative**:
   - What WOULD you choose instead?
   - What would 1% better look like?
   - How can you notice it earlier next time?

**Tom's Insight**: "${this.tomCoachingStyle.signature_phrases[2]}"

**Next Step**: Make it OK to notice when this pattern runs. Don't try to stop it, just notice it. That's where all change begins.`;

    return {
      content: [{
        type: 'text',
        text: analysis
      }]
    };
  }
  
  async handleScriptIdentification(args) {
    const { behavior, trigger = 'unspecified' } = args;
    
    console.error('THRIVE: Identifying Scripts');
    
    const identification = `# Script Identification

**Behavior**: ${behavior}
**Trigger**: ${trigger}

**The Script Test**:
Ask yourself: "Would I consciously choose this?"

If the answer is NO, then it's your Script - an inherited, automatic response you wouldn't consciously choose.

**Understanding Your Script**:

1. **What It Is**:
   - Everything you do that you wouldn't consciously choose
   - Inherited responses from childhood
   - Protection mechanisms that no longer serve

2. **How to Spot It**:
   - Automatic reactions (anger in traffic, anxiety before meetings)
   - Repetitive patterns despite knowing better
   - Emotional responses that feel "bigger" than the situation

3. **The Script's Job**:
   - It kept you safe when you were young
   - It's trying to protect you now
   - But it's using outdated software

4. **Working With It**:
   - Make it OK to have the Script
   - Notice it without judgment: "Oh, that's my Script"
   - Ask: "What would I choose instead?"

**Key Insight**: ${this.tomCoachingStyle.procrastination_example.explanation}

**Your Power**: The moment you notice it's your Script, you're no longer unconscious. That's where choice begins.

**Practice**: Next time ${trigger} happens, just notice: "Is this what I'd choose, or is my Script running?"`;

    return {
      content: [{
        type: 'text',
        text: identification
      }]
    };
  }
  
  async handleGatewayQuestions(args) {
    const { situation, current_choice = '' } = args;
    
    console.error('THRIVE: Applying gateway questions');
    
    const gateway = `# The Two Gateway Questions

**Situation**: ${situation}
${current_choice ? `**Current Choice**: ${current_choice}` : ''}

## Question 1: "What WOULD I choose?"

This is the most powerful question known to humanity. If what you're thinking/doing isn't what you'd choose, then you're not choosing - your Script is.

**Apply it here**:
- In this situation, what WOULD you choose to think?
- What WOULD you choose to feel?
- What WOULD you choose to do?

## Question 2: "What am I putting in?"

Life is a sausage machine - you get out what you put in.

**Apply it here**:
- What thoughts are you putting into this situation?
- What energy are you bringing?
- What expectations are you creating?

## The Integration:

**Current Reality**:
${current_choice ? `You're currently: ${current_choice}` : 'Look at what you\'re currently doing'}

**Conscious Choice**:
What would you choose instead?

**The Bridge**:
- Don't try to stop the old pattern
- Just notice: "That's my Script, not my choice"
- Ask: "What would I choose?"
- Start with 1% improvement

**Tom's Wisdom**: "${this.tomCoachingStyle.procrastination_example.framework}"

**Simple Rule**: 
- If it gets you closer to what you'd choose... Do it!
- If it takes you further away... Don't do it!

**Next Step**: Apply these questions to one small decision today. Just one. Notice the difference between Script and choice.`;

    return {
      content: [{
        type: 'text',
        text: gateway
      }]
    };
  }
  
  async handle13x4Planning(args) {
    const { areas, current_week = 1 } = args;
    
    console.error('THRIVE: Creating 13x4 plan');
    
    // Create 13-week cycle from provided areas
    const fullCycle = [];
    const areasNeeded = 13;
    
    // Distribute areas across 13 weeks
    for (let i = 0; i < areasNeeded; i++) {
      if (areas.length > 0) {
        fullCycle.push(areas[i % areas.length]);
      }
    }
    
    const plan = `# Your 13x4 Improvement Plan
*Ben Franklin's System: Minimum Willpower, Maximum Results*

## How It Works:
- 13 focus areas, one per week
- 4 complete cycles per year (52 weeks)
- Just notice one thing each week
- No pressure, no perfection, just awareness

## Your 13-Week Cycle:

${fullCycle.map((area, index) => {
  const weekNum = index + 1;
  const isCurrent = weekNum === current_week;
  return `${isCurrent ? '→ ' : '  '}**Week ${weekNum}**: ${area}${isCurrent ? ' ← YOU ARE HERE' : ''}`;
}).join('\n')}

## This Week's Focus (Week ${current_week}):
**${fullCycle[current_week - 1] || 'Choose your focus'}**

What to do:
1. Just notice this area in your life
2. Don't try to fix everything
3. Ask: "What would 1% better look like?"
4. Celebrate small improvements

## Why This Works:

**The Problem with 30-Day Challenges**:
- Too much pressure
- All-or-nothing thinking
- 0.001% of people complete them

**The Beauty of Weekly Focus**:
- Fresh start every Monday
- Excitement for next week's focus
- Gradual raising of "unconscious competence"
- It compounds over the year

## Tom's Key Insight:
"${this.tomCoachingStyle.core_concepts.marginal_gains}"

## Your Progress Tracker:
- Cycle 1: Weeks 1-13 (Awareness building)
- Cycle 2: Weeks 14-26 (Patterns emerging)
- Cycle 3: Weeks 27-39 (Natural improvement)
- Cycle 4: Weeks 40-52 (Unconscious competence)

## Next Step:
Focus only on this week. That's it. When Sunday comes, you'll be excited about next week's focus.

Remember: Zero pressure, minimum willpower. Just notice.`;

    return {
      content: [{
        type: 'text',
        text: plan
      }]
    };
  }
  
  async handleCoachSelection(args) {
    const { issue, preferences = '' } = args;
    
    console.error('THRIVE: Selecting best coach');
    
    // Analyze issue for best coach match
    let recommendedCoach = 'tom'; // Default
    let reasoning = '';
    
    const issueLower = issue.toLowerCase();
    
    if (issueLower.includes('identity') || issueLower.includes('self-worth') || issueLower.includes('confidence')) {
      recommendedCoach = 'liz';
      reasoning = 'Identity and self-worth challenges are Liz\'s specialty';
    } else if (issueLower.includes('performance') || issueLower.includes('sport') || issueLower.includes('competition') || issueLower.includes('winning')) {
      recommendedCoach = 'dom';
      reasoning = 'Performance and competitive mindset are Dom\'s expertise';
    } else if (issueLower.includes('addiction') || issueLower.includes('compulsive') || issueLower.includes('ocd') || issueLower.includes('habit')) {
      recommendedCoach = 'alastair';
      reasoning = 'Addictive patterns and compulsions are Alastair\'s focus';
    } else if (issueLower.includes('business') || issueLower.includes('adhd') || issueLower.includes('focus') || issueLower.includes('productivity')) {
      recommendedCoach = 'kainne';
      reasoning = 'Business and ADHD/focus challenges are Kainne\'s strength';
    } else if (issueLower.includes('belief') || issueLower.includes('foundation') || issueLower.includes('basic') || issueLower.includes('starting')) {
      recommendedCoach = 'edward';
      reasoning = 'Foundational work and limiting beliefs are Edward\'s specialty';
    } else if (issueLower.includes('relationship') || issueLower.includes('purpose') || issueLower.includes('life')) {
      recommendedCoach = 'tom';
      reasoning = 'Relationships and life purpose are Tom\'s core areas';
    }
    
    const selection = `# Coach Selection for Your Situation

**Your Issue**: ${issue}
${preferences ? `**Your Preferences**: ${preferences}` : ''}

## Recommended Coach: ${this.coaches[recommendedCoach].name}

**Why**: ${reasoning}

**${this.coaches[recommendedCoach].name}'s Approach**:
- Specialty: ${this.coaches[recommendedCoach].specialty}
- Style: ${this.coaches[recommendedCoach].approach}
- Tools: ${this.coaches[recommendedCoach].key_tools.join(', ')}

## Alternative Options:

${Object.entries(this.coaches)
  .filter(([key, _]) => key !== recommendedCoach)
  .map(([key, coach]) => `**${coach.name}**: ${coach.specialty}`)
  .join('\n')}

## How to Work with ${this.coaches[recommendedCoach].name}:

1. Share your situation openly
2. Be ready for questions, not advice
3. Notice patterns they point out
4. Apply the gateway questions
5. Start with 1% improvements

## Universal THRIVE Tools (All Coaches Use):
- "What WOULD you choose?"
- "What are you putting in?"
- Script identification
- Pattern recognition
- Marginal gains approach

Would you like to start working with ${this.coaches[recommendedCoach].name}, or would you prefer a different coach?`;

    return {
      content: [{
        type: 'text',
        text: selection
      }]
    };
  }
  
  async handleMethodologyGlossary(args) {
    const { term = '' } = args;
    
    console.error(`THRIVE: Glossary lookup${term ? ` for "${term}"` : ''}`);
    
    const glossary = {
      'Script': 'Everything you do that you wouldn\'t consciously choose. Inherited responses from childhood that run automatically.',
      'Sausage Machine': 'Life principle: You get out what you put in. Want different results? Change what you\'re putting in.',
      '13x4': 'Ben Franklin\'s system: 13 virtues/focus areas, one per week, 4 complete cycles per year. Minimum willpower required.',
      'Gateway Questions': 'Two questions that change everything: "What WOULD I choose?" and "What am I putting in?"',
      'Marginal Gains': 'Get 1% better at 100 things rather than 100% better at one thing. British Olympic cycling team strategy.',
      'Authentic Self': 'Who you are when not running Scripts. Your intuition, gut feel, integrity, conscious choice.',
      'Pattern': 'Repeated behaviors/responses that show up across different situations. Usually Script-driven.',
      'Conscious Choice': 'Decisions made with awareness, not from automatic Script responses.',
      'Overwhelm': 'Result of trying to change everything at once. Solved by 13x4 system - one thing per week.',
      'Procrastination': 'Doesn\'t exist. It\'s just not knowing what you really want. Once clear on vision, decisions become simple.',
      'Brother-in-law Test': 'If your brother-in-law doesn\'t laugh at your plan, it\'s reasonable enough to work.',
      'Actors Agents Architects': 'Three levels of consciousness. Actors follow scripts, Agents have operational power, Architects design systems.',
      'Barbarians Stewards Examples': 'Three approaches to life\'s banquet. Barbarians grab, Stewards regulate, Examples demonstrate abundance.',
      'Never Wrong Sometimes Helpful': 'Core principle: Nothing we share is wrong, but it\'s only sometimes helpful for each person.',
      'University of the Will': 'Eating as awareness training. Not about diet, but developing presence and mind-body connection.',
      'Negatively Asymmetric': 'Why 90% fail at change. Focus on the 10% success strategies instead.',
      'What Would You Choose': 'The most powerful question. If you wouldn\'t choose it, it\'s your Script running.',
      'Notice': 'The tool for awareness. Don\'t try to change, just notice. That\'s where transformation begins.'
    };
    
    if (term) {
      // Look for specific term
      const termLower = term.toLowerCase();
      const foundKey = Object.keys(glossary).find(key => key.toLowerCase().includes(termLower));
      
      if (foundKey) {
        return {
          content: [{
            type: 'text',
            text: `# THRIVE Term: ${foundKey}\n\n**Definition**: ${glossary[foundKey]}\n\n**How to Apply**: Ask yourself how this concept shows up in your current situation.`
          }]
        };
      } else {
        return {
          content: [{
            type: 'text',
            text: `Term "${term}" not found in glossary. Available terms:\n\n${Object.keys(glossary).join(', ')}`
          }]
        };
      }
    }
    
    // Return full glossary
    const fullGlossary = `# THRIVE Methodology Glossary

${Object.entries(glossary).map(([key, value]) => `**${key}**:\n${value}`).join('\n\n')}

## Core Teaching:
"${this.tomCoachingStyle.procrastination_example.opening}"

## How to Use These Concepts:
1. Notice which ones resonate with your situation
2. Apply the gateway questions
3. Start with 1% improvement
4. Make it OK to notice patterns
5. Choose consciously, not from Script`;

    return {
      content: [{
        type: 'text',
        text: fullGlossary
      }]
    };
  }
  
  async handleSendResponse(args) {
    const { requestId, response, coach = 'tom' } = args;
    
    console.error(`THRIVE: Sending response for request ${requestId}`);
    
    try {
      // Send response to the bridge server
      const bridgeUrl = 'http://localhost:4571/bridge/response';
      const result = await fetch(bridgeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requestId,
          response,
          coach
        })
      });
      
      if (!result.ok) {
        throw new Error(`Bridge server error: ${result.status}`);
      }
      
      console.error(`THRIVE: Response sent successfully for ${requestId}`);
      
      return {
        content: [{
          type: 'text',
          text: `Response sent to web chat (Request ID: ${requestId})`
        }]
      };
    } catch (error) {
      console.error('THRIVE: Failed to send response:', error);
      return {
        content: [{
          type: 'text',
          text: `Failed to send response: ${error.message}`
        }]
      };
    }
  }
  
  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('THRIVE Coaching Orchestrator running on stdio');
    console.error('Available coaches: Tom, Liz, Dom, Alastair, Kainne, Edward');
  }
}

const orchestrator = new THRIVECoachingOrchestrator();
orchestrator.run().catch(console.error);