all: setup depend

setup:
	@chmod -R +x .scripts/
	@.scripts/setup.sh

depend:
	@.scripts/install-dependencies.sh

.PHONY: all setup
