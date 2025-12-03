---
title: 'AWS Certified Security - Specialty Exam Notes'
date: '2025-12-03'
category: 'Certifications'
---

# AWS Certified Security - Specialty Exam Notes

# By: Vishnu Vardhan Ciripuram

## Domain 1: Threat Detection & Incident Response

### Incident Response

- Have a clear IR plan ready - define roles, escalation process, and runbooks
- Use AWS Security Finding Format (ASFF) for consistent incident data
- Automate responses when possible (e.g., isolate compromised instances)
- **Drill your plan regularly!**

### Amazon GuardDuty

- **"Enable and forget"** - one-click, no agents needed
- Uses ML, anomaly detection, and threat intel feeds
- Monitors: CloudTrail events, VPC Flow Logs, DNS queries, S3 logs, EBS/EKS audit logs
- Flags suspicious activity: unusual IPs, disabled logging, crypto-mining
- Region-specific but can be managed across accounts
- Findings: Low/Medium/High/Critical severity
- **Zero performance impact, no infrastructure needed**
- Set up automated responses via EventBridge → SNS/Lambda

### Amazon Macie

- **Data detective for S3**
- Discovers and classifies sensitive data (PII, financial info, secrets) using ML
- Alerts on: publicly accessible buckets, unencrypted objects
- Great for compliance (GDPR, PCI)
- Integrates with Security Hub, sends alerts via EventBridge
- **S3-focused only**

### AWS Security Hub

- Central security dashboard aggregating findings from multiple services
- Normalizes findings into ASFF (standard JSON format)
- Checks against benchmarks: CIS AWS Foundations, PCI-DSS
- Can trigger automated responses
- Use with Organizations to auto-enable on new accounts
- **Not just passive - actively monitors compliance**

### Amazon Detective

- Investigates security issues by visualizing relationships
- Collates: CloudTrail, VPC Flow Logs, GuardDuty findings
- Uses ML and graph theory to link who/what/when
- **Used AFTER you have a finding** (not for detection itself)
- Great for root cause analysis and attack timelines
- Costs money but saves analyst time

### Amazon Inspector

- **Automated vulnerability scanner** - continuous, no manual scans
- Scans: EC2 instances, container images (ECR), Lambda functions
- Checks for: CVEs, outdated packages, weak configurations, network exposure
- Uses SSM agent on EC2 (no separate install)
- Findings prioritized with risk scores
- Integrates with Organizations and Security Hub
- **Proactive - finds weaknesses before attackers do**

---

## Domain 2: Security Logging & Monitoring

### AWS CloudTrail

- **Audit log for all AWS API calls**
- Event History: last 90 days by default (no trail needed)
- Create a Trail for comprehensive logging:
    - Apply to all regions (catches global services like IAM/STS)
    - Delivers to S3 bucket
    - Organization Trail logs all accounts centrally

**Key Points:**

- Management events (control plane) logged by default
- **Data events (S3 object access, Lambda invokes) NOT logged by default** - enable explicitly
- CloudTrail Insights detects unusual API activity
- Encrypt logs (SSE-S3 default, use SSE-KMS for tighter control)
- Enable log file validation (digest files detect tampering)
- Send to CloudWatch Logs for real-time alerts

**Common Use Cases:**

- Track security group changes
- Detect root account usage
- Capture failed login attempts
- Alert on critical API calls (TerminateInstances, DisableCloudTrailLogging)

### CloudWatch & EventBridge

**CloudWatch Logs:**

- Collects logs from EC2 (via agent), Lambda, VPC Flow, CloudTrail
- Use Logs Insights (SQL-like) to query

**Metric Filters & Alarms:**

- Create custom metrics from log patterns
- Example: alert on "UnauthorizedOperation" or "AccessDenied"
- **CIS benchmark recommendation** - monitor unauthorized API calls

**EventBridge (CloudWatch Events):**

- Reacts in near-real-time to AWS events
- Route to: Lambda, SNS, SQS
- Example: GuardDuty finding → EventBridge → Lambda isolates instance
- **Key for automated incident response**

### AWS Config

