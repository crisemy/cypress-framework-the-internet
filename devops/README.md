
# Jenkins + Docker (Preconfigured Environment)

This setup provides a custom Jenkins image with the Docker CLI already installed. It's designed to simplify running Cypress pipelines that require Docker inside Jenkins (e.g., to spin up test containers or helper tools).

---

## How to Launch Jenkins with Docker

### 1. Clone the repository and navigate to the project

```bash
git clone https://github.com/your-user/your-cypress-repo.git
cd your-cypress-repo/jenkinsConf
```

### Start Jenkins using Docker Compose

```bash
docker-compose up -d
```

This will:

- Build a custom Jenkins image with the Docker CLI installed.
- Mount the required volumes.
- Expose port `8080` to access Jenkins in your browser.

---

## Access Jenkins

Once the container is running, open your browser and visit:

```
http://localhost:8080
```

The default user is `admin`. To retrieve the initial admin password:

```bash
docker exec -it jenkins-cypress bash
cat /var/jenkins_home/secrets/initialAdminPassword
```

---

## Folder Structure

```
jenkinsConf/
├── Dockerfile          # Custom Jenkins image with Docker CLI
├── docker-compose.yml  # Docker Compose config
└── README.md           # This file
```

---

## Using with Cypress

Once Jenkins is up and running, you can:

- Create a new *Pipeline* that uses the `Jenkinsfile` from the root of your project.
- Trigger Cypress test runs using commands like `npx cypress run`.

---

## Customization

If you'd like to install additional Jenkins plugins automatically, edit this line in the `Dockerfile`:

```dockerfile
RUN jenkins-plugin-cli --plugins docker-workflow blueocean
```

Add any other plugins you need, separated by spaces.

---

## Shut Down Jenkins

```bash
docker-compose down
```

---

## Requirements

- Docker
- Docker Compose

---

This environment was created to make Cypress + Jenkins setup reproducible and team-friendly. 