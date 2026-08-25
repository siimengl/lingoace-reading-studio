'use client';

import { InstructionalBrief, QAResult } from '@/types';
import { candidateA, candidateB, candidateC } from '@/data/benchmarkCandidates';
import { computeQA } from '@/utils/qa';

interface ModelBenchmarkProps {
  brief: InstructionalBrief;
}

interface CandidateMetrics {
  name: string;
  qa: QAResult;
  description: string;
}

export default function ModelBenchmark({ brief }: ModelBenchmarkProps) {
  const candidates: CandidateMetrics[] = [
    {
      name: 'Candidate A',
      qa: computeQA(brief, candidateA),
      description: 'Strong coverage and structure; higher human-review burden',
    },
    {
      name: 'Candidate B',
      qa: computeQA(brief, candidateB),
      description: 'Safer language; insufficient target coverage',
    },
    {
      name: 'Candidate C',
      qa: computeQA(brief, candidateC),
      description: 'Strong coverage; structurally blocked',
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">
          Model Evaluation Framework
        </h3>
        <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 rounded mb-3">
          <span className="text-xs font-medium text-blue-900">Illustrative benchmark</span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed mb-5">
          Compare candidate outputs for Chinese curriculum production. Illustrative data only; no vendor performance claims.
        </p>
      </div>

      <div className="space-y-4">
        {candidates.map((candidate) => (
          <div key={candidate.name} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-gray-900">{candidate.name}</h4>
            </div>

            <div className="text-[11px] text-gray-600 mb-3 leading-relaxed">
              {candidate.description}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Target Vocabulary Coverage</span>
                <span className={`font-medium ${
                  candidate.qa.passageTargetVocabularyCoverage >= 80
                    ? 'text-green-700'
                    : candidate.qa.passageTargetVocabularyCoverage >= 60
                    ? 'text-amber-700'
                    : 'text-red-700'
                }`}>
                  {candidate.qa.passageTargetVocabularyCoverage}%
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Target Character Coverage</span>
                <span className={`font-medium ${
                  candidate.qa.passageTargetCharacterCoverage >= 80
                    ? 'text-green-700'
                    : candidate.qa.passageTargetCharacterCoverage >= 60
                    ? 'text-amber-700'
                    : 'text-red-700'
                }`}>
                  {candidate.qa.passageTargetCharacterCoverage}%
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Length Constraint</span>
                <span className={`font-medium ${
                  candidate.qa.lengthConstraintMet ? 'text-green-700' : 'text-red-700'
                }`}>
                  {candidate.qa.lengthConstraintMet ? 'Met' : 'Not met'}
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Required Sections</span>
                <span className={`font-medium ${
                  candidate.qa.requiredSectionsComplete ? 'text-green-700' : 'text-red-700'
                }`}>
                  {candidate.qa.requiredSectionsComplete ? 'Complete' : 'Incomplete'}
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Schema Validity</span>
                <span className={`font-medium ${
                  candidate.qa.schemaValid ? 'text-green-700' : 'text-red-700'
                }`}>
                  {candidate.qa.schemaValid ? 'Valid' : 'Invalid'}
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Advanced Terms Detected</span>
                <span className={`font-medium ${
                  candidate.qa.advancedTerms.length === 0
                    ? 'text-green-700'
                    : candidate.qa.advancedTerms.length <= 2
                    ? 'text-amber-700'
                    : 'text-red-700'
                }`}>
                  {candidate.qa.advancedTerms.length === 0
                    ? 'None'
                    : `${candidate.qa.advancedTerms.length} (${candidate.qa.advancedTerms.join(', ')})`}
                </span>
              </div>

              <div className="pt-2 border-t border-gray-300 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Latency</span>
                  <span className="text-gray-500">Not measured</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Cost</span>
                  <span className="text-gray-500">Not measured</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Human Review</span>
                  <span className="font-medium text-gray-900">Required</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-300 pt-4">
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <div className="text-xs font-semibold text-gray-900 mb-1">
            Recommended for revision: Candidate A
          </div>
          <div className="text-xs text-gray-700 leading-relaxed">
            Best constraint coverage and structural reliability; simplify advanced vocabulary before pilot.
          </div>
        </div>

        <h4 className="text-xs font-semibold text-gray-900 mb-3">Decision Criteria</h4>
        <ul className="text-xs text-gray-700 space-y-1.5 leading-relaxed">
          <li>• <span className="font-medium">Instructional quality</span> — pedagogical appropriateness and learning objective alignment</li>
          <li>• <span className="font-medium">Constraint adherence</span> — target vocabulary/character coverage and length requirements</li>
          <li>• <span className="font-medium">Chinese naturalness</span> — idiomatic expression and age-appropriate language</li>
          <li>• <span className="font-medium">Structured-output reliability</span> — schema validity and required sections completeness</li>
          <li>• <span className="font-medium">Human-review burden</span> — advanced terms requiring expert verification</li>
          <li>• <span className="font-medium">Latency & cost</span> — operational efficiency for production workflows</li>
        </ul>
        <p className="text-[11px] text-gray-500 mt-3 leading-relaxed">
          Deterministic checks support model selection but expert curriculum judgment remains required for all generated content.
        </p>
      </div>
    </div>
  );
}
