# 🚀 AWS IAM Setup for Access Keys + Docker Push to ECR

[![AWS](https://img.shields.io/badge/AWS-IAM%20%2B%20ECR-orange?logo=amazon-aws)](https://aws.amazon.com/)
![Docker](https://img.shields.io/badge/Docker-Push-blue?logo=docker)
![GitHub](https://img.shields.io/badge/Guide-Student%20Friendly-brightgreen)
![Maintained](https://img.shields.io/badge/Maintained-Yes-success)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

A clean, student-friendly guide to enable IAM users to:

✔ Create their own **AWS Access Key ID + Secret Access Key**  
✔ Authenticate Docker using AWS CLI  
✔ Push Docker containers to **Amazon ECR**


To let IAM user to "docker push" **images** 
---

## 📌 Overview

To allow students to perform `docker push` to Amazon ECR, their IAM user must have:

1. **Permission to create/manage their own access keys**
2. **Permission to authenticate + push images to ECR**

This README provides step-by-step instructions.

---

# 1️⃣ Allow IAM Users to Create Access Keys

AWS does *not* provide a built-in policy for access-key creation, so we create a **custom IAM policy**.
AWS does not provide a built-in role or managed policy for access key **self-management**--you must define IAM permissions yourself.
AWS intentionally forces this so you don't accidentally give key-management rights across your entire account.


### ✔ Create Custom Policy

Navigate to:

**IAM → Policies → Create Policy → JSON**

Paste the following:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "iam:CreateAccessKey",
        "iam:ListAccessKeys",
        "iam:DeleteAccessKey"
      ],
      "Resource": "arn:aws:iam::*:user/${aws:username}"
    }
  ]
}
```

### ✔ What this allows
- Create Access Keys  
- List Access Keys  
- Delete Access Keys  
- **Only** for the logged-in user (safe).  User can only perform these actions on themselves, not any other user.

⚠️ **Secret Access Key shown only once** — it must be saved.

---

# 2️⃣ Allow Docker Push Access (ECR Permissions)

## Option A — 🔥 Recommended (Easy, Works for All Repositories)

Attach AWS-managed policy:

### **`AmazonEC2ContainerRegistryPowerUser`**

This gives:
- Login (`ecr:GetAuthorizationToken`)
- Push & pull
- Repo list/describe

---

## Option B — Tight Control (One Repository Only)

Use this custom policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecr:BatchCheckLayerAvailability",
        "ecr:CompleteLayerUpload",
        "ecr:DescribeRepositories",
        "ecr:DescribeImages",
        "ecr:InitiateLayerUpload",
        "ecr:ListImages",
        "ecr:PutImage",
        "ecr:UploadLayerPart"
      ],
      "Resource": "arn:aws:ecr:REGION:ACCOUNT_ID:repository/REPO_NAME"
    }
  ]
}
```

Replace:
- `REGION` (e.g. `us-east-1`)
- `ACCOUNT_ID`
- `REPO_NAME`

Attach this policy to the IAM **group**.

---

# 3️⃣ Student Instructions — Create an Access Key

1. Log in  
2. Go to:  
   **IAM → Users → YourUser → Security Credentials**  
3. Click **Create Access Key**  
4. Download/save:  
   - **Access Key ID**  
   - **Secret Access Key**

⚠️ The secret cannot be retrieved later.

---

# 4️⃣ Configure AWS CLI

Students will run:

```bash
aws configure
```

Enter:

- Access Key ID  
- Secret Access Key  
- Region (`us-east-1`)  
- Output format (`json`)

---

# 5️⃣ Authenticate Docker to ECR

```bash
aws ecr get-login-password --region REGION | docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com
```

---

# 6️⃣ Tag and Push a Docker Image

```bash
docker tag myapp:latest ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/REPO_NAME:latest

docker push ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/REPO_NAME:latest
```

---

# 📦 Directory Example

```
aws-ecr-guide/
│
├── README.md        ← you are here
└── examples/
    ├── ecr-policy.json
    ├── user-accesskey-policy.json
```

---

# 🧪 Test Commands

### Verify AWS CLI credentials:
```bash
aws sts get-caller-identity
```

### List repos:
```bash
aws ecr describe-repositories
```

---

# 🎉 Final Result

By the end of this guide, students will be able to:

✔ Create AWS access keys  
✔ Authenticate Docker via AWS CLI  
✔ Push container images to Amazon ECR  
✔ Use industry-standard DevOps workflow  

---

# 📝 License

MIT License — free to use and share.
