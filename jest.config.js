module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@reduxjs/toolkit$': '<rootDir>/src/node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js',
    '^axios$': '<rootDir>/src/node_modules/axios',
    '^react-toastify$': '<rootDir>/src/node_modules/react-toastify'
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['./src/setupTests.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
