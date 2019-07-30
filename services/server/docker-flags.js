// For creating Docker build flags based on semver
const [, , imageName, fullVersion] = process.argv;

const versions = fullVersion
  .split('.')
  .map((v, i, arr) => arr.slice(0, i + 1).join('.'))
  .concat('latest');

console.log(versions.map(version => `-t ${imageName}:${version}`).join(' '));
