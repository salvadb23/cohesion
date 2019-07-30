// For creating Docker build flags based on semver
const versionRe = /((\d+)\.\d+)\.\d+/;

const imageName = process.argv[2];
const fullVersion = process.argv[3];

const versions = [...versionRe.exec(fullVersion), 'latest'];

console.log(versions.map(version => `-t ${imageName}:${version}`).join(' '));
