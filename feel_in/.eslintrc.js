module.exports = {
    // ESLint가 인식할 환경을 설정합니다.
    env: {
      browser: true,
      node: true,
    },
    // 기본으로 사용할 규칙 세트를 설정합니다.
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'airbnb',
      'plugin:prettier/recommended',
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true, // JSX 구문을 파싱할 수 있도록 설정
      },
    },
    globals: {
      browser: 'readonly', // 'browser'라는 전역 변수를 읽기 전용으로 설정
    },
    plugins: [
      'react', // React 관련 linting 규칙을 사용
      'prettier', // Prettier 관련 linting 규칙을 사용
    ],
    rules: {
      // Prettier 규칙을 위반한 경우, ESLint에서 오류로 처리
      'prettier/prettier': 'error',
      // JSX에 React가 필요하지 않으므로 비활성화
      'react/react-in-jsx-scope': 'off',
      // Stateless 함수형 컴포넌트를 권장하지 않으므로 비활성화
      'react/prefer-stateless-function': 'off',
      // JSX 파일 확장자를 .js, .jsx, .ts, .tsx로 허용
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      ],
      // JSX에서 한 줄에 하나의 표현식을 강제하지 않음
      'react/jsx-one-expression-per-line': 'off',
      // 중첩된 삼항 연산자를 사용해도 오류가 발생하지 않음
      'no-nested-ternary': 'off',
      // PropTypes 검사를 비활성화
      'react/prop-types': 'off',
      // 의존성 파일 검사 비활성화
      'import/no-extraneous-dependencies': 'off',
      // 화살표 함수의 본문을 항상 중괄호로 감싸야 함
      'arrow-body-style': ['error', 'always'],
      // 함수형 컴포넌트 정의를 화살표 함수로 강제하지 않음
      'react/function-component-definition': [
        'off',
        {
          namedComponents: 'arrow-function', // 이름이 있는 컴포넌트는 화살표 함수로 정의
          unnamedComponents: 'arrow-function', // 이름이 없는 컴포넌트도 화살표 함수로 정의
        },
      ],
    },
  };