rm -R dist
yarn build-package

git add .
git commit -m "Built assets ready for publishing"

npm version patch

PACKAGE_VERSION=$(node -p -e "require('./package.json').version")

git add .
git commit -m "Increment package version to $PACKAGE_VERSION"

npm publish --access public

git push origin main
