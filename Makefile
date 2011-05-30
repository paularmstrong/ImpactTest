all: setup depend

setup:
	@chmod -R +x .scripts/
	@.scripts/setup.sh

depend:
	@.scripts/install-dependencies.sh

test:
	@node ./runtests.js -c ./config/config-test.js

lint:
	@node ./runlint.js -c ./config/config-lint.js

.PHONY: all setup depend test lint
