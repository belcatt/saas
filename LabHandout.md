# 📓 Full Lab Handout — AWS IAM + Docker + ECR
## With Screenshot Placeholders (Insert actual screenshots later)

This handout guides students through:

✔ Creating access keys  
✔ Configuring AWS CLI  
✔ Authenticating Docker  
✔ Tagging and pushing images to ECR  

---

# 1️⃣ Create an Access Key
1. Log in to AWS Console  
2. Go to: **IAM → Users → YourUser → Security credentials**  
3. Click **Create access key**

📸 Screenshot Placeholder #1  
`![Create Access Key](screenshots/create_access_key.png)`

Download and save:

- **Access Key ID**  
- **Secret Access Key**

---

# 2️⃣ Configure AWS CLI

Run:

```bash
aws configure
```

Enter:
- Access key ID  
- Secret access key  
- Region (ex: `us-east-1`)  
- Output format: `json`

📸 Screenshot Placeholder #2  
`![AWS Configure](screenshots/aws_configure.png)`

---

# 3️⃣ Log in to Amazon ECR

```bash
aws ecr get-login-password --region REGION   | docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com
```

📸 Screenshot Placeholder #3  
`![Docker Login](screenshots/docker_login.png)`

---

# 4️⃣ Tag and Push a Docker Image

```bash
docker tag myapp:latest ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/REPO_NAME:latest

docker push ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/REPO_NAME:latest
```

📸 Screenshot Placeholder #4  
`![Docker Push](screenshots/docker_push.png)`

---

# 🎯 End of Lab

Students can now:

- Authenticate Docker  
- Push images to a private AWS ECR repo  
- Use real DevOps workflows  

Instructor note: Replace screenshot placeholders with real images before distributing.

