include docker/.env-dev

.PHONY: build
build: permissions up composer-install

.PHONY: permissions
permissions:
	@chmod -R 777 app/public

.PHONY: down
down:
	@docker-compose -f docker/docker-compose-dev.yml down

.PHONY: up
up: down
	@docker-compose -f docker/docker-compose-dev.yml build
	@docker-compose -f docker/docker-compose-dev.yml up -d

.PHONY: composer-install
composer-install:
	@docker exec -it web bash -c "composer install -o -n"

.PHONY: shell
shell:
	@docker exec -it web bash -c "export COLUMNS=`tput cols`; export LINES=`tput lines`; exec bash"

.PHONY: shell-mysql
shell-mysql:
	@docker exec -it mysql bash -c "export COLUMNS=`tput cols`; export LINES=`tput lines`; exec bash"

.PHONY: logs
logs:
	@docker-compose -f docker/docker-compose-dev.yml logs -f -t

.PHONY: browser
browser:
	@xdg-open $(APP_HOST):$(APP_PORT)

.PHONY: mysql
mysql:
	@mysql -h $(MYSQL_HOST_SHELL) -P $(MYSQL_HOST_PORT) -u $(MYSQL_USER) -p$(MYSQL_PASSWORD) $(MYSQL_DATABASE)

.PHONY: migrations
migrations:
	@docker exec web bash -c "php database/migrations/migrate.php"