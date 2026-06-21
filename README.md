# Add Docker's GPG key
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

docker compose version

npm run start -- -p 3000

docker pull ghcr.io/trungthanhbmtran/seminar_daklak_2026:latest

docker run -d \
  -p 3000:3000 \
  --name hoithao_app \
  --restart unless-stopped \
  ghcr.io/trungthanhbmtran/seminar_daklak_2026:latest


docker login ghcr.io -u trungthanhbmtran -p <YOUR_GITHUB_PAT>
