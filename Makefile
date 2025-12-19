.PHONY: results.json
results.json: node_modules
	npm run build

node_modules:
	npm install

