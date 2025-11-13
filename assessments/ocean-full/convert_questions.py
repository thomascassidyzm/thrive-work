#!/usr/bin/env python3
"""Convert JavaScript question banks to JSON format"""

import json
import re
import os

def extract_questions_from_js(filepath):
    """Extract questions array from JavaScript file"""
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the array of questions
    # Pattern: const xxx = [ ... ];
    match = re.search(r'const\s+\w+\s*=\s*(\[[\s\S]*?\]);', content)
    if not match:
        print(f"Warning: Could not extract questions from {filepath}")
        return []

    array_content = match.group(1)

    # Replace JavaScript with JSON-compatible syntax
    # Convert single quotes to double quotes (simple approach)
    array_content = array_content.replace("'", '"')
    # Remove trailing commas before closing brackets/braces
    array_content = re.sub(r',(\s*[\]}])', r'\1', array_content)

    try:
        questions = json.loads(array_content)
        return questions
    except json.JSONDecodeError as e:
        print(f"Error parsing {filepath}: {e}")
        return []

def main():
    question_banks_dir = '../../question-banks'
    output_file = 'questions.json'

    all_questions = []
    question_count_by_bank = {}

    # List of question bank files
    banks = [
        'universal-launch-questions.js',
        'group-dynamics-questions.js',
        'authority-relationships-questions.js',
        'conflict-patterns-questions.js',
        'creative-expression-questions.js',
        'trust-vulnerability-questions.js',
        'discipline-impulse-questions.js',
        'thrive-time-questions.js',
        'thrive-health-questions.js',
        'thrive-relationships-questions.js',
        'thrive-identity-questions.js',
        'thrive-vitality-questions.js',
        'thrive-environment-questions.js',
        'home-work-influence-questions.js'
    ]

    for bank_file in banks:
        filepath = os.path.join(question_banks_dir, bank_file)
        if os.path.exists(filepath):
            questions = extract_questions_from_js(filepath)
            question_count_by_bank[bank_file] = len(questions)
            all_questions.extend(questions)
            print(f"✓ Loaded {len(questions)} questions from {bank_file}")
        else:
            print(f"✗ File not found: {filepath}")

    # Build the full assessment JSON
    assessment_data = {
        "assessment_meta": {
            "id": "ocean_full_v1",
            "title": "Complete OCEAN Behavioral Analysis",
            "description": "Comprehensive personality and behavioral assessment covering all life domains - work, relationships, personal growth, and wellbeing",
            "version": "1.0",
            "estimated_time_minutes": 40,
            "target_audience": "General - All users",
            "privacy_level": "mixed",
            "question_count": len(all_questions),
            "question_banks_included": list(question_count_by_bank.keys())
        },
        "instructions": {
            "intro": "This is a comprehensive assessment that explores how you think, feel, and behave across different life situations. Your responses help create a rich profile of your personality patterns.",
            "response_format": "Scenario-based: Choose the response that best matches how you'd naturally act",
            "time_guidance": "Take your time - most people need 30-45 minutes. You can pause and return anytime.",
            "privacy_note": "Questions are classified by privacy level. Some workplace patterns may be shared with employers (aggregated only), while personal questions remain private to you."
        },
        "questions": all_questions,
        "statistics": {
            "total_questions": len(all_questions),
            "questions_by_bank": question_count_by_bank
        }
    }

    # Write to JSON file
    with open(output_file, 'w') as f:
        json.dump(assessment_data, f, indent=2)

    print(f"\n✓ Successfully created {output_file}")
    print(f"✓ Total questions: {len(all_questions)}")
    print(f"✓ Question banks: {len(question_count_by_bank)}")

if __name__ == '__main__':
    main()
