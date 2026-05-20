# USE CASES: See It in Action

You've set up LM Studio + opencode. Now see why it's worth it. Two practical examples that demonstrate daily utility.

---

## Use Case 1: Generate PowerShell Automation Script

<img src="assets/Droid.png" alt="Automation generation" width="90" align="right"/>

**Scenario:** You need to provision multiple user accounts with specific permissions and group memberships. Manually clicking through Active Directory is tedious and error-prone.

### The Request

```powershell
opencode "Create a PowerShell script that provisions a new user account with the following requirements:
- Accept username, full name, and department as parameters
- Create the account in the Users OU
- Set initial password to require change on first login
- Add user to department-specific security group (format: SG_[Department])
- Enable the account
- Add error handling for duplicate users
- Log all actions to a file"
```

### What Happens

opencode connects to your local LM Studio model, processes the request with full context, and generates a script.

### Example Output

```powershell
# User Provisioning Script
# Generated with local AI assistance

param(
    [Parameter(Mandatory=$true)]
    [string]$Username,
    
    [Parameter(Mandatory=$true)]
    [string]$FullName,
    
    [Parameter(Mandatory=$true)]
    [string]$Department
)

# Configuration
$LogPath = "C:\Logs\UserProvisioning.log"
$UsersOU = "OU=Users,DC=contoso,DC=com"
$InitialPassword = ConvertTo-SecureString "TempP@ssw0rd!" -AsPlainText -Force

# Logging function
function Write-Log {
    param([string]$Message)
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$Timestamp - $Message" | Out-File -FilePath $LogPath -Append
}

try {
    Write-Log "Starting provisioning for user: $Username"
    
    # Check for duplicate
    $ExistingUser = Get-ADUser -Filter "SamAccountName -eq '$Username'" -ErrorAction SilentlyContinue
    if ($ExistingUser) {
        throw "User $Username already exists"
    }
    
    # Create user
    New-ADUser -SamAccountName $Username `
               -Name $FullName `
               -UserPrincipalName "$Username@contoso.com" `
               -Path $UsersOU `
               -AccountPassword $InitialPassword `
               -ChangePasswordAtLogon $true `
               -Enabled $true
    
    Write-Log "User $Username created successfully"
    
    # Add to department group
    $GroupName = "SG_$Department"
    Add-ADGroupMember -Identity $GroupName -Members $Username
    Write-Log "Added $Username to group $GroupName"
    
    Write-Output "SUCCESS: User $Username provisioned successfully"
    
} catch {
    $ErrorMessage = $_.Exception.Message
    Write-Log "ERROR: $ErrorMessage"
    Write-Error $ErrorMessage
}
```

### What You Do Next

1. **Review the script:** Check logic, adjust paths for your environment
2. **Test it:** Run with test account first
3. **Refine if needed:** Ask follow-up questions to adjust details
4. **Save and use:** Add to your automation toolkit

### Why This Matters

**Time saved:** 30 minutes of writing and testing vs. 2 minutes of review and adjustment.

**Quality:** Error handling included, logging built-in, parameters validated.

**Learning:** If you're new to PowerShell, you're seeing best practices demonstrated.

**Privacy:** Your infrastructure details (OUs, domain names, group naming conventions) stayed local. No cloud service saw your internal structure.

---

## Use Case 2: Troubleshoot Windows Error Message

<div align="center">
<img src="assets/AI Cory - Concerned.png" alt="Team member troubleshooting technical issue" width="220"/>
</div>

**Scenario:** You're getting Event ID 7001 in Event Viewer. System logs show "The Dependency Service or Group Failed to Start." Service won't start, users can't access a critical application.

### The Request

```powershell
opencode "I'm getting Windows Event ID 7001: 'The Dependency Service or Group Failed to Start' for the Print Spooler service. What are the most common causes and diagnostic steps?"
```

### What Happens

Local model analyzes the error pattern and provides structured diagnostic guidance.

### Example Output

