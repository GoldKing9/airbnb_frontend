# Node.js를 기반으로 하는 이미지를 선택합니다.
FROM node:16

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# package.json 및 package-lock.json (또는 yarn.lock)을 작업 디렉토리로 복사합니다.
COPY package*.json ./

# 의존성을 설치합니다.
RUN npm install

# 나머지 소스 코드와 파일들을 작업 디렉토리로 복사합니다.
COPY . .

# 애플리케이션을 실행하는 명령을 설정합니다.
CMD ["npm", "run", "dev"]
