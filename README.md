# Carillon

### Git Push 전 Prettier + ESLint 실행 방법

1. Prettier 규칙대로 코드가 작성되어 있는지 확인

    ```bash
    npm run format
    ```

2. [warn]이 나오는 경우 Prettier 규칙대로 다시 작성

    ```bash
    npm run format:fix
    ```

3. ESLint로 ESLint 규칙대로 작성되어 있는지 확인

    ```bash
    npm run lint
    ```

4. Error가 출력되는 경우 해당 파일 코드 수정하기

### References
- [Git 커밋 컨벤션](https://kdjun97.github.io/git-github/commit-convention/)
- [Git 브랜치 전략](https://junjunrecord.tistory.com/131)
- [ESLint + Prettier 설치](https://velog.io/@xmun74/Next.js-TS%EC%97%90%EC%84%9C-ESLint-Prettier-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)