```
Event ID 7001 - Dependency Service Failure (Print Spooler)

COMMON CAUSES:
1. Dependent service stopped/disabled
   - Print Spooler depends on: Remote Procedure Call (RPC), HTTP
   
2. Corrupted service configuration

3. Driver conflicts (printer drivers causing service hang)

4. Permissions issues on spool directory

DIAGNOSTIC STEPS:

Step 1: Check Dependent Services
```powershell
Get-Service -Name "RpcSs","HTTP" | Select Name, Status, StartType
```

Expected: Both Running, StartType = Automatic
If not: Start service or set to Automatic

Step 2: Verify Spooler Dependencies
```powershell
sc qc "Spooler"
```

Check DEPENDENCIES line matches: RPCSS

Step 3: Check Spool Folder Permissions
```powershell
icacls "C:\Windows\System32\spool"
```

Expected: SYSTEM and Administrators have Full Control
If not: Reset with:
```powershell
icacls "C:\Windows\System32\spool" /reset /T
```

Step 4: Test Service Start
```powershell
Start-Service -Name "Spooler"
Get-Service -Name "Spooler"
```

If still fails, check Event Viewer for secondary error codes

Step 5: Last Resort - Rebuild Print Subsystem
```powershell
Stop-Service -Name "Spooler" -Force
Remove-Item "C:\Windows\System32\spool\PRINTERS\*" -Force
Start-Service -Name "Spooler"
```

PREVENTION:
- Regular driver updates from manufacturer (not Windows Update generic)
- Monitor spool folder size (large stuck jobs cause issues)
- Periodic spooler restarts during maintenance windows


### What You Do Next

1. **Work through steps:** Run diagnostic commands in sequence
2. **Identify root cause:** One of the steps reveals the issue (e.g., RPC service disabled)
3. **Apply fix:** Enable dependent service, restart Print Spooler
4. **Document:** Add to your troubleshooting runbook

### Why This Matters

**Faster diagnosis:** 5 minutes to structured approach vs. 30+ minutes searching forums and KB articles.

**Comprehensive:** Covers common causes, not just one possibility.

**Actionable:** Real commands you can run right now, not theoretical advice.

**Local knowledge:** Error messages can contain system names, IP addresses, internal paths. With local processing, that data doesn't leave your machine.

**Learning:** Next time you see similar dependency failures, you recognize the pattern faster.

---

<div align="center">
<img src="assets/cora_coffe_1.png" alt="Team member taking coffee break" width="200"/>

*Take a moment before the next example*
</div>

---

## Use Case 3: Document Infrastructure Configuration

**Scenario:** You've configured a complex network setup. Need to document it for handoff to team or for your own future reference.

### The Request

```powershell
opencode "I need to document a network configuration. Generate a structured markdown template for documenting:
- Network topology (subnets, VLANs)
- Switch configurations
- Firewall rules
- DHCP scopes
- Critical services and their servers
Include sections for diagrams, configuration backups, and troubleshooting notes"
```

### Example Output

```markdown
# Network Infrastructure Documentation
**Location:** [Site Name]  
**Date:** [Current Date]  
**Engineer:** [Your Name]  

## 1. Network Topology

### Subnets
| Subnet | VLAN ID | Purpose | Gateway | DHCP Range |
|:---|:---|:---|:---|:---|
| 10.0.10.0/24 | 10 | Management | 10.0.10.1 | 10.0.10.100-200 |
| 10.0.20.0/24 | 20 | User Workstations | 10.0.20.1 | 10.0.20.50-250 |

### VLAN Configuration
- **VLAN 10 (Management):** Infrastructure devices, servers
- **VLAN 20 (Users):** End-user workstations
- **VLAN 30 (Guests):** Guest WiFi, isolated

## 2. Switch Configuration

**Core Switch:** [Model/Location]
```
[Paste configuration backup here]
```

**Inter-VLAN Routing:**
- Enabled on Layer 3 switch
- Routes between VLAN 10, 20, 30
- ACLs applied for guest isolation

## 3. Firewall Rules

| Priority | Source | Destination | Port/Protocol | Action | Purpose |
|:---|:---|:---|:---|:---|:---|
| 100 | VLAN 30 | Internet | 80/443 | Allow | Guest web access |
| 101 | VLAN 30 | Internal | ANY | Deny | Isolate guests |
| 200 | VLAN 20 | File Server | 445 | Allow | File access |

**Configuration Backup:** [Location of firewall config]

## 4. DHCP Configuration

**Server:** [DHCP Server Name/IP]

**Scopes:**
- **Scope 10.0.10.0:** Management subnet
  - Exclusions: 10.0.10.1-10.0.10.50 (static IPs)
  - DNS: 10.0.10.5, 10.0.10.6
  - Lease: 8 hours
  
- **Scope 10.0.20.0:** User subnet
  - Exclusions: 10.0.20.1-10.0.20.49 (static IPs)
  - DNS: 10.0.10.5, 10.0.10.6  
  - Lease: 24 hours

## 5. Critical Services

| Service | Server | IP | VLAN | Monitoring |
|:---|:---|:---|:---|:---|
| Domain Controller | DC01 | 10.0.10.5 | 10 | Active |
| File Server | FS01 | 10.0.10.10 | 10 | Active |
| DHCP Server | DC01 | 10.0.10.5 | 10 | Active |

## 6. Topology Diagram

[Insert network diagram here - Visio/Draw.io]

## 7. Configuration Backups

