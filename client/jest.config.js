module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '.+\\.(css|svg|png|jpg)$': 'identity-obj-proxy',
    '^ky$': require.resolve('ky').replace('index.js', 'umd.js'),
  },
  moduleDirectories: [
    'node_modules',
    'src',
  ],
}
