#!/usr/bin/env node

// APPLY PRIVACY TAGS TO ALL QUESTION BANKS
// This script reads all question bank files and adds dataAccess tags

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { tagQuestionBank, validateQuestionPrivacy } from '../utils/question-privacy-tagger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Question bank files to process
const questionBankFiles = [
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
    'thrive-environment-questions.js'
];

const questionBanksDir = path.join(__dirname, '../question-banks');

/**
 * Process a single question bank file
 */
async function processQuestionBank(filename) {
    console.log(`\n📝 Processing: ${filename}`);

    const filepath = path.join(questionBanksDir, filename);

    // Check if file exists
    if (!fs.existsSync(filepath)) {
        console.log(`⚠️  File not found, skipping: ${filename}`);
        return {
            filename,
            status: 'skipped',
            reason: 'file not found'
        };
    }

    try {
        // Read the file
        const content = fs.readFileSync(filepath, 'utf8');

        // Extract the questions array variable name
        const arrayNameMatch = content.match(/const\s+(\w+)\s*=\s*\[/);
        if (!arrayNameMatch) {
            console.log(`⚠️  Could not find questions array in ${filename}`);
            return {
                filename,
                status: 'skipped',
                reason: 'no questions array found'
            };
        }

        const arrayName = arrayNameMatch[1];
        console.log(`   Found questions array: ${arrayName}`);

        // Import the module to get actual questions
        const module = await import(filepath);
        const questions = module[arrayName] || module.default;

        if (!questions || !Array.isArray(questions)) {
            console.log(`⚠️  Could not load questions from ${filename}`);
            return {
                filename,
                status: 'error',
                reason: 'could not load questions array'
            };
        }

        console.log(`   Found ${questions.length} questions`);

        // Apply privacy tags
        const taggedQuestions = tagQuestionBank(questions);

        // Validate all tagged questions
        let validCount = 0;
        let invalidCount = 0;
        const validationErrors = [];

        taggedQuestions.forEach((q, index) => {
            const validation = validateQuestionPrivacy(q);
            if (validation.valid) {
                validCount++;
            } else {
                invalidCount++;
                validationErrors.push({
                    questionId: q.id || `index_${index}`,
                    errors: validation.errors
                });
            }
        });

        console.log(`   ✅ Valid: ${validCount}, ❌ Invalid: ${invalidCount}`);

        if (invalidCount > 0) {
            console.log(`   Validation errors:`);
            validationErrors.forEach(err => {
                console.log(`      ${err.questionId}: ${err.errors.join(', ')}`);
            });
        }

        // Generate new file content
        const newContent = generateFileContent(arrayName, taggedQuestions, content);

        // Write back to file (with .tagged.js extension for safety)
        const backupPath = filepath + '.backup';
        const taggedPath = filepath.replace('.js', '.tagged.js');

        fs.copyFileSync(filepath, backupPath);
        fs.writeFileSync(taggedPath, newContent, 'utf8');

        console.log(`   💾 Backup saved: ${filename}.backup`);
        console.log(`   ✨ Tagged version: ${filename.replace('.js', '.tagged.js')}`);

        return {
            filename,
            status: 'success',
            questionCount: questions.length,
            validCount,
            invalidCount,
            backupPath,
            taggedPath
        };

    } catch (error) {
        console.error(`   ❌ Error processing ${filename}:`, error.message);
        return {
            filename,
            status: 'error',
            reason: error.message
        };
    }
}

/**
 * Generate new file content with privacy tags
 */
function generateFileContent(arrayName, taggedQuestions, originalContent) {
    // Extract header comment
    const headerMatch = originalContent.match(/^(\/\/.*\n)+/);
    const header = headerMatch ? headerMatch[0] : '';

    // Generate questions with privacy tags
    const questionsJS = JSON.stringify(taggedQuestions, null, 4)
        // Make it look more like the original format
        .replace(/"(\w+)":/g, '$1:')  // Remove quotes from keys
        .replace(/"/g, "'");  // Use single quotes

    return `${header}
// 🔒 PRIVACY TAGS APPLIED
// Generated by apply-privacy-tags.js
// dataAccess rules define employee vs employer visibility

const ${arrayName} = ${questionsJS};

export { ${arrayName} };
`;
}

/**
 * Main execution
 */
async function main() {
    console.log('🔒 OCEAN Question Bank Privacy Tagger');
    console.log('=====================================\n');
    console.log('Applying privacy schema to all question banks...\n');

    const results = [];

    for (const filename of questionBankFiles) {
        const result = await processQuestionBank(filename);
        results.push(result);
    }

    // Summary
    console.log('\n\n📊 SUMMARY');
    console.log('==========');

    const successful = results.filter(r => r.status === 'success');
    const skipped = results.filter(r => r.status === 'skipped');
    const errors = results.filter(r => r.status === 'error');

    console.log(`✅ Successfully processed: ${successful.length}`);
    console.log(`⚠️  Skipped: ${skipped.length}`);
    console.log(`❌ Errors: ${errors.length}`);

    if (successful.length > 0) {
        console.log('\n✨ Tagged files created with .tagged.js extension');
        console.log('💾 Original files backed up with .backup extension');
        console.log('\n📝 Next steps:');
        console.log('   1. Review .tagged.js files');
        console.log('   2. If satisfied, rename .tagged.js to .js');
        console.log('   3. Delete .backup files');
    }

    const totalQuestions = successful.reduce((sum, r) => sum + (r.questionCount || 0), 0);
    const totalValid = successful.reduce((sum, r) => sum + (r.validCount || 0), 0);
    const totalInvalid = successful.reduce((sum, r) => sum + (r.invalidCount || 0), 0);

    console.log(`\n📈 Total questions processed: ${totalQuestions}`);
    console.log(`   Valid: ${totalValid}`);
    console.log(`   Invalid: ${totalInvalid}`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(console.error);
}

export { processQuestionBank, generateFileContent };
