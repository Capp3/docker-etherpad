# Etherpad Plus - Makefile
# Docker-based Etherpad deployment with development tools

.PHONY: help install install-dev clean deep-clean build build-deploy up stop restart logs logs-etherpad logs-postgres ps shell pull lint format format-dockerfile format-yml

# Default target
.DEFAULT_GOAL := help

help: ## Show this help message
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Set up .env from .env.example
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "✓ Created .env from .env.example"; \
		echo "⚠ Please review and customize .env before building"; \
	else \
		echo "✓ .env already exists"; \
	fi

install-dev: ## Install development tools (linting, formatting)
	@echo "Installing development tools..."
	@if ! command -v npm >/dev/null 2>&1; then \
		echo "✗ npm is not installed. Please install Node.js and npm first."; \
		exit 1; \
	fi
	@mkdir -p .devtools
	@if [ ! -f .devtools/package.json ]; then \
		printf '%s\n' '{' \
			'  "name": "etherpadplus-devtools",' \
			'  "private": true' \
			'}' > .devtools/package.json; \
	fi
	@echo "Installing/updating .devtools packages..."
	@( cd .devtools && npm install --no-fund --no-audit --save-dev dclint prettier prettier-plugin-sh )
	@echo "✓ Development tools installation complete"

clean: ## Remove containers and images (keeps volumes)
	@echo "Cleaning up containers and images (keeping volumes)..."
	@docker compose down --rmi all
	@echo "Pruning dangling images and build cache..."
	@docker image prune -f >/dev/null 2>&1 || true
	@docker builder prune -f >/dev/null 2>&1 || true
	@echo "✓ Cleanup complete"

deep-clean: clean ## Remove containers, images, and volumes (WARNING: data loss)

	@docker compose down -v --rmi all
	@echo "✓ Deep cleanup complete"

build: ## Build Docker images only
	@echo "Building Docker images..."
	@docker compose build --no-cache --pull
	@echo "✓ Build complete"

build-deploy: build up ## Build images and start services

up: ## Start services (assumes images built)
	@echo "Starting services..."
	@docker compose up -d
	@echo "✓ Services started"

stop: ## Stop all services
	@echo "Stopping services..."
	@docker compose down
	@echo "✓ Services stopped"

down: stop

restart: stop up ## Restart all services

logs: ## Show logs for all services
	@docker compose logs -f

logs-etherpad: ## Show logs for etherpad service only
	@docker compose logs -f etherpad

logs-postgres: ## Show logs for postgres service only
	@docker compose logs -f postgres

ps: ## Show running containers
	@docker compose ps

shell: ## Access etherpad container shell
	@docker compose exec etherpad /bin/sh

pull: ## Pull latest base images
	@echo "Pulling latest base images..."
	@docker compose pull
	@echo "✓ Pull complete"

lint: ## Lint compose.yml with dclint (docker-compose linter)
	@echo "Linting compose.yml..."
	@if [ -x .devtools/node_modules/.bin/dclint ]; then \
		.devtools/node_modules/.bin/dclint compose.yml; \
	elif command -v dclint >/dev/null 2>&1; then \
		dclint compose.yml; \
	elif npx dclint --version >/dev/null 2>&1; then \
		npx dclint compose.yml; \
	else \
		echo "✗ dclint not found. Run 'make install-dev' first."; \
		exit 1; \
	fi

format: format-dockerfile format-yml ## Format all files (Dockerfiles and YAML)

format-dockerfile: ## Format Dockerfile files
	@echo "Formatting Dockerfiles..."
	@if [ -x .devtools/node_modules/.bin/prettier ]; then \
		for f in dockerfile.*; do \
			[ -f "$$f" ] || continue; \
			( cd .devtools && ./node_modules/.bin/prettier --plugin=prettier-plugin-sh --stdin-filepath Dockerfile < "../$$f" > "../$$f.tmp" ) && mv "$$f.tmp" "$$f"; \
		done; \
	else \
		echo "✗ Prettier dev tooling not found. Run 'make install-dev' first."; \
		exit 1; \
	fi
	@echo "✓ Dockerfiles formatted"

format-yml: ## Format YAML files
	@echo "Formatting YAML files..."
	@if [ -x .devtools/node_modules/.bin/prettier ]; then \
		.devtools/node_modules/.bin/prettier --write compose.yml || true; \
	else \
		echo "✗ Prettier dev tooling not found. Run 'make install-dev' first."; \
		exit 1; \
	fi
	@echo "✓ YAML files formatted"

exec-etherpad: ## Execute command in etherpad container
	@docker exec -it etherpad /bin/sh
