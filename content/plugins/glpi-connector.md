---
kind: plugin
title: GLPI Service Connector
publisher: Ambiente Livre Labs
license: Apache-2.0
description: A starter integration for connecting GLPI service management workflows with monitoring tools, inventory systems and business applications.
initials: GL
categories:
  - ITSM
  - DevOps
type: Integration
openSource: true
featured: false
install:
  packageManager: Docker Compose
  command: docker compose up -d glpi-connector
  requirements:
    - Docker Engine 24 or newer
    - GLPI 10 or newer
---

# GLPI Service Connector

Connect GLPI service management workflows with business applications.
