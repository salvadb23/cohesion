// For creating Docker build flags based on semver
const imageName = process.argv[2];
const fullVersion = process.argv[3];

const versions = [
  ...fullVersion.split('.').map((v, i, arr) => arr.slice(0, i + 1).join('.')),
  'latest',
];

console.log(versions.map(version => `-t ${imageName}:${version}`).join(' '));
