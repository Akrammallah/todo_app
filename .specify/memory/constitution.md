<!-- SYNC IMPACT REPORT:
Version change: 1.0.0 → 1.1.0
Modified principles: None
Added sections: Phase Technology Matrix (Phase I, II, III+)
Removed sections: None
Templates requiring updates:
- .specify/templates/plan-template.md ✅ aligned
- .specify/templates/spec-template.md ✅ aligned
- .specify/templates/tasks-template.md ✅ aligned
Follow-up TODOs: None
-->
# Evolution of Todo Constitution

## Core Principles

### I. Spec-Driven Development (NON-NEGOTIABLE)
All development work must follow the strict sequence: Constitution → Specifications → Plan → Tasks → Implementation. No agent may write code without approved specifications and corresponding task breakdowns. This ensures architectural coherence, traceability, and prevents feature creep.

### II. Agent Behavior Rules
Agents must strictly adhere to approved specifications without deviation. No manual coding by humans, no feature invention beyond scope, no implementation of future-phase features in earlier phases. Refinement must occur at the specification level, not during code implementation.

### III. Phase Governance
Each development phase is strictly governed by its approved specification. Future-phase features must never leak into earlier phases. Architecture may evolve only through updated specifications and plans, not through implementation-level modifications.

### IV. Phase Technology Matrix (AUTHORITATIVE)
The project MUST strictly adhere to the technology matrix defined below. No technology may be introduced before its designated phase. This matrix is the authoritative technology policy for all phases.

#### Phase I: Console Application (MVP)
- **Backend**: Python in-memory data structures
- **Database**: In-memory Python lists/dicts only (no persistence)
- **Frontend**: Console/command-line interface (CLI)
- **Authentication**: Not allowed (Phase II+)
- **Architecture**: Single-file or simple module console application
- **Rules**:
  - No web frontend
  - No database persistence
  - No user authentication
  - No external services or APIs

#### Phase II: Full-Stack Web Application
- **Backend**: Python REST API
- **Database**: Neon Serverless PostgreSQL
- **ORM/Data layer**: SQLModel or equivalent
- **Frontend**: Next.js (React, TypeScript)
- **Authentication**: Better Auth (signup/signin)
- **Architecture**: Full-stack web application with separate backend and frontend
- **Rules**:
  - Web frontend is allowed
  - Database persistence is required
  - User authentication is required
  - No AI or agent frameworks

#### Phase III and Later: Advanced Infrastructure
- **Backend**: Advanced cloud infrastructure (Kubernetes, microservices, etc.)
- **Database**: Advanced data patterns (caching, replication, etc.)
- **ORM/Data layer**: Advanced data access patterns
- **Frontend**: Advanced frontend capabilities
- **Authentication**: Advanced auth patterns (SSO, OAuth, etc.)
- **Architecture**: Orchestration, agents, AI integration, distributed systems
- **Rules**:
  - AI and agent frameworks are allowed
  - Advanced cloud infrastructure is allowed
  - Orchestration and messaging systems are allowed

**Phase Isolation Principle**: Technologies from later phases MUST NOT be introduced in earlier phases. Each phase builds on the previous phase's foundation without contaminating it with future-phase complexity.

### V. Quality Principles
All code must follow clean architecture principles with stateless services where required, clear separation of concerns, and cloud-native readiness. Code must be testable, maintainable, and follow the smallest viable change principle.

### VI. Implementation Discipline
All work must follow the smallest viable diff principle. No unrelated refactoring, no feature additions beyond approved scope. Code references must be precise, error handling explicit, and acceptance criteria testable.

## Additional Constraints

### Security and Compliance
- No hardcoding of secrets or tokens; use proper environment configuration
- Follow security best practices for all components
- Maintain clear audit trails for all operations
- Implement proper authentication and authorization patterns (Phase II+)

### Development Workflow

### Specification Process
1. All features must begin with a detailed specification document
2. Specifications must include acceptance criteria, error paths, and performance requirements
3. Specifications require approval before any implementation begins
4. Changes to specifications must follow the amendment process

### Task Generation
1. All work must be broken down into testable tasks
2. Tasks must reference specific code locations and expected outcomes
3. Each task must have clear acceptance criteria
4. Tasks must align with the approved specification

### Implementation Process
1. Follow the Red-Green-Refactor cycle where applicable
2. Maintain small, focused commits with clear messages
3. Include tests for all new functionality
4. Ensure all existing tests continue to pass

## Governance

This constitution serves as the supreme governing document for all agents working on the Evolution of Todo project. All agents must comply with these principles, and any deviation requires formal amendment to this constitution.

Amendments must be documented with clear rationale, approved by project stakeholders, and include a migration plan if necessary. All pull requests and code reviews must verify compliance with these principles.

The constitution remains stable across all phases and supersedes any conflicting practices or guidelines. Use this constitution as the primary reference for all development decisions.

**Version**: 1.1.0 | **Ratified**: 2025-12-28 | **Last Amended**: 2025-12-29
