# Security Guidance

## Information Security Disclaimer

This **OnD-AI-coding Guide** is an educational exercise by and for IT professionals and individuals interested in exploring local AI coding with open tools and open-weights models. Its content is provided for learning and discussion. It has not been prepared as a security standard or assessment.

References to third-party tools (for example, LM Studio, opencode, and open-weights models) are informational. When using any referenced tools or code, follow applicable security best practices and, in enterprise environments, the established software and security policies.

**In general:**
Use or adoption of material from this repository should take account of the relevant security, privacy, legal, licensing, procurement, operational, and data-handling considerations. Where organizational policies or processes apply, they govern that use.

## Guidance for Experimentation

For exploratory use, consider starting in an isolated lab environment with non-sensitive or synthetic data.

- When using these tools on managed devices, with organizational accounts, or with organizational information, follow the policies and processes that apply to that environment.
- Local execution does not, on its own, establish that inputs, outputs, dependencies, or generated code are suitable for sensitive or regulated use.
- Take particular care with high-privilege accounts and credentials in experimental workflows, applying the controls required by the relevant environment.
- Review and test AI-generated scripts and code using the controls appropriate to the target environment before relying on them.
- Do not include organizational details, credentials, internal hostnames or configuration, personal data, screenshots or any other details potentially associated with an organization in contributions to this public repository.

## Organizational Adoption

An organization may choose to evaluate or adopt any of the tools or approaches discussed here. The organization's applicable security, privacy, legal, procurement, and operational policies and processes should guide that decision.

Nothing in this repository supersedes those policies and processes or constitutes authorization to deploy a tool, process organizational data, or use an organizational identity.

## Use Case Examples

| Environment | Supported |
| --- | --- |
| Personal or isolated lab hardware | ✅ Yes — intended use |
| Organization-managed laptops and endpoints | ❌ No — do not install |
| Organization accounts (any privilege level) | ❌ No — do not sign in or configure with |
| Organization high-privilege accounts (admin, global admin, service, break-glass) | ❌ Never |
| Organization code, documents, credentials, or personal data as model input | ❌ No |
| Official software development work for the Organization | ❌ No — see below |

## Reporting a Vulnerability or Concern

This is an educational repository with no formal security support or service-level commitment.

- For issues in this repository's content or guides, such as unsafe documentation or defaults, open a GitHub issue or pull request.
- Report vulnerabilities in referenced third-party tools or models to their respective maintainers; this project does not triage or patch third-party software.
- For a concern involving an organization's accounts, devices, or data, use that organization's established security or incident-reporting channels.

## Supported Versions

None. Content is provided as-is for learning purposes and may be outdated at any time. No security patches, advisories, or maintenance commitments apply.
