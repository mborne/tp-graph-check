.PHONY: results.json
results.json: node_modules pmd
	npm run build

node_modules:
	npm install

pmd:
	rm -rf /tmp/pmd-bin-6.55.0
	wget -O /tmp/pmd-bin-6.55.0.zip "https://github.com/pmd/pmd/releases/download/pmd_releases%2F6.55.0/pmd-bin-6.55.0.zip"
	cd /tmp && unzip pmd-bin-6.55.0.zip
	rm -rf pmd
	mv /tmp/pmd-bin-6.55.0 pmd