- Records resource state over time (like a "change DVR")
- Shows what changed and when (forensics)
- **Config vs CloudTrail: Config records state, CloudTrail logs actions**

**Config Rules:**

- Compliance checks (managed or custom)
- Examples: s3-bucket-public-read-prohibited, ec2-instance-managed-by-ssm
- Flags non-compliant resources
- Can auto-remediate via SSM Automation

**Config Aggregator:**

- Multi-account, multi-region view
- Centralize compliance status
- Requires Organizations trusted access

**Exam Tip:** Continuous compliance questions? Think Config Rules

### VPC Flow Logs

- Captures IP traffic metadata (not packet content)
- Shows: source/dest IP, ports, protocol, bytes, accept/reject
- Created at VPC, subnet, or ENI level
- Send to CloudWatch Logs or S3

**Use Cases:**

- Detect anomalous traffic (data exfiltration, scanning)
- Troubleshoot network issues
- Verify NACL/SG rules

**Limitations:**

- Doesn't capture: Amazon DNS traffic, metadata IP (169.254.169.254)
- **Enable beforehand** - won't show past traffic
- GuardDuty uses Flow Logs under the hood

### Key Monitoring Best Practices

- **Monitor root account usage** (should be rare)
- Alert on IAM policy changes
- Alert on CloudTrail being disabled (StopLogging, DeleteTrail)
- Monitor login failures (brute force indicator)

---

## Domain 3: Infrastructure Security

### VPC Basics

- Resources in **private subnets** when possible
- Public subnets only for internet-facing resources (ALB, bastion)
- Use NAT Gateways for outbound internet from private instances
- Multi-tier: web (public), app/DB (private)

### Security Groups vs NACLs

**Security Groups (SG):**

- **Stateful** - remember connections (no return traffic rules needed)
- Instance/ENI level
- Can only allow (implicit deny for rest)
- Can reference other SGs or AWS resources
- **Can't block specific IPs** (no deny rules)

**Network ACLs:**

- **Stateless** - need rules for both directions
- Subnet level
- Evaluate rules in order
- Can allow OR deny
- **Use NACLs to block specific IPs**

