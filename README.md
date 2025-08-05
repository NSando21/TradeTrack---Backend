<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">

<img src="/assets/tradeTrack.png" width="30%" style="position: relative; top: 0; right: 0;" alt="Project Logo"/>

# TRADETRACK-BACKEND

<em></em>

<!-- BADGES -->
<!-- local repository, no metadata badges. -->

<em>Construido con las herramientas y tecnologías:</em>

<img src="https://img.shields.io/badge/JSON-000000.svg?style=default&logo=JSON&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/Socket.io-010101.svg?style=default&logo=socketdotio&logoColor=white" alt="Socket.io">
<img src="https://img.shields.io/badge/npm-CB3837.svg?style=default&logo=npm&logoColor=white" alt="npm">
<img src="https://img.shields.io/badge/TypeORM-FE0803.svg?style=default&logo=TypeORM&logoColor=white" alt="TypeORM">
<img src="https://img.shields.io/badge/.ENV-ECD53F.svg?style=default&logo=dotenv&logoColor=black" alt=".ENV">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=default&logo=JavaScript&logoColor=black" alt="JavaScript">
<br>
<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=default&logo=Nodemon&logoColor=white" alt="Nodemon">
<img src="https://img.shields.io/badge/Passport-34E27A.svg?style=default&logo=Passport&logoColor=white" alt="Passport">
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=default&logo=TypeScript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/tsnode-3178C6.svg?style=default&logo=ts-node&logoColor=white" alt="tsnode">
<img src="https://img.shields.io/badge/Cloudinary-3448C5.svg?style=default&logo=Cloudinary&logoColor=white" alt="Cloudinary">
<img src="https://img.shields.io/badge/Socket-C93CD7.svg?style=default&logo=Socket&logoColor=white" alt="Socket">

</div>
<br>

---

## Descripción general
Este proyecto consiste en una web app responsive orientada al sector de importación y comercio internacional, con especial foco en los viajes de negocios a China. Actualmente, muchos importadores visitan ferias o fábricas sin un sistema estandarizado para registrar información clave sobre proveedores, lo que dificulta el seguimiento, la comparación y la colaboración posterior. Esta app busca transformar esa experiencia en una guía estructurada y colaborativa, permitiendo a los importadores registrar en tiempo real la ubicación de proveedores, fotos del lugar y productos ofrecidos, y luego compartir esa información en una base de datos comunitaria. Los usuarios podrán filtrar proveedores por categoría, calidad o ubicación, e incluso contactarse entre sí mediante una sala de chat común, generando un ecosistema de confianza y eficiencia. El valor agregado de esta plataforma es su capacidad de conectar y documentar de manera colaborativa la experiencia de importadores reales, rompiendo barreras informativas entre América y Asia, y construyendo una red descentralizada de inteligencia comercial viva y actualizada.

---

## Características

- Autenticación propia y externa con Auth0. Persistencia de sesión.
- Notificaciones vía mail.
- Almacenamiento de archivos (Cloudinary).
- Usuario administrador con su respectivo dashboard.
- Documentación de la aplicación en general con Swagger.
- Implementación de plataforma de pagos con Mercado Pago.
- Despliegue de la totalidad de proyecto con render.
- Implementación de herramienta Google Maps.

---

## 🚀 Tecnologías

- **NestJS** - Framework de Node.js
- **TypeScript** - Lenguaje de programación
- **PostgreSQL** - Base de datos
- **TypeORM** - ORM para TypeScript
- **JWT** - Autenticación (próximamente)

---

## Estructura del proyecto

```sh
└── TradeTrack-Backend/
    ├── migrate-add-payment-id.js
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── app.controller.ts
    │   ├── app.module.ts
    │   ├── app.service.ts
    │   ├── config
    │   ├── database
    │   ├── decorators
    │   ├── main.ts
    │   ├── modules
    │   ├── products
    │   ├── roles.enum.ts
    │   ├── swagger-docs
    │   ├── templates
    │   └── test-client.html
    ├── tsconfig.json
    └── types
        ├── custom.d.ts
        └── express.d.ts
```

### Índice del proyecto

