#!/usr/bin/env node

/**
 * THRIVE Assessment System - APML v1.1.0 Variable Registry Validation
 *
 * Validates compliance with APML v1.1.0 Variable Registry Standard.
 * Ensures all variable names, data structures, and mappings are
 * consistent across the entire assessment system.
 *
 * APML v1.1.0 Compliance: ✅ Full Registry Coverage
 * Run with: node validate-consistency.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AssessmentValidator {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.optimizationVectorKeys = [
            'structuralEfficiency',
            'individualResilience',
            'organizationalAlignment',
            'workLifeIntegration',
            'meetingCultureOptimization',
            'teamPsychologicalSafety',
            'departmentalDynamics',
            'roleClarity'
        ];
    }

    validate() {
        console.log('🔍 THRIVE Assessment System - APML v1.1.0 Variable Registry Validation');
        console.log('=' .repeat(70));

        this.validateAPMLRegistryCompliance();
        this.validateDiagnosticEngine();
        this.validateQuestionBank();
        this.validateAdaptiveController();
        this.validateDimensionMappings();
        this.validateQuestionIntegrity();
        this.validateDatabaseSchema();

        this.printResults();
        return this.errors.length === 0;
    }

    validateAPMLRegistryCompliance() {
        console.log('\n📋 Validating APML v1.1.0 Registry Compliance...');

        // Check if .apml-registry.json exists
        const registryPath = path.join(__dirname, '..', '.apml-registry.json');
        if (!fs.existsSync(registryPath)) {
            this.addError('Missing required .apml-registry.json file for APML v1.1.0 compliance');
            return;
        }

        try {
            const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

            // Validate required registry structure
            if (!registry.project || !registry.variable_registry || !registry.components) {
                this.addError('Invalid .apml-registry.json structure - missing required sections');
            }

            // Validate APML version compliance
            if (registry.project?.apml_specification_version !== '1.1.0') {
                this.addError(`Expected APML version 1.1.0, found ${registry.project?.apml_specification_version}`);
            }

            // Validate optimization vector keys match registry
            const registryKeys = registry.data_structures?.OptimizationVector?.keys || [];
            this.optimizationVectorKeys.forEach(key => {
                if (!registryKeys.includes(key)) {
                    this.addError(`Optimization vector key '${key}' not documented in APML registry`);
                }
            });

            console.log('   ✅ APML v1.1.0 registry structure validated');
        } catch (error) {
            this.addError(`Failed to parse .apml-registry.json: ${error.message}`);
        }
    }

    validateDiagnosticEngine() {
        console.log('\n📊 Validating Diagnostic Engine...');

        const content = this.readFile('diagnostic-engine.js');
        if (!content) return;

        // Check optimization vector initialization
        const vectorMatch = content.match(/this\.optimizationVector\s*=\s*{([^}]+)}/s);
        if (vectorMatch) {
            const vectorContent = vectorMatch[1];
            this.optimizationVectorKeys.forEach(key => {
                if (!vectorContent.includes(key)) {
                    this.addError(`Diagnostic Engine missing optimization vector key: ${key}`);
                }
            });
        } else {
            this.addError('Could not find optimization vector initialization in diagnostic engine');
        }

        // Check calculation methods exist
        this.optimizationVectorKeys.forEach(key => {
            const methodName = `calculate${key.charAt(0).toUpperCase() + key.slice(1)}`;
            if (!content.includes(methodName)) {
                this.addWarning(`Missing calculation method for ${key}: ${methodName}`);
            }
        });

        console.log('   ✓ Diagnostic engine structure validated');
    }

    validateQuestionBank() {
        console.log('\n❓ Validating Question Bank...');

        const content = this.readFile('question-bank.js');
        if (!content) return;

        // Extract all questions
        const questions = this.extractQuestions(content);
        console.log(`   📝 Found ${questions.length} questions`);

        // Validate question IDs are unique
        const questionIds = questions.map(q => q.id).filter(Boolean);
        const duplicateIds = questionIds.filter((id, index) => questionIds.indexOf(id) !== index);
        if (duplicateIds.length > 0) {
            this.addError(`Duplicate question IDs found: ${duplicateIds.join(', ')}`);
        }

        // Validate signal categories reference optimization vector keys
        questions.forEach(question => {
            if (question.signals) {
                Object.keys(question.signals).forEach(category => {
                    if (!this.isValidSignalCategory(category)) {
                        this.addWarning(`Question ${question.id} uses invalid signal category: ${category}`);
                    }
                });
            }
        });

        // Validate question types
        const validTypes = ['entry', 'targeted', 'broad', 'validation'];
        questions.forEach(question => {
            if (question.type && !validTypes.includes(question.type)) {
                this.addError(`Question ${question.id} has invalid type: ${question.type}`);
            }
        });

        console.log('   ✓ Question bank structure validated');
    }

    validateAdaptiveController() {
        console.log('\n🎮 Validating Adaptive Controller...');

        const content = this.readFile('adaptive-controller.js');
        if (!content) return;

        // Extract dimension name mappings
        const dimensionNameMatch = content.match(/getDimensionName\(dimension\)\s*{[^}]*const\s+names\s*=\s*{([^}]+)}/s);
        if (dimensionNameMatch) {
            const mappingContent = dimensionNameMatch[1];
            this.optimizationVectorKeys.forEach(key => {
                if (!mappingContent.includes(key)) {
                    this.addError(`Adaptive Controller missing dimension name mapping for: ${key}`);
                }
            });
        } else {
            this.addError('Could not find getDimensionName mapping in adaptive controller');
        }

        // Extract dimension description mappings
        const dimensionDescMatch = content.match(/getDimensionDescription\(dimension\)\s*{[^}]*const\s+descriptions\s*=\s*{([^}]+)}/s);
        if (dimensionDescMatch) {
            const descContent = dimensionDescMatch[1];
            this.optimizationVectorKeys.forEach(key => {
                if (!descContent.includes(key)) {
                    this.addError(`Adaptive Controller missing dimension description for: ${key}`);
                }
            });
        }

        // Extract intervention mappings
        const interventionMatch = content.match(/getDefaultIntervention\(primaryDysfunction\)\s*{[^}]*const\s+interventions\s*=\s*{([^}]+)}/s);
        if (interventionMatch) {
            const interventionContent = interventionMatch[1];
            this.optimizationVectorKeys.forEach(key => {
                if (!interventionContent.includes(key)) {
                    this.addError(`Adaptive Controller missing intervention mapping for: ${key}`);
                }
            });
        }

        console.log('   ✓ Adaptive controller mappings validated');
    }

    validateDimensionMappings() {
        console.log('\n🔗 Cross-validating Dimension Mappings...');

        const diagnosticContent = this.readFile('diagnostic-engine.js');
        const controllerContent = this.readFile('adaptive-controller.js');

        if (!diagnosticContent || !controllerContent) return;

        // Check that optimization vector updates match dimension mappings
        this.optimizationVectorKeys.forEach(key => {
            const updatePattern = new RegExp(`this\\.optimizationVector\\.${key}\\s*=`, 'g');
            const updateMatches = diagnosticContent.match(updatePattern);

            if (!updateMatches || updateMatches.length === 0) {
                this.addError(`Optimization vector key '${key}' is never updated in diagnostic engine`);
            }

            // Check mapping exists in controller
            if (!controllerContent.includes(key)) {
                this.addError(`Optimization vector key '${key}' not found in adaptive controller mappings`);
            }
        });

        console.log('   ✓ Cross-validation completed');
    }

    validateQuestionIntegrity() {
        console.log('\n🔍 Validating Question Integrity...');

        const content = this.readFile('question-bank.js');
        if (!content) return;

        const questions = this.extractQuestions(content);

        // Check for questions with missing required fields
        questions.forEach(question => {
            if (!question.id) {
                this.addError(`Question missing ID: ${JSON.stringify(question).slice(0, 100)}...`);
            }
            if (!question.text) {
                this.addError(`Question ${question.id} missing text`);
            }
            if (!question.options || question.options.length !== 4) {
                this.addError(`Question ${question.id} should have exactly 4 options`);
            }
            if (!question.signals) {
                this.addWarning(`Question ${question.id} has no signals defined`);
            }
        });

        // Validate option structure
        questions.forEach(question => {
            if (question.options) {
                question.options.forEach((option, index) => {
                    if (typeof option.value !== 'number' || typeof option.text !== 'string') {
                        this.addError(`Question ${question.id} option ${index} has invalid structure`);
                    }
                });
            }
        });

        console.log('   ✓ Question integrity validated');
    }

    validateDatabaseSchema() {
        console.log('\n🗄️  Validating Database Schema Compliance...');

        const schemaContent = this.readFile('supabase-schema.sql');
        if (!schemaContent) return;

        // Check for required tables
        const requiredTables = ['assessment_sessions', 'assessment_responses', 'diagnostic_results'];
        requiredTables.forEach(table => {
            if (!schemaContent.includes(`CREATE TABLE ${table}`)) {
                this.addError(`Missing required database table: ${table}`);
            }
        });

        // Check for optimization vector field mapping
        if (schemaContent.includes('diagnostic_vector') && !schemaContent.includes('optimization_vector')) {
            this.addWarning('Database schema uses legacy diagnostic_vector field name');
        }

        // Check for proper constraints
        if (!schemaContent.includes('CHECK(status IN')) {
            this.addError('Missing status validation constraints in database schema');
        }

        console.log('   ✓ Database schema structure validated');
    }

    extractQuestions(content) {
        const questions = [];

        // Simple regex to extract question objects - this is a basic implementation
        // In a real scenario, you might want to use an AST parser for more accuracy
        const questionPattern = /{[^}]*id:\s*['""]([^'"]*)['""][^}]*}/g;
        let match;

        while ((match = questionPattern.exec(content)) !== null) {
            try {
                // This is a simplified extraction - in reality you'd want more robust parsing
                const questionText = match[0];
                const id = match[1];

                questions.push({
                    id,
                    text: this.extractField(questionText, 'text'),
                    type: this.extractField(questionText, 'type'),
                    signals: questionText.includes('signals:') ? {} : null,
                    options: questionText.includes('options:') ? [] : null
                });
            } catch (e) {
                this.addWarning(`Could not parse question: ${match[1]}`);
            }
        }

        return questions;
    }

    extractField(questionText, fieldName) {
        const pattern = new RegExp(`${fieldName}:\\s*['""]([^'"]*)['""]`);
        const match = questionText.match(pattern);
        return match ? match[1] : null;
    }

    isValidSignalCategory(category) {
        const validCategories = [
            'structuralEfficiency', 'structural',
            'individualResilience', 'individual',
            'organizationalAlignment', 'organizational',
            'workLifeIntegration', 'worklife',
            'meetingCultureOptimization', 'meetings',
            'teamPsychologicalSafety', 'psychologicalSafety',
            'departmentalDynamics', 'departmental',
            'roleClarity',
            'validation'
        ];
        return validCategories.includes(category);
    }

    readFile(filename) {
        try {
            return fs.readFileSync(path.join(__dirname, filename), 'utf8');
        } catch (error) {
            this.addError(`Could not read file: ${filename} - ${error.message}`);
            return null;
        }
    }

    addError(message) {
        this.errors.push(message);
        console.log(`   ❌ ERROR: ${message}`);
    }

    addWarning(message) {
        this.warnings.push(message);
        console.log(`   ⚠️  WARNING: ${message}`);
    }

    printResults() {
        console.log('\n' + '='.repeat(60));
        console.log('📋 VALIDATION RESULTS');
        console.log('='.repeat(60));

        if (this.errors.length === 0 && this.warnings.length === 0) {
            console.log('✅ All validations passed! System is consistent.');
        } else {
            if (this.errors.length > 0) {
                console.log(`❌ ${this.errors.length} CRITICAL ERRORS found:`);
                this.errors.forEach((error, index) => {
                    console.log(`   ${index + 1}. ${error}`);
                });
            }

            if (this.warnings.length > 0) {
                console.log(`⚠️  ${this.warnings.length} WARNINGS found:`);
                this.warnings.forEach((warning, index) => {
                    console.log(`   ${index + 1}. ${warning}`);
                });
            }
        }

        console.log('\n📊 Summary:');
        console.log(`   Errors: ${this.errors.length}`);
        console.log(`   Warnings: ${this.warnings.length}`);
        console.log(`   Status: ${this.errors.length === 0 ? '✅ PASS' : '❌ FAIL'}`);
    }
}

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const validator = new AssessmentValidator();
    const isValid = validator.validate();
    process.exit(isValid ? 0 : 1);
}

export default AssessmentValidator;