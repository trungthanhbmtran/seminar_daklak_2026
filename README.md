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

sudo docker pull ghcr.io/trungthanhbmtran/seminar_daklak_2026:latest

# Tạo thư mục data trên VPS để lưu trữ vĩnh viễn (chỉ cần chạy lần đầu)
mkdir -p /root/hoithao_data

sudo docker run -d \
  --name hoithao_app \
  -p 3000:3000 \
  -v /root/hoithao_data:/app/data \
  --restart unless-stopped \
  ghcr.io/trungthanhbmtran/seminar_daklak_2026:latest


docker login ghcr.io -u trungthanhbmtran -p <YOUR_GITHUB_PAT>

# Lệnh cập nhật Image trên VPS (Update Image) - Dữ liệu sẽ KHÔNG bị mất nữa
sudo docker pull ghcr.io/trungthanhbmtran/seminar_daklak_2026:latest
sudo docker stop hoithao_app
sudo docker rm hoithao_app
sudo docker run -d \
  --name hoithao_app \
  -p 3000:3000 \
  -v /root/hoithao_data:/app/data \
  --restart unless-stopped \
  ghcr.io/trungthanhbmtran/seminar_daklak_2026:latest
