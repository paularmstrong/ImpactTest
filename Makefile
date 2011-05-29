all: setup depend

setup:
	@chmod -R +x .scripts/
	@.scripts/setup.sh

depend:
	@.scripts/install-dependencies.sh

test:
	@node .scripts/runtests.js -c ../config/config-test.js

lint:
	@node .scripts/runlint.js -c ../config/config-lint.js

.PHONY: all setup depend test lint
