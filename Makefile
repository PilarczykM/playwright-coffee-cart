.PHONY: help check format test

help:
	@echo "Available commands:"
	@echo "  check  - Check for formatting and linting errors"
	@echo "  format - Format the code"
	@echo "  test   - Run playwright tests"

check:
	npx biome check .

format:
	npx biome format --write .

test:
	npx playwright test
