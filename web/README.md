## Overview
This folder contains components that act as modular building blocks for any React framework. The purpose of this directory is to maintain a clean and organized structure by separating the core logic from the framework-specific implementations.

## Purpose of the "web" Directory
The web directory within this folder serves a crucial role in the architecture of our application. By placing our components' logic in web, we ensure that the core functionality remains framework-agnostic. This separation allows us to:

 - **Promote Reusability**: Components can be reused across different projects and frameworks without modification.
 - **Enhance Maintainability**: Changes in the core logic do not directly impact the framework-specific code, simplifying updates and maintenance.
 - **Improve Testability**: Testing the components' logic becomes easier as it is decoupled from the framework-specific rendering and lifecycle methods.