<details open>
	<summary><b><code>C:\PROYECTOS\TRADETRACK-BACKEND/</code></b></summary>
	<!-- __root__ Submodule -->
	<details>
		<summary><b>__root__</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ __root__</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/migrate-add-payment-id.js'>migrate-add-payment-id.js</a></b></td>
					<td style='padding: 8px;'>- The script migrates the <code>subscriptions</code> database table by adding a new column named <code>mercadoPagoPaymentId</code><br>- It connects to a PostgreSQL database, checks for the columns existence, and adds it if necessary<br>- The script manages database connections, providing logging for successful completion or error handling<br>- Its a database migration script within a larger application using TypeORM.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/package-lock.json'>package-lock.json</a></b></td>
					<td style='padding: 8px;'>- The <code>package-lock.json</code> file manages dependencies for the backend-pi project (version 1.0.0)<br>- It ensures that the project uses specific versions of Node.js packages like NestJS (for building the backend application), and related modules for features such as email sending (@nestjs-modules/mailer), configuration (@nestjs/config), JWT authentication (@nestjs/jwt), and Passport authentication (@nestjs/passport)<br>- This file is crucial for maintaining consistent and reproducible builds across different environments.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>- Package.json` manages the backend-pi NestJS API project<br>- It defines project metadata, dependencies for building and running the application (including database interaction, authentication, email, and payment processing libraries), and scripts for development tasks like building, testing, and starting the server in various modes (development, production, and debug)<br>- The file ensures consistent project setup and execution across different environments.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/tsconfig.json'>tsconfig.json</a></b></td>
					<td style='padding: 8px;'>- Tsconfig.json<code> configures the TypeScript compiler for the project<br>- It specifies compilation targets, output directory, module system, and enables features like decorators and source maps<br>- Importantly, it sets up path aliases for easier module referencing within the </code>src<code> directory, leveraging </code>tsconfig-paths` for enhanced development workflow<br>- The configuration ensures efficient and consistent code compilation and execution.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- src Submodule -->
	<details>
		<summary><b>src</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ src</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\app.controller.ts'>app.controller.ts</a></b></td>
					<td style='padding: 8px;'>- The <code>AppController</code> serves as the main entry point for the NestJS application<br>- It exposes a root endpoint returning a greeting, sourced from the <code>AppService</code>, and a health check endpoint providing application status, timestamp, and uptime<br>- This controller manages basic application interaction and health monitoring within the overall application architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\app.module.ts'>app.module.ts</a></b></td>
					<td style='padding: 8px;'>- AppModule orchestrates the applications core functionality by importing and configuring essential modules<br>- It establishes database connectivity using TypeORM, sets up email services via MailerModule, and integrates various feature modules like user management, trips, payments, and notifications<br>- The module also manages global configuration and dependency injection for the entire NestJS application.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\app.service.ts'>app.service.ts</a></b></td>
					<td style='padding: 8px;'>- The <code>AppService</code> provides core API functionality for the NestJS-based Backend PI application<br>- It offers a welcome message and returns application metadata, including name, version, description, and the technologies used in its construction<br>- This service acts as a central point for retrieving basic information about the application.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\main.ts'>main.ts</a></b></td>
					<td style='padding: 8px;'>- The <code>src/main.ts</code> file bootstraps the NestJS application<br>- It initializes the application module, configures Swagger for API documentation, enables CORS for cross-origin requests, and sets up global validation using a validation pipe<br>- Finally, it starts the server, listening on a specified port and logging access information<br>- This file acts as the entry point for the entire backend application.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\roles.enum.ts'>roles.enum.ts</a></b></td>
					<td style='padding: 8px;'>- The <code>roles.enum.ts</code> file defines user roles within the application<br>- It establishes <code>User</code> and <code>Admin</code> roles, providing a central, easily accessible definition for role-based access control throughout the applications codebase<br>- This ensures consistent and maintainable role management across different modules and features.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\test-client.html'>test-client.html</a></b></td>
					<td style='padding: 8px;'>- A simple HTML client establishes a real-time connection to a server, likely for a notification system<br>- Upon connection, it registers a user ID and subsequently receives and displays notifications sent from the server, providing a basic test interface for the notification functionality within the broader application architecture<br>- The alert functionality serves as immediate visual feedback for testing purposes.</td>
				</tr>
			</table>
			<!-- config Submodule -->
			<details>
				<summary><b>config</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.config</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\config\cloudinary.ts'>cloudinary.ts</a></b></td>
							<td style='padding: 8px;'>- CloudinaryConfig provides Cloudinary cloud storage integration for the application<br>- It uses environment variables from <code>development.env</code> to configure the Cloudinary client library<br>- This setup facilitates image and media uploads and management within the applications infrastructure, leveraging Cloudinarys services for storage and delivery<br>- The configuration is exposed as a dependency injection module, making it readily accessible throughout the application.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\config\database.config.ts'>database.config.ts</a></b></td>
							<td style='padding: 8px;'>- The <code>database.config.ts</code> file configures and establishes a connection to a PostgreSQL database<br>- It uses environment variables for credentials and TypeORM for database interaction, automatically loading entities and synchronizing the schema<br>- This configuration is registered within a NestJS application, providing database access throughout the application.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\config\mail.config.ts'>mail.config.ts</a></b></td>
							<td style='padding: 8px;'>- Mail configuration parameters are defined for the NestJS application<br>- It centralizes email settings, specifying the SMTP server, authentication credentials, sender address, and Handlebars template location<br>- These settings enable email functionality throughout the application, likely for user notifications or other communication needs<br>- Environment variables are used for flexible configuration.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- database Submodule -->
			<details>
				<summary><b>database</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.database</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\database\data-source.ts'>data-source.ts</a></b></td>
							<td style='padding: 8px;'>- AppDataSource establishes the connection to the PostgreSQL database<br>- It configures database credentials from environment variables, specifies entity and migration locations, and enables logging<br>- Importantly, it disables automatic synchronization to maintain database schema control, using migrations instead<br>- Production environments utilize SSL with relaxed certificate validation<br>- The module exports this data source for use throughout the application.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- decorators Submodule -->
			<details>
				<summary><b>decorators</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.decorators</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\decorators\roles.decorator.ts'>roles.decorator.ts</a></b></td>
							<td style='padding: 8px;'>- The <code>roles.decorator.ts</code> file provides a decorator function for NestJS applications<br>- It facilitates role-based access control by associating specific roles with routes or controllers<br>- This decorator uses metadata to store role information, enabling authorization mechanisms to verify user permissions against defined roles within the applications overall security architecture.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- modules Submodule -->
			<details>
				<summary><b>modules</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.modules</b></code>
					<!-- auth Submodule -->
					<details>
						<summary><b>auth</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.modules.auth</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\auth\auth.controller.ts'>auth.controller.ts</a></b></td>
									<td style='padding: 8px;'>- The AuthController manages user authentication<br>- It provides endpoints for user registration and login, protected profile access, and various testing functionalities for Auth0 integration, including token debugging and validation<br>- These endpoints utilize different authentication guards and leverage the AuthService for core authentication logic<br>- The controller also offers simple health checks.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\auth\auth.module.ts'>auth.module.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\auth\auth.service.ts'>auth.service.ts</a></b></td>
									<td style='padding: 8px;'>- The <code>auth.service.ts</code> module handles user authentication and registration<br>- It securely registers new users, verifying usernames and hashing passwords, and automatically creates welcome subscriptions and sends welcome emails<br>- Login functionality verifies credentials, issues JWTs, and optionally sends welcome emails and initiates trip notifications via a gateway<br>- The service interacts with user, subscription, trip, and notification services.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\auth\auth0.strategy.ts'>auth0.strategy.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\auth\email.service.ts'>email.service.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\auth\jwt.strategy.ts'>jwt.strategy.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\auth\multi-auth.guard.ts'>multi-auth.guard.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\auth\roles.guard.ts'>roles.guard.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
							</table>
							<!-- dto Submodule -->
							<details>
								<summary><b>dto</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.modules.auth.dto</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\auth\dto\login-user.dto.ts'>login-user.dto.ts</a></b></td>
											<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\auth\dto\register-user.dto.ts'>register-user.dto.ts</a></b></td>
											<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- file-upload Submodule -->
					<details>
						<summary><b>file-upload</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.modules.file-upload</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\file-upload\file-upload.controller.ts'>file-upload.controller.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\file-upload\file-upload.module.ts'>file-upload.module.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\file-upload\file-upload.service.ts'>file-upload.service.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\file-upload\file.upload.repository.ts'>file.upload.repository.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- notifications Submodule -->
					<details>
						<summary><b>notifications</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.modules.notifications</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\notifications\notifications.gateway.ts'>notifications.gateway.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\notifications\notifications.module.ts'>notifications.module.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- payments Submodule -->
					<details>
						<summary><b>payments</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.modules.payments</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\payments\mercadopago.provider.ts'>mercadopago.provider.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\payments\payments.controller.ts'>payments.controller.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\payments\payments.module.ts'>payments.module.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\payments\payments.service.ts'>payments.service.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\payments\webhook.controller.ts'>webhook.controller.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
							</table>
							<!-- dtos Submodule -->
							<details>
								<summary><b>dtos</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.modules.payments.dtos</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\payments\dtos\create-subscription.dto.ts'>create-subscription.dto.ts</a></b></td>
											<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- Entities Submodule -->
							<details>
								<summary><b>Entities</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.modules.payments.Entities</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\payments\Entities\subscription.entity.ts'>subscription.entity.ts</a></b></td>
											<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- providers Submodule -->
					<details>
						<summary><b>providers</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.modules.providers</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\providers\providers-pictures.controller.ts'>providers-pictures.controller.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\providers\providers-pictures.service.ts'>providers-pictures.service.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\providers\providers.controller.ts'>providers.controller.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\providers\providers.module.ts'>providers.module.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\providers\providers.service.ts'>providers.service.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
							</table>
							<!-- dtos Submodule -->
							<details>
								<summary><b>dtos</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.modules.providers.dtos</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\providers\dtos\create-provider-picture.dto.ts'>create-provider-picture.dto.ts</a></b></td>
											<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\providers\dtos\create-provider.dto.ts'>create-provider.dto.ts</a></b></td>
											<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\providers\dtos\reorder-provider-picture.dto.ts'>reorder-provider-picture.dto.ts</a></b></td>
											<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\providers\dtos\reorder-provider-pictures.dto.ts'>reorder-provider-pictures.dto.ts</a></b></td>
											<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\providers\dtos\update-provider.dto.ts'>update-provider.dto.ts</a></b></td>
											<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- Entities Submodule -->
							<details>
								<summary><b>Entities</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.modules.providers.Entities</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\providers\Entities\provider-pictures.entity.ts'>provider-pictures.entity.ts</a></b></td>
											<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\providers\Entities\provider.entity.ts'>provider.entity.ts</a></b></td>
											<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- subscriptions Submodule -->
					<details>
						<summary><b>subscriptions</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.modules.subscriptions</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\subscriptions\subscriptions.controller.ts'>subscriptions.controller.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\subscriptions\subscriptions.module.ts'>subscriptions.module.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\subscriptions\subscriptions.service.ts'>subscriptions.service.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
							</table>
							<!-- dtos Submodule -->
							<details>
								<summary><b>dtos</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.modules.subscriptions.dtos</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\subscriptions\dtos\subscription-response.dto.ts'>subscription-response.dto.ts</a></b></td>
											<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- trips Submodule -->
					<details>
						<summary><b>trips</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.modules.trips</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\trips\trip.entity.ts'>trip.entity.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\trips\trips.controller.ts'>trips.controller.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\trips\trips.module.ts'>trips.module.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\trips\trips.service.ts'>trips.service.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
							</table>
							<!-- dtos Submodule -->
							<details>
								<summary><b>dtos</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.modules.trips.dtos</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\trips\dtos\trip.dto.ts'>trip.dto.ts</a></b></td>
											<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\trips\dtos\update-trip.dto.ts'>update-trip.dto.ts</a></b></td>
											<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- users Submodule -->
					<details>
						<summary><b>users</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.modules.users</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\users\user.entity.ts'>user.entity.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\users\users.controller.ts'>users.controller.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\users\users.module.ts'>users.module.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\users\users.service.ts'>users.service.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
							</table>
							<!-- dto Submodule -->
							<details>
								<summary><b>dto</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.modules.users.dto</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\users\dto\create-user.dto.ts'>create-user.dto.ts</a></b></td>
											<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\modules\users\dto\update-users.dto.ts'>update-users.dto.ts</a></b></td>
											<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<!-- products Submodule -->
			<details>
				<summary><b>products</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.products</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\products\products.controller.ts'>products.controller.ts</a></b></td>
							<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\products\products.module.ts'>products.module.ts</a></b></td>
							<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\products\products.service.ts'>products.service.ts</a></b></td>
							<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
						</tr>
					</table>
					<!-- dto Submodule -->
					<details>
						<summary><b>dto</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.products.dto</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\products\dto\create-product-picture.dto.ts'>create-product-picture.dto.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\products\dto\create-product.dto.ts'>create-product.dto.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\products\dto\update-product.dto.ts'>update-product.dto.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- entities Submodule -->
					<details>
						<summary><b>entities</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.products.entities</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\products\entities\product-pictures.entity.ts'>product-pictures.entity.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\products\entities\product.entity.ts'>product.entity.ts</a></b></td>
									<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
								</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<!-- swagger-docs Submodule -->
			<details>
				<summary><b>swagger-docs</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.swagger-docs</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\swagger-docs\auth.docs.ts'>auth.docs.ts</a></b></td>
							<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\swagger-docs\products.docs.ts'>products.docs.ts</a></b></td>
							<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\swagger-docs\providers-pictures.docs.ts'>providers-pictures.docs.ts</a></b></td>
							<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\swagger-docs\providers.docs.ts'>providers.docs.ts</a></b></td>
							<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\swagger-docs\trips.docs.ts'>trips.docs.ts</a></b></td>
							<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\swagger-docs\users.docs.ts'>users.docs.ts</a></b></td>
							<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- templates Submodule -->
			<details>
				<summary><b>templates</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.templates</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/src\templates\welcome.hbs'>welcome.hbs</a></b></td>
							<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
						</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<!-- types Submodule -->
	<details>
		<summary><b>types</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ types</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/types\custom.d.ts'>custom.d.ts</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='C:\Proyectos\TradeTrack-Backend/blob/master/types\express.d.ts'>express.d.ts</a></b></td>
					<td style='padding: 8px;'>Code>❯ REPLACE-ME</code></td>
				</tr>
			</table>
		</blockquote>
	</details>