**Exam Tip:** Need to block a malicious IP? Use NACL (SGs can't deny)

### Bastion & Admin Access

- **Never open SSH/RDP to 0.0.0.0/0!**
- Option 1: Bastion host in public subnet (restrict to your office IP)
- **Option 2 (Better): AWS Systems Manager Session Manager**
    - No inbound ports or bastion needed
    - Access via console/CLI, uses HTTPS tunneling
    - Logs all commands
    - **Exam favorite for secure access without bastions**

**Instance Roles:**

- Use IAM roles (not access keys) on EC2
- AWS provides temporary creds automatically
- Never store long-lived credentials on instances

### AWS WAF

- Layer 7 (HTTP/HTTPS) firewall
- Attach to: CloudFront, ALB, API Gateway, AppSync
- **Managed Rules** - quick protection against SQLi, XSS, etc.
- Custom rules: IP sets, strings, regex, geo-blocking, rate-limiting
- Actions: Allow, Block, Count
- **Regional** (except CloudFront - global)
- Use Firewall Manager to deploy across accounts

### AWS Shield

**Shield Standard:**

- **Free, always on** for all customers
- Protects against common network DDoS (SYN floods, UDP floods)
- No configuration needed

**Shield Advanced:**

- $3k/month, 1-year commitment
- 24/7 DDoS Response Team (DRT)
- Enhanced protection + attack diagnostics
- WAF included at no extra cost
- **Cost Protection** - AWS waives DDoS-related data transfer fees
- Auto-mitigation for sophisticated attacks

**DDoS Resilience Stack:** CloudFront + WAF + Shield Advanced + Route 53 + ELB

### Other Security

- **AWS Network Firewall** - advanced VPC firewall (layer 3-7, DPI)
- VPN/Direct Connect for secure on-prem connectivity
- Transit Gateway for multi-VPC
- Patch management via SSM Patch Manager
- Penetration testing allowed on your resources (certain services)

---

## Domain 4: Identity & Access Management

### IAM Fundamentals

- Users: individuals/apps with long-term creds
- Groups: collections of users
- Roles: no credentials, assumed temporarily
- Policies: JSON docs defining permissions

**Best Practices:**

- **Least Privilege** - start minimal, grant only what's needed
- Users for long-term, Roles for temporary/cross-account
- **Always enable MFA for root** (critical!)
- Enable MFA for privileged users
- Rotate access keys, never hardcode
- **EC2: use Instance Roles, not access keys**

### Permission Policies

**Identity-based:** attached to user/group/role

**Resource-based:** attached to resources (S3, SQS, SNS)

**Key Points:**

- S3 bucket policies grant cross-account access
- **Explicit Deny always wins**
- Default deny → look for allow → check conditions
- Conditions: restrict by IP, date, MFA, tags, VPC
- **Permission Boundaries** - upper limit on permissions (delegation safety)

### Service Control Policies (SCPs)

- Applied at account/OU level via Organizations
- **Only restrict, never grant**
- Even root user cannot bypass SCP denies
- Use cases: deny DeleteTrail, restrict regions, prevent IAM user creation
- **Must enable in Organizations**
- Don't apply to management account by default

### Cross-Account Access

- **Pattern:** Account A creates role with trust policy allowing Account B
- Account B user calls STS AssumeRole → gets temp creds
- Trust policy in Account A, permissions policy defines what role can do
- User in Account B needs IAM policy to call sts:AssumeRole

**S3 Cross-Account:** bucket policy OR role method

### Federation & SSO

**SAML 2.0:**

- Corporate AD/SSO → STS AssumeRoleWithSAML
- Setup: IAM SAML identity provider + roles

**Web Identity (OIDC):**

- For web/mobile apps
- STS AssumeRoleWithWebIdentity
- Cognito uses this under the hood

**AWS IAM Identity Center (formerly AWS SSO):**

- AWS-managed SSO
- Connects to SAML providers/directories
- Centralized SSO across accounts via Organizations

### Amazon Cognito

- User Pools: managed user directory (sign-up/sign-in, JWT tokens)
- Identity Pools: grant temp AWS creds to users
- **For mobile/web app authentication**
- Uses IAM roles under the hood

### IAM Access Analyzer

- Finds resources accessible from outside your account
- Analyzes: IAM roles, S3 buckets, KMS keys, SQS/SNS
- Continuous scanning
- **Policy generation** from CloudTrail activity (creates least-privilege policies)
- Validates policies against best practices

**Exam:** How to find externally shared resources? → Access Analyzer

### Key Practices

- **Root account:** lock it down, use IAM users/roles daily
- Delete/secure root access keys
- Root needs MFA, only for rare tasks (close account, etc.)
- **Credential Reports:** CSV of all users, last password/key usage
- **Access Advisor:** shows last accessed services (rightsize permissions)

### AWS STS (Security Token Service)

- Issues temporary credentials
- **AssumeRole** - cross-account or privilege escalation
- **AssumeRoleWithSAML/WebIdentity** - federation
- **GetSessionToken** - MFA session (36 hours)
- **GetFederationToken** - legacy federation

---

## Domain 5: Data Protection

### AWS KMS

- Managed service for encryption keys
- Keys never leave KMS (FIPS 140-2/3 HSMs)
- **Symmetric** (AES-256, most common) or Asymmetric (RSA/ECC)
- **Envelope encryption:** KMS generates data key → data key encrypts data → KMS encrypts data key

**Key Policies:**

- Every key has resource policy
- Default: account root has full access
- **Cross-account:** update key policy (IAM policy alone not enough)

**Integrations:**

- Almost every AWS service (S3, EBS, RDS, DynamoDB, etc.)
- AWS-managed keys (free) or customer-managed keys (more control)
- CloudTrail logs every KMS operation
- **Rotation:** AWS-managed rotate yearly auto, customer keys optional
- Rotation doesn't re-encrypt old data

**Limits:**

- API rate limits exist
- Each encrypt/decrypt has cost (except AWS-managed for certain services)
- High TPS? Consider client-side encryption

### AWS CloudHSM

- Single-tenant HSM cluster (you own/control keys)
- **FIPS 140-2 Level 3** (vs KMS multi-tenant Level 2)
- More complex: use PKCS#11, JCE, CNG libraries
- Limited AWS service integration
- Can use as **KMS Custom Key Store** (KMS CMK backed by your HSM)
- Requires 2+ nodes for HA
- You manage backups

**When to use:**

- Full key custody required
- Compliance needs single-tenant HSM
- KMS BYOK (import key material) also exists

**Exam:** Full control/BYOK/single-tenant? → CloudHSM

### Encryption at Rest

**S3:**

- **SSE-S3** - AWS-managed (default, free)
- **SSE-KMS** - KMS CMK (more control/audit, costs apply)
- **SSE-C** - Customer-provided key per object (you supply on PUT/GET)
- **Client-side** - encrypt before upload
- Default encryption on for new buckets (SSE-S3)
- Enforce via bucket policy

**EBS:**

- Check box at creation → encrypted with KMS
- Account default encryption available
- Snapshots encrypted too
- Cross-account snapshot sharing needs KMS key sharing

**RDS:**

- Enable at launch (can't enable later without snapshot-restore)
- Uses KMS
- Encrypted snapshot can't restore in another account without sharing KMS key

**DynamoDB:**

- Always on with AWS-owned keys default
- Choose KMS CMK for control

**S3 Glacier Vault Lock:**

- Immutable policy (WORM)
- Compliance: data can't be deleted for X years

**EFS:**

- At-rest encryption via KMS
- In-transit via TLS when mounting

### Encryption in Transit

- Use **TLS (HTTPS)** everywhere
- ACM certificates for ELB/CloudFront
- ACM Private CA for internal certs
- Enforce TLS via policies (S3 can deny non-SSL)
- RDS: enable SSL/TLS connections (set parameter group)

### AWS Certificate Manager (ACM)

- **Free public DV certificates** for AWS resources
- Auto-renews annually
- Can't download private key (AWS resources only)
- Validation: DNS (recommended, auto-renewal) or Email
- **CloudFront certs must be in us-east-1**
- ALB/NLB certs in same region as resource
- **ACM Private CA** - your own internal CA (~$400/month)

### Secrets Management

**AWS Secrets Manager:**

- Stores secrets encrypted with KMS
- **Automatic rotation** (for RDS and custom via Lambda)
- $0.40/secret/month + API costs
- **Multi-region replication** available
- Fine-grained IAM + secret policies

**SSM Parameter Store:**

- Part of Systems Manager
- Free (standard params, 4KB max)
- Basic, no built-in rotation
- SecureString (encrypted with KMS)
- Advanced params: 8KB, small cost

**When to choose:**

- **Rotation needed?** → Secrets Manager
- Simple config storage? → Parameter Store
- Both use KMS, integrate with Config/Security Hub

### Data Lifecycle & Backups

- **AWS Backup** - automate backups across services
- S3 Versioning + MFA Delete (protect against deletion)
- S3 Object Lock (WORM) for compliance
- Glacier Deep Archive for long-term retention
- Cross-region backups for DR

### S3 Security

- **Block Public Access** - account or bucket level (prevents public buckets)
- Use at account level via SCPs for org-wide
- Macie discovers PII in S3

**Exam:** Ensure no public buckets? → Block Public Access

### Other Encryption

- **VPN** (IPsec) encrypts on-prem to AWS traffic
- Direct Connect alone not encrypted (run VPN over it if needed)
- **Client-side encryption** - you control keys, AWS never sees plaintext
- **AWS Nitro Enclaves** - isolated compute for sensitive processing

---

## Domain 6: Management & Security Governance

### AWS Organizations

- Centrally manage multiple accounts
- Group into Organizational Units (OUs)
- Apply Service Control Policies (SCPs)

**SCPs:**

- **Only restrict, never grant**
- Apply to all principals including root
- Common uses: deny DeleteTrail, restrict regions, require tags
- **Exam based hints:** Enforce guardrail across accounts? → SCP

### Delegated Administrators

- Designate account to manage service org-wide
- Example: Security account manages GuardDuty/Security Hub for all
- Services: GuardDuty, Security Hub, Macie, Firewall Manager, Access Analyzer

### Centralized Logging

- **Org CloudTrail** - logs all accounts to one S3 bucket
- **Config Aggregator** - view compliance across all accounts
- Store in secure audit account

### AWS Control Tower

- **Quick multi-account setup with best practices**
- Creates Landing Zone + guardrails (SCPs + Config rules)
- Provisions: Log Archive account, Security Audit account
- Enables AWS SSO
- **Account Factory** for pre-configured account creation

**Exam Hiint:** Easy multi-account baseline? → Control Tower

### Account Best Practices

- Root: don't use, secure with MFA (hardware token like YubiKey)
- Set alternate contacts (security, billing)
- SCP to restrict root actions
- Consolidated billing

### Security Governance

**Centralized Logging:**

- Aggregate: CloudTrail, Config, CloudWatch, Flow Logs, ALB logs
- Store in secure audit account S3
- Protect bucket (deny deletes)
- Query with Athena/Lake Formation

**Cross-Account Access:**

- Security team roles in each account
- "SecurityAudit" role with read-only
- Control Tower sets this up automatically

**Compliance:**

- **AWS Artifact** - download compliance reports (SOC2, ISO27001, PCI)
- Config Conformance Packs - predefined rule sets (PCI DSS pack)
- **Security Hub Standards** - CIS AWS Benchmark, PCI DSS
    - Automated checks, shows failed controls
- **AWS Audit Manager** - automate evidence collection for audits

**Tagging:**

- Tag resources (data classification, project, owner)
- Tag Policies enforce schemas via Organizations
- Helps in incident response

**Change Management:**

- Infrastructure as Code (CloudFormation/Terraform)
- CloudFormation Guard enforces rules on templates

**Key Management:**

- Enable KMS key rotation
- Monitor CloudTrail for disable/delete key activity

**Monitoring:**

- Define Security KPIs (% patched EC2, open high-severity findings)
- Use Security Hub summary or custom metrics

**Penetration Testing:**

- Allowed on your resources (EC2, RDS, CloudFront, etc.)
- Don't attack AWS infrastructure or other customers

**DR & Business Continuity:**

- Multi-region strategies
- KMS multi-region keys for DR
- Ensure security controls in DR environment

**Cost Governance:**

- Monitor for anomalies (crypto-mining detection)
- Trusted Advisor Security Checks (public S3, root MFA)

### AWS Firewall Manager

- Enforce security policies across accounts (needs Organizations)
- Deploy: WAF rules, Shield Advanced, VPC DNS Firewall, SG policies
- Centrally manage firewall settings

**Easy Exam hint:** Auto enforce WAF/Shield across new accounts? → Firewall Manager

### Policy Enforcement

- **Service Catalog** - pre-approved templates
- IAM conditions to restrict resources (approved AMIs only)
- SCPs + IAM for governance at scale
- **AWS Signer** - code signing for Lambda/CloudFormation

### Continuous Improvement

- **Well-Architected Tool** - Security Pillar reviews
- Regular security assessments

---

## Quick Cheat sheet

**GuardDuty** = Threat detection (enable and forget)

**Macie** = S3 data classification (PII finder)

**Security Hub** = Central dashboard + compliance checks

**Detective** = Investigate findings (after detection)

**Inspector** = Vulnerability scanner (continuous)

**Config** = Resource state tracking + compliance rules

**CloudTrail** = API audit logs (who did what)

**VPC Flow Logs** = Network traffic metadata

**Session Manager** = Secure EC2 access (no bastion/SSH)

**WAF** = Layer 7 firewall (SQLi, XSS protection)

**Shield Advanced** = DDoS protection + DRT support

**SCPs** = Org-wide guardrails (restrict, never grant)

**KMS** = Encryption key management (most use cases)

**CloudHSM** = Single-tenant HSM (full control)

**Secrets Manager** = Secret storage + auto-rotation

**Parameter Store** = Simple config storage (free)

**ACM** = Free TLS certs (auto-renew)

**Control Tower** = Multi-account baseline setup

**Firewall Manager** = Centralize firewall policies

**Block Public Access** = Prevent public S3 buckets

**Remember:** Default deny, least privilege, automate everything, centralize logging!