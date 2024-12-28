# 1. Nginx 베이스 이미지 사용
FROM nginx:alpine

# 2. 빌드된 파일을 Nginx 웹 루트로 복사
COPY dist /usr/share/nginx/html

# 3. Nginx 설정 복사 (선택 사항)
#COPY nginx.conf /etc/nginx/conf.d/default.conf

# 4. 컨테이너 포트 설정
EXPOSE 80

# 5. Nginx 실행
CMD ["nginx", "-g", "daemon off;"]


# docker build -t front-rmd . // front-rmd 는 tag 이름
# docker run -d -p 8080:80 front-rmd