</details>

---

## Desarrolladores de este proyecto:
- Nicolas Sandoval: https://github.com/NSando21
- Jose Poletto : https://github.com/JoseIPoletto
- Rafael Silva: https://github.com/RafaelSilva-KingOrren
- Maicol Romero: https://github.com/MRomeroGarzon
- Juan Daniel Consuegra: https://github.com/JDanielHConsuegra
- Abigail Breazu: https://github.com/AbigailBreazu

## Empecemos

### 📋 Prerrequisitos

- Node.js (v16 o superior)
- PostgreSQL
- npm o yarn

### Instalación

Construya TradeTrack-Backend desde la fuente e instale las dependencias:

1. **Clonar el repositorio:**

   ```sh
   ❯ git clone ../TradeTrack-Backend
   ```

2. **Navegar al directorio del proyecto:**

   ```sh
   ❯ cd TradeTrack-Backend
   ```

3. **Instalar las dependencias:**

   ```sh
   ❯ npm install
   ```

4. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env basado en .env.example
   cp .env.example .env
   ```
   
   Editar el archivo `.env` con tus configuraciones:
   ```env
   NODE_ENV=development
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=tu_password
   DB_NAME=backend_pi
   ```

## 🏃‍♂️ Ejecutar la aplicación

### Desarrollo
```bash
npm run start:dev
```

### Producción
```bash
npm run build
npm run start:prod
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. 

---
