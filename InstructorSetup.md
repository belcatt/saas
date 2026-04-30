# 📘 InstructorSetup.md
## AWS IAM Setup (Reusable Policies) for Student Access Key Creation + Docker Push to ECR

This guide shows instructors how to configure AWS IAM so students can:

✔ Create their own **Access Key ID + Secret Access Key**  
✔ Authenticate Docker to Amazon ECR  
✔ Push Docker images to an ECR repository  

This setup uses **customer-managed policies**, which are clean, reusable, and attachable.

---

# 1️⃣ Create Customer-Managed Policy: Access Key Management

### Steps:

1. Log in as **Root** or an IAM Admin  
2. Go to **IAM → Policies**  
3. Click **Create Policy**  
4. Select the **JSON** tab  
5. Paste:

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

6. Click **Next**  
7. Name it:

**AllowUsersToManageTheirOwnAccessKeys**

8. Click **Create policy**

---

# 2️⃣ Attach Policies to Student Group

### Steps:

1. Go to **IAM → User groups**  
2. Select your group  
   Example: `BroadAIEngineerAccess`  
3. Open the **Permissions** tab  
4. Click **Add permissions → Attach policies**  
5. Search and select:

- **AllowUsersToManageTheirOwnAccessKeys**  
- **AmazonEC2ContainerRegistryPowerUser** (AWS managed)

6. Click **Add permissions**

All students in this group now have correct access.

---

# 3️⃣ What Students Can Now Do

✔ Create their own access keys  
✔ Use AWS CLI  
✔ Log in Docker to ECR  
✔ Push/pull container images

---

# 4️⃣ Recommended Testing

Run the following as a student:

```bash
aws sts get-caller-identity
aws ecr describe-repositories
```

If both work → setup is correct.

---

# 🎉 Setup Complete