**Location:** `\\FS01\IT\Network\Backups\[Date]`

**Files:**
- `core-switch-config.txt`
- `firewall-config.xml`
- `dhcp-export.xml`

**Backup Schedule:** Weekly, automated via script

## 8. Troubleshooting Notes

**Common Issues:**

**No DHCP assignment on VLAN 20:**
- Check DHCP relay on switch: `show ip helper-address`
- Verify scope not exhausted: Check DHCP console
- Test DHCP from affected subnet

**Inter-VLAN routing not working:**
- Verify Layer 3 switch routing: `show ip route`
- Check VLAN interfaces up: `show vlan brief`
- Verify ACLs not blocking: `show access-lists`

## 9. Change Log

| Date | Engineer | Change | Reason |
|:---|:---|:---|:---|
| | | | |

## 10. Contact Information

**Network Team:**
- Primary: [Name/Phone/Email]
- Escalation: [Name/Phone/Email]

**Vendor Support:**
- Switch Vendor: [Contact]
- Firewall Vendor: [Contact]
```

### What You Do Next

1. **Fill in your specifics:** Replace placeholders with actual values
2. **Export configurations:** Run backup commands, save configs
3. **Create diagram:** Use Visio/Draw.io/Mermaid based on template structure
4. **Store:** Put in team documentation system

### Why This Matters

**Time saved:** Template creation from scratch is 60+ minutes. This gets you 90% there in 2 minutes.

**Consistency:** Standardized format means documentation is comparable across sites.

**Completeness:** Doesn't skip sections (troubleshooting, backups, contacts) that you might forget.

**Professional:** Structured, thorough documentation looks better to management and helps team members.

---

## Common Patterns Across Use Cases

**Iterate and refine:** Your first request gets you 80% there. Follow-up questions refine to 100%.

```powershell
# Initial request
opencode "Create user provisioning script"

# Refinement
opencode "Add email address generation to the previous script using firstname.lastname format"

# Further refinement  
opencode "Handle duplicate email addresses by appending a number"
```

**Context carries over:** Within a session, the model remembers previous requests. Use this to build complexity incrementally.

**Specify your environment:** More context = better results.

Instead of: "Create backup script"

Try: "Create PowerShell backup script for Windows Server 2022 that backs up C:\Data to network share, compresses with 7zip, keeps 7 days of history"

**Review and adapt:** AI generates starting points, not finished products. Your expertise validates and adapts the output to your specific environment.

---

## When Local AI Helps Most

**Repetitive but varied tasks:** Similar structure (provisioning, documentation) but different specifics each time.

**Troubleshooting structure:** You know how to diagnose, but AI provides systematic checklist so you don't skip steps under pressure.

**Learning unfamiliar areas:** Need to work with technology you don't use daily? AI provides example commands and approaches.

**Documentation:** Writing comprehensive docs is time-consuming. Templates and starting points accelerate the process.

**Privacy-sensitive work:** When error messages, logs, or configs contain internal details you can't send to cloud services.

---

## Limitations to Understand

**Not always correct:** AI can make mistakes. Your expertise validates the output.

**Current knowledge:** Model trained on data up to a point in time. May not know newest features or breaking changes.

**No real-time access:** Model can't check your current system state. It generates based on general knowledge, not your specific environment.

**Context limits:** 32k tokens is substantial but finite. Very long requests or many back-and-forth iterations might hit limits.

**Not a replacement for learning:** AI helps you be more productive with knowledge you have. It's not a substitute for understanding what you're doing.

---

## Making It Part of Your Workflow

**Start small:** Try one script generation, one troubleshooting session. Build comfort before relying on it for critical tasks.

**Keep it running:** Leave LM Studio server running during work day. Minimal resource usage when idle, instant availability when needed.

**Build templates:** As you generate useful scripts or documentation, save them as templates. AI accelerates template creation; you build a library.

**Share with team:** When AI generates useful solutions, document them in team wiki/runbooks. Amplify the benefit across your team.

**Iterate your requests:** Learn what request patterns work well. More specific context = better results.

---

<div align="center">

<img src="assets/cory-force-user.png" alt="Mastery achieved" width="200"/>

**Ready to try these yourself?**

Go back to [QUICKSTART.md](QUICKSTART.md) if you haven't set up yet.

See [SETUP.md](SETUP.md) and [CONFIG.md](CONFIG.md) for customization.

Read [NOTES.md](NOTES.md) for technical details and troubleshooting.

---

<img src="assets/DIGITAL_Foundations_logo.png" alt="Team One Digital Foundations" height="100" style="vertical-align: middle;"/> <img src="assets/DFT Logo - Full Fox - Orange.png" alt="Technology Core Infra" height="100" style="vertical-align: middle;"/>

</div>
