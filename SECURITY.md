# Security Policy

## Scope and Security Posture

**OnD-AI-coding** is an informal educational exercise for ICT staff interested in exploring local AI coding with open tools and open-weights models. It is **not** a formal ICT initiative, product, or supported platform.

Accordingly, this project has **no enterprise security posture**:

- The tools and models referenced (e.g., LM Studio, opencode, open-weights models) have **not** been security-reviewed, risk-assessed, or approved for organizational use.
- Nothing in this repository was designed with, or evaluated against, **the Organization's Enterprise Cybersecurity controls** — endpoint protection, identity and access management, data loss prevention, software supply-chain vetting, logging/monitoring, or vulnerability management.
- All components should be treated as **unvetted third-party software** carrying supply-chain, licensing, and integrity risks that participants must assess for themselves.

## Supported Environments

| Environment | Supported |
| --- | --- |
| Personal or isolated lab hardware | ✅ Yes — intended use |
| Organization-managed laptops and endpoints | ❌ No — do not install |
| Organization accounts (any privilege level) | ❌ No — do not sign in or configure with |
| Organization high-privilege accounts (admin, global admin, service, break-glass) | ❌ Never |
| Organization code, documents, credentials, or personal data as model input | ❌ No |
| Official software development work for the Organization | ❌ No — see below |

## Rules for Safe Experimentation

If you explore this material, keep it **entirely outside the Organization's boundaries**:

1. **Personal or lab hardware only.** Never run the inference engines, models, or coding agents described here on Organization-managed devices. The install commands in this repo (e.g., `winget`) must not be executed on managed endpoints.
2. **No organizational identities.** Never authenticate any tool in this stack with Organization accounts — and under no circumstances with high-privilege accounts.
3. **No organizational data.** "Local" does not mean "reviewed" or "safe for sensitive data." Do not feed Organization code, documents, credentials, or personal data into these tools.
4. **Treat AI-generated output as untrusted.** Scripts and code produced during experimentation must never be run against, or carried into, the Organization's systems or environments.
5. **Mind what you contribute.** Challenge submissions to this public repository must not contain hostnames, internal configuration details, credentials, or screenshots from work devices.

## Official Software Development

Software built or maintained for the Organization must follow the **Organization's Software Development Lifecycle (SDLC) standards** and use approved, governed platforms, including:

- **Azure DevOps** — source control, pipelines, and work management under organizational governance
- **GitHub Advanced Security** — code scanning, secret scanning, dependency review, and supply-chain protection
- Approved AI-assisted development tooling provisioned by ICT, operating within the Organization's identity, data protection, and monitoring boundaries

These platforms exist precisely because they carry the enterprise controls this project does not.

## Reporting a Vulnerability or Concern

This is an educational repository with no formal security support or SLA.

- **Issues in this repo's content or guides** (e.g., a documented command that creates unnecessary risk, an unsafe default configuration): open a GitHub issue or pull request.
- **Vulnerabilities in the third-party tools or models** referenced here (LM Studio, opencode, model weights): report them upstream to the respective maintainers — this project does not triage or patch third-party software.
- **Suspected misuse involving Organization accounts, devices, or data**: report through standard Organization ICT/Cybersecurity incident channels, not through this repository.

## Supported Versions

None. Content is provided as-is for learning purposes and may be outdated at any time. No security patches, advisories, or maintenance commitments apply.

---

*Questions about approved development tooling, AI platforms, or security review of new technologies should be directed to your ICT/Cybersecurity function through standard channels.*